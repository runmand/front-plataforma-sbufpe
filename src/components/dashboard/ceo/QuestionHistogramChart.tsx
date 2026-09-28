import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { HistogramBin } from "./type";
import { CEO, ff } from "./colors";

type TPROPS = { data: HistogramBin[] };

const CustomTooltip = ({ active, payload }: any) => {
	if (!active || !payload?.length) return null;
	const point: HistogramBin = payload[0].payload;

	return (
		<div style={{ background: CEO.white, border: `1px solid ${CEO.border}`, borderRadius: 8, padding: "8px 12px", fontFamily: ff.body, fontSize: 13 }}>
			<p style={{ margin: 0, fontWeight: 700, color: CEO.text }}>{point.label} anos</p>
			<p style={{ margin: 0, color: CEO.primary }}>
				{point.count} pessoa{point.count !== 1 ? "s" : ""}
			</p>
		</div>
	);
};

/**
 * Histograma de uma resposta numérica em texto livre (ex: "Qual a sua idade... em anos completos?"),
 * agrupada em faixas de anos (ver buildAgeHistogram em utils.ts) — mais legível que a lista crua de
 * números que o OpenAnswersList mostraria pra uma pergunta de resposta aberta comum.
 */
export default function QuestionHistogramChart(props: TPROPS) {
	return (
		<ResponsiveContainer width="100%" height={220}>
			<BarChart data={props.data} margin={{ top: 20, right: 8, left: 0, bottom: 8 }}>
				<CartesianGrid vertical={false} stroke={CEO.border} />
				<XAxis
					dataKey="label"
					tick={{ fontFamily: ff.body, fontSize: 11, fill: CEO.muted }}
					axisLine={{ stroke: CEO.border }}
					tickLine={false}
					label={{ value: "Idade (anos)", position: "insideBottom", offset: -4, fontFamily: ff.body, fontSize: 11, fill: CEO.muted }}
				/>
				<YAxis allowDecimals={false} tick={{ fontFamily: ff.body, fontSize: 11, fill: CEO.muted }} axisLine={false} tickLine={false} />
				<Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
				<Bar dataKey="count" fill={CEO.single} radius={[4, 4, 0, 0]} barSize={28} isAnimationActive={false}>
					<LabelList dataKey="count" position="top" style={{ fontFamily: ff.body, fontSize: 11, fill: CEO.text, fontWeight: 600 }} />
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}
