import React, { useCallback, useEffect, useMemo, useState } from "react";
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
} from "./styled";
import Dropdown from "@components/dropdown";
import { AnswersForm, AnswersFormData, formsQuestionsFormsRegisters, requestResponse } from "@components/data-forms/types";
import { http } from "src/core/axios";
import { INDEX_RES } from "src/modules/form/type";
import { ID } from "src/core/types";
import DownloadIcon from "@mui/icons-material/Download";
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

export default function Table({ form, setUpdatedAt, isLoading, setIsLoading, version }: Props) {
    const [columns, setColumns] = useState<formsQuestionsFormsRegisters[]>([]);
    const [answers, setAnswers] = useState<AnswersForm[]>([]);
    const [orderQuestions, setOrderQuestions] = useState<number[]>([]);
    const [filteredAnswers, setFilteredAnswers] = useState<AnswersForm[]>([]);
    const [tempData, setTempData] = useState<{ id: ID; data: requestResponse; date: Date }[]>([]);
    const [filters, setFilters] = useState<{ id: number; response: string }[]>([]);
    const [valuesSelect, setValuesSelect] = useState<{ id: number; value: string }[]>([]);

    const getForm = useCallback(
        async (reload: boolean = false) => {
            setIsLoading(true);
            const finded = tempData.find((v) => v.id == form.id);
            let res: requestResponse = undefined;

            if (!reload && finded != undefined) {
                res = finded.data;
                setUpdatedAt(finded.date);
            } else if (Number(form.id) == 7) {
                const resPlaneja = await http.get(`/data/form/${form.id}`);
                res = convertPlanejaTeoricoToForm(resPlaneja.data);
            } else if (Number(form.id) == 8) {
                const resPlaneja = await http.get(`/data/form/${form.id}`);
                res = convertPlanejaPraticoToForm(resPlaneja.data);
            } else {
                res = await http.get(`/data/form/${form.id}`);
                setUpdatedAt(new Date());
            }

            const columnsData = res.data.data.formsQuestionsFormsRegisters;

            setColumns(columnsData);
            setAnswers(res.data.answer.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
            const order: number[] = [];

            columnsData.map((d) => {
                order.push(d.questionId.id);
            });

            columnsData.map((c) =>
                setValuesSelect((prev) => {
                    return [...prev, { id: c.id, value: "0" }];
                })
            );

            setOrderQuestions(order);

            setTempData((prev) => {
                const exists = prev.findIndex((o) => o.id === form.id);

                if (exists !== -1) {
                    const updated = [...prev];
                    updated[exists] = { id: form.id, data: res, date: new Date() };
                    return updated;
                }

                return [...prev, { id: form.id, data: res, date: new Date() }];
            });
        },
        [form]
    );

    const formatAnswerText = (text: string) => {
        if (text == undefined) {
            return "Não Informado";
        } else if (text == "") {
            return "Não respondido";
        } else {
            return text;
        }
    };

    const getAnswersByQuestionId = (id: number): AnswersFormData[] => {
        return filteredAnswers
            .flatMap((a) => a.answers)
            .filter((a) => a.questionId === id)
            .filter((a, index, self) => index === self.findIndex((o) => o.answerText === a.answerText));
    };

    const Filter = useMemo(() => {
        let answersF: AnswersForm[] = answers;

        filters.map((v, i) => {
            if (v.response != "0") {
                if (v.response == "Não respondido")
                    answersF = answersF.filter((a) => a.answers.find((aa) => aa.questionId == v.id && aa.answerText == ""));
                else if (v.response == "Não Informado")
                    answersF = answersF.filter((a) => a.answers.find((aa) => aa.questionId == v.id && aa.answerText == undefined));
                else answersF = answersF.filter((a) => a.answers.find((aa) => aa.questionId == v.id && aa.answerText == v.response));
            }
        });

        if (version.id == 1) {
            answersF = answersF.filter((a) => {
                const date = new Date(a.date);
                return date.getFullYear() > 2026;
            });
        } else {
            answersF = answersF.filter((a) => {
                const date = new Date(a.date);
                return date.getFullYear() < 2026;
            });
        }

        setFilteredAnswers(answersF);
        setIsLoading(false);
    }, [filters, version]);

    useEffect(() => {
        setIsLoading(false);
        setFilteredAnswers(answers);
    }, [answers]);

    useEffect(() => {
        getForm();
    }, [form]);

    const hasRows = filteredAnswers.length > 0;

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
                        <ActionButton type="button" onClick={() => getForm(true)} disabled={isLoading}>
                            <ReplayIcon sx={{ fontSize: 20 }} />
                            <span>Atualizar</span>
                        </ActionButton>
                        <ActionButton
                            type="button"
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
                    <TableWrapper>
                        <StyledTable>
                            <THead>
                                <tr>
                                    {columns.map((col, i) => {
                                        const selected = valuesSelect.find((vs) => vs.id == col.id)?.value ?? "0";

                                        return (
                                            <th key={i} title={col.questionId.title}>
                                                <ThDiv>
                                                    <TitleTHead>{col.questionId.title}</TitleTHead>
                                                    <Dropdown
                                                        variant="icon"
                                                        align="right"
                                                        active={selected !== "0"}
                                                        label={selected === "0" ? "Filtrar coluna" : `Filtro: ${selected}`}
                                                        value={selected}
                                                        options={[
                                                            { value: "0", label: "Selecionar Tudo" },
                                                            ...getAnswersByQuestionId(col.questionId.id).map((v) => ({
                                                                value: formatAnswerText(v.answerText),
                                                                label: formatAnswerText(v.answerText),
                                                            })),
                                                        ]}
                                                        onChange={(value) => {
                                                            setFilters((prev) => {
                                                                const exists = prev.findIndex((o) => o.id === col.id);
                                                                if (value === "0") {
                                                                    return prev.filter((o) => o.id !== col.id);
                                                                }
                                                                if (exists !== -1) {
                                                                    const updated = [...prev];
                                                                    updated[exists] = { id: col.id, response: value };
                                                                    return updated;
                                                                }
                                                                return [...prev, { id: col.id, response: value }];
                                                            });

                                                            setValuesSelect((prev) => {
                                                                const exists = prev.findIndex((o) => o.id === col.id);
                                                                if (exists !== -1) {
                                                                    const updated = [...prev];
                                                                    updated[exists] = { id: col.id, value: value };
                                                                    return updated;
                                                                }
                                                                return [...prev, { id: col.id, value: value }];
                                                            });
                                                        }}
                                                    />
                                                </ThDiv>
                                            </th>
                                        );
                                    })}
                                </tr>
                            </THead>
                            <TBody>
                                {filteredAnswers.map((a, i) => (
                                    <tr key={i}>
                                        {orderQuestions.map((questionId, j) => {
                                            const text = a.answers.find((o) => o.questionId === questionId);
                                            const value = text ? formatAnswerText(text.answerText) : "Não Informado";
                                            return (
                                                <td key={j} title={value}>
                                                    <CellText>{value}</CellText>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </TBody>
                        </StyledTable>
                    </TableWrapper>
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
