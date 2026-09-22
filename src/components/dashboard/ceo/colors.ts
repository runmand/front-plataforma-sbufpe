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
	muted: "#6b7280",
	border: "#e7e5e4",

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

export const ff = {
	// 'Newsreader' é a única fonte serifada carregada via Google Fonts no layout.tsx do site —
	// mesma escolha do dashboard Vigia SD, pra manter a identidade tipográfica do site.
	display: "'Newsreader', Georgia, serif",
	body: "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif",
};
