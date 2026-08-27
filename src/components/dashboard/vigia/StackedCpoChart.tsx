import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";
import { CpoBracketPoint } from "./type";
import { VIGIA, ff } from "./colors";

type TPROPS = { data: CpoBracketPoint[] };

const fmt = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const SegmentLabel = (props: any) => {
	const { x, y, width, height, value } = props;
	if (!value) return null;

	return (
		<text
			x={x + width / 2}
			y={y + height / 2}
			textAnchor="middle"
			dominantBaseline="middle"
			fill="#fff"
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
				<Legend
					formatter={(value) => <span style={{ fontFamily: ff.body, fontSize: 13, color: VIGIA.text }}>{value}</span>}
					iconType="circle"
				/>
				<Bar dataKey="perdidos" name="Perdidos" stackId="cpo" fill={VIGIA.perdidos} isAnimationActive={false}>
					<LabelList dataKey="perdidos" content={SegmentLabel} />
				</Bar>
				<Bar dataKey="restaurados" name="Restaurado" stackId="cpo" fill={VIGIA.restaurados} isAnimationActive={false}>
					<LabelList dataKey="restaurados" content={SegmentLabel} />
				</Bar>
				<Bar dataKey="cariados" name="Cariados" stackId="cpo" fill={VIGIA.cariados} isAnimationActive={false}>
					<LabelList dataKey="cariados" content={SegmentLabel} />
					<LabelList dataKey="cariados" content={makeTotalLabel(props.data)} />
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}
