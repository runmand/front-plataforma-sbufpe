/**
 * Paleta deste dashboard.
 *
 * O vermelho/bordô da marca (#6D141A / #921c22) é ótimo para o cromo da
 * página (cards, títulos, gauge), mas três tons da MESMA cor não passam no
 * checklist de acessibilidade para série categórica (contraste insuficiente
 * entre pares e falha no piso de daltonismo — validado com
 * scripts/validate_palette.js do skill de dataviz). Por isso os 3 segmentos
 * do gráfico de CPO (Cariados/Perdidos/Restaurados) usam os 3 primeiros
 * tons da paleta categórica padrão (validada em ambos os modos), e o resto
 * do dashboard (cards, texto, gauge) segue no vermelho da marca.
 */
export const VIGIA = {
	// Cromo da marca (igual ao resto do site).
	primary: "#6D141A",
	secondary: "#921c22",
	bg: "#FAF7F2",
	white: "#fff",
	text: "#1c1917",
	muted: "#6b7280",
	border: "#e7e5e4",

	// Série categórica (Cariados / Perdidos / Restaurados) — validada.
	cariados: "#2a78d6",
	perdidos: "#eb6834",
	restaurados: "#1baf7a",

	// Único-hue, usado em gráficos de série única (livre de cárie, gauge).
	single: "#6D141A",
	singleTrack: "#f1e1e0",
};

export const ff = {
	// 'Newsreader' é a única fonte serifada carregada via Google Fonts no
	// layout.tsx do site — usar ela aqui garante que o título renderize com
	// a fonte real, em vez de cair no fallback (Georgia do sistema).
	display: "'Newsreader', Georgia, serif",
	body: "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif",
};
