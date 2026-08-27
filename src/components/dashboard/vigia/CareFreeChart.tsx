import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { CareFreePoint } from "./type";
import { VIGIA, ff } from "./colors";

type TPROPS = { data: CareFreePoint[] };

export default function CareFreeChart(props: TPROPS) {
	const height = Math.max(140, props.data.length * 34 + 40);

	return (
		<ResponsiveContainer width="100%" height={height}>
			<BarChart data={props.data} layout="vertical" margin={{ top: 8, right: 28, left: 8, bottom: 20 }}>
				<CartesianGrid horizontal={false} stroke={VIGIA.border} />
				<XAxis
					type="number"
					allowDecimals={false}
					tick={{ fontFamily: ff.body, fontSize: 11, fill: VIGIA.muted }}
					axisLine={{ stroke: VIGIA.border }}
					tickLine={false}
					label={{
						value: "Respondentes livres de cárie",
						position: "insideBottom",
						offset: -8,
						fontFamily: ff.body,
						fontSize: 11,
						fill: VIGIA.muted,
					}}
				/>
				<YAxis
					type="category"
					dataKey="label"
					width={78}
					tick={{ fontFamily: ff.body, fontSize: 12, fill: VIGIA.text }}
					axisLine={false}
					tickLine={false}
				/>
				<Tooltip
					cursor={{ fill: "rgba(0,0,0,0.04)" }}
					contentStyle={{ fontFamily: ff.body, fontSize: 12, borderRadius: 8, border: `1px solid ${VIGIA.border}` }}
				/>
				<Bar dataKey="count" name="Livre de cárie" fill={VIGIA.single} radius={[0, 4, 4, 0]} barSize={16} isAnimationActive={false}>
					<LabelList dataKey="count" position="right" style={{ fontFamily: ff.body, fontSize: 12, fill: VIGIA.text, fontWeight: 600 }} />
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}
