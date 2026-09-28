/**
 * Espelha (apenas os campos usados por este dashboard) o tipo `VigiaUnion`
 * retornado pelo backend em GET /data/vigia
 * (api-plataforma-sbufpe/src/modules/Data/contracts/FormVigiaUnion.ts).
 *
 * Cada item é um respondente do formulário Vigia SD (ids 5 e 6) já com o
 * CPO calculado (Cariado / Perdido / Restaurado / Nota CPO).
 */
export type VigiaRow = {
	"Nome do Município": string;
	"Local da pesquisa": string;
	"Nome do Estabelecimento de saúde/instituição vinculada a pesquisa": string;
	"Qual a sua idade?": string;
	"Qual turno?": string;
	"Nota CPO valor": string;
	"Nota CPO completo": string;
	"Nota CPO definicao": string;
	"Nota CPO valor sem calculo": string;
	"Quantidade dentes CPO": string;
	Perdido: string;
	Cariado: string;
	Restaurado: string;
	[key: string]: string | undefined;
};

export type AgeBracket = {
	label: string;
	min: number;
	max: number;
};

export type CpoBracketPoint = {
	label: string;
	cariados: number;
	perdidos: number;
	restaurados: number;
	total: number;
	respondentes: number;
};

export type CareFreePoint = {
	label: string;
	count: number;
};

export type FilterState = {
	municipio: string;
	estabelecimento: string;
	localPesquisa: string;
	turno: string;
	idadeBrackets: string[];
	/** Filtro de outliers: restringe pela "Quantidade dentes CPO" (nº de dentes examinados no registro). */
	quantidadeDentes: string[];
	/** Filtro de outliers: restringe pela idade exata informada (diferente de idadeBrackets, que agrupa em faixas). */
	idadeExata: string[];
};

export const ALL_OPTION = "Todos";
/** Sentinela usada nos filtros de outliers para representar linhas sem valor válido no campo (ex: idade em branco). */
export const UNDEFINED_OPTION = "Não definido";

/**
 * Valores de "Quantidade dentes CPO" já removidos por padrão (outliers
 * observados nos dados atuais). Como isso é específico do dataset carregado
 * hoje, se a distribuição real mudar (nova coleta, outro protocolo de
 * exame) esses números devem ser revisados manualmente aqui.
 */
const DEFAULT_QUANTIDADE_DENTES_REMOVIDA = ["28", "24", "15", "8", UNDEFINED_OPTION];

export const DEFAULT_FILTERS: FilterState = {
	municipio: ALL_OPTION,
	estabelecimento: ALL_OPTION,
	localPesquisa: ALL_OPTION,
	turno: ALL_OPTION,
	idadeBrackets: [],
	quantidadeDentes: DEFAULT_QUANTIDADE_DENTES_REMOVIDA,
	idadeExata: [UNDEFINED_OPTION],
};
