/**
 * Visual compartilhado dos dropdowns do sistema (MUI).
 *
 * A referência é o dropdown que o questionário usa nas perguntas de lista (ver `choiceType:
 * "autoComplete"` em `components/answer/choice/index.tsx`): campo outlined, indicador de seta e
 * lista em popup. A diferença deliberada é a cor do acento — o tema não define
 * `palette.primary`, então o MUI cru foca em azul (#1976d2); aqui o foco segue o vinho do
 * sistema, pro dropdown não ser a única peça azul da tela.
 *
 * Serve tanto pro `Autocomplete`/`TextField` (painel admin) quanto pro `Select` dentro de um
 * `FormControl` (filtros dos dashboards). Por isso o SX de campo é escrito pra ser aplicado no
 * ELEMENTO DE FORA (TextField ou FormControl) e alcançar o input por descendência — num `Select`
 * a raiz JÁ é o OutlinedInput, então `& .MuiOutlinedInput-root` não casaria se fosse aplicado
 * nele direto.
 */

const C = {
	primary: "#6D141A",
	white: "#fff",
	text: "#1c1917",
	muted: "#78716c",
	mutedLight: "#a8a29e",
	border: "#e7e5e4",
	bg: "#FAF7F2",
};

const body = "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif";

/** Aplique no `TextField` ou no `FormControl` que envolve o controle. */
export const SELECT_FIELD_SX = {
	"& .MuiOutlinedInput-root": {
		minHeight: "40px",
		borderRadius: "10px",
		backgroundColor: C.white,
		paddingTop: "2px",
		paddingBottom: "2px",
		transition: "box-shadow .15s ease",
		"& fieldset": { borderColor: C.border, borderWidth: "1.5px" },
		"&:hover fieldset": { borderColor: "#d6d3d1" },
		"&.Mui-focused fieldset": { borderColor: C.primary, borderWidth: "1.5px" },
		"&.Mui-focused": { boxShadow: "0 0 0 3px rgba(109,20,26,0.10)" },
	},
	"& .MuiOutlinedInput-input": {
		fontFamily: body,
		fontSize: "13px",
		color: C.text,
	},
	"& .MuiOutlinedInput-input::placeholder": { color: C.mutedLight, opacity: 1 },
	"& .MuiAutocomplete-popupIndicator": { color: C.muted },
	"& .MuiSelect-icon": { color: C.muted },
	// Rótulo flutuante (quando existe): sem isso ele fica azul no foco, pelo padrão do MUI.
	// 14px e não 13px porque o MUI encolhe o rótulo a 75% quando ele sobe pra borda — a 13px
	// ele ficaria em ~9,7px, ilegível. Assim encolhido dá ~10,5px, o tamanho que já era usado.
	"& .MuiInputLabel-root": { fontFamily: body, fontSize: "14px", color: C.muted },
	"& .MuiInputLabel-root.Mui-focused": { color: C.primary },
};

/**
 * Aplique no papel do popup: `slotProps={{ paper: { sx: SELECT_PAPER_SX } }}` no Autocomplete,
 * ou `MenuProps={{ PaperProps: { sx: SELECT_PAPER_SX } }}` no Select. Cobre as duas listas — a do
 * Autocomplete (`.MuiAutocomplete-option`) e a do Select (`.MuiMenuItem-root`).
 */
export const SELECT_PAPER_SX = {
	marginTop: "6px",
	borderRadius: "12px",
	border: `1.5px solid ${C.border}`,
	boxShadow: "0 12px 32px rgba(0,0,0,0.10)",

	"& .MuiAutocomplete-listbox": {
		padding: "6px",
		"& .MuiAutocomplete-option": {
			borderRadius: "8px",
			padding: "9px 11px",
			fontFamily: body,
			fontSize: "13px",
			color: C.text,
			"&.Mui-focused": { backgroundColor: C.bg },
			'&[aria-selected="true"]': {
				backgroundColor: "rgba(109,20,26,0.08)",
				color: C.primary,
				fontWeight: 700,
			},
			'&[aria-selected="true"].Mui-focused': { backgroundColor: "rgba(109,20,26,0.13)" },
		},
	},
	"& .MuiAutocomplete-noOptions": { fontFamily: body, fontSize: "13px", color: C.muted },

	"& .MuiList-root": { padding: "6px" },
	"& .MuiMenuItem-root": {
		borderRadius: "8px",
		padding: "8px 11px",
		fontFamily: body,
		fontSize: "13px",
		color: C.text,
		"&:hover": { backgroundColor: C.bg },
		"&.Mui-selected": {
			backgroundColor: "rgba(109,20,26,0.08)",
			color: C.primary,
			fontWeight: 700,
		},
		"&.Mui-selected:hover": { backgroundColor: "rgba(109,20,26,0.13)" },
	},
};
