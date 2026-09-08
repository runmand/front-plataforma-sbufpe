'use client';

import { useEffect, useMemo, useState } from "react";
import {
	Alert,
	Checkbox,
	CircularProgress,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { localStorageKeyEnum } from "src/core/enums";
import VigiaDashboardService from "./service";
import { VigiaRow, FilterState, DEFAULT_FILTERS, ALL_OPTION, UNDEFINED_OPTION } from "./type";
import { AGE_BRACKETS, applyFilters, applyMainFilters, distinctNumericValues, distinctValues, isOutlierExcluded, summarize } from "./utils";
import { VIGIA, ff } from "./colors";
import StackedCpoChart from "./StackedCpoChart";
import CareFreeChart from "./CareFreeChart";
import CpoGauge from "./CpoGauge";
import DataSheet from "@components/dashboard/dataSheet/index";
import { SELECT_FIELD_SX, SELECT_PAPER_SX } from "src/core/selectSx";

const vigiaDashboardService = new VigiaDashboardService();

const Card = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
	<div
		style={{
			backgroundColor: VIGIA.white,
			// Mesma silhueta de cartão do resto do sistema (/form, /dashboard, painel admin).
			border: `1.5px solid ${VIGIA.border}`,
			borderRadius: 16,
			boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
			padding: "20px 24px",
			...style,
		}}
	>
		{children}
	</div>
);

/**
 * Formata uma célula da planilha. Importante: NÃO usar `value || "—"` aqui —
 * campos como Cariado/Perdido/Restaurado costumam ser 0 de verdade (dente
 * hígido/sem perda), e 0 é falsy em JS, então `0 || "—"` vira "—" e some com
 * um dado real. Só cai no "—" quando o valor é de fato ausente/vazio.
 */
const displayValue = (value: unknown): string => {
	if (value === undefined || value === null) return "—";
	const text = String(value).trim();
	return text === "" ? "—" : text;
};

