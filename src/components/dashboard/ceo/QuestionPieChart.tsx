import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { QuestionChoiceCount } from "./type";
import { CATEGORICAL, CEO, ff } from "./colors";

type TPROPS = { data: QuestionChoiceCount[] };

const fmtPercent = (v: number) => `${v.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 1 })}%`;

const renderLabel = (props: any) => {
	const { percent, cx, cy, midAngle, innerRadius, outerRadius } = props;
	if (percent < 0.05) return null;
	const RADIAN = Math.PI / 180;
	const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);
	return (
		<text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="middle" fontFamily={ff.body} fontSize={11} fontWeight={700}>
			{fmtPercent(percent * 100)}
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

/**
 * Distribuição de respostas de UMA pergunta de escolha, em pizza — usado só onde faz sentido ver a
 * proporção entre categorias de uma vez só (poucas opções, ex: tempo de trabalho no estabelecimento).
 * Diferente do gráfico de barra (magnitude de 1 série), aqui várias fatias aparecem juntas ao mesmo
 * tempo = identidade, por isso usa a paleta categórica (CATEGORICAL) em vez do hue único do CEO.single.
 */
export default function QuestionPieChart(props: TPROPS) {
	return (
		<ResponsiveContainer width="100%" height={280}>
			<PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
				<Pie
					data={props.data}
					dataKey="count"
					nameKey="title"
					cx="50%"
					cy="50%"
					outerRadius={90}
					isAnimationActive={false}
					stroke={CEO.white}
					strokeWidth={2}
					label={renderLabel}
					labelLine={false}
				>
					{props.data.map((entry, i) => (
						<Cell key={entry.title} fill={CATEGORICAL[i % CATEGORICAL.length]} />
					))}
				</Pie>
				<Tooltip content={<CustomTooltip />} />
				<Legend
					layout="vertical"
					align="right"
					verticalAlign="middle"
					formatter={(value) => <span style={{ fontFamily: ff.body, fontSize: 12, color: CEO.text }}>{value}</span>}
				/>
			</PieChart>
		</ResponsiveContainer>
	);
}
