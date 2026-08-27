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

const vigiaDashboardService = new VigiaDashboardService();

const Card = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
	<div
		style={{
			backgroundColor: VIGIA.white,
			border: `1px solid ${VIGIA.border}`,
			borderRadius: 16,
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

const StatTile = ({ value, label }: { value: number | string; label: string }) => (
	<Card style={{ textAlign: "center" }}>
		<span style={{ fontFamily: ff.body, fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: VIGIA.primary, lineHeight: 1 }}>
			{value}
		</span>
		<p style={{ fontFamily: ff.body, fontSize: 14, color: VIGIA.muted, margin: "8px 0 0" }}>{label}</p>
	</Card>
);

const filterLabelSx = { fontFamily: ff.body, fontSize: 14, color: VIGIA.text };
const filterSx = {
	fontFamily: ff.body,
	fontSize: 14,
	backgroundColor: VIGIA.white,
	"& .MuiOutlinedInput-notchedOutline": { borderColor: VIGIA.border },
};

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
	const tableRows = useMemo(() => mainFilteredRows.filter((row) => !hiddenRows.has(row)), [mainFilteredRows, hiddenRows]);

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
			<div style={{ backgroundColor: VIGIA.white, borderBottom: `1px solid ${VIGIA.border}`, padding: "48px 24px 36px" }}>
				<div style={{ maxWidth: 1280, margin: "0 auto" }}>
					<div
						style={{
							display: "inline-block",
							width: 48,
							height: 3,
							background: `linear-gradient(90deg, ${VIGIA.primary}, ${VIGIA.secondary})`,
							borderRadius: 2,
							marginBottom: 18,
						}}
					/>
					<h1
						style={{
							fontFamily: ff.display,
							fontSize: "clamp(28px, 3.4vw, 40px)",
							fontWeight: 700,
							color: VIGIA.primary,
							margin: "0 0 10px",
							letterSpacing: "-0.01em",
							lineHeight: 1.15,
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
					<FormControl size="small" sx={{ minWidth: 220, flex: "1 1 220px" }}>
						<InputLabel sx={filterLabelSx}>Nome do Município</InputLabel>
						<Select
							value={filters.municipio}
							label="Nome do Município"
							onChange={handleSelectChange("municipio")}
							sx={filterSx}
						>
							<MenuItem value={ALL_OPTION}>Todos</MenuItem>
							{municipioOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl size="small" sx={{ minWidth: 220, flex: "1 1 220px" }}>
						<InputLabel sx={filterLabelSx}>Estabelecimento de saúde</InputLabel>
						<Select
							value={filters.estabelecimento}
							label="Estabelecimento de saúde"
							onChange={handleSelectChange("estabelecimento")}
							sx={filterSx}
						>
							<MenuItem value={ALL_OPTION}>Todos</MenuItem>
							{estabelecimentoOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl size="small" sx={{ minWidth: 160, flex: "1 1 160px" }}>
						<InputLabel sx={filterLabelSx}>Idade</InputLabel>
						<Select
							multiple
							value={filters.idadeBrackets}
							label="Idade"
							onChange={handleMultiSelectChange("idadeBrackets")}
							renderValue={(selected) => (selected.length ? selected.join(", ") : "Todos")}
							sx={filterSx}
						>
							{AGE_BRACKETS.map((bracket) => (
								<MenuItem key={bracket.label} value={bracket.label}>
									<Checkbox checked={filters.idadeBrackets.includes(bracket.label)} sx={{ color: VIGIA.primary, "&.Mui-checked": { color: VIGIA.primary } }} />
									<ListItemText primary={bracket.label} primaryTypographyProps={{ sx: { fontFamily: ff.body, fontSize: 14 } }} />
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl size="small" sx={{ minWidth: 200, flex: "1 1 200px" }}>
						<InputLabel sx={filterLabelSx}>Local da Pesquisa</InputLabel>
						<Select
							value={filters.localPesquisa}
							label="Local da Pesquisa"
							onChange={handleSelectChange("localPesquisa")}
							sx={filterSx}
						>
							<MenuItem value={ALL_OPTION}>Todos</MenuItem>
							{localPesquisaOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl size="small" sx={{ minWidth: 160, flex: "1 1 160px" }}>
						<InputLabel sx={filterLabelSx}>Qual turno?</InputLabel>
						<Select value={filters.turno} label="Qual turno?" onChange={handleSelectChange("turno")} sx={filterSx}>
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

						<FormControl size="small" sx={{ minWidth: 220, flex: "1 1 220px" }}>
							<InputLabel sx={filterLabelSx}>Quantidade de dentes (CPO)</InputLabel>
							<Select
								multiple
								value={filters.quantidadeDentes}
								label="Quantidade de dentes (CPO)"
								onChange={handleMultiSelectChange("quantidadeDentes")}
								renderValue={(selected) => (selected.length ? `Removendo: ${selected.join(", ")}` : "Nenhum removido")}
								sx={filterSx}
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

						<FormControl size="small" sx={{ minWidth: 200, flex: "1 1 200px" }}>
							<InputLabel sx={filterLabelSx}>Idade (valor exato)</InputLabel>
							<Select
								multiple
								value={filters.idadeExata}
								label="Idade (valor exato)"
								onChange={handleMultiSelectChange("idadeExata")}
								renderValue={(selected) => (selected.length ? `Removendo: ${selected.join(", ")}` : "Nenhum removido")}
								sx={filterSx}
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

				{/* ── Planilha de dados ── */}
				<div style={{ marginBottom: 24 }}>
					<div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
						<button
							type="button"
							onClick={() => setShowTable((v) => !v)}
							style={{
								fontFamily: ff.body,
								fontSize: 13,
								fontWeight: 600,
								color: VIGIA.primary,
								backgroundColor: VIGIA.white,
								border: `1px solid ${VIGIA.border}`,
								borderRadius: 8,
								padding: "8px 14px",
								cursor: "pointer",
							}}
						>
							{showTable ? "Ocultar planilha de dados ▲" : "Ver dados em planilha ▼"} ({tableRows.length})
						</button>

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
						<p style={{ fontFamily: ff.body, fontSize: 12, color: "#a83232", margin: "8px 0 0", display: "flex", alignItems: "center", gap: 6 }}>
							<span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 2, backgroundColor: "#fbdada", border: "1px solid #e8a3a3" }} />
							Linhas em vermelho: excluídas pelos filtros de outliers acima — continuam aqui pra conferência, mas não
							entram nos gráficos/médias.
						</p>
					)}

					{showTable && (
						<Card style={{ marginTop: 12, padding: 0, overflow: "hidden" }}>
							<div style={{ overflow: "auto", maxHeight: 440 }}>
								<table style={{ width: "100%", borderCollapse: "collapse" }}>
									<thead>
										<tr>
											<th style={{ ...thStyle, position: "sticky", top: 0 }}></th>
											<th style={{ ...thStyle, position: "sticky", top: 0 }}>Município</th>
											<th style={{ ...thStyle, position: "sticky", top: 0 }}>Estabelecimento</th>
											<th style={{ ...thStyle, position: "sticky", top: 0 }}>Local da pesquisa</th>
											<th style={{ ...thStyle, position: "sticky", top: 0 }}>Turno</th>
											<th style={{ ...thStyle, position: "sticky", top: 0 }}>Idade</th>
											<th style={{ ...thStyle, position: "sticky", top: 0 }}>Dentes examinados</th>
											<th style={{ ...thStyle, position: "sticky", top: 0 }}>Cariado</th>
											<th style={{ ...thStyle, position: "sticky", top: 0 }}>Perdido</th>
											<th style={{ ...thStyle, position: "sticky", top: 0 }}>Restaurado</th>
											<th style={{ ...thStyle, position: "sticky", top: 0 }}>CPO (soma)</th>
											<th style={{ ...thStyle, position: "sticky", top: 0 }}>Classificação</th>
										</tr>
									</thead>
									<tbody>
										{tableRows.length ? (
											tableRows.map((row, i) => {
												const isOutlier = isOutlierExcluded(row, filters);
												const cellStyle: React.CSSProperties = isOutlier ? { ...tdStyle, color: "#a83232" } : tdStyle;
												return (
													<tr
														key={i}
														style={{ backgroundColor: isOutlier ? "#fbdada" : i % 2 === 0 ? VIGIA.white : VIGIA.bg }}
													>
														<td style={cellStyle}>
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
											<td style={cellStyle}>{displayValue(row["Nome do Município"])}</td>
											<td style={cellStyle}>{displayValue(row["Nome do Estabelecimento de saúde/instituição vinculada a pesquisa"])}</td>
											<td style={cellStyle}>{displayValue(row["Local da pesquisa"])}</td>
											<td style={cellStyle}>{displayValue(row["Qual turno?"])}</td>
											<td style={cellStyle}>{displayValue(row["Qual a sua idade?"])}</td>
											<td style={cellStyle}>{displayValue(row["Quantidade dentes CPO"])}</td>
											<td style={cellStyle}>{displayValue(row["Cariado"])}</td>
											<td style={cellStyle}>{displayValue(row["Perdido"])}</td>
											<td style={cellStyle}>{displayValue(row["Restaurado"])}</td>
											<td style={cellStyle}>{displayValue(row["Nota CPO valor sem calculo"])}</td>
											<td style={cellStyle}>{displayValue(row["Nota CPO definicao"])}</td>
													</tr>
												);
											})
										) : (
											<tr>
												<td style={{ ...tdStyle, whiteSpace: "normal" }} colSpan={12}>
													Sem registros para os filtros selecionados.
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</Card>
					)}
				</div>

				{/* ── Conteúdo ── */}
				<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
					<div style={{ flex: "2 1 560px", minWidth: 320 }}>
						<Card>
							<h2 style={{ fontFamily: ff.body, fontSize: 18, fontWeight: 700, color: VIGIA.text, textAlign: "center", margin: "0 0 4px" }}>
								CPO
							</h2>
							{summary.cpoPorBloco.length ? (
								<StackedCpoChart data={summary.cpoPorBloco} />
							) : (
								<p style={{ textAlign: "center", fontFamily: ff.body, color: VIGIA.muted, padding: "40px 0" }}>
									Sem dados de exame clínico para os filtros selecionados.
								</p>
							)}

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
								código (cariado, perdido/extraído, restaurado ou hígido). O valor de CPO mostrado aqui é a{" "}
								<strong>média, por respondente, da soma de dentes Cariados + Perdidos + Restaurados</strong> dentro de
								cada faixa etária — quanto maior, mais dentes afetados em média por pessoa. "Livre de cárie" = respondente
								com 0 dentes afetados. Esse cálculo replica exatamente o que o backend já faz (função{" "}
								<code>generateCPO</code> em <code>DataVigia.ts</code>), a partir dos dados retornados por{" "}
								<code>GET /data/vigia</code>.
							</Alert>
						</Card>
					</div>

					<div style={{ flex: "1 1 280px", minWidth: 260, display: "flex", flexDirection: "column", gap: 16 }}>
						<div style={{ display: "flex", gap: 16 }}>
							<div style={{ flex: 1 }}>
								<StatTile value={summary.totalRespondidos} label="Formulários respondidos" />
							</div>
							<div style={{ flex: 1 }}>
								<StatTile value={summary.livresDeCarie} label="Livres de Cárie" />
							</div>
						</div>

						<Card>
							<h2 style={{ fontFamily: ff.body, fontSize: 15, fontWeight: 700, color: VIGIA.text, textAlign: "center", margin: "0 0 8px" }}>
								Média geral CPO
							</h2>
							<CpoGauge value={summary.mediaCpo} max={summary.maxCpo} label="" />
						</Card>

						<Card>
							<h2 style={{ fontFamily: ff.body, fontSize: 15, fontWeight: 700, color: VIGIA.text, margin: "0 0 8px" }}>
								Livre de cárie
							</h2>
							{summary.livreDeCarieePorBloco.length ? (
								<CareFreeChart data={summary.livreDeCarieePorBloco} />
							) : (
								<p style={{ fontFamily: ff.body, color: VIGIA.muted, fontSize: 13 }}>Nenhum respondente livre de cárie neste filtro.</p>
							)}
						</Card>
					</div>
				</div>
			</div>
		</div>
		</div>
	);
}