// Números crus (Σ Cariado, Σ dentes, nº de pessoas...) — sempre inteiros, sem casas decimais.
const fmtInt = (v: number) => v.toLocaleString("pt-BR");
// Resultado da fórmula (fração pequena) — no máximo 2 casas decimais.
const fmtRate = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
// % de livres de cárie — no máximo 2 casas decimais, com o símbolo de porcentagem.
const fmtPercent = (v: number) => `${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;

/**
 * Indicador da faixa de resumo — só o conteúdo, SEM card próprio: os três indicadores vivem
 * dentro de um card único (a faixa), separados por fio. Antes cada um trazia o seu próprio
 * `Card`, o que resultava em três caixas altas e meio vazias — e, quando envolvidas por outro
 * card, em borda dentro de borda.
 */
const Stat = ({ value, label, sublabel }: { value: number | string; label: string; sublabel?: string }) => (
	<div style={{ textAlign: "center" }}>
		<span style={{ fontFamily: ff.body, fontSize: "clamp(30px, 3.2vw, 42px)", fontWeight: 700, color: VIGIA.primary, lineHeight: 1 }}>
			{value}
		</span>
		<p style={{ fontFamily: ff.body, fontSize: 14, color: VIGIA.muted, margin: "8px 0 0" }}>{label}</p>
		{sublabel ? <p style={{ fontFamily: ff.body, fontSize: 12, color: VIGIA.muted, margin: "2px 0 0" }}>{sublabel}</p> : null}
	</div>
);

/* Os dois cards de gráfico ficam pareados e se esticam pra mesma altura; o corpo cresce e
 * centra o gráfico na sobra, pro mais baixo dos dois não ficar grudado no topo. */
const CHART_CARD: React.CSSProperties = {
	height: "100%",
	boxSizing: "border-box",
	display: "flex",
	flexDirection: "column",
};
const CHART_TITLE: React.CSSProperties = {
	fontFamily: ff.body,
	fontSize: 18,
	fontWeight: 700,
	color: VIGIA.text,
	textAlign: "center",
	margin: "0 0 4px",
};
const CHART_BODY: React.CSSProperties = {
	flex: 1,
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
};

/* Bloco de referência e dados: três linhas de "abrir/fechar" com a MESMA aparência (explicação,
 * memória de cálculo e planilha). Antes a planilha era um botão em pílula solto FORA do card,
 * pendurado embaixo dele. */
const DISCLOSURE_ROW: React.CSSProperties = {
	fontFamily: ff.body,
	fontSize: 13,
	fontWeight: 700,
	color: VIGIA.primary,
	cursor: "pointer",
	padding: "11px 0",
};
const DISCLOSURE_DIVIDER: React.CSSProperties = { borderTop: `1px solid ${VIGIA.border}` };

/** Larguras/offsets das colunas congeladas da planilha (o `left` tem que casar com a largura
 * da coluna anterior, por isso os dois andam juntos). */
const FREEZE_ACTION: React.CSSProperties = { left: 0, width: 84, minWidth: 84, maxWidth: 84 };
const FREEZE_CITY: React.CSSProperties = { left: 84, width: 150, minWidth: 150, maxWidth: 150 };

const thStyle: React.CSSProperties = {
	textAlign: "left",
	padding: "8px 12px",
	borderBottom: `2px solid ${VIGIA.border}`,
	fontFamily: ff.body,
	fontWeight: 700,
	fontSize: 12,
	color: VIGIA.text,
	whiteSpace: "nowrap",
	backgroundColor: VIGIA.bg,
};

const tdStyle: React.CSSProperties = {
	padding: "6px 12px",
	borderBottom: `1px solid ${VIGIA.border}`,
	fontFamily: ff.body,
	fontSize: 12,
	color: VIGIA.text,
	whiteSpace: "nowrap",
};

export default function VigiaDashboard() {
	const [rows, setRows] = useState<VigiaRow[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
	// Os filtros de outliers (remover por quantidade de dentes / idade) só ficam
	// visíveis e ativos pra contas typeId 5 — pra qualquer outro typeId, a seção
	// nem aparece e as exclusões padrão são zeradas (ver useEffect abaixo).
	const [canManageOutliers, setCanManageOutliers] = useState<boolean>(false);
	const [showTable, setShowTable] = useState<boolean>(false);
	// Registros ocultados manualmente na planilha (ex: o formulário de uma
	// pessoa específica que se identifica como ruim ao olhar a linha) — some
	// pela referência do objeto, não por índice, pra continuar valendo mesmo
	// quando os filtros acima mudam.
	const [hiddenRows, setHiddenRows] = useState<Set<VigiaRow>>(new Set());
	// Quando true, some da PLANILHA as linhas destacadas em vermelho (excluídas pelos
	// filtros de outliers) — só um toggle de visualização, não afeta os gráficos/médias
	// (que já ignoram essas linhas de qualquer forma, via visibleRows).
	const [hideOutlierRowsInTable, setHideOutlierRowsInTable] = useState<boolean>(false);
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		vigiaDashboardService
			.getVigiaData()
			.then((data) => setRows(data))
			.catch((e) => {
				console.error(e);
				enqueueSnackbar("Não foi possível carregar os dados do Vigia SD.", { variant: "error" });
			})
			.finally(() => setLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const typeId = +localStorage.getItem(localStorageKeyEnum.TYPE_ID);
		const allowed = typeId === 5;
		setCanManageOutliers(allowed);
		if (!allowed) {
			setFilters((prev) => ({ ...prev, quantidadeDentes: [], idadeExata: [] }));
		}
	}, []);

	// Sem os registros que os filtros de outliers excluiriam — os dropdowns de
	// filtro "normais" (acima) só devem listar opções que ainda fazem sentido
	// escolher, não valores que só existem em respondentes já marcados pra sumir.
	// Os dois dropdowns de outlier continuam olhando pra "rows" completo, já que
	// o objetivo deles é justamente listar todos os valores pra poder marcar.
	const nonOutlierRows = useMemo(() => rows.filter((row) => !isOutlierExcluded(row, filters)), [rows, filters]);

	const municipioOptions = useMemo(() => distinctValues(nonOutlierRows, "Nome do Município"), [nonOutlierRows]);
	const estabelecimentoOptions = useMemo(
		() => distinctValues(nonOutlierRows, "Nome do Estabelecimento de saúde/instituição vinculada a pesquisa"),
		[nonOutlierRows]
	);
	const localPesquisaOptions = useMemo(() => distinctValues(nonOutlierRows, "Local da pesquisa"), [nonOutlierRows]);
	const turnoOptions = useMemo(() => distinctValues(nonOutlierRows, "Qual turno?"), [nonOutlierRows]);
	const quantidadeDentesOptions = useMemo(() => distinctNumericValues(rows, "Quantidade dentes CPO"), [rows]);
	const idadeExataOptions = useMemo(() => distinctNumericValues(rows, "Qual a sua idade?"), [rows]);

	const filteredRows = useMemo(() => applyFilters(rows, filters), [rows, filters]);
	// visibleRows = filteredRows menos os registros ocultados manualmente na planilha. Usado nos cálculos/gráficos.
	const visibleRows = useMemo(() => filteredRows.filter((row) => !hiddenRows.has(row)), [filteredRows, hiddenRows]);
	const summary = useMemo(() => summarize(visibleRows), [visibleRows]);

	// mainFilteredRows = só os filtros normais (sem os de outliers) — a planilha usa isso pra
	// continuar mostrando as linhas excluídas pelos filtros de outliers, destacadas em vermelho,
	// em vez de simplesmente sumirem (que é o que acontece nos gráficos/cálculos, via visibleRows).
	const mainFilteredRows = useMemo(() => applyMainFilters(rows, filters), [rows, filters]);
	const tableRows = useMemo(
		() =>
			mainFilteredRows
				.filter((row) => !hiddenRows.has(row))
				.filter((row) => !hideOutlierRowsInTable || !isOutlierExcluded(row, filters)),
		[mainFilteredRows, hiddenRows, hideOutlierRowsInTable, filters]
	);

	const hideRow = (row: VigiaRow) => {
		setHiddenRows((prev) => {
			const next = new Set(prev);
			next.add(row);
			return next;
		});
	};

	const restoreRow = (row: VigiaRow) => {
		setHiddenRows((prev) => {
			const next = new Set(prev);
			next.delete(row);
			return next;
		});
	};

	const restoreAllRows = () => setHiddenRows(new Set());

	const handleSelectChange = (field: keyof Omit<FilterState, "idadeBrackets">) => (event: SelectChangeEvent) => {
		setFilters((prev) => ({ ...prev, [field]: event.target.value }));
	};

	const handleMultiSelectChange = (field: "idadeBrackets" | "quantidadeDentes" | "idadeExata") => (event: SelectChangeEvent<string[]>) => {
		const value = event.target.value;
		setFilters((prev) => ({ ...prev, [field]: typeof value === "string" ? value.split(",") : value }));
	};

	if (loading) {
		return (
			<div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
				<CircularProgress sx={{ color: VIGIA.primary }} />
			</div>
		);
	}

	return (
		<div style={{ minHeight: "60vh", backgroundColor: VIGIA.bg, paddingTop: 96 }}>
			{/* ── Header ── */}
			{/* Hero na mesma composição das outras telas: barra de destaque 40×3, título em serifa
			    na cor do texto (não no bordô) e conteúdo centralizado. */}
			<div style={{ backgroundColor: VIGIA.white, borderBottom: `1px solid ${VIGIA.border}`, padding: "48px 24px 36px" }}>
				<div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
					<div
						style={{
							display: "inline-block",
							width: 40,
							height: 3,
							background: `linear-gradient(90deg, ${VIGIA.primary}, ${VIGIA.secondary})`,
							borderRadius: 2,
							marginBottom: 20,
						}}
					/>
					<h1
						style={{
							fontFamily: ff.display,
							fontSize: "clamp(24px, 3.5vw, 38px)",
							fontWeight: 700,
							color: VIGIA.text,
							margin: "0 0 12px",
							letterSpacing: "-0.02em",
							lineHeight: 1.2,
						}}
					>
						Dashboard Vigia SD — CPO
					</h1>
					<p style={{ fontFamily: ff.body, fontSize: 15, color: VIGIA.muted, margin: 0, lineHeight: 1.6 }}>
						Índice de dentes Cariados, Perdidos e Restaurados (CPO), calculado a partir das respostas do formulário
						Vigia SD.
					</p>
				</div>
			</div>

			<div style={{ padding: "28px 24px 80px" }}>
				<div style={{ maxWidth: 1280, margin: "0 auto" }}>
					{/* ── Filtros ── */}
				<div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
					<FormControl size="small" sx={{ ...SELECT_FIELD_SX, minWidth: 220, flex: "1 1 220px" }}>
						<InputLabel>Nome do Município</InputLabel>
						<Select
							value={filters.municipio}
							label="Nome do Município"
							onChange={handleSelectChange("municipio")}
							MenuProps={{ PaperProps: { sx: SELECT_PAPER_SX } }}
						>
							<MenuItem value={ALL_OPTION}>Todos</MenuItem>
							{municipioOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl size="small" sx={{ ...SELECT_FIELD_SX, minWidth: 220, flex: "1 1 220px" }}>
						<InputLabel>Estabelecimento de saúde</InputLabel>
						<Select
							value={filters.estabelecimento}
							label="Estabelecimento de saúde"
							onChange={handleSelectChange("estabelecimento")}
							MenuProps={{ PaperProps: { sx: SELECT_PAPER_SX } }}
						>
							<MenuItem value={ALL_OPTION}>Todos</MenuItem>
							{estabelecimentoOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl size="small" sx={{ ...SELECT_FIELD_SX, minWidth: 160, flex: "1 1 160px" }}>
						<InputLabel>Idade</InputLabel>
						<Select
							multiple
							value={filters.idadeBrackets}
							label="Idade"
							onChange={handleMultiSelectChange("idadeBrackets")}
							renderValue={(selected) => (selected.length ? selected.join(", ") : "Todos")}
							MenuProps={{ PaperProps: { sx: SELECT_PAPER_SX } }}
						>
							{AGE_BRACKETS.map((bracket) => (
								<MenuItem key={bracket.label} value={bracket.label}>
									<Checkbox checked={filters.idadeBrackets.includes(bracket.label)} sx={{ color: VIGIA.primary, "&.Mui-checked": { color: VIGIA.primary } }} />
									<ListItemText primary={bracket.label} primaryTypographyProps={{ sx: { fontFamily: ff.body, fontSize: 14 } }} />
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl size="small" sx={{ ...SELECT_FIELD_SX, minWidth: 200, flex: "1 1 200px" }}>
						<InputLabel>Local da Pesquisa</InputLabel>
						<Select
							value={filters.localPesquisa}
							label="Local da Pesquisa"
							onChange={handleSelectChange("localPesquisa")}
							MenuProps={{ PaperProps: { sx: SELECT_PAPER_SX } }}
						>
							<MenuItem value={ALL_OPTION}>Todos</MenuItem>
							{localPesquisaOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl size="small" sx={{ ...SELECT_FIELD_SX, minWidth: 160, flex: "1 1 160px" }}>
						<InputLabel>Qual turno?</InputLabel>
						<Select value={filters.turno} label="Qual turno?" onChange={handleSelectChange("turno")} MenuProps={{ PaperProps: { sx: SELECT_PAPER_SX } }}>
							<MenuItem value={ALL_OPTION}>Todos</MenuItem>
							{turnoOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>

				{/* ── Filtros de outliers (só typeId 5) ── */}
				{canManageOutliers && (
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							gap: 12,
							marginBottom: 24,
							padding: "14px 16px",
							backgroundColor: "#FFF6E5",
							border: "1px solid #f0dca6",
							borderRadius: 12,
						}}
					>
						<div style={{ width: "100%", marginBottom: 2 }}>
							<p style={{ fontFamily: ff.body, fontSize: 13, fontWeight: 700, color: "#8a5a00", margin: 0 }}>
								Filtros de outliers
							</p>
							<p style={{ fontFamily: ff.body, fontSize: 12, color: VIGIA.muted, margin: "2px 0 8px" }}>
								Marque um valor para <strong>remover</strong> da visualização (em todo o dashboard) quem tem esse
								valor — funciona ao contrário dos filtros acima.
							</p>
						</div>

						<FormControl size="small" sx={{ ...SELECT_FIELD_SX, minWidth: 220, flex: "1 1 220px" }}>
							<InputLabel>Quantidade de dentes (CPO)</InputLabel>
							<Select
								multiple
								value={filters.quantidadeDentes}
								label="Quantidade de dentes (CPO)"
								onChange={handleMultiSelectChange("quantidadeDentes")}
								renderValue={(selected) => (selected.length ? `Removendo: ${selected.join(", ")}` : "Nenhum removido")}
								MenuProps={{ PaperProps: { sx: SELECT_PAPER_SX } }}
							>
								{quantidadeDentesOptions.map((option) => (
									<MenuItem key={option} value={option}>
										<Checkbox
											checked={filters.quantidadeDentes.includes(option)}
											sx={{ color: VIGIA.primary, "&.Mui-checked": { color: VIGIA.primary } }}
										/>
										<ListItemText
											primary={option === UNDEFINED_OPTION ? UNDEFINED_OPTION : `${option} dentes`}
											primaryTypographyProps={{
												sx: {
													fontFamily: ff.body,
													fontSize: 14,
													fontStyle: option === UNDEFINED_OPTION ? "italic" : "normal",
													color: option === UNDEFINED_OPTION ? VIGIA.muted : VIGIA.text,
												},
											}}
										/>
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl size="small" sx={{ ...SELECT_FIELD_SX, minWidth: 200, flex: "1 1 200px" }}>
							<InputLabel>Idade (valor exato)</InputLabel>
							<Select
								multiple
								value={filters.idadeExata}
								label="Idade (valor exato)"
								onChange={handleMultiSelectChange("idadeExata")}
								renderValue={(selected) => (selected.length ? `Removendo: ${selected.join(", ")}` : "Nenhum removido")}
								MenuProps={{ PaperProps: { sx: SELECT_PAPER_SX } }}
							>
								{idadeExataOptions.map((option) => (
									<MenuItem key={option} value={option}>
										<Checkbox
											checked={filters.idadeExata.includes(option)}
											sx={{ color: VIGIA.primary, "&.Mui-checked": { color: VIGIA.primary } }}
										/>
										<ListItemText
											primary={option === UNDEFINED_OPTION ? UNDEFINED_OPTION : `${option} anos`}
											primaryTypographyProps={{
												sx: {
													fontFamily: ff.body,
													fontSize: 14,
													fontStyle: option === UNDEFINED_OPTION ? "italic" : "normal",
													color: option === UNDEFINED_OPTION ? VIGIA.muted : VIGIA.text,
												},
											}}
										/>
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
				)}


				{/* ── Indicadores ─────────────────────────────────────────────────────────────
				    Os números de resumo vêm ANTES do detalhamento: a média geral é o indicador que
				    dá nome à página, e antes ficava na coluna estreita, depois do gráfico. */}
				{/* Um card só, três colunas separadas por fio — não três cards. Em cards separados,
				    cada indicador carregava a própria caixa e a própria sobra de altura, e a faixa
				    ficava muito maior que o conteúdo que ela mostra. */}
				<Card style={{ marginBottom: 16, padding: "18px 8px" }}>
					<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
						<div style={{ flex: "1 1 240px", minWidth: 220, padding: "0 16px" }}>
							{/* O teto do arco é o maior CPO observado no recorte atual, não uma escala fixa —
							    então ele se move quando os filtros mudam. Enquanto for assim, o rótulo tem
							    que dizer isso, senão "65% do arco" se lê como severidade absoluta. */}
							<CpoGauge
								value={summary.mediaCpo}
								max={summary.maxCpo}
								label="Média geral CPO"
								maxHint="maior CPO observado"
							/>
						</div>
						<div style={{ flex: "1 1 180px", minWidth: 160, padding: "0 16px", borderLeft: `1px solid ${VIGIA.border}` }}>
							<Stat value={summary.totalRespondidos} label="Formulários respondidos" />
						</div>
						<div style={{ flex: "1 1 180px", minWidth: 160, padding: "0 16px", borderLeft: `1px solid ${VIGIA.border}` }}>
							<Stat
								value={fmtPercent(summary.livresDeCariePercentual)}
								label="Livres de Cárie"
								sublabel={`${fmtInt(summary.livresDeCarieCount)} de ${fmtInt(summary.livresDeCariePessoas)} pessoas com exame clínico`}
							/>
						</div>
					</div>
				</Card>

				{/* ── Os dois recortes por faixa etária, lado a lado ──────────────────────────
				    Os dois gráficos respondem a mesma pergunta ("como está cada faixa de idade") e
				    antes moravam em colunas diferentes, com orientação e escala diferentes — daí
				    não se conseguia ler junto que 45–64 tem o maior CPO E nenhum livre de cárie. */}
				<div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "stretch" }}>
					<div style={{ flex: "1 1 520px", minWidth: 320 }}>
						<Card style={CHART_CARD}>
							<h2 style={CHART_TITLE}>CPO por faixa etária</h2>
							{/* Os dois cards se esticam pra mesma altura (o par fica alinhado), então o
							    conteúdo tem que se centrar na sobra — senão o gráfico mais baixo fica
							    grudado no topo com um vazio embaixo. */}
							<div style={CHART_BODY}>
								{summary.cpoPorBloco.length ? (
									<StackedCpoChart data={summary.cpoPorBloco} />
								) : (
									<p style={{ textAlign: "center", fontFamily: ff.body, color: VIGIA.muted, padding: "40px 0" }}>
										Sem dados de exame clínico para os filtros selecionados.
									</p>
								)}
							</div>
						</Card>
					</div>
					<div style={{ flex: "1 1 340px", minWidth: 300 }}>
						<Card style={CHART_CARD}>
							<h2 style={CHART_TITLE}>Livres de cárie por faixa etária</h2>
							<div style={CHART_BODY}>
								{/* A lista de faixas agora inclui as zeradas, então o vazio de verdade é "ninguém
								    livre de cárie no recorte" — não "nenhuma faixa na lista". */}
								{summary.livresDeCarieCount > 0 ? (
									<CareFreeChart data={summary.livreDeCarieePorBloco} />
								) : (
									<p style={{ textAlign: "center", fontFamily: ff.body, color: VIGIA.muted, padding: "40px 0" }}>
										Nenhum respondente livre de cárie neste filtro.
									</p>
								)}
							</div>
						</Card>
					</div>
				</div>

				{/* ── Referência e conferência ────────────────────────────────────────────────
				    Material de apoio no fim: a explicação da fórmula (agora recolhida, porque
				    sempre aberta ela empurrava o conteúdo), a memória de cálculo e a planilha —
				    cujo botão ficava ANTES dos gráficos, adiando o conteúdo principal. */}
				<div style={{ marginTop: 16 }}>
					<Card>
						<p
							style={{
								fontFamily: ff.body,
								fontSize: 11,
								fontWeight: 700,
								textTransform: "uppercase",
								letterSpacing: "0.06em",
								color: VIGIA.muted,
								margin: "0 0 4px",
							}}
						>
							Referência e dados
						</p>

						<details style={{ ...DISCLOSURE_DIVIDER, fontFamily: ff.body, fontSize: 13, color: VIGIA.text }}>
							<summary style={DISCLOSURE_ROW}>Como o CPO é calculado</summary>
							<Alert
								severity="info"
								sx={{
									mt: 2,
									fontFamily: ff.body,
									fontSize: 13,
									lineHeight: 1.6,
									backgroundColor: "#FBEFE9",
									color: VIGIA.text,
									border: `1px solid ${VIGIA.border}`,
									"& .MuiAlert-icon": { color: VIGIA.primary },
								}}
							>
								<strong>Como o CPO é calculado:</strong> no exame clínico do Vigia SD, cada dente examinado recebe um
								código (cariado, perdido/extraído, restaurado ou hígido). Cada paciente entra com o total de dentes
								afetados dele: <strong>Cariado + Perdido + Restaurado</strong> (sem dividir por nada). O valor
								mostrado em cada faixa etária (e no geral, no medidor ao lado) é a{" "}
								<strong>média desse total entre os pacientes do grupo</strong> — ou seja,{" "}
								<strong>
									(Σ Cariado + Σ Perdido + Σ Restaurado) ÷ Quantidade de pessoas
								</strong>
								. Exemplo: paciente A com 5 dentes afetados e paciente B sem nenhum → média do grupo = (5 + 0) ÷ 2 =
								2,5 dentes afetados por pessoa, em média. A quantidade de dentes examinados não entra nessa conta.
								"Livre de cárie" continua sendo respondente com 0 dentes afetados (Cariado + Perdido + Restaurado =
								0), independente dessa fórmula.
							</Alert>
						</details>

							<details style={{ ...DISCLOSURE_DIVIDER, fontFamily: ff.body, fontSize: 13, color: VIGIA.text }}>
								{/* Isto é conteúdo pro usuário (a memória de cálculo, paciente por paciente), não
								    uma ferramenta de conferência interna — o texto era "conferir os números", que
								    lia como recurso de depuração publicado por engano. */}
								<summary style={DISCLOSURE_ROW}>Ver memória de cálculo, paciente por paciente</summary>

								<div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 14 }}>
									{[summary.calculoDetalhado.geral, ...summary.calculoDetalhado.porFaixa].map((d, i) => (
										<div key={i} style={{ padding: "8px 0", borderBottom: i === 0 ? `1px solid ${VIGIA.border}` : "none" }}>
											<p style={{ margin: "0 0 4px", fontWeight: 700, color: i === 0 ? VIGIA.primary : VIGIA.text }}>
												{d.label} — {fmtInt(d.n)} pessoa{d.n !== 1 ? "s" : ""} com dado clínico válido
											</p>
											<p style={{ margin: 0, color: VIGIA.muted, fontSize: 12 }}>
												Σ Cariado = {fmtInt(d.sumCariado)} · Σ Perdido = {fmtInt(d.sumPerdido)} · Σ Restaurado ={" "}
												{fmtInt(d.sumRestaurado)} · Σ Dentes examinados = {fmtInt(d.sumDentes)}
											</p>
											<p style={{ margin: "4px 0 0", fontSize: 12 }}>
												Cada paciente: Cariado + Perdido + Restaurado (sem dividir por dentes). Depois,{" "}
												<strong>média desses {fmtInt(d.n)} valor{d.n !== 1 ? "es" : ""}</strong> (ver tabela abaixo)
												= <strong>{fmtRate(d.total)}</strong>
											</p>

											{d.pacientes.length > 0 && (
												<details style={{ marginTop: 6 }}>
													<summary style={{ cursor: "pointer", fontSize: 11, color: VIGIA.muted }}>
														Ver por paciente ({d.pacientes.length}) — "dentes do paciente" é só informativo, não entra
														na conta
													</summary>
													<div style={{ marginTop: 6, overflowX: "auto" }}>
														<table style={{ borderCollapse: "collapse", fontSize: 11 }}>
															<thead>
																<tr>
																	<th style={{ ...thStyle, padding: "4px 8px" }}>#</th>
																	<th style={{ ...thStyle, padding: "4px 8px" }}>Cariado</th>
																	<th style={{ ...thStyle, padding: "4px 8px" }}>Perdido</th>
																	<th style={{ ...thStyle, padding: "4px 8px" }}>Restaurado</th>
																	<th style={{ ...thStyle, padding: "4px 8px" }}>Dentes do paciente (informativo)</th>
																	<th style={{ ...thStyle, padding: "4px 8px" }}>Total do paciente</th>
																</tr>
															</thead>
															<tbody>
																{d.pacientes.map((p, pi) => (
																	<tr key={pi} style={{ backgroundColor: pi % 2 === 0 ? VIGIA.white : VIGIA.bg }}>
																		<td style={{ ...tdStyle, padding: "4px 8px" }}>{pi + 1}</td>
																		<td style={{ ...tdStyle, padding: "4px 8px" }}>{fmtInt(p.cariado)}</td>
																		<td style={{ ...tdStyle, padding: "4px 8px" }}>{fmtInt(p.perdido)}</td>
																		<td style={{ ...tdStyle, padding: "4px 8px" }}>{fmtInt(p.restaurado)}</td>
																		<td style={{ ...tdStyle, padding: "4px 8px" }}>{fmtInt(p.dentes)}</td>
																		<td style={{ ...tdStyle, padding: "4px 8px" }}>
																			{fmtInt(p.cariado)}+{fmtInt(p.perdido)}+{fmtInt(p.restaurado)} ={" "}
																			<strong>{fmtInt(p.taxa)}</strong>
																		</td>
																	</tr>
																))}
															</tbody>
														</table>
													</div>
												</details>
											)}
										</div>
									))}
								</div>
							</details>
							{/* Terceira linha, com a mesma aparência das outras duas: a planilha é o dado cru
						    por trás de tudo. Era um botão em pílula solto fora do card. */}
						<button
							type="button"
							onClick={() => setShowTable((v) => !v)}
							style={{
								...DISCLOSURE_ROW,
								...DISCLOSURE_DIVIDER,
								display: "block",
								width: "100%",
								textAlign: "left",
								background: "none",
								borderLeft: "none",
								borderRight: "none",
								borderBottom: "none",
							}}
						>
							{showTable ? "▼" : "▶"} Ver dados em planilha ({fmtInt(tableRows.length)})
						</button>
					</Card>

				{/* ── Planilha de dados ── */}
				<div style={{ marginBottom: 24 }}>
					<div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
						{hiddenRows.size > 0 && (
							<details style={{ fontFamily: ff.body, fontSize: 12, color: VIGIA.muted }}>
								<summary style={{ cursor: "pointer" }}>
									{hiddenRows.size} registro{hiddenRows.size > 1 ? "s" : ""} oculto{hiddenRows.size > 1 ? "s" : ""}{" "}
									manualmente —{" "}
									<button
										type="button"
										onClick={(e) => {
											e.preventDefault();
											restoreAllRows();
										}}
										style={{
											fontFamily: ff.body,
											fontSize: 12,
											color: VIGIA.primary,
											background: "none",
											border: "none",
											padding: 0,
											cursor: "pointer",
											textDecoration: "underline",
										}}
									>
										restaurar todos
									</button>
								</summary>
								<div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4, maxWidth: 480 }}>
									{Array.from(hiddenRows).map((row, i) => (
										<div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
											<span>
												{row["Nome do Município"] || "Município não informado"} ·{" "}
												{row["Qual a sua idade?"] || "idade não informada"} anos
											</span>
											<button
												type="button"
												onClick={() => restoreRow(row)}
												style={{
													fontFamily: ff.body,
													fontSize: 12,
													color: VIGIA.primary,
													background: "none",
													border: "none",
													padding: 0,
													cursor: "pointer",
													textDecoration: "underline",
													whiteSpace: "nowrap",
												}}
											>
												restaurar
											</button>
										</div>
									))}
								</div>
							</details>
						)}
					</div>

					{showTable && canManageOutliers && (filters.quantidadeDentes.length > 0 || filters.idadeExata.length > 0) && (
						<button
							type="button"
							onClick={() => setHideOutlierRowsInTable((v) => !v)}
							title={hideOutlierRowsInTable ? "Clique para voltar a mostrar essas linhas na planilha" : "Clique para ocultar essas linhas da planilha"}
							style={{
								fontFamily: ff.body,
								fontSize: 12,
								color: "#a83232",
								margin: "8px 0 0",
								display: "flex",
								alignItems: "center",
								gap: 6,
								background: "none",
								border: "none",
								padding: 0,
								cursor: "pointer",
								textAlign: "left",
							}}
						>
							<span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 2, backgroundColor: "#fbdada", border: "1px solid #e8a3a3", flexShrink: 0 }} />
							{hideOutlierRowsInTable ? (
								<span>
									Linhas em vermelho ocultas da planilha (continuam fora dos gráficos/médias) —{" "}
									<span style={{ textDecoration: "underline" }}>clique para mostrar de novo</span>.
								</span>
							) : (
								<span>
									Linhas em vermelho: excluídas pelos filtros de outliers acima — continuam aqui pra conferência, mas
									não entram nos gráficos/médias. <span style={{ textDecoration: "underline" }}>Clique para ocultar</span>.
								</span>
							)}
						</button>
					)}

					{showTable && (
						<Card style={{ marginTop: 12, padding: 0, overflow: "hidden" }}>
								{/* A coluna de ocultar e o município ficam congelados: rolando pra direita, sem
								    eles a linha perde a identidade e não se sabe de qual registro é o valor. */}
								<DataSheet>
									<thead>
										<tr>
											<th className="dsheet-freeze" style={FREEZE_ACTION} />
											<th className="dsheet-freeze dsheet-freeze-edge" style={FREEZE_CITY}>
												Município
											</th>
											<th>Estabelecimento</th>
											<th>Local da pesquisa</th>
											<th>Turno</th>
											<th>Idade</th>
											<th>Dentes examinados</th>
											<th>Cariado</th>
											<th>Perdido</th>
											<th>Restaurado</th>
											<th>CPO (soma)</th>
											<th>Classificação</th>
										</tr>
									</thead>
									<tbody>
										{tableRows.length ? (
											tableRows.map((row, i) => {
												const isOutlier = isOutlierExcluded(row, filters);
												const cell = (value: string | number | undefined) => {
													const text = displayValue(value);
													return <td title={text}>{text}</td>;
												};
												return (
													// A cor da linha sinalizada vem da classe — o hover não pode apagar esse sinal.
													<tr key={i} className={isOutlier ? "dsheet-row--flag" : undefined}>
														<td className="dsheet-freeze" style={FREEZE_ACTION}>
															<button
																type="button"
																title="Ocultar este registro da visualização"
																onClick={() => hideRow(row)}
																style={{
																	fontFamily: ff.body,
																	fontSize: 11,
																	color: VIGIA.muted,
																	background: "none",
																	border: `1px solid ${VIGIA.border}`,
																	borderRadius: 6,
																	padding: "2px 6px",
																	cursor: "pointer",
																}}
															>
																Ocultar
															</button>
														</td>
														<td className="dsheet-freeze dsheet-freeze-edge" style={FREEZE_CITY}>
															{displayValue(row["Nome do Município"])}
														</td>
														{cell(row["Nome do Estabelecimento de saúde/instituição vinculada a pesquisa"])}
														{cell(row["Local da pesquisa"])}
														{cell(row["Qual turno?"])}
														{cell(row["Qual a sua idade?"])}
														{cell(row["Quantidade dentes CPO"])}
														{cell(row["Cariado"])}
														{cell(row["Perdido"])}
														{cell(row["Restaurado"])}
														{cell(row["Nota CPO valor sem calculo"])}
														{cell(row["Nota CPO definicao"])}
													</tr>
												);
											})
										) : (
											<tr>
												<td style={{ whiteSpace: "normal", color: VIGIA.muted }} colSpan={12}>
													Sem registros para os filtros selecionados.
												</td>
											</tr>
										)}
									</tbody>
								</DataSheet>
						</Card>
					)}
				</div>
				</div>
			</div>
		</div>
		</div>
	);
}
