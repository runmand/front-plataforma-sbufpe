'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { CircularProgress, Fab, Slider, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useSnackbar } from "notistack";
import CeoDashboardService from "./service";
import { CeoApiResponse, CeoFilterState, DEFAULT_CEO_FILTERS, QuestionSummary } from "./type";
import { filterSubmissionsByDate, getSubmissionDateBounds, ymdToTime, timeToYmd, summarize, buildAgeHistogram, QUESTION_TYPE_LABEL } from "./utils";
import { CEO, ff } from "./colors";
import QuestionBarChart from "./QuestionBarChart";
import QuestionPieChart from "./QuestionPieChart";
import QuestionHistogramChart from "./QuestionHistogramChart";

/**
 * Perguntas específicas com um tipo de gráfico diferente do padrão (barra), pedidas explicitamente
 * pelo usuário a partir do título exato como aparece renderizado no dashboard. Comparação por
 * ".includes()" (mesma convenção já usada pro id do droplist em components/question/index.tsx) —
 * não temos o título completo/id exato de antemão, só o trecho que o usuário viu na tela.
 */
const PIE_CHART_QUESTIONS = ["Há quanto tempo você trabalha neste estabelecimento de saúde"];
const HISTOGRAM_QUESTIONS = ["Qual a sua idade"]; // "Qual a sua idade (ou da criança/adolescente) em anos completos?"

const isPieChartQuestion = (title: string) => PIE_CHART_QUESTIONS.some((t) => title.includes(t));
const isHistogramQuestion = (title: string) => HISTOGRAM_QUESTIONS.some((t) => title.includes(t));

const ceoDashboardService = new CeoDashboardService();

const Card = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
	<div
		style={{
			backgroundColor: CEO.white,
			border: `1px solid ${CEO.border}`,
			borderRadius: 16,
			padding: "20px 24px",
			...style,
		}}
	>
		{children}
	</div>
);

const StatTile = ({ value, label }: { value: number | string; label: string }) => (
	<Card style={{ textAlign: "center" }}>
		<span style={{ fontFamily: ff.body, fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: CEO.primary, lineHeight: 1 }}>
			{value}
		</span>
		<p style={{ fontFamily: ff.body, fontSize: 14, color: CEO.muted, margin: "8px 0 0" }}>{label}</p>
	</Card>
);

const fmtInt = (v: number) => v.toLocaleString("pt-BR");

const displayValue = (value: string | number | undefined): string => {
	const text = value === undefined || value === null ? "" : String(value).trim();
	return text === "" ? "—" : text;
};

const thStyle: React.CSSProperties = {
	textAlign: "left",
	padding: "8px 12px",
	borderBottom: `2px solid ${CEO.border}`,
	fontFamily: ff.body,
	fontWeight: 700,
	fontSize: 12,
	color: CEO.text,
	whiteSpace: "nowrap",
	backgroundColor: CEO.bg,
};

const tdStyle: React.CSSProperties = {
	padding: "6px 12px",
	borderBottom: `1px solid ${CEO.border}`,
	fontFamily: ff.body,
	fontSize: 12,
	color: CEO.text,
	whiteSpace: "nowrap",
};

/** Lista de respostas de texto livre de uma pergunta sem choices — só mostra as 3 primeiras, com "ver todas". */
const OpenAnswersList = ({ answers }: { answers: string[] }) => {
	const [expanded, setExpanded] = useState(false);

	if (answers.length === 0) {
		return <p style={{ fontFamily: ff.body, fontSize: 13, color: CEO.muted, margin: "6px 0 0" }}>Sem respostas para os filtros atuais.</p>;
	}

	const shown = expanded ? answers : answers.slice(0, 3);

	return (
		<div style={{ marginTop: 8 }}>
			<ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 4 }}>
				{shown.map((a, i) => (
					<li key={i} style={{ fontFamily: ff.body, fontSize: 13, color: CEO.text }}>
						{a}
					</li>
				))}
			</ul>
			{answers.length > 3 && (
				<button
					type="button"
					onClick={() => setExpanded((v) => !v)}
					style={{
						marginTop: 6,
						fontFamily: ff.body,
						fontSize: 12,
						color: CEO.primary,
						background: "none",
						border: "none",
						padding: 0,
						cursor: "pointer",
						textDecoration: "underline",
					}}
				>
					{expanded ? "ver menos" : `ver todas (${fmtInt(answers.length)})`}
				</button>
			)}
		</div>
	);
};

