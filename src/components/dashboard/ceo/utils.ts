import {
	ApiAnswerForm,
	ApiFormQuestionLink,
	CeoApiResponse,
	CeoFilterState,
	CeoSummary,
	CeoTableRow,
	DomainGroup,
	HistogramBin,
	QuestionChoiceCount,
	QuestionSummary,
} from "./type";

/** Nome amigável pro código de tipo de pergunta (forms__question_types), só pra exibição. */
export const QUESTION_TYPE_LABEL: Record<string, string> = {
	D: "Dicotômica",
	M: "Matriz",
	R: "Ranking",
	UC: "Escolha única",
	MC: "Múltipla escolha",
	OA: "Resposta aberta",
	NPS: "NPS / Nota",
};

/**
 * Encurta um rótulo longo (ex: título de uma opção de resposta) pra caber num espaço fixo sem
 * estourar o layout do gráfico — o texto completo continua disponível no tooltip ao passar o
 * mouse, então truncar aqui não perde informação, só evita o texto "vazar" pra fora do eixo.
 */
export const truncateLabel = (text: string, maxChars = 28): string =>
	text.length > maxChars ? `${text.slice(0, maxChars - 1).trimEnd()}…` : text;

/**
 * Agrupa respostas numéricas em texto livre (ex: "Qual a sua idade... em anos completos?") em
 * faixas de `binSize` anos, pra virar um histograma em vez de uma lista crua de números.
 * Descarta qualquer resposta que não seja um número válido dentro de uma faixa plausível de
 * idade humana (0–130) — texto livre pode ter respostas fora do padrão (ex: "trinta", "-").
 * Faixas sem nenhuma resposta não entram no resultado (mesma lógica de "não mostrar vazios"
 * já aplicada às outras perguntas de escolha).
 */
export const buildAgeHistogram = (openAnswers: string[], binSize = 10): HistogramBin[] => {
	const counts = new Map<number, number>(); // início da faixa -> contagem

	openAnswers.forEach((raw) => {
		const n = parseInt(raw, 10);
		if (!Number.isFinite(n) || n < 0 || n > 130) return;
		const binStart = Math.floor(n / binSize) * binSize;
		counts.set(binStart, (counts.get(binStart) ?? 0) + 1);
	});

	return Array.from(counts.entries())
		.sort((a, b) => a[0] - b[0])
		.map(([start, count]) => ({ label: `${start}–${start + binSize - 1}`, count }));
};

const pad2 = (n: number): string => String(n).padStart(2, "0");

/** Converte "YYYY-MM-DD" pro timestamp da meia-noite local desse dia (mesmo critério usado no filtro abaixo). */
export const ymdToTime = (ymd: string): number => new Date(`${ymd}T00:00:00`).getTime();

