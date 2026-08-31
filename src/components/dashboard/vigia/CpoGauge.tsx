import { VIGIA, ff } from "./colors";

type TPROPS = {
	value: number;
	max: number;
	label: string;
};

// Valor final do CPO — no máximo 2 casas decimais.
const fmt = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * Ponto na borda de um arco, com 0° apontando para cima (12h) e ângulo
 * crescendo no sentido horário — convenção padrão para gauges em SVG.
 */
const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
	const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
	return {
		x: cx + r * Math.cos(angleInRadians),
		y: cy + r * Math.sin(angleInRadians),
	};
};

const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
	const start = polarToCartesian(cx, cy, r, startAngle);
	const end = polarToCartesian(cx, cy, r, endAngle);
	const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
	return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
};

/** Gauge em semicírculo (0..max), desenhado manualmente em SVG. */
export default function CpoGauge(props: TPROPS) {
	const max = props.max > 0 ? props.max : 1;
	const value = Math.max(0, Math.min(props.value, max));
	const fraction = value / max;

	const width = 260;
	const height = 156;
	const cx = width / 2;
	const cy = height - 26;
	const r = 104;
	const strokeWidth = 20;

	const trackPath = describeArc(cx, cy, r, -90, 90);
	const valuePath = describeArc(cx, cy, r, -90, -90 + 180 * fraction);

	return (
		<div style={{ width: "100%" }}>
			<svg width="100%" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${props.label}: ${fmt(props.value)} de ${fmt(max)}`}>
				<path d={trackPath} fill="none" stroke={VIGIA.singleTrack} strokeWidth={strokeWidth} strokeLinecap="round" />
				{fraction > 0 && (
					<path d={valuePath} fill="none" stroke={VIGIA.single} strokeWidth={strokeWidth} strokeLinecap="round" />
				)}
				<text x={cx} y={cy - 22} textAnchor="middle" fontFamily={ff.body} fontSize={30} fontWeight={700} fill={VIGIA.primary}>
					{fmt(props.value)}
				</text>
				<text x={cx - r} y={cy + 20} textAnchor="start" fontFamily={ff.body} fontSize={12} fill={VIGIA.muted}>
					{fmt(0)}
				</text>
				<text x={cx + r} y={cy + 20} textAnchor="end" fontFamily={ff.body} fontSize={12} fill={VIGIA.muted}>
					{fmt(max)}
				</text>
			</svg>
			{props.label ? (
				<p style={{ textAlign: "center", fontFamily: ff.body, fontSize: 13, fontWeight: 600, color: VIGIA.text, margin: "2px 0 0" }}>
					{props.label}
				</p>
			) : null}
		</div>
	);
}
