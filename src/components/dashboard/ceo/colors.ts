/**
 * Paleta deste dashboard — agora alinhada ao vermelho/bordô padrão do projeto (mesmo tom do
 * dashboard Vigia SD e do cromo geral do site).
 *
 * Cada gráfico aqui é uma distribuição de UMA pergunta (% de quem respondeu escolheu cada
 * opção) — ou seja, magnitude de uma série só, não identidade entre várias séries. Um único
 * hue é apropriado pra esse caso (diferente do gráfico empilhado do Vigia SD, que precisa de
 * 3 cores categóricas pra Cariados/Perdidos/Restaurados porque ali SÃO 3 séries) — o mesmo
 * raciocínio que já vale pro "single"/"singleTrack" do dashboard Vigia SD (gauge/CPO livre de
 * cárie), reaproveitado aqui.
 */
export const CEO = {
	// Cromo da marca (igual ao resto do site e ao dashboard Vigia SD).
	primary: "#6D141A",
	secondary: "#921c22",
	bg: "#FAF7F2",
	white: "#fff",
	text: "#1c1917",
	// Mesmo tom de texto secundário do resto do site (pedra quente, não cinza azulado).
	muted: "#78716c",
	border: "#e7e5e4",
	/** Divisória mais leve, pra separar linha de tabela sem pesar a grade. */
	borderLight: "#f5f5f4",

	// Único-hue, usado nos gráficos de barra (magnitude de 1 série só).
	single: "#6D141A",
	singleTrack: "#f1e1e0",
};

/**
 * Paleta categórica padrão (8 hues, ordem validada — scripts/validate_palette.js do skill de
 * dataviz, references/palette.md). Só o gráfico de pizza precisa dela: é a única visualização
 * deste dashboard em que várias fatias/categorias aparecem juntas ao mesmo tempo (identidade),
 * diferente dos gráficos de barra (cada um é 1 pergunta = 1 série = magnitude, único hue).
 */
export const CATEGORICAL = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300", "#4a3aa7", "#e34948"];

/** Mistura `hex` com `target` (0 = só hex, 1 = só target). */
const mix = (hex: string, target: string, amount: number): string => {
	const channel = (source: string, i: number) => parseInt(source.slice(1 + i * 2, 3 + i * 2), 16);
	const to2 = (n: number) => Math.round(n).toString(16).padStart(2, "0");
	return `#${[0, 1, 2].map((i) => to2(channel(hex, i) * (1 - amount) + channel(target, i) * amount)).join("")}`;
};

/**
 * `count` cores a partir da paleta CATEGORICAL, uma por opção — pra perguntas com muitas opções
 * (ex: "há quanto tempo você trabalha", que tem uma opção por valor: "6 meses"… até 44 anos).
 *
 * Antes isso era `CATEGORICAL[i % 8]`, o que fazia a MESMA cor voltar a cada 8 fatias: com ~22
 * opções apareciam três vermelhos idênticos, e aí a legenda não identificava mais qual era qual.
 * Aqui, cada volta na paleta usa os mesmos 8 hues num passo de claro/escuro diferente, alternando
 * clareado e escurecido. Assim a paleta continua sendo a mesma de antes, nenhuma opção precisa
 * ser escondida, e ainda assim duas fatias nunca saem com a cor idêntica — nem vizinhas (hues
 * diferentes dentro da volta), nem distantes (passo diferente entre voltas).
 */
export const expandCategorical = (count: number): string[] =>
	Array.from({ length: count }, (_, i) => {
		const base = CATEGORICAL[i % CATEGORICAL.length];
		const pass = Math.floor(i / CATEGORICAL.length);
		if (pass === 0) return base;
		return pass % 2 === 1 ? mix(base, "#ffffff", 0.42) : mix(base, "#1c1917", 0.34);
	});

export const ff = {
	// 'Newsreader' é a única fonte serifada carregada via Google Fonts no layout.tsx do site —
	// mesma escolha do dashboard Vigia SD, pra manter a identidade tipográfica do site.
	display: "'Newsreader', Georgia, serif",
	body: "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif",
};
