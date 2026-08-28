import { AgeBracket, CareFreePoint, CpoBracketPoint, FilterState, VigiaRow, ALL_OPTION, UNDEFINED_OPTION } from "./type";

/**
 * Faixas etárias exibidas no dashboard, na mesma ordem/segmentação usada no
 * relatório Power BI original.
 */
export const AGE_BRACKETS: AgeBracket[] = [
	{ label: "6–8 anos", min: 6, max: 8 },
	{ label: "9–11 anos", min: 9, max: 11 },
	{ label: "12 anos", min: 12, max: 12 },
	{ label: "13–14 anos", min: 13, max: 14 },
	{ label: "15–19 anos", min: 15, max: 19 },
	{ label: "20–34 anos", min: 20, max: 34 },
	{ label: "35–44 anos", min: 35, max: 44 },
	{ label: "45–64 anos", min: 45, max: 64 },
];

/** Aceita string ou number porque o dado real nem sempre bate com o tipo declarado em VigiaRow (ver asText abaixo). */
export const parseNum = (value?: string | number | null): number | null => {
	if (value === undefined || value === null || value === "") return null;
	const n = Number(value);
	return Number.isFinite(n) ? n : null;
};

export const getAgeBracket = (row: VigiaRow): AgeBracket | undefined => {
	const age = parseNum(row["Qual a sua idade?"]);
	if (age === null) return undefined;
	return AGE_BRACKETS.find((b) => age >= b.min && age <= b.max);
};

/** Total de dentes afetados (cariado + perdido + restaurado) de um respondente. */
const getCpoCount = (row: VigiaRow): number | null => parseNum(row["Nota CPO valor sem calculo"]);

/** Soma um campo numérico de VigiaRow entre as linhas, ignorando valores que não parseiam como número. */
const sumField = (rows: VigiaRow[], field: keyof VigiaRow): number =>
	rows.reduce((sum, row) => {
		const v = parseNum(row[field]);
		return v !== null ? sum + v : sum;
	}, 0);

/**
 * Fórmula de CPO do grupo (índice CPO-D padrão de epidemiologia — corrigida
 * de novo a pedido do usuário: NÃO divide pela quantidade de dentes
 * examinados, só pela quantidade de pessoas). Cada paciente entra com o
 * total de dentes afetados dele (Cariado + Perdido + Restaurado, sem
 * dividir por nada); o CPO do grupo é a MÉDIA desse total entre os
 * pacientes do grupo:
 *   valor_paciente = Cariado + Perdido + Restaurado
 *   CPO do grupo    = média(valor_paciente) entre os pacientes do grupo
 *                   = (Σ Cariado + Σ Perdido + Σ Restaurado) ÷ Quantidade de pessoas
 * Aplicada tanto no agregado geral (gauge) quanto por faixa etária (gráfico
 * de barras) — como Cariado/Perdido/Restaurado dividem pelo MESMO n antes de
 * entrar na média, a decomposição é linear: cada parcela continua somando
 * pro total do grupo, então as barras empilhadas continuam batendo com o
 * total. "Quantidade de pessoas" = quem tem dado clínico válido (mesmo
 * critério de "withCpo" em summarize) — a quantidade de dentes examinados
 * não entra mais na conta, só é mantida no registro do paciente pra
 * referência/conferência na tela.
 */
/** Os números de um paciente que entram na conta — "dentes" é só informativo (quantidade EXAMINADA NAQUELE PACIENTE), não entra mais na fórmula. */
export type PatientCpoInput = { cariado: number; perdido: number; restaurado: number; dentes: number; taxa: number };

export type CpoRateResult = {
	cariados: number;
	perdidos: number;
	restaurados: number;
	total: number;
	respondentes: number;
	// Números crus por trás da conta acima — pra poder mostrar o cálculo passo a passo (ver CpoCalculationDetail).
	n: number;
	sumCariado: number;
	sumPerdido: number;
	sumRestaurado: number;
	sumDentes: number;
	// Um item por paciente que entrou na média — pra conferir valor por valor.
	pacientes: PatientCpoInput[];
};

