import React, { useCallback, useEffect, useMemo, useState } from "react";
import { TableWrapper, StyledTable, THead, TBody, Container, TableWrapperOuter, TitleTHead, ThDiv, LeftBar, OptionLeftBar } from "./styled";
import { StyledSelect, StyledOption } from "./styled";
import { AnswersForm, AnswersFormData, formsQuestionsFormsRegisters, requestResponse } from "@components/data-forms/types";
import { http } from "src/core/axios";
import { INDEX_RES } from "src/pages/form/type";
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
}

export default function Table({ form, setUpdatedAt, isLoading, setIsLoading }: Props) {
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

        setFilteredAnswers(answersF);
    }, [filters]);

    useEffect(() => {
        setIsLoading(false);
        setFilteredAnswers(answers);
    }, [answers]);

    useEffect(() => {
        getForm();
    }, [form]);

    return isLoading ? (
        <Loading sx={{ height: "50vh" }} sxSpinner={{ width: "10vh", height: "10vh" }} fontSize="24px" />
    ) : (
        <Container>
            <TableWrapperOuter>
                <TableWrapper>
                    <StyledTable>
                        <THead>
                            <tr>
                                {columns.map((col, i) => (
                                    <th key={i}>
                                        <ThDiv>
                                            <TitleTHead>{col.questionId.title}</TitleTHead>
                                            <StyledSelect
                                                name="versao"
                                                value={valuesSelect.find((vs) => vs.id == col.id).value}
                                                onChange={(e) => {
                                                    const value = e.currentTarget.value;
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
                                            >
                                                <StyledOption key={0} value={"0"}>
                                                    Selecionar Tudo
                                                </StyledOption>
                                                {getAnswersByQuestionId(col.questionId.id).map((v, index) => (
                                                    <StyledOption key={index + 1} value={formatAnswerText(v.answerText)}>
                                                        {formatAnswerText(v.answerText)}
                                                    </StyledOption>
                                                ))}
                                            </StyledSelect>
                                        </ThDiv>
                                    </th>
                                ))}
                            </tr>
                        </THead>
                        <TBody>
                            {filteredAnswers.map((a, i) => (
                                <tr key={i}>
                                    {orderQuestions.map((questionId, j) => {
                                        const text = a.answers.find((o) => o.questionId === questionId);
                                        return <td key={j}>{text ? formatAnswerText(text.answerText) : "Não Informado"}</td>;
                                    })}
                                </tr>
                            ))}
                        </TBody>
                    </StyledTable>
                </TableWrapper>
            </TableWrapperOuter>
            <LeftBar>
                <OptionLeftBar onClick={() => getForm(true)}>
                    <ReplayIcon sx={{ fontSize: 32 }} />
                    <h2>Atualizar</h2>
                </OptionLeftBar>
                <OptionLeftBar onClick={() => exportToCSV(filteredAnswers, columns, orderQuestions, form.title)}>
                    <DownloadIcon sx={{ fontSize: 32 }} />
                    <h2>Baixar</h2>
                </OptionLeftBar>
            </LeftBar>
        </Container>
    );
}