const QuestionBlock = ({ q }: { q: QuestionSummary }) => (
	<div style={{ padding: "14px 0", borderBottom: `1px solid ${CEO.border}` }}>
		<div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
			<p style={{ fontFamily: ff.body, fontSize: 14, fontWeight: 700, color: CEO.text, margin: 0, maxWidth: 560 }}>{q.title}</p>
			<span
				style={{
					fontFamily: ff.body,
					fontSize: 11,
					fontWeight: 600,
					color: CEO.secondary,
					backgroundColor: CEO.singleTrack,
					padding: "2px 8px",
					borderRadius: 999,
					whiteSpace: "nowrap",
				}}
			>
				{QUESTION_TYPE_LABEL[q.typeCod] ?? q.typeCod}
			</span>
		</div>
		<p style={{ fontFamily: ff.body, fontSize: 12, color: CEO.muted, margin: "2px 0 0" }}>
			{fmtInt(q.totalAnswered)} resposta{q.totalAnswered !== 1 ? "s" : ""}
		</p>

		{isHistogramQuestion(q.title) ? (
			// Pergunta de idade: vem como resposta aberta (sem choices cadastrados), mas número é melhor
			// visualizado como histograma por faixa de anos do que como lista crua de respostas.
			(() => {
				const bins = buildAgeHistogram(q.openAnswers);
				return bins.length > 0 ? (
					<div style={{ marginTop: 8 }}>
						<QuestionHistogramChart data={bins} />
					</div>
				) : (
					<p style={{ fontFamily: ff.body, fontSize: 13, color: CEO.muted, margin: "6px 0 0" }}>Sem respostas para os filtros atuais.</p>
				);
			})()
		) : q.choices.length > 0 ? (
			q.totalAnswered > 0 ? (
				<div style={{ marginTop: 8 }}>
					{/* Só mostra as opções que de fato tiveram resposta — perguntas com listas grandes de
					    opção (ex: "Nome do CEO/SESB", um seletor de estabelecimento) ficam com dezenas de
					    opções em 0%, que só atrapalham o gráfico sem agregar informação. */}
					{isPieChartQuestion(q.title) ? (
						<QuestionPieChart data={q.choices.filter((c) => c.count > 0)} />
					) : (
						<QuestionBarChart data={q.choices.filter((c) => c.count > 0)} />
					)}
				</div>
			) : (
				<p style={{ fontFamily: ff.body, fontSize: 13, color: CEO.muted, margin: "6px 0 0" }}>Sem respostas para os filtros atuais.</p>
			)
		) : (
			<OpenAnswersList answers={q.openAnswers} />
		)}
	</div>
);