const cpoRateForGroup = (rows: VigiaRow[]): CpoRateResult => {
	// Todo paciente aqui já tem dado clínico válido (filtrado antes, em "withCpo" dentro de summarize) —
	// não exige mais quantidade de dentes válida, já que ela não entra mais na fórmula.
	const n = rows.length;

	const pacientes: PatientCpoInput[] = rows.map((row) => {
		const cariado = parseNum(row["Cariado"]) ?? 0;
		const perdido = parseNum(row["Perdido"]) ?? 0;
		const restaurado = parseNum(row["Restaurado"]) ?? 0;
		const dentes = parseNum(row["Quantidade dentes CPO"]) ?? 0;
		// "taxa" aqui é o total de dentes afetados do paciente (sem dividir por nada) — nome mantido pelo tipo compartilhado.
		return { cariado, perdido, restaurado, dentes, taxa: cariado + perdido + restaurado };
	});

	const sumCariado = sumField(rows, "Cariado");
	const sumPerdido = sumField(rows, "Perdido");
	const sumRestaurado = sumField(rows, "Restaurado");
	const sumDentes = sumField(rows, "Quantidade dentes CPO");

	if (n === 0) {
		return {
			cariados: 0,
			perdidos: 0,
			restaurados: 0,
			total: 0,
			respondentes: rows.length,
			n,
			sumCariado,
			sumPerdido,
			sumRestaurado,
			sumDentes,
			pacientes,
		};
	}

	// Média entre pacientes de cada componente — cada um já é o total do próprio paciente, sem dividir por dentes.
	const cariados = sumCariado / n;
	const perdidos = sumPerdido / n;
	const restaurados = sumRestaurado / n;

	return {
		cariados,
		perdidos,
		restaurados,
		total: cariados + perdidos + restaurados,
		respondentes: rows.length,
		n,
		sumCariado,
		sumPerdido,
		sumRestaurado,
		sumDentes,
		pacientes,
	};
};

/** Filtros "normais" (município, estabelecimento, local, turno, faixa etária) — sem os de outliers. */
export const applyMainFilters = (rows: VigiaRow[], filters: FilterState): VigiaRow[] => {
	return rows.filter((row) => {
		if (filters.municipio !== ALL_OPTION && row["Nome do Município"] !== filters.municipio) return false;
		if (
			filters.estabelecimento !== ALL_OPTION &&
			row["Nome do Estabelecimento de saúde/instituição vinculada a pesquisa"] !== filters.estabelecimento
		)
			return false;
		if (filters.localPesquisa !== ALL_OPTION && row["Local da pesquisa"] !== filters.localPesquisa) return false;
		if (filters.turno !== ALL_OPTION && row["Qual turno?"] !== filters.turno) return false;

		if (filters.idadeBrackets.length > 0) {
			const bracket = getAgeBracket(row);
			if (!bracket || !filters.idadeBrackets.includes(bracket.label)) return false;
		}

		return true;
	});
};

/**
 * true quando o registro bate com algum valor marcado pra remover nos
 * filtros de outliers (quantidade de dentes / idade) — funcionam ao
 * contrário dos filtros normais: marcar um valor REMOVE quem tem esse
 * valor, em vez de restringir a visualização só a ele.
 */
export const isOutlierExcluded = (row: VigiaRow, filters: FilterState): boolean => {
	if (filters.quantidadeDentes.length > 0) {
		const teeth = asText(row["Quantidade dentes CPO"]);
		const value = teeth !== null && parseNum(teeth) !== null ? teeth : UNDEFINED_OPTION;
		if (filters.quantidadeDentes.includes(value)) return true;
	}

	if (filters.idadeExata.length > 0) {
		const idade = asText(row["Qual a sua idade?"]);
		const value = idade !== null && parseNum(idade) !== null ? idade : UNDEFINED_OPTION;
		if (filters.idadeExata.includes(value)) return true;
	}

	return false;
};

/** Filtros normais + outliers combinados — usado nos cálculos/gráficos (ver applyMainFilters e isOutlierExcluded). */
export const applyFilters = (rows: VigiaRow[], filters: FilterState): VigiaRow[] => {
	return applyMainFilters(rows, filters).filter((row) => !isOutlierExcluded(row, filters));
};

/**
 * O backend declara todo VigiaRow como string, mas alguns campos (ex:
 * "Quantidade dentes CPO", "Cariado"...) chegam em runtime como number —
 * daí normalizarmos com String(...) antes de qualquer .trim()/comparação,
 * em vez de assumir o tipo declarado.
 */
const asText = (value: unknown): string | null => {
	if (value === undefined || value === null) return null;
	const text = String(value).trim();
	return text ? text : null;
};

export const distinctValues = (rows: VigiaRow[], field: keyof VigiaRow): string[] => {
	const set = new Set<string>();
	rows.forEach((row) => {
		const value = asText(row[field]);
		if (value && value !== "Sem dados registrados") set.add(value);
	});
	return Array.from(set).sort((a, b) => a.localeCompare(b, "pt-BR"));
};

/**
 * Como distinctValues, mas para campos numéricos usados nos filtros de
 * outliers (ex: "Quantidade dentes CPO", "Qual a sua idade?") — ordena por
 * valor, não alfabeticamente, e acrescenta a opção "Não definido" ao final
 * quando existe pelo menos um registro sem valor válido nesse campo (em vez
 * de simplesmente descartar essas linhas da lista de opções).
 */
