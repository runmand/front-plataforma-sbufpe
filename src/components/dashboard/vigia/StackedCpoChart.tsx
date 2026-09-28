import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";
import { CpoBracketPoint } from "./type";
import { VIGIA, ff } from "./colors";

type TPROPS = { data: CpoBracketPoint[] };

// Valores do CPO — no máximo 2 casas decimais.
const fmt = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Legenda na ordem visual da pilha, de cima pra baixo. */
const LEGEND = [
	{ label: "Cariados", color: VIGIA.cariados },
	{ label: "Restaurados", color: VIGIA.restaurados },
	{ label: "Perdidos", color: VIGIA.perdidos },
];

/** Luminância relativa (WCAG) de um hex — usada só pra escolher a tinta do rótulo. */
const luminance = (hex: string): number => {
	const channel = (i: number) => {
		const c = parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16) / 255;
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	};
	return 0.2126 * channel(0) + 0.7152 * channel(1) + 0.0722 * channel(2);
};

/**
 * Tinta do rótulo escrito DENTRO do segmento, escolhida pelo contraste real com o preenchimento
 * dele. Branco fixo não serve: sobre o verde (#1baf7a) e o laranja o texto branco fica em ~2,5:1
 * e quase desaparece.
 */
const labelInkOn = (fill: string): string => {
	const l = luminance(fill);
	return 1.05 / (l + 0.05) >= (l + 0.05) / (luminance(VIGIA.text) + 0.05) ? VIGIA.white : VIGIA.text;
};

/** Altura mínima do segmento pra caber o rótulo de 11px com folga. */
const MIN_LABEL_HEIGHT = 17;

/**
 * Rótulo dentro do segmento. Só desenha quando o segmento é alto o suficiente pra conter o
 * texto: antes ele era desenhado sempre, então num segmento fininho (0,17 / 0,26) o número
 * vazava por cima do vizinho e chegava a ser cortado pela linha do eixo. O valor dessas fatias
 * continua acessível no tooltip, e o total de cada barra segue escrito acima dela.
 */
const makeSegmentLabel = (fill: string) => (props: any) => {
	const { x, y, width, height, value } = props;
	if (!value || height < MIN_LABEL_HEIGHT) return null;

	return (
		<text
			x={x + width / 2}
			y={y + height / 2}
			textAnchor="middle"
			dominantBaseline="middle"
			fill={labelInkOn(fill)}
			fontSize={11}
			fontFamily={ff.body}
			fontWeight={600}
		>
			{fmt(value)}
		</text>
	);
};

const makeTotalLabel = (data: CpoBracketPoint[]) => (props: any) => {
	const { x, y, width, index } = props;
	const point = data[index];
	if (!point) return null;

	return (
		<text x={x + width / 2} y={y - 8} textAnchor="middle" fill={VIGIA.text} fontSize={13} fontFamily={ff.body} fontWeight={700}>
			{fmt(point.total)}
		</text>
	);
};

const CustomTooltip = ({ active, payload, label }: any) => {
	if (!active || !payload?.length) return null;

	return (
		<div style={{ background: VIGIA.white, border: `1px solid ${VIGIA.border}`, borderRadius: 8, padding: "8px 12px", fontFamily: ff.body, fontSize: 13 }}>
			<p style={{ margin: "0 0 4px", fontWeight: 700, color: VIGIA.text }}>{label}</p>
			{payload
				.slice()
				.reverse()
				.map((entry: any) => (
					<p key={entry.dataKey} style={{ margin: 0, color: entry.color }}>
						{entry.name}: {fmt(entry.value)}
					</p>
				))}
		</div>
	);
};

export default function StackedCpoChart(props: TPROPS) {
	return (
		<ResponsiveContainer width="100%" height={360}>
			<BarChart data={props.data} margin={{ top: 28, right: 16, left: 0, bottom: 8 }}>
				<CartesianGrid vertical={false} stroke={VIGIA.border} />
				<XAxis
					dataKey="label"
					tick={{ fontFamily: ff.body, fontSize: 12, fill: VIGIA.muted }}
					axisLine={{ stroke: VIGIA.border }}
					tickLine={false}
				/>
				<YAxis tick={{ fontFamily: ff.body, fontSize: 12, fill: VIGIA.muted }} axisLine={false} tickLine={false} />
				<Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
				{/* Legenda na ordem em que os segmentos aparecem na barra, de cima pra baixo — a mesma
				    do tooltip. Antes ela vinha na ordem de declaração das <Bar> (de baixo pra cima),
				    o inverso do tooltip, que já inverte o payload. */}
				<Legend
					payload={LEGEND.map((item) => ({ value: item.label, type: "circle", color: item.color, id: item.label }))}
					formatter={(value) => <span style={{ fontFamily: ff.body, fontSize: 13, color: VIGIA.text }}>{value}</span>}
					iconType="circle"
				/>
				{/* `stroke` da cor da superfície dá o respiro de 2px entre os segmentos empilhados —
				    antes os blocos se tocavam direto. `maxBarSize` evita que em tela larga as barras
				    virem lajes: marca fina lê melhor que bloco saturado. */}
				<Bar
					dataKey="perdidos"
					name="Perdidos"
					stackId="cpo"
					fill={VIGIA.perdidos}
					stroke={VIGIA.white}
					strokeWidth={2}
					maxBarSize={56}
					isAnimationActive={false}
				>
					<LabelList dataKey="perdidos" content={makeSegmentLabel(VIGIA.perdidos)} />
				</Bar>
				<Bar
					dataKey="restaurados"
					name="Restaurados"
					stackId="cpo"
					fill={VIGIA.restaurados}
					stroke={VIGIA.white}
					strokeWidth={2}
					maxBarSize={56}
					isAnimationActive={false}
				>
					<LabelList dataKey="restaurados" content={makeSegmentLabel(VIGIA.restaurados)} />
				</Bar>
				<Bar
					dataKey="cariados"
					name="Cariados"
					stackId="cpo"
					fill={VIGIA.cariados}
					stroke={VIGIA.white}
					strokeWidth={2}
					maxBarSize={56}
					isAnimationActive={false}
				>
					<LabelList dataKey="cariados" content={makeSegmentLabel(VIGIA.cariados)} />
					<LabelList dataKey="cariados" content={makeTotalLabel(props.data)} />
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}
