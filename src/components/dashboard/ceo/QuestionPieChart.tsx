import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { QuestionChoiceCount } from "./type";
import { CEO, expandCategorical, ff } from "./colors";

type TPROPS = {
	data: QuestionChoiceCount[];
	/**
	 * As fatias já vêm na ordem certa (uma escala: tempo, idade…) e devem ficar nessa ordem, pra a
	 * pizza ler como uma progressão. Sem isso, ordena da maior fatia pra menor, que é a leitura
	 * padrão quando as opções não têm ordem natural.
	 */
	ordered?: boolean;
};

/** Abaixo disso a fatia é fina demais pra caber um rótulo dentro dela sem colidir com a vizinha. */
const MIN_LABEL_PERCENT = 5;

const fmtPercent = (v: number) => `${v.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 1 })}%`;
const fmtInt = (v: number) => v.toLocaleString("pt-BR");

/** Luminância relativa (WCAG) de um hex — usada só pra escolher a tinta do rótulo. */
const luminance = (hex: string): number => {
	const channel = (i: number) => {
		const c = parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16) / 255;
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	};
	return 0.2126 * channel(0) + 0.7152 * channel(1) + 0.0722 * channel(2);
};

/**
 * Tinta do rótulo escrito DENTRO da fatia, escolhida pelo contraste real contra o preenchimento
 * dela. Branco fixo não serve: nos passos claros da rampa ordinal (e no amarelo/aqua da paleta
 * categórica) o texto branco fica em ~2:1 e some. Escolhe entre a tinta clara e a escura a que
 * tiver mais contraste com a fatia.
 */
const labelInkOn = (fill: string): string => {
	const l = luminance(fill);
	const withWhite = 1.05 / (l + 0.05);
	const withDark = (l + 0.05) / (luminance(CEO.text) + 0.05);
	return withWhite >= withDark ? CEO.white : CEO.text;
};

/**
 * Todas as opções entram — nenhuma é agrupada, escondida ou virada "Outros". Quando a pergunta
 * tem ordem natural (`ordered`), a ordem que veio é a da escala e se mantém; senão, ordena da
 * maior fatia pra menor.
 */
const prepareSlices = (data: QuestionChoiceCount[], ordered: boolean): QuestionChoiceCount[] =>
	ordered ? data : [...data].sort((a, b) => b.count - a.count);

const CustomTooltip = ({ active, payload }: any) => {
	if (!active || !payload?.length) return null;
	const point: QuestionChoiceCount = payload[0].payload;

	return (
		<div style={{ background: CEO.white, border: `1px solid ${CEO.border}`, borderRadius: 8, padding: "8px 12px", fontFamily: ff.body, fontSize: 13 }}>
			<p style={{ margin: "0 0 4px", fontWeight: 700, color: CEO.text, maxWidth: 240 }}>{point.title}</p>
			<p style={{ margin: 0, color: CEO.primary }}>
				{fmtInt(point.count)} resposta{point.count !== 1 ? "s" : ""} ({fmtPercent(point.percent)})
			</p>
		</div>
	);
};

/**
 * Distribuição de respostas de UMA pergunta de escolha, em pizza.
 *
 * A legenda é montada aqui do lado do gráfico, não com o <Legend> do recharts: o componente do
 * recharts posiciona a legenda em absoluto DENTRO da altura do gráfico, então com muitas opções a
 * lista vazava pra fora do card e ficava por cima do conteúdo das perguntas vizinhas (era o que
 * fazia os selos "Múltipla escolha"/"Escolha única" aparecerem escritos por cima da legenda).
 * Como div irmã, ela ocupa espaço de verdade no fluxo, se distribui em colunas e nunca invade o
 * que está em volta.
 */
export default function QuestionPieChart(props: TPROPS) {
	const ordered = !!props.ordered;
	const slices = prepareSlices(props.data, ordered);
	const palette = expandCategorical(slices.length);
	const colorAt = (i: number) => palette[i];

	// A % de cada fatia sai daqui, do dado, e não do prop `percent` que o recharts passa pro
	// rótulo: o recharts espalha os campos do próprio dado nas props do label, e como
	// QuestionChoiceCount TEM um campo chamado `percent` (já em 0–100), ele sobrescrevia a fração
	// 0–1 do recharts. O `* 100` que vinha depois virava 18,4 → "1.840%", e o corte de fatia
	// pequena (`percent < 0.05`, pensado pra fração) passava a significar "menos de 0,05%", ou
	// seja, nunca cortava nada e todas as fatias finas ganhavam rótulo sobreposto.
	const renderLabel = (labelProps: any) => {
		const slice = slices[labelProps.index];
		if (!slice || slice.percent < MIN_LABEL_PERCENT) return null;

		const RADIAN = Math.PI / 180;
		const { cx, cy, midAngle, innerRadius, outerRadius } = labelProps;
		const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill={labelInkOn(colorAt(labelProps.index))}
				textAnchor="middle"
				dominantBaseline="middle"
				fontFamily={ff.body}
				fontSize={11}
				fontWeight={700}
			>
				{fmtPercent(slice.percent)}
			</text>
		);
	};

	return (
		<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
			<div style={{ flex: "1 1 260px", minWidth: 240 }}>
				<ResponsiveContainer width="100%" height={260}>
					<PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
						<Pie
							data={slices}
							dataKey="count"
							nameKey="title"
							cx="50%"
							cy="50%"
							outerRadius={95}
							isAnimationActive={false}
							stroke={CEO.white}
							strokeWidth={2}
							label={renderLabel}
							labelLine={false}
						>
							{slices.map((slice, i) => (
								<Cell key={slice.title} fill={colorAt(i)} />
							))}
						</Pie>
						<Tooltip content={<CustomTooltip />} />
					</PieChart>
				</ResponsiveContainer>
			</div>

			{/* Legenda: identidade da fatia + o valor, pra TODAS as opções. Só as fatias grandes
			    cabem um rótulo dentro delas, e o tooltip não pode ser o único jeito de ler um
			    número — então a contagem e a % de cada opção ficam aqui. Em grade de colunas
			    automáticas: com muitas opções ela se distribui em várias colunas curtas em vez de
			    virar uma lista comprida. */}
			<ul
				style={{
					flex: "2 1 320px",
					minWidth: 260,
					listStyle: "none",
					margin: 0,
					padding: 0,
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))",
					columnGap: 14,
					rowGap: 6,
					alignContent: "center",
				}}
			>
				{slices.map((slice, i) => (
					<li key={slice.title} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontFamily: ff.body, fontSize: 12, lineHeight: 1.35 }}>
						<span
							style={{
								width: 10,
								height: 10,
								borderRadius: 3,
								backgroundColor: colorAt(i),
								flexShrink: 0,
								marginTop: 3,
							}}
						/>
						<span style={{ color: CEO.text }}>
							{slice.title}
							<span style={{ color: CEO.muted, whiteSpace: "nowrap" }}>
								{" "}
								— {fmtInt(slice.count)} ({fmtPercent(slice.percent)})
							</span>
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