export const distinctNumericValues = (rows: VigiaRow[], field: keyof VigiaRow): string[] => {
	const set = new Set<string>();
	let hasUndefined = false;

	rows.forEach((row) => {
		const value = asText(row[field]);
		if (value && value !== "Sem dados registrados" && parseNum(value) !== null) {
			set.add(value);
		} else {
			hasUndefined = true;
		}
	});

	const values = Array.from(set).sort((a, b) => Number(a) - Number(b));
	return hasUndefined ? [...values, UNDEFINED_OPTION] : values;
};

/** Números crus por trás do cálculo de CPO de um grupo, pra exibir o passo a passo (ver "grupo" de verificação no dashboard). */
export type CpoCalculationDetail = {
	label: string;
	n: number;
	sumCariado: number;
	sumPerdido: number;
	sumRestaurado: number;
	sumDentes: number;
	total: number;
	// Um item por paciente que entrou nessas somas — "dentes" é a quantidade de dentes examinados NAQUELE paciente (não um valor fixo).
	pacientes: PatientCpoInput[];
};

const toCalculationDetail = (label: string, rate: CpoRateResult): CpoCalculationDetail => ({
	label,
	n: rate.n,
	sumCariado: rate.sumCariado,
	sumPerdido: rate.sumPerdido,
	sumRestaurado: rate.sumRestaurado,
	pacientes: rate.pacientes,
	sumDentes: rate.sumDentes,
	total: rate.total,
});

export type VigiaSummary = {
	totalRespondidos: number;
	/** Quantos respondentes têm CPO = 0 (0 dentes afetados) — só entre quem tem dado de CPO válido. */
	livresDeCarieCount: number;
	/** Quantos respondentes entraram na conta acima (têm "Nota CPO valor sem calculo" válido) — denominador do percentual. */
	livresDeCariePessoas: number;
	/** (livresDeCarieCount ÷ livresDeCariePessoas) × 100. */
	livresDeCariePercentual: number;
	mediaCpo: number;
	maxCpo: number;
	cpoPorBloco: CpoBracketPoint[];
	livreDeCarieePorBloco: CareFreePoint[];
	/** Detalhe do cálculo de CPO (geral + por faixa etária), pra conferência manual. */
	calculoDetalhado: { geral: CpoCalculationDetail; porFaixa: CpoCalculationDetail[] };
};

export const summarize = (rows: VigiaRow[]): VigiaSummary => {
	const withCpo = rows.filter((row) => getCpoCount(row) !== null);

	const livresDeCarieRows = withCpo.filter((row) => getCpoCount(row) === 0);

	const bracketRates = AGE_BRACKETS.map((bracket) => {
		const bracketRows = withCpo.filter((row) => getAgeBracket(row)?.label === bracket.label);
		return { label: bracket.label, rate: cpoRateForGroup(bracketRows) };
	}).filter((b) => b.rate.respondentes > 0);

	const cpoPorBloco: CpoBracketPoint[] = bracketRates.map(({ label, rate }) => ({
		label,
		cariados: rate.cariados,
		perdidos: rate.perdidos,
		restaurados: rate.restaurados,
		total: rate.total,
		respondentes: rate.respondentes,
	}));

	// mediaCpo = mesma fórmula, mas pro grupo inteiro (todas as faixas etárias juntas).
	const rateGeral = cpoRateForGroup(withCpo);
	const mediaCpo = rateGeral.total;
	// Sem mais "maior valor individual" pra usar de escala (a fórmula deixou de ser por pessoa) —
	// a referência mais próxima disso agora é a faixa etária com a taxa mais alta.
	const maxCpo = cpoPorBloco.length ? Math.max(mediaCpo, ...cpoPorBloco.map((b) => b.total)) : mediaCpo;

	const calculoDetalhado = {
		geral: toCalculationDetail("Geral (todas as faixas)", rateGeral),
		porFaixa: bracketRates.map(({ label, rate }) => toCalculationDetail(label, rate)),
	};

	const livreDeCarieePorBloco: CareFreePoint[] = AGE_BRACKETS.map((bracket) => ({
		label: bracket.label,
		count: livresDeCarieRows.filter((row) => getAgeBracket(row)?.label === bracket.label).length,
	})).filter((point) => point.count > 0);

	// % de livres de cárie = (pessoas com CPO = 0 ÷ pessoas com dado de CPO válido) × 100.
	const livresDeCariePessoas = withCpo.length;
	const livresDeCarieCount = livresDeCarieRows.length;
	const livresDeCariePercentual = livresDeCariePessoas > 0 ? (livresDeCarieCount / livresDeCariePessoas) * 100 : 0;

	return {
		totalRespondidos: rows.length,
		livresDeCarieCount,
		livresDeCariePessoas,
		livresDeCariePercentual,
		mediaCpo,
		maxCpo,
		cpoPorBloco,
		livreDeCarieePorBloco,
		calculoDetalhado,
	};
};
