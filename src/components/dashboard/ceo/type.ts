/**
 * Tipos do dashboard do formulário de CEO (id 1), consumindo a rota genérica de
 * leitura/exportação de dados GET /data/form/:id (api-plataforma-sbufpe/src/modules/Data/controllers/Data.ts),
 * que devolve as respostas CRUAS (sem nenhum mapeamento tipo "VigiaQuestion") — a árvore de
 * perguntas do formulário (com choices) mais a lista de submissões.
 *
 * Diferente do Vigia SD (dashboard/vigia), aqui não existe nenhum dicionário de "id de pergunta
 * -> nome de campo" hardcoded no backend (isso só existe pro Vigia SD, form ids [5,6]). Por isso
 * este dashboard é genérico: ele descobre as perguntas, seus tipos e domínios diretamente da
 * própria resposta da API (raw.data.formsQuestionsFormsRegisters), em vez de assumir campos fixos.
 */

/** Uma opção cadastrada de resposta (forms__question_choices). */
export type ApiChoice = {
	id: number;
	title: string;
	score: number;
};

/** Uma linha de forms__questions_forms__question_choices — "esta opção pertence a esta pergunta". */
export type ApiQuestionChoiceLink = {
	id: number;
	choiceId: ApiChoice;
};

export type ApiQuestionType = {
	id: number;
	cod: string; // D | M | R | UC | MC | OA | NPS (forms__question_types)
	name: string;
};

export type ApiQuestionDomain = {
	id: number;
	cod: string;
	name: string;
};

/** forms__questions — o banco de perguntas reutilizável. */
export type ApiQuestion = {
	id: number;
	title: string;
	recommendationMessage?: string | null;
	typeId: ApiQuestionType;
	domainId: ApiQuestionDomain;
	formsQuestionsFormsQuestionChoices: ApiQuestionChoiceLink[];
};

/**
 * Uma linha de forms__questions_forms__registers — "esta pergunta anexada a ESTE formulário".
 * O `id` aqui é o formQuestionFormRegisterId usado em toda resposta (UsersAnswers.formQuestionFormRegisterId),
 * não o id da pergunta em si (que fica em questionId.id).
 */
export type ApiFormQuestionLink = {
	id: number;
	formId: number;
	questionId: ApiQuestion;
};

/** forms__registers — o formulário em si, com a árvore de perguntas já anexada. */
export type ApiFormRegister = {
	id: number;
	title: string;
	completionMessage?: string | null;
	config?: { canShowFinalScore?: boolean };
	formsQuestionsFormsRegisters: ApiFormQuestionLink[];
};

/**
 * Uma resposta já resolvida pro texto legível pelo backend (ver DataVigia.transfomAnswerDataInRealText) —
 * pra pergunta de múltipla escolha (MC), answerText vem com as opções marcadas juntas, separadas por ", ".
 * `questionId` aqui é, apesar do nome (herdado do backend), o formQuestionFormRegisterId — não o id da pergunta.
 */
export type ApiAnswerData = {
	id: number;
	answer: string;
	createdAt: string;
	answerText: string | null;
	questionId: number;
};

/** Uma submissão completa — todas as respostas de uma pessoa, isoladas pelo mesmo createdAt no backend. */
export type ApiAnswerForm = {
	answers: ApiAnswerData[];
	date: string;
	userId: number;
};

/** Corpo cru devolvido por GET /data/form/1. */
export type CeoApiResponse = {
	data: ApiFormRegister;
	answer: ApiAnswerForm[];
};

// ── Tipos processados (calculados em utils.ts a partir do corpo cru acima) ──

export type QuestionChoiceCount = {
	title: string;
	score: number;
	count: number;
	/** % de quem respondeu ESSA pergunta que escolheu esta opção (não % do total de submissões). */
	percent: number;
};

export type QuestionSummary = {
	formQuestionFormRegisterId: number;
	title: string;
	typeCod: string;
	typeName: string;
	domainCod: string;
	domainName: string;
	/** Quantas submissões deram alguma resposta não vazia pra esta pergunta — denominador do percent acima. */
	totalAnswered: number;
	/** Distribuição por opção — vazio pra perguntas de resposta aberta (sem choices cadastrados). */
	choices: QuestionChoiceCount[];
	/** Só preenchido pra perguntas sem choices cadastrados (resposta aberta/texto livre/número). */
	openAnswers: string[];
};

export type DomainGroup = {
	cod: string;
	name: string;
	questions: QuestionSummary[];
};

/** Uma faixa do histograma de uma resposta numérica (ex: idade agrupada em faixas de 10 anos). */
export type HistogramBin = {
	label: string;
	count: number;
};

/** Uma linha "achatada" por submissão — título da pergunta -> texto da resposta — pra planilha. */
export type CeoTableRow = {
	__submissionIndex: number;
	__date: string;
	[questionTitle: string]: string | number;
};

export type CeoSummary = {
	formTitle: string;
	totalResponses: number;
	domains: DomainGroup[];
	tableRows: CeoTableRow[];
	/** Títulos das perguntas na ordem em que aparecem no formulário — usado pras colunas da planilha. */
	questionTitlesInOrder: string[];
};

/** Filtro de data por período de submissão — valores em formato "YYYY-MM-DD" (ou "" = sem limite). */
export type CeoFilterState = {
	dateFrom: string;
	dateTo: string;
};

export const DEFAULT_CEO_FILTERS: CeoFilterState = {
	dateFrom: "",
	dateTo: "",
};
