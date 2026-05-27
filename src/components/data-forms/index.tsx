import React, { useCallback, useEffect, useState } from "react";
import { http } from "src/core/axios";
import { AnswersForm, AnswersFormData, FormsRegisters, requestResponse } from "./types";
import { ButtonExportData, Container, Filter, Form, Loading, Table, TableWrapper, TBody, TD, THead, TheadLine, TR, TRow } from "./styled";
import { RESPONSE } from "src/core/types";
import { INDEX_RES } from "src/modules/form/type";
import { CircularProgress, FormControl, InputLabel, Menu, MenuItem, Select } from "@mui/material";
import { saveAs } from "file-saver";
import { useSnackbar } from "notistack";
import Papa from "papaparse";
import { Download } from "@mui/icons-material";

export default function Index() {
    const [answer, setAnswer] = useState<AnswersForm[]>([]);
    const [answerFiltered, setAnswerFiltered] = useState<AnswersForm[]>([]);
    const [data, setData] = useState<FormsRegisters>(null);
    const [order, setOrder] = useState<number[]>([]);
    const [id, setId] = useState(2);
    const [forms, setForms] = useState<INDEX_RES[]>([]);
    const { enqueueSnackbar } = useSnackbar();
    const [filter, setFilter] = useState<string>("Sem filtro");
    const [response, setResponse] = useState<string[]>([]);
    const [filterSelected, setFilterSelected] = useState<string>("Sem filtro");
    const [dateFilter, setDateFilter] = useState<string>();

    const calcCPO = useCallback((answers: AnswersFormData[]): string => {
        let response = 0;

        answers.map((v) => {
            if (Number(v.answerText) > 0 && Number(v.answerText) <= 4) {
                response++;
            } else if (v.answerText == "B" || v.answerText == "C" || v.answerText == "D" || v.answerText == "E") {
                response++;
            }
        });

        response = (response / answers.length) * 10;

        if (isNaN(response)) {
            return "Sem dados registrados";
        } else {
            return `${generateResponse(response)} (${response})`;
        }
    }, []);

    const formVigiaUp = useCallback(
        async (answers: AnswersForm[], data: FormsRegisters) => {
            const questionCPO = [
                619, 618, 617, 616, 615, 614, 613, 612, 611, 608, 607, 606, 605, 604, 627, 626, 625, 624, 623, 622, 621, 620, 603, 632, 631, 630, 629,
                628, 609, 610, 633, 634, 532, 531, 501, 505, 504, 503, 502, 510, 509, 508, 507, 506, 530, 529, 528, 527, 526, 525, 524, 523, 522, 521,
                520, 519, 528, 518, 517, 516, 515, 514, 513, 512, 511,
            ];
            //[199, 200, 230, 226, 227, 228, 229, 221, 222, 223, 224, 225, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220]

            const filteredData = data.formsQuestionsFormsRegisters.filter((item) => !questionCPO.includes(item.id));
            filteredData.push({
                id: 0,
                createdAt: "now",
                deletedAt: "",
                questionId: {
                    id: 0,
                    createdAt: "now",
                    deletedAt: "",
                    recommendationMessage: "",
                    title: "Resultado CPO",
                },
            });

            answers.map((v) => {
                const answersFiltered: AnswersFormData[] = [];
                const DataNew: AnswersFormData[] = [];
                v.answers.map((item, index) => {
                    if (!questionCPO.includes(item.questionId)) {
                        answersFiltered.push(item);
                    } else {
                        DataNew.push(item);
                    }
                });

                v.answers = answersFiltered;
                const cpo = calcCPO(DataNew);
                v.answers.push({ id: 0, questionId: 0, createdAt: new Date(), answer: cpo, answerText: cpo });
            });

            data.formsQuestionsFormsRegisters = filteredData;

            setData(data);
            setAnswer(answers);
            setAnswerFiltered(answers);
            setOrder(data.formsQuestionsFormsRegisters.map((v) => v.id));
        },
        [calcCPO]
    );

    const getFormData = useCallback(async () => {
        const res: requestResponse = await http.get(`/data/form/${id}`);
        if (id == 6 || id == 5) {
            await formVigiaUp(res.data.answer, res.data.data);
        } else {
            setData(res.data.data);
            setAnswer(res.data.answer);
            setAnswerFiltered(res.data.answer);
            setOrder(res.data.data.formsQuestionsFormsRegisters.map((v) => v.id));
        }
    }, [id, formVigiaUp]);

    function generateResponse(x: number): string {
        if (x >= 0 && x <= 1.1) {
            return "muito baixo";
        } else if (x >= 1.2 && x <= 2.6) {
            return "baixo";
        } else if (x >= 2.7 && x <= 4.4) {
            return "moderado";
        } else if (x >= 4.5 && x <= 6.5) {
            return "alto";
        } else if (x >= 6.6) {
            return "muito alto";
        } else {
            return "Valor fora do intervalo";
        }
    }

    async function getTypes() {
        const res: { data: INDEX_RES[] } = await http.get("/form-registers");
        setForms(res.data);
    }

    async function exportData() {
        let formattedData: string[][] = [];

        formattedData.push(data.formsQuestionsFormsRegisters.map((v) => v.questionId.title));
        answerFiltered.map((v) => {
            const orderArray: string[] = [];

            order.map((o, index) => {
                const found = v.answers.find((ans) => ans.questionId == o);
                orderArray.push(found ? (found.answerText ? found.answerText : "Sem Resposta") : "Sem Resposta");
            });

            formattedData.push(orderArray);
        });

        if (formattedData.length > 0) {
            // Converte para CSV
            const csv = Papa.unparse(formattedData);

            // Baixa o arquivo CSV
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            saveAs(blob, `SDUFPE-Tabela_exportada_modelo_${forms.find((v) => v.id == id).title ?? "sdufpe"}.csv`);
        } else {
            enqueueSnackbar("Não existem dados para serem baixados, tente redefinir os filtros", { variant: "warning" });
        }
    }

    useEffect(() => {
        getTypes();
        getFormData();
    }, [getFormData]);

    useEffect(() => {
        if (filter != "Sem filtro") {
            if (data) {
                const questionId = data.formsQuestionsFormsRegisters.find((v) => v.questionId.title == filter);
                let newResponse: string[] = [];
                answer.map((v) => {
                    const r = v.answers.find((i) => i.questionId == questionId.id)?.answerText;
                    newResponse.push(r ?? "");
                });

                if (questionId.id == 0) {
                    newResponse = newResponse.map((item) => item.replace(/\s?\(.*?\)/, ""));
                }

                const set = Array.from(new Set(newResponse));

                setResponse(set);
            }
        } else {
            setFilterSelected("Sem filtro");

            setResponse([]);
        }
        setFilterSelected("Sem filtro");
        setAnswerFiltered(answer);
    }, [filter, answer, data]);

    useEffect(() => {
        if (filterSelected == "Sem filtro") {
            setAnswerFiltered(answer);
        } else {
            if (data) {
                const questionId = data.formsQuestionsFormsRegisters.find((v) => v.questionId.title == filter);

                const filtered = answer.filter((v) => {
                    const found = v.answers.find((f) => f.questionId == questionId.id);

                    if (found) {
                        if (found.answerText) {
                            if (found.answerText.replace(/\s?\(.*?\)/, "") === filterSelected) {
                                return true;
                            } else if (found.answerText === filterSelected) {
                                return true;
                            }
                        }
                    }

                    return false;
                });
                setAnswerFiltered(filtered);
            } else {
                console.log("SEM DATA");
            }
        }
    }, [filterSelected, answer, data, filter]);

    useEffect(() => {
        setFilterSelected("Sem filtro");
        setResponse([]);
        setFilter("Sem filtro");
        setAnswer([]);
        setData(null);
        getFormData();
    }, [id, getFormData]);

    return (
        <Container>
            <Form>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Formulário</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={id}
                        label="Formulário"
                        onChange={(value) => {
                            setId(Number(value.target.value));
                        }}
                    >
                        {forms.map((v, index) => (
                            <MenuItem key={index} value={v.id}>
                                {v.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Form>
            <Filter>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Filtro</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filter}
                        label="Filtro"
                        onChange={(v) => {
                            setFilter(v.target.value);
                        }}
                    >
                        <MenuItem value={"Sem filtro"}>Sem filtro</MenuItem>
                        {data &&
                            data.formsQuestionsFormsRegisters.map((v, idx) => (
                                <MenuItem key={idx} value={v.questionId.title}>
                                    {v.questionId.title}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label2">Resposta</InputLabel>
                    <Select
                        labelId="demo-simple-select-label2"
                        id="demo-simple-select2"
                        value={filterSelected}
                        label="Resposta"
                        onChange={(v) => {
                            setFilterSelected(v.target.value);
                        }}
                    >
                        <MenuItem value={"Sem filtro"}>Sem filtro</MenuItem>
                        {response.map((v, idx) => (
                            <MenuItem key={idx} value={v}>
                                {v}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Filter>
            {answerFiltered && data ? (
                <TableWrapper>
                    <Table>
                        <THead>
                            <TRow>
                                <TheadLine>index</TheadLine>
                                {data && data.formsQuestionsFormsRegisters.map((v) => <TheadLine key={v.id}>{v.questionId.title}</TheadLine>)}
                            </TRow>
                        </THead>
                        <TBody>
                            {answerFiltered.map((v, index) => (
                                <TR key={index}>
                                    <TD>{index}</TD>
                                    {order.map((questionId, idx) => {
                                        const found = v.answers.find((ans) => ans.questionId === questionId);
                                        return (
                                            <TD key={idx}>{found ? (found.answerText ? `${found.answerText}` : `Sem Resposta`) : `Sem Resposta`}</TD>
                                        );
                                    })}
                                </TR>
                            ))}
                        </TBody>
                    </Table>
                </TableWrapper>
            ) : (
                <Loading>
                    <CircularProgress color="primary" />
                    <p>Carregando dados</p>
                </Loading>
            )}
            <ButtonExportData onClick={exportData}>
                <Download></Download>
            </ButtonExportData>
        </Container>
    );
}
