import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    TableWrapper,
    StyledTable,
    THead,
    TBody,
    Container,
    TableWrapperOuter,
    TitleTHead,
    ThDiv,
    NoData,
    Toolbar,
    ToolbarInfo,
    ToolbarActions,
    ActionButton,
    CellText,
    Pagination,
    PaginationControls,
    PaginationButton,
} from "./styled";
import Dropdown from "@components/dropdown";
import { AnswersForm, AnswersFormData, formsQuestionsFormsRegisters, requestResponse } from "@components/data-forms/types";
import { http } from "src/core/axios";
import { INDEX_RES } from "src/modules/form/type";
import { ID } from "src/core/types";
import DownloadIcon from "@mui/icons-material/Download";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ReplayIcon from "@mui/icons-material/Replay";
import Loading from "@components/loading";
import { convertPlanejaPraticoToForm, convertPlanejaTeoricoToForm } from "./converter";
import { exportToCSV } from "./exportToCSV";

interface Props {
    form: INDEX_RES;
    setUpdatedAt: React.Dispatch<React.SetStateAction<Date>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    version: INDEX_RES;
}

type CachedForm = { data: requestResponse; date: Date };

const ROWS_PER_PAGE = 50;

function formatAnswerText(text: string | null | undefined) {
    if (text === null || text === undefined) return "Não Informado";
    if (text === "") return "Não respondido";
    return text;
}

function getAnswerIndex(answer: AnswersForm) {
    const answersByQuestion = new Map<number, AnswersFormData>();

    for (const answerData of answer.answers) {
        // Mantém a mesma escolha do Array.find usado anteriormente: a primeira resposta da pergunta.
        if (!answersByQuestion.has(answerData.questionId)) {
            answersByQuestion.set(answerData.questionId, answerData);
        }
    }

    return answersByQuestion;
}