export default function CeoDashboard() {
	const [raw, setRaw] = useState<CeoApiResponse | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const [showTable, setShowTable] = useState<boolean>(false);
	const [filters, setFilters] = useState<CeoFilterState>(DEFAULT_CEO_FILTERS);
	const { enqueueSnackbar } = useSnackbar();

	// `isRefresh` só diferencia a mensagem/UI: no clique manual (botão flutuante) avisa que atualizou
	// e usa o estado `refreshing` (spinner só no botão) em vez do spinner de página inteira do `loading`.
	const fetchData = useCallback(
		(isRefresh: boolean) => {
			if (isRefresh) setRefreshing(true);
			ceoDashboardService
				.getCeoData()
				.then((data) => {
					setRaw(data);
					if (isRefresh) enqueueSnackbar("Dados atualizados.", { variant: "success" });
				})
				.catch((e) => {
					console.error(e);
					enqueueSnackbar("Não foi possível carregar os dados do formulário de CEO.", { variant: "error" });
				})
				.finally(() => {
					setLoading(false);
					if (isRefresh) setRefreshing(false);
				});
		},
		[enqueueSnackbar]
	);

	useEffect(() => {
		fetchData(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Menor/maior data de submissão — o slider de período nasce cobrindo do primeiro ao último
	// formulário respondido (100% dos dados), em vez de começar vazio/sem seleção.
	const dateBounds = useMemo(() => getSubmissionDateBounds(raw?.answer ?? []), [raw]);

	useEffect(() => {
		if (dateBounds) setFilters({ dateFrom: dateBounds.min, dateTo: dateBounds.max });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dateBounds?.min, dateBounds?.max]);

	const totalUnfiltered = raw?.answer?.length ?? 0;
	const hasDateFilter = !!(dateBounds && (filters.dateFrom !== dateBounds.min || filters.dateTo !== dateBounds.max));

	// Só refiltra/resume quando os dados crus ou o filtro de data mudam — filtro vazio devolve tudo.
	const summary = useMemo(() => {
		if (!raw) return null;
		const filteredAnswers = filterSubmissionsByDate(raw.answer ?? [], filters);
		return summarize({ data: raw.data, answer: filteredAnswers });
	}, [raw, filters]);

	if (loading) {
		return (
			<div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
				<CircularProgress sx={{ color: CEO.primary }} />
			</div>
		);
	}

	if (!summary) {
		return (
			<div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
				<p style={{ fontFamily: ff.body, color: CEO.muted }}>Não foi possível carregar os dados deste formulário.</p>
			</div>
		);
	}

	return (
		<div style={{ minHeight: "60vh", backgroundColor: CEO.bg, paddingTop: 96 }}>
			{/* ── Header ── */}
			<div style={{ backgroundColor: CEO.white, borderBottom: `1px solid ${CEO.border}`, padding: "48px 24px 36px" }}>
				<div style={{ maxWidth: 1280, margin: "0 auto" }}>
					<div
						style={{
							display: "inline-block",
							width: 48,
							height: 3,
							background: `linear-gradient(90deg, ${CEO.primary}, ${CEO.secondary})`,
							borderRadius: 2,
							marginBottom: 18,
						}}
					/>
					<h1
						style={{
							fontFamily: ff.display,
							fontSize: "clamp(28px, 3.4vw, 40px)",
							fontWeight: 700,
							color: CEO.primary,
							margin: "0 0 10px",
							letterSpacing: "-0.01em",
							lineHeight: 1.15,
						}}
					>
						Dashboard — {summary.formTitle || "Formulário de CEO"}
					</h1>
					<p style={{ fontFamily: ff.body, fontSize: 15, color: CEO.muted, margin: 0, lineHeight: 1.6 }}>
						Distribuição das respostas do formulário, por pergunta, direto da rota de leitura de dados (GET
						/data/form/1).
					</p>
				</div>
			</div>

			<div style={{ padding: "28px 24px 80px" }}>
				<div style={{ maxWidth: 1280, margin: "0 auto" }}>
					{/* ── Total de respostas + filtro de período (mesma linha, mesmo estilo de card) ── */}
					<div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 24, alignItems: "stretch" }}>
						<div style={{ flex: "1 1 220px", maxWidth: 320 }}>
							<StatTile
								value={fmtInt(summary.totalResponses)}
								label={hasDateFilter ? `Formulários respondidos (de ${fmtInt(totalUnfiltered)} no total)` : "Formulários respondidos"}
							/>
						</div>
						<div style={{ flex: "2 1 360px" }}>
							<Card style={{ height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center" }}>
								{dateBounds && dateBounds.min !== dateBounds.max ? (
									<>
										<div style={{ position: "relative", textAlign: "center" }}>
											<p style={{ fontFamily: ff.body, fontSize: 14, fontWeight: 600, color: CEO.muted, margin: 0 }}>
												Selecione o período
											</p>
											{hasDateFilter && (
												<button
													type="button"
													onClick={() => setFilters({ dateFrom: dateBounds.min, dateTo: dateBounds.max })}
													style={{
														position: "absolute",
														right: 0,
														top: 0,
														fontFamily: ff.body,
														fontSize: 13,
														color: CEO.primary,
														background: "none",
														border: "none",
														padding: 0,
														cursor: "pointer",
														textDecoration: "underline",
													}}
												>
													limpar filtro de data
												</button>
											)}
										</div>
										{/* Slider de intervalo (2 alças) — arrasta pra restringir o período, em vez dos dois campos de data separados. */}
										<div style={{ marginTop: 14, padding: "0 6px" }}>
											<Slider
												value={[ymdToTime(filters.dateFrom || dateBounds.min), ymdToTime(filters.dateTo || dateBounds.max)]}
												min={ymdToTime(dateBounds.min)}
												max={ymdToTime(dateBounds.max)}
												step={24 * 60 * 60 * 1000}
												disableSwap
												onChange={(_, value) => {
													const [from, to] = value as number[];
													setFilters({ dateFrom: timeToYmd(from), dateTo: timeToYmd(to) });
												}}
												valueLabelDisplay="on"
												valueLabelFormat={(v) => new Date(v).toLocaleDateString("pt-BR")}
												sx={{
													color: CEO.primary,
													"& .MuiSlider-thumb": { width: 16, height: 16 },
													"& .MuiSlider-valueLabel": { fontFamily: ff.body, fontSize: 11, backgroundColor: CEO.primary },
												}}
											/>
										</div>
									</>
								) : (
									<p style={{ fontFamily: ff.body, fontSize: 14, color: CEO.muted, margin: 0 }}>
										{dateBounds
											? `Todos os formulários foram respondidos em ${new Date(ymdToTime(dateBounds.min)).toLocaleDateString("pt-BR")}.`
											: "Sem dados de data disponíveis."}
									</p>
								)}
							</Card>
						</div>
					</div>

					{/* ── Planilha de dados ── */}
					<div style={{ marginBottom: 24 }}>
						<button
							type="button"
							onClick={() => setShowTable((v) => !v)}
							style={{
								fontFamily: ff.body,
								fontSize: 13,
								fontWeight: 600,
								color: CEO.primary,
								backgroundColor: CEO.white,
								border: `1px solid ${CEO.border}`,
								borderRadius: 8,
								padding: "8px 14px",
								cursor: "pointer",
							}}
						>
							{showTable ? "Ocultar planilha de dados ▲" : "Ver dados em planilha ▼"} ({fmtInt(summary.totalResponses)})
						</button>

						{showTable && (
							<Card style={{ marginTop: 12, padding: 0, overflow: "hidden" }}>
								<div style={{ overflow: "auto", maxHeight: 440 }}>
									<table style={{ width: "100%", borderCollapse: "collapse" }}>
										<thead>
											<tr>
												<th style={{ ...thStyle, position: "sticky", top: 0 }}>#</th>
												<th style={{ ...thStyle, position: "sticky", top: 0 }}>Data</th>
												{summary.questionTitlesInOrder.map((title) => (
													<th key={title} style={{ ...thStyle, position: "sticky", top: 0 }}>
														{title}
													</th>
												))}
											</tr>
										</thead>
										<tbody>
											{summary.tableRows.length ? (
												summary.tableRows.map((row, i) => (
													<tr key={i} style={{ backgroundColor: i % 2 === 0 ? CEO.white : CEO.bg }}>
														<td style={tdStyle}>{row.__submissionIndex}</td>
														<td style={tdStyle}>{displayValue(new Date(row.__date).toLocaleDateString("pt-BR"))}</td>
														{summary.questionTitlesInOrder.map((title) => (
															<td key={title} style={tdStyle}>
																{displayValue(row[title] as string)}
															</td>
														))}
													</tr>
												))
											) : (
												<tr>
													<td style={{ ...tdStyle, whiteSpace: "normal" }} colSpan={summary.questionTitlesInOrder.length + 2}>
														Sem registros.
													</td>
												</tr>
											)}
										</tbody>
									</table>
								</div>
							</Card>
						)}
					</div>

					{/* ── Perguntas, agrupadas por domínio/bloco ── */}
					<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
						{summary.domains.map((domain) => (
							<Card key={domain.cod}>
								<h2 style={{ fontFamily: ff.body, fontSize: 16, fontWeight: 700, color: CEO.primary, margin: "0 0 4px" }}>
									{domain.name}
								</h2>
								<div>
									{domain.questions.map((q) => (
										<QuestionBlock key={q.formQuestionFormRegisterId} q={q} />
									))}
								</div>
							</Card>
						))}
					</div>
				</div>
			</div>

				{/* ── Botão flutuante pra atualizar os dados sem recarregar a página ── */}
				<Tooltip title="Atualizar dados" placement="left">
					<span style={{ position: "fixed", bottom: 32, right: 32, zIndex: 20 }}>
						<Fab
							onClick={() => fetchData(true)}
							disabled={refreshing}
							sx={{
								backgroundColor: CEO.primary,
								color: CEO.white,
								"&:hover": { backgroundColor: CEO.secondary },
								"&.Mui-disabled": { backgroundColor: CEO.singleTrack, color: CEO.primary },
							}}
						>
							{refreshing ? <CircularProgress size={22} sx={{ color: CEO.primary }} /> : <RefreshIcon />}
						</Fab>
					</span>
				</Tooltip>
		</div>
	);
}