/** Converte um timestamp de volta pra "YYYY-MM-DD" em hora local — evita o shift de dia do toISOString (que usa UTC). */
export const timeToYmd = (time: number): string => {
	const d = new Date(time);
	return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

/**
 * Menor e maior data de submissão do formulário (em "YYYY-MM-DD", hora local) — usado pra inicializar
 * o filtro de período já cobrindo do primeiro ao último formulário respondido (em vez de começar vazio),
 * e como min/max do slider de período.
 */
export const getSubmissionDateBounds = (submissions: ApiAnswerForm[]): { min: string; max: string } | null => {
	const times = submissions.map((s) => new Date(s.date).getTime()).filter((t) => Number.isFinite(t));
	if (times.length === 0) return null;
	return { min: timeToYmd(Math.min(...times)), max: timeToYmd(Math.max(...times)) };
};

/**
 * Filtra as submissões por período de data (inclusive nas duas pontas). `dateFrom`/`dateTo`
 * vazios não restringem aquela ponta — filtro totalmente vazio devolve tudo sem tocar no array.
 */
export const filterSubmissionsByDate = (submissions: ApiAnswerForm[], filters: CeoFilterState): ApiAnswerForm[] => {
	if (!filters.dateFrom && !filters.dateTo) return submissions;

	const fromTime = filters.dateFrom ? new Date(`${filters.dateFrom}T00:00:00`).getTime() : -Infinity;
	const toTime = filters.dateTo ? new Date(`${filters.dateTo}T23:59:59.999`).getTime() : Infinity;

	return submissions.filter((s) => {
		const t = new Date(s.date).getTime();
		return !isNaN(t) && t >= fromTime && t <= toTime;
	});
};

/**
 * Resume a resposta crua de GET /data/form/1 num formato pronto pro dashboard: agrupa as
 * perguntas por domínio (na ordem em que a API listou), calcula a distribuição de respostas
 * por opção pra perguntas de múltipla/única escolha, e junta as respostas de texto livre numa
 * lista por pergunta. Também monta a planilha "achatada" (uma linha por submissão).
 *
 * Não assume nenhum id de pergunta fixo — diferente do Vigia SD (que tem um dicionário
 * hardcoded no backend), aqui a estrutura vem inteira da própria API, então isso funciona pra
 * qualquer formulário que a rota /data/form/:id devolva, não só o de CEO.
 */
export const summarize = (raw: CeoApiResponse): CeoSummary => {
	const links: ApiFormQuestionLink[] = raw?.data?.formsQuestionsFormsRegisters ?? [];
	const submissions = raw?.answer ?? [];

	const questionIndex = new Map<number, ApiFormQuestionLink>();
	links.forEach((link) => questionIndex.set(link.id, link));

	// formQuestionFormRegisterId -> (título da opção -> quantas vezes foi escolhida)
	const choiceCounts = new Map<number, Map<string, number>>();
	// formQuestionFormRegisterId -> lista de respostas de texto livre
	const openAnswersByQuestion = new Map<number, string[]>();
	// formQuestionFormRegisterId -> quantas submissões deram resposta não vazia
	const answeredCountByQuestion = new Map<number, number>();

	const tableRows: CeoTableRow[] = [];

	submissions.forEach((submission, index) => {
		const row: CeoTableRow = { __submissionIndex: index + 1, __date: submission.date };

		submission.answers.forEach((a) => {
			const link = questionIndex.get(a.questionId);
			if (!link) return; // resposta de uma pergunta que não pertence (mais) a este formulário

			const title = link.questionId.title;
			const text = a.answerText;
			row[title] = text ?? "";

			if (text === null || text === undefined || text === "") return;

			answeredCountByQuestion.set(link.id, (answeredCountByQuestion.get(link.id) ?? 0) + 1);

			const hasDeclaredChoices = (link.questionId.formsQuestionsFormsQuestionChoices ?? []).length > 0;

			if (hasDeclaredChoices) {
				// Escolha única/múltipla/dicotômica etc: MC vem como "Opção A, Opção B" — conta cada uma separada.
				const counts = choiceCounts.get(link.id) ?? new Map<string, number>();
				text
					.split(",")
					.map((t) => t.trim())
					.filter(Boolean)
					.forEach((choiceTitle) => counts.set(choiceTitle, (counts.get(choiceTitle) ?? 0) + 1));
				choiceCounts.set(link.id, counts);
			} else {
				// Sem choices cadastrados = resposta aberta (texto livre, número, etc).
				const list = openAnswersByQuestion.get(link.id) ?? [];
				list.push(text);
				openAnswersByQuestion.set(link.id, list);
			}
		});

		tableRows.push(row);
	});

	const domainMap = new Map<string, DomainGroup>();
	const questionTitlesInOrder: string[] = [];

	links.forEach((link) => {
		const q = link.questionId;
		const domainCod = q.domainId?.cod ?? "—";
		const domainName = q.domainId?.name ?? "Sem domínio";
		const typeCod = q.typeId?.cod ?? "OA";
		const typeName = q.typeId?.name ?? QUESTION_TYPE_LABEL[typeCod] ?? typeCod;

		const totalAnswered = answeredCountByQuestion.get(link.id) ?? 0;
		const declaredChoices = q.formsQuestionsFormsQuestionChoices ?? [];
		const counts = choiceCounts.get(link.id);

		let choices: QuestionChoiceCount[] = [];
		if (declaredChoices.length > 0) {
			// Base = opções cadastradas na pergunta (mantém a ordem e mostra até quem teve 0 respostas).
			const seen = new Set<string>();
			choices = declaredChoices.map((c) => {
				seen.add(c.choiceId.title);
				const count = counts?.get(c.choiceId.title) ?? 0;
				return {
					title: c.choiceId.title,
					score: c.choiceId.score,
					count,
					percent: totalAnswered > 0 ? (count / totalAnswered) * 100 : 0,
				};
			});
			// Alguma resposta com texto que não bate nenhum choice cadastrado (não deveria acontecer, mas não descarta).
			counts?.forEach((count, title) => {
				if (!seen.has(title)) {
					choices.push({ title, score: 0, count, percent: totalAnswered > 0 ? (count / totalAnswered) * 100 : 0 });
				}
			});
		}

		const summary: QuestionSummary = {
			formQuestionFormRegisterId: link.id,
			title: q.title,
			typeCod,
			typeName,
			domainCod,
			domainName,
			totalAnswered,
			choices,
			openAnswers: openAnswersByQuestion.get(link.id) ?? [],
		};

		const group = domainMap.get(domainCod) ?? { cod: domainCod, name: domainName, questions: [] };
		group.questions.push(summary);
		domainMap.set(domainCod, group);

		questionTitlesInOrder.push(q.title);
	});

	return {
		formTitle: raw?.data?.title ?? "",
		totalResponses: submissions.length,
		domains: Array.from(domainMap.values()),
		tableRows,
		questionTitlesInOrder,
	};
};