export default function Table({ form, setUpdatedAt, isLoading, setIsLoading, version }: Props) {
    const [columns, setColumns] = useState<formsQuestionsFormsRegisters[]>([]);
    const [answers, setAnswers] = useState<AnswersForm[]>([]);
    const [filters, setFilters] = useState<Map<number, string>>(new Map());
    const [page, setPage] = useState(1);
    const cachedFormsRef = useRef<Map<ID, CachedForm>>(new Map());
    const latestRequestRef = useRef(0);

    const getForm = useCallback(
        async (reload = false) => {
            const requestId = ++latestRequestRef.current;
            setIsLoading(true);

            try {
                const cached = cachedFormsRef.current.get(form.id);
                let response: requestResponse;
                let updatedAt: Date;

                if (!reload && cached) {
                    response = cached.data;
                    updatedAt = cached.date;
                } else if (Number(form.id) === 7) {
                    const planejaResponse = await http.get(`/data/form/${form.id}`);
                    response = convertPlanejaTeoricoToForm(planejaResponse.data);
                    updatedAt = new Date();
                } else if (Number(form.id) === 8) {
                    const planejaResponse = await http.get(`/data/form/${form.id}`);
                    response = convertPlanejaPraticoToForm(planejaResponse.data);
                    updatedAt = new Date();
                } else {
                    response = await http.get(`/data/form/${form.id}`);
                    updatedAt = new Date();
                }

                if (requestId !== latestRequestRef.current) return;

                const columnsData = response.data.data.formsQuestionsFormsRegisters;
                setColumns(columnsData);
                setAnswers(response.data.answer.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
                cachedFormsRef.current.set(form.id, { data: response, date: updatedAt });
                setUpdatedAt(updatedAt);
            } catch {
                if (requestId === latestRequestRef.current) {
                    setColumns([]);
                    setAnswers([]);
                }
            } finally {
                if (requestId === latestRequestRef.current) {
                    setIsLoading(false);
                }
            }
        },
        [form.id, setIsLoading, setUpdatedAt]
    );

    useEffect(() => {
        setFilters(new Map());
        setPage(1);
        setColumns([]);
        setAnswers([]);
        getForm();

        return () => {
            latestRequestRef.current += 1;
        };
    }, [form.id, getForm]);

    useEffect(() => {
        setPage(1);
    }, [version.id]);

    const orderQuestions = useMemo(() => columns.map((column) => column.questionId.id), [columns]);

    const answerIndexes = useMemo(() => {
        const indexes = new Map<AnswersForm, Map<number, AnswersFormData>>();
        for (const answer of answers) {
            indexes.set(answer, getAnswerIndex(answer));
        }
        return indexes;
    }, [answers]);

    const filteredAnswers = useMemo(() => {
        let filtered = answers;

        filters.forEach((response, questionId) => {
            if (response === "0") return;

            filtered = filtered.filter((answer) => {
                const answerText = answerIndexes.get(answer)?.get(questionId)?.answerText;

                if (response === "Não respondido") return answerText === "";
                if (response === "Não Informado") return answerText === null || answerText === undefined;
                return answerText === response;
            });
        });

        // A regra de versões existente é preservada para não alterar a leitura histórica dos dados.
        return filtered.filter((answer) => {
            const year = new Date(answer.date).getFullYear();
            return Number(version.id) === 1 ? year > 2026 : year < 2026;
        });
    }, [answerIndexes, answers, filters, version.id]);

    const filterOptionsByQuestion = useMemo(() => {
        const valuesByQuestion = new Map<number, Set<string>>();

        for (const answer of filteredAnswers) {
            for (const answerData of answer.answers) {
                const values = valuesByQuestion.get(answerData.questionId) ?? new Set<string>();
                values.add(formatAnswerText(answerData.answerText));
                valuesByQuestion.set(answerData.questionId, values);
            }
        }

        return valuesByQuestion;
    }, [filteredAnswers]);

    const totalPages = Math.max(1, Math.ceil(filteredAnswers.length / ROWS_PER_PAGE));
    const currentPage = Math.min(page, totalPages);
    const pageStart = (currentPage - 1) * ROWS_PER_PAGE;
    const visibleAnswers = useMemo(
        () => filteredAnswers.slice(pageStart, pageStart + ROWS_PER_PAGE),
        [filteredAnswers, pageStart]
    );
    const hasRows = filteredAnswers.length > 0;
    const pageEnd = Math.min(pageStart + ROWS_PER_PAGE, filteredAnswers.length);

    const updateFilter = useCallback((questionId: number, value: string) => {
        setFilters((previous) => {
            const next = new Map(previous);
            if (value === "0") {
                next.delete(questionId);
            } else {
                next.set(questionId, value);
            }
            return next;
        });
        setPage(1);
    }, []);

    return (
        <Container>
            <TableWrapperOuter>
                <Toolbar>
                    <ToolbarInfo>
                        {isLoading ? (
                            "Carregando registros..."
                        ) : (
                            <>
                                <strong>{filteredAnswers.length}</strong> {filteredAnswers.length === 1 ? "registro" : "registros"}
                            </>
                        )}
                    </ToolbarInfo>
                    <ToolbarActions>
                        <ActionButton type="button" aria-label="Atualizar" onClick={() => getForm(true)} disabled={isLoading}>
                            <ReplayIcon sx={{ fontSize: 20 }} />
                            <span>Atualizar</span>
                        </ActionButton>
                        <ActionButton
                            type="button"
                            aria-label="Baixar CSV"
                            $variant="solid"
                            onClick={() => exportToCSV(filteredAnswers, columns, orderQuestions, form.title)}
                            disabled={isLoading || !hasRows}
                        >
                            <DownloadIcon sx={{ fontSize: 20 }} />
                            <span>Baixar CSV</span>
                        </ActionButton>
                    </ToolbarActions>
                </Toolbar>

                {isLoading ? (
                    <Loading sx={{ flex: 1, minHeight: "180px" }} sxSpinner={{ width: "56px", height: "56px" }} fontSize="16px" />
                ) : hasRows ? (
                    <>
                        <TableWrapper>
                            <StyledTable>
                                <THead>
                                    <tr>
                                        {columns.map((column) => {
                                            const selected = filters.get(column.questionId.id) ?? "0";
                                            const filterOptions = filterOptionsByQuestion.get(column.questionId.id) ?? new Set<string>();

                                            return (
                                                <th key={column.id} title={column.questionId.title}>
                                                    <ThDiv>
                                                        <TitleTHead>{column.questionId.title}</TitleTHead>
                                                        <Dropdown
                                                            variant="icon"
                                                            align="right"
                                                            active={selected !== "0"}
                                                            label={selected === "0" ? "Filtrar coluna" : `Filtro: ${selected}`}
                                                            value={selected}
                                                            options={[
                                                                { value: "0", label: "Selecionar Tudo" },
                                                                ...Array.from(filterOptions, (value) => ({ value, label: value })),
                                                            ]}
                                                            onChange={(value) => updateFilter(column.questionId.id, value)}
                                                        />
                                                    </ThDiv>
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </THead>
                                <TBody>
                                    {visibleAnswers.map((answer, rowIndex) => {
                                        const answersByQuestion = answerIndexes.get(answer);
                                        return (
                                            <tr key={`${answer.userId}-${new Date(answer.date).getTime()}-${pageStart + rowIndex}`}>
                                                {orderQuestions.map((questionId, columnIndex) => {
                                                    const value = formatAnswerText(answersByQuestion?.get(questionId)?.answerText);
                                                    return (
                                                        <td key={columnIndex} title={value}>
                                                            <CellText>{value}</CellText>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </TBody>
                            </StyledTable>
                        </TableWrapper>
                        <Pagination aria-label="Paginação da tabela">
                            <span aria-live="polite" style={{ color: "#6b7280", fontSize: "14px" }}>
                                Exibindo {pageStart + 1}–{pageEnd} de {filteredAnswers.length} registros (50 por página)
                            </span>
                            <PaginationControls>
                                <PaginationButton
                                    type="button"
                                    onClick={() => setPage(1)}
                                    disabled={currentPage === 1}
                                    aria-label="Ir para a primeira página"
                                >
                                    <FirstPageIcon aria-hidden="true" />
                                    <span>Primeira</span>
                                </PaginationButton>
                                <PaginationButton
                                    type="button"
                                    onClick={() => setPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    aria-label="Ir para a página anterior"
                                >
                                    <NavigateBeforeIcon aria-hidden="true" />
                                    <span>Anterior</span>
                                </PaginationButton>
                                <span aria-current="page" style={{ color: "#1c1917", fontSize: "14px" }}>
                                    <span className="page-desktop">Página {currentPage} de {totalPages}</span>
                                    <span className="page-mobile">{currentPage} / {totalPages}</span>
                                </span>
                                <PaginationButton
                                    type="button"
                                    onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    aria-label="Ir para a próxima página"
                                >
                                    <NavigateNextIcon aria-hidden="true" />
                                    <span>Próxima</span>
                                </PaginationButton>
                                <PaginationButton
                                    type="button"
                                    onClick={() => setPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                    aria-label="Ir para a última página"
                                >
                                    <LastPageIcon aria-hidden="true" />
                                    <span>Última</span>
                                </PaginationButton>
                            </PaginationControls>
                        </Pagination>
                    </>
                ) : (
                    <NoData>
                        <h1>Sem dados</h1>
                        <p>Nenhum registro encontrado para o formulário e a versão selecionados.</p>
                    </NoData>
                )}
            </TableWrapperOuter>
        </Container>
    );
}
