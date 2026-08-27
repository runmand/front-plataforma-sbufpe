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

export type VigiaSummary = {
	totalRespondidos: number;
	livresDeCarie: number;
	mediaCpo: number;
	maxCpo: number;
	cpoPorBloco: CpoBracketPoint[];
	livreDeCarieePorBloco: CareFreePoint[];
};

export const summarize = (rows: VigiaRow[]): VigiaSummary => {
	const withCpo = rows.filter((row) => getCpoCount(row) !== null);

	const cpoValues = withCpo.map((row) => getCpoCount(row) as number);
	const mediaCpo = cpoValues.length ? cpoValues.reduce((sum, v) => sum + v, 0) / cpoValues.length : 0;
	const maxCpo = cpoValues.length ? Math.max(...cpoValues) : 0;

	const livresDeCarieRows = withCpo.filter((row) => getCpoCount(row) === 0);

	const cpoPorBloco: CpoBracketPoint[] = AGE_BRACKETS.map((bracket) => {
		const bracketRows = withCpo.filter((row) => getAgeBracket(row)?.label === bracket.label);

		const avg = (field: keyof VigiaRow) => {
			const values = bracketRows.map((row) => parseNum(row[field])).filter((v): v is number => v !== null);
			return values.length ? values.reduce((sum, v) => sum + v, 0) / values.length : 0;
		};

		const cariados = avg("Cariado");
		const perdidos = avg("Perdido");
		const restaurados = avg("Restaurado");

		return {
			label: bracket.label,
			cariados,
			perdidos,
			restaurados,
			total: cariados + perdidos + restaurados,
			respondentes: bracketRows.length,
		};
	}).filter((point) => point.respondentes > 0);

	const livreDeCarieePorBloco: CareFreePoint[] = AGE_BRACKETS.map((bracket) => ({
		label: bracket.label,
		count: livresDeCarieRows.filter((row) => getAgeBracket(row)?.label === bracket.label).length,
	})).filter((point) => point.count > 0);

	return {
		totalRespondidos: rows.length,
		livresDeCarie: livresDeCarieRows.length,
		mediaCpo,
		maxCpo,
		cpoPorBloco,
		livreDeCarieePorBloco,
	};
};
