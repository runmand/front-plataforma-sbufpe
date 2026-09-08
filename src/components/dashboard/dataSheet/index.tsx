/**
 * Planilha de dados dos dashboards — a APRESENTAÇÃO compartilhada, não os dados.
 *
 * Os dois dashboards (CEO e Vigia SD) mostram uma planilha das respostas cruas, mas com colunas
 * e comportamentos próprios: o do CEO monta as colunas a partir dos títulos das perguntas; o do
 * Vigia tem colunas fixas, um botão de ocultar registro e linhas marcadas em vermelho. Então o
 * que se compartilha aqui é a casca (rolagem, cabeçalho fixo, coluna congelada, hover, zebra
 * nenhuma) e cada dashboard monta o próprio `<thead>`/`<tbody>` com estas classes.
 *
 * Em classes e não inline porque precisa de coisas que estilo inline não expressa: hover de
 * linha, barra de rolagem fina e coluna congelada.
 */

const C = {
	bg: "#FAF7F2",
	white: "#fff",
	text: "#1c1917",
	muted: "#78716c",
	border: "#e7e5e4",
	borderLight: "#f5f5f4",
	/** Linha sinalizada (ex: outlier excluído dos cálculos no Vigia SD). */
	flagBg: "#fbdada",
	flagBgHover: "#f6c8c8",
	flagText: "#a83232",
};

const ff = { body: "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif" };

export const DATA_SHEET_CSS = `
.dsheet {
    overflow: auto;
    /* Firefox */
    scrollbar-width: thin;
    scrollbar-color: #d6d3d1 ${C.bg};

    /* Contexto de empilhamento próprio. Os z-index das células fixas (cabeçalho e colunas
     * congeladas, abaixo) existem só pra elas se ordenarem ENTRE SI. Sem este contexto, elas
     * competem no empilhamento da página inteira e passam por cima do rodapé — que é
     * \`position: fixed\` sem z-index (nível 0) — fazendo a coluna congelada e o fundo do card
     * atravessarem a barra do rodapé. Com \`z-index: 0\` aqui, a planilha entra na página como
     * um bloco só de nível 0 e o rodapé, que vem depois no DOM, volta a pintar por cima. */
    position: relative;
    z-index: 0;
}
/* A barra padrão do sistema é grossa e escura, e num painel claro ela virava a coisa mais
   pesada da tela. */
.dsheet::-webkit-scrollbar { width: 11px; height: 11px; }
.dsheet::-webkit-scrollbar-track { background: ${C.bg}; }
.dsheet::-webkit-scrollbar-corner { background: ${C.bg}; }
.dsheet::-webkit-scrollbar-thumb {
    background: #d6d3d1;
    border-radius: 999px;
    border: 3px solid ${C.bg};
}
.dsheet::-webkit-scrollbar-thumb:hover { background: #a8a29e; }

/* \`border-collapse: separate\` é obrigatório aqui — com \`collapse\`, o Chrome não desenha as
   bordas das células \`position: sticky\`, e o cabeçalho fixo fica sem a linha que o separa. */
.dsheet table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-family: ${ff.body};
}

/* Cabeçalho recessivo (pequeno e em tom secundário). Sem caixa alta com espaçamento de letra:
   num dashboard o cabeçalho pode ser uma pergunta inteira, e caixa alta em frase longa fica
   pesada. O peso e a cor já dão a hierarquia. */
.dsheet th {
    position: sticky;
    top: 0;
    z-index: 2;
    text-align: left;
    vertical-align: bottom;
    padding: 10px 14px;
    background-color: ${C.bg};
    border-bottom: 1px solid ${C.border};
    font-size: 11.5px;
    font-weight: 700;
    line-height: 1.45;
    color: ${C.muted};
    white-space: normal;
    min-width: 110px;
}
/* Limita o cabeçalho a 3 linhas pra ele não crescer sem fim (o texto completo fica no title da
   célula). O clamp vai num span: aplicado no próprio <th> ele trocaria o display de table-cell
   e quebraria o sticky. */
.dsheet th span {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
/* Pra planilha cujos cabeçalhos são perguntas longas (dashboard do CEO). */
.dsheet--wide th { min-width: 190px; max-width: 300px; }

.dsheet td {
    padding: 9px 14px;
    background-color: ${C.white};
    border-bottom: 1px solid ${C.borderLight};
    font-size: 12px;
    color: ${C.text};
    /* Resposta de texto livre pode ser um parágrafo — corta com reticências e o texto completo
       fica no title da célula. */
    white-space: nowrap;
    max-width: 320px;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Linha inteira realçada no hover, inclusive as colunas congeladas. */
.dsheet tbody tr:hover td { background-color: ${C.bg}; }

/* Linha sinalizada mantém a própria cor — o hover não pode apagar esse sinal. */
.dsheet tbody tr.dsheet-row--flag td { background-color: ${C.flagBg}; color: ${C.flagText}; }
.dsheet tbody tr.dsheet-row--flag:hover td { background-color: ${C.flagBgHover}; }

/* Coluna congelada na horizontal: sem isso, ao rolar pra direita numa planilha larga a linha
   perde a identidade e não se sabe mais de qual registro é o valor. O \`left\` e a largura vão
   inline em cada célula (variam por planilha); a classe cuida do comportamento. */
.dsheet .dsheet-freeze { position: sticky; z-index: 1; }
/* Nos cantos as duas travas se cruzam — o cabeçalho tem que ficar acima do corpo. */
.dsheet th.dsheet-freeze { z-index: 3; }
/* Última coluna congelada: separa visualmente o bloco fixo do resto. */
.dsheet .dsheet-freeze-edge { box-shadow: inset -1px 0 0 ${C.border}; }

/* Coluna de número/índice. */
.dsheet .dsheet-num { color: ${C.muted}; font-variant-numeric: tabular-nums; }
`;

type TPROPS = {
	/** `<thead>` e `<tbody>` montados pelo dashboard. */
	children: React.ReactNode;
	/** Altura máxima antes de rolar. */
	maxHeight?: number;
	/** `true` quando os cabeçalhos são textos longos (perguntas) e precisam de coluna mais larga. */
	wideHeaders?: boolean;
};

export default function DataSheet(props: TPROPS) {
	return (
		<>
			<style>{DATA_SHEET_CSS}</style>
			<div className={`dsheet${props.wideHeaders ? " dsheet--wide" : ""}`} style={{ maxHeight: props.maxHeight ?? 440 }}>
				<table>{props.children}</table>
			</div>
		</>
	);
}
