import { DurationBinGroup } from "./type";
import { CEO, expandCategorical, ff } from "./colors";

type TPROPS = { bins: DurationBinGroup[] };

const fmtInt = (v: number) => v.toLocaleString("pt-BR");
const fmtPercent = (v: number) => `${v.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 1 })}%`;

/**
 * Detalhe da pergunta de tempo: cada faixa do gráfico com as opções individuais que caíram nela e
 * a contagem de cada uma.
 *
 * Existe porque as duas leituras não cabem no mesmo desenho. A pergunta tem uma opção por valor
 * ("6 meses"… até 44 anos, ~22 opções) e a pizza tem 360° pra dividir: as opções de 0,8% ficam com
 * ~3° de arco, onde nenhum rótulo cabe por mais que o gráfico cresça. Então a pizza responde "que
 * perfil de tempo tem essa equipe" pelas faixas, e esta lista responde "quantos exatamente
 * responderam X" — sem que nenhuma resposta saia da tela.
 *
 * A cor do marcador de cada faixa vem do mesmo `expandCategorical(bins.length)` que o gráfico usa,
 * na mesma ordem, então o bloco daqui e a fatia lá são a mesma cor.
 */
export default function DurationBreakdown(props: TPROPS) {
	const palette = expandCategorical(props.bins.length);

	return (
		<div style={{ marginTop: 4 }}>
			<p
				style={{
					fontFamily: ff.body,
					fontSize: 11,
					fontWeight: 700,
					textTransform: "uppercase",
					letterSpacing: "0.06em",
					color: CEO.muted,
					margin: "0 0 8px",
				}}
			>
				Todas as respostas
			</p>

			<div style={{ borderTop: `1px solid ${CEO.border}` }}>
				{props.bins.map((bin, i) => (
					<div
						key={bin.title}
						style={{
							display: "flex",
							flexWrap: "wrap",
							gap: "4px 14px",
							padding: "9px 0",
							borderBottom: `1px solid ${CEO.border}`,
						}}
					>
						{/* Faixa: mesma cor da fatia correspondente no gráfico. */}
						<div style={{ display: "flex", alignItems: "baseline", gap: 7, flex: "0 0 178px", minWidth: 178 }}>
							<span style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: palette[i], flexShrink: 0 }} />
							<span style={{ fontFamily: ff.body, fontSize: 12, color: CEO.text }}>
								<span style={{ fontWeight: 700 }}>{bin.title}</span>
								<span style={{ color: CEO.muted, whiteSpace: "nowrap" }}>
									{" "}
									— {fmtInt(bin.count)} ({fmtPercent(bin.percent)})
								</span>
							</span>
						</div>

						{/* As opções individuais da faixa, na ordem da escala. */}
						<div style={{ flex: "1 1 260px", display: "flex", flexWrap: "wrap", gap: "4px 8px" }}>
							{bin.members.map((member) => (
								<span
									key={member.title}
									style={{
										fontFamily: ff.body,
										fontSize: 12,
										color: CEO.text,
										backgroundColor: CEO.bg,
										border: `1px solid ${CEO.border}`,
										borderRadius: 999,
										padding: "2px 9px",
										whiteSpace: "nowrap",
									}}
								>
									{member.title}
									<span style={{ color: CEO.muted }}>
										{" "}
										— {fmtInt(member.count)} ({fmtPercent(member.percent)})
									</span>
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
