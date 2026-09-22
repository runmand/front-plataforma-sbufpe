import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { QuestionChoiceCount } from "./type";
import { CEO, ff } from "./colors";
import { truncateLabel } from "./utils";

type TPROPS = { data: QuestionChoiceCount[] };

const fmtPercent = (v: number) => `${v.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 1 })}%`;

/**
 * Tick customizado do eixo Y: título completo da opção no tooltip do <title> nativo do SVG, mas o
 * texto renderizado é truncado (truncateLabel) — sem isso, uma opção com título longo (ex: "Sim, e
 * eu conheço o nome dele/dela") estoura a largura fixa da coluna do eixo (width=170) porque <text>
 * do SVG não quebra linha nem trunca sozinho, e o texto acaba vazando por cima do gráfico.
 */
const CategoryTick = (props: any) => {
	const { x, y, payload } = props;
	return (
		<text x={x} y={y} dy={4} textAnchor="end" fontFamily={ff.body} fontSize={12} fill={CEO.text}>
			<title>{payload.value}</title>
			{truncateLabel(payload.value)}
		</text>
	);
};

const CustomTooltip = ({ active, payload }: any) => {
	if (!active || !payload?.length) return null;
	const point: QuestionChoiceCount = payload[0].payload;

	return (
		<div style={{ background: CEO.white, border: `1px solid ${CEO.border}`, borderRadius: 8, padding: "8px 12px", fontFamily: ff.body, fontSize: 13 }}>
			<p style={{ margin: "0 0 4px", fontWeight: 700, color: CEO.text, maxWidth: 240 }}>{point.title}</p>
			<p style={{ margin: 0, color: CEO.primary }}>
				{point.count} resposta{point.count !== 1 ? "s" : ""} ({fmtPercent(point.percent)})
			</p>
		</div>
	);
};

/** Distribuição de respostas de UMA pergunta de escolha — barra horizontal, 1 série só (magnitude, não identidade). */
export default function QuestionBarChart(props: TPROPS) {
	const height = Math.max(90, props.data.length * 34 + 20);

	return (
		<ResponsiveContainer width="100%" height={height}>
			<BarChart data={props.data} layout="vertical" margin={{ top: 4, right: 44, left: 8, bottom: 4 }}>
				<CartesianGrid horizontal={false} stroke={CEO.border} />
				<XAxis type="number" allowDecimals={false} hide />
				<YAxis type="category" dataKey="title" width={170} tick={<CategoryTick />} axisLine={false} tickLine={false} />
				<Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
				<Bar dataKey="percent" fill={CEO.single} radius={[0, 4, 4, 0]} barSize={16} isAnimationActive={false}>
					<LabelList
						dataKey="percent"
						position="right"
						formatter={(v: number) => fmtPercent(v)}
						style={{ fontFamily: ff.body, fontSize: 11, fill: CEO.muted, fontWeight: 600 }}
					/>
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}
