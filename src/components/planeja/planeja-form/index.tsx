/* eslint-disable react/no-unescaped-entities */
import Base from "@components/base-layout/index";
import Appbar from "@components/app-bar/index";
import HomeToolbar from "@components/toolbar/home";
import {
  Box,
  Container,
  Grid,
  Skeleton,
  Typography,
  Divider,
  Paper,
  TextField,
  Button,
  FormHelperText,
  Alert,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import { useEffect, useState } from "react";

import { http } from "src/core/axios";
import { IChoices } from "src/core/IPlanejaResponse";
import { ProgressBarAnswer } from "@components/progressBarAnswer";
import { LoadingButton } from "@mui/lab";
import { PlanFormProps } from "./types";
import { nameForm } from 'src/constants/constantsPlaneja';
import { localStorageKeyEnum } from "src/core/enums";
import { FormResultProps } from '@components/FormResultPdf/FormResultProps.types';
import React from 'react';

interface IPlanejaResponse {
  id: number;
  title: string;
  content: string;
  choices: IChoices[];
  position: number;
}

export interface IPlanejaDataPDF {
  content: string;
  choices: IlocalStorageAnswer;
  position: number;
}

interface IlocalStorageAnswer {
  planQuestion: number;
  question_answer: string;
  justify: string;
}

interface ISavedData {
  planQuestion: number;
  userId: number;
  question_answer: string;
  justify: string;
}

interface IAnswer {
  questionId: number;
  question_answer?: string;
  justify?: string;
}

export default function PlanForm({ onFinish }: PlanFormProps) {
  const [isSendingData, setIsSendingData] = useState(false);
  const [error, setError] = useState("");
  const [errorOnSendForm, setErrorOnSendForm] = useState(false);
  const [data, setData] = useState<IPlanejaResponse[]>([]);
  const [savedDataToSend, setSavedDataToSend] = useState<ISavedData[]>([]);
  const [estabelecimentoSaude, setEstabelecimentoSaude] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [nome, setNome] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<FormResultProps>();

  const isLastIndex = activeIndex + 1 === data.length;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await http.get("plan-question");
        const formattedData = data.map((item: any) => {
          return {
            id: item.id,
            title: item.title,
            content: item.content,
            choices: formatChoice(item.choices),
            position: item.position,
          };
        });
        formattedData.sort(
          (a: IPlanejaResponse, b: IPlanejaResponse) => a.position - b.position
        );
        setData(formattedData);
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };


    const loadHistory = async () =>{      
      const historyData = await getHistory()
      let planData: ISavedData[] = historyData;

      if (planData) {
        if (Number(localStorage.getItem("userId")) == planData[0].userId) {
          setSavedDataToSend(planData);
          planData.reverse();
          setActiveIndex(planData[0].planQuestion);
        } else {
          localStorage.removeItem("plan-form");
        }
      }
    }

    fetchData();
    loadHistory();
  }, []);

  async function getHistory(){
    const payload = {
      id: localStorage.getItem("userId"),
      form: nameForm.teoric
    }    

    const result = await http.post("/history/", payload).then(r => {
      return r.data as ISavedData[];
    }).catch(error => {
      console.error('Erro ao obter o histórico:', error);
      throw error; // Lançar erro para tratamento posterior
    });

    return result;
  }

  async function setHistory(newData: ISavedData[]) {
    const payload = {
      id: localStorage.getItem("userId"),
      form: nameForm.teoric,
      data: newData,
      finished: false,
    }    

    const result = await http.put("/history/", payload).then(r => {
      return r.data as ISavedData[];
    }).catch(error => {
      console.error('Erro ao obter o histórico:', error);
      throw error; // Lançar erro para tratamento posterior
    });
  }

  async function finishHistory(newData: IPlanejaDataPDF[]) {
    const payload = {
      id: localStorage.getItem("userId"),
      form: nameForm.teoric,
      data: newData,
      finished: true,
    }    

    const result = await http.put("/history/", payload)
  }

  function handleAnswer({ questionId, question_answer, justify }: IAnswer) {
    const savedData = {
      planQuestion: questionId,
      userId: Number(localStorage.getItem(localStorageKeyEnum.USER_ID)),
      question_answer,
      justify,
    };

    //check if the answer is already saved
    const existingData = savedDataToSend.find(
      (item) => item.planQuestion === questionId
    );

    if (existingData) {
      //update the existing answer
      const updatedData = savedDataToSend.map((item) => {
        if (item.planQuestion === questionId) {
          return {
            ...item,
            question_answer,
            justify,
          };
        }
        return item;
      });
      setSavedDataToSend(updatedData);
    } else {
      //save the new answer
      setSavedDataToSend([...savedDataToSend, savedData]);
    }
  }

  function formatChoice(choice: string): IChoices[] {
    const newStr = choice.replace(/''/g, '""');
    const formattedJSON = newStr.replace(/'/g, '"');

    return JSON.parse(formattedJSON);
  }

  function findChoiceByQuestionId() {
    return savedDataToSend.find(
      (item) => item.planQuestion === data[activeIndex].position
    );
  }

  function calculateLeftCaracteres(text: string, limit?: number) {
    if (!text) return 100;
    if (limit - text.length < 0) return 0;
    return limit - text.length;
  }

  function nextQuestion() {
    if (!validateIfCanProcced()) return;
    if (activeIndex === data.length - 1) return;
    saveQuestionResponse(savedDataToSend[activeIndex]);
    setActiveIndex(activeIndex + 1);
  }

  async function saveQuestionResponse(data: ISavedData) {
    let newData: ISavedData[] = [];
    let isNew = true;
    const history = await getHistory();
    if (history) {
      newData = history
      newData.forEach((element) => {
        if (data.planQuestion == element.planQuestion) {
          element.justify = data.justify;
          isNew = false;
          return;
        }
      });
    }
    if (isNew) newData.push(data);

    setHistory(newData);
  }

  function previusQuestion() {
    if (activeIndex === 0) return;
    setActiveIndex(activeIndex - 1);
  }

  function validateIfCanProcced() {
    //validate if all questions are answered

    // se é a última questão, então não existe uma quantidade minima de caracteres, já que se trata da opinião e o email
    if (activeIndex === 8) {
      setError("");
      return true;
    }

    if (
      !Boolean(savedDataToSend[activeIndex]) ||
      !savedDataToSend[activeIndex].justify
    ) {
      setError("Preencha a questão e justificativa antes de continuar");
      return false;
    }

    if (savedDataToSend[activeIndex].justify.length < 100) {
      setError("O campo de justificativa deve ter pelo menos 100 caracteres");
      return false;
    }
    setError("");
    return true;
  }

  async function sendData(payload: ISavedData[]) {
    try {
      setIsSendingData(true);

      //procura a questão com id 9 e adciona os valores no question_answer com os valores estabelecimentoSaude e municipio
      const payloadToSend: ISavedData[] = payload.map((item) => ({ ...item }));
      saveFinished(payloadToSend);
      payloadToSend.forEach((item) => {
        if (item.planQuestion === 9) {
          item.question_answer = `Email: ${item.question_answer}, Estabelecimento: ${estabelecimentoSaude}, Municipio: ${municipio}, Nome completo: ${nome}`;
        }
      });

      //descomentar
      const { data } = await http.post("/plan-question-answer", payloadToSend);
      if (data === "Sucesso") {
        onFinish();
      } else {
        setErrorOnSendForm(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSendingData(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validateIfCanProcced() && savedDataToSend.length === data.length) {
      sendData(savedDataToSend);
    } else {
      // caso seja a última questão(opinião e email), nós limpamos os erros
      if (activeIndex === 8) {
        setError("");
      } else {
        setError("Preencha a questão e justificativa antes de continuar");
      }
    }
  }

  async function saveFinished(dataToSend :ISavedData[]) {
    const dataPDF: IPlanejaDataPDF[] = []
    const localStorageAnswer: IlocalStorageAnswer[] = dataToSend;

    data.forEach(element => {
      const init: string = element.content.slice(element.content.search("REFLETINDO<br />"));
      const indexText: number = init.search("/>")
      const indexStyle: number = init.search("</p>")
      const titleQuestion: string = init.slice(indexText+2, indexStyle)

      const choice = localStorageAnswer.find(item => item.planQuestion == element.id)

      if (element.id != 9) dataPDF.push({content: titleQuestion, choices: choice, position: element.position})
    });

    finishHistory(dataPDF);
  }

  return (
    <Base
      appBarChild={<Appbar toolbarChild={<HomeToolbar />} />}
      mainContainerChild={
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            marginY: "6rem",
            display: "flex",
            marginX: "auto",
            flexDirection: "column",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
            paddingY: "50px",
            paddingX: "40px",
          }}
        >
          {isLoading ? (
            <Grid container columns={{ xs: 1, md: 1 }} gap={10}>
              <Grid item xs={2}>
                <Skeleton variant="rectangular" width="100%" height={40} />
              </Grid>
              <Grid item xs={2}>
                <Skeleton variant="rectangular" width="100%" height={200} />
              </Grid>
            </Grid>
          ) : (
            <>
              <ProgressBarAnswer
                answeredQuestions={activeIndex + 1}
                totalQuestions={data.length}
              />
              <Paper elevation={1} sx={{ p: 3, my: 2, width: "100%" }}>
                <Grid container columns={{ xs: 1, md: 1 }} gap={4}>
                  <Grid item xs={2}>
                    <Typography
                      sx={{ color: "ButtonFace" }}
                      textAlign={"center"}
                      variant="subtitle1"
                    >
                      Questão {activeIndex + 1} / {data.length}
                    </Typography>

                    <Box sx={{ width: "100%" }}></Box>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data[activeIndex].title,
                      }}
                    ></div>
                  </Grid>
                  <Grid item xs={2}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data[activeIndex].content,
                      }}
                    ></div>

                    <Divider sx={{ mt: 4 }} />
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth>
                      {/* Verificar se o id da questão é 9, se for, devemos exibir o input de texto da opinião e o campo de email: TODO - Melhorar esse tipo de valição de id por algo diferente, como tag ou tipo de pergunta */}
                      {data[activeIndex].id === 9 ? (
                        <>
                          <TextField
                            label="Opinião"
                            multiline
                            rows={4}
                            fullWidth
                            value={findChoiceByQuestionId()?.justify ?? ""}
                            onChange={(e) =>
                              handleAnswer({
                                questionId: data[activeIndex].id,
                                question_answer:
                                  findChoiceByQuestionId()?.question_answer,
                                justify: e.target.value,
                              })
                            }
                          />
                          <FormHelperText>
                            O campo deve conter pelo menos 100 caracteres -
                            Faltam{" "}
                            {calculateLeftCaracteres(
                              findChoiceByQuestionId()?.justify,
                              100
                            )}
                          </FormHelperText>
                          <TextField
                            label="Seu nome completo"
                            rows={4}
                            sx={{ mt: 3 }}
                            fullWidth
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                          />
                          <TextField
                            label="Seu melhor e-mail"
                            rows={4}
                            sx={{ mt: 3 }}
                            fullWidth
                            type="email"
                            value={
                              findChoiceByQuestionId()?.question_answer ?? ""
                            }
                            onChange={(e) =>
                              handleAnswer({
                                questionId: data[activeIndex].id,
                                question_answer: e.target.value,
                                justify: findChoiceByQuestionId()?.justify,
                              })
                            }
                          />
                          <TextField
                            label="Estabelecimento de Saúde"
                            rows={4}
                            sx={{ mt: 3 }}
                            fullWidth
                            type="text"
                            value={estabelecimentoSaude}
                            onChange={(e) =>
                              setEstabelecimentoSaude(e.target.value)
                            }
                          />
                          <FormHelperText>
                            (caso seja pesquisador, deixe esse campo em branco)
                          </FormHelperText>
                          <TextField
                            label="Município"
                            rows={4}
                            sx={{ mt: 3 }}
                            fullWidth
                            type="text"
                            value={municipio}
                            onChange={(e) => setMunicipio(e.target.value)}
                          />
                          <FormHelperText>
                            (caso seja pesquisador, deixe esse campo em branco)
                          </FormHelperText>
                        </>
                      ) : (
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          {data[activeIndex].choices.map((choice, index) => (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                              key={index}
                            >
                              <FormControlLabel
                                checked={
                                  findChoiceByQuestionId()?.question_answer ===
                                  choice.option_label
                                }
                                value={choice.option_label}
                                control={<Radio />}
                                label={choice.option_label}
                                onChange={() =>
                                  handleAnswer({
                                    questionId: data[activeIndex].id,
                                    question_answer: choice.option_label,
                                    justify: findChoiceByQuestionId()?.justify,
                                  })
                                }
                              />
                              {findChoiceByQuestionId()?.question_answer ===
                                choice.option_label && (
                                <Box>
                                  <TextField
                                    sx={{ my: 2, maxWidth: "50%" }}
                                    label={choice.justify_answer_label}
                                    fullWidth
                                    value={
                                      findChoiceByQuestionId()?.justify ?? ""
                                    }
                                    onChange={(e) =>
                                      handleAnswer({
                                        questionId: data[activeIndex].id,
                                        question_answer:
                                          findChoiceByQuestionId()
                                            ?.question_answer,
                                        justify: e.target.value,
                                      })
                                    }
                                  />
                                  <FormHelperText id={index + ""}>
                                    O campo deve conter pelo menos 100
                                    caracteres. Faltam{" "}
                                    {calculateLeftCaracteres(
                                      findChoiceByQuestionId()?.justify,
                                      100
                                    )}
                                  </FormHelperText>
                                </Box>
                              )}
                            </div>
                          ))}
                        </RadioGroup>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                {error && <Typography color="error">{error}</Typography>}
                <Box display={"flex"} flexDirection={"column"} gap={1} mt={4}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={"flex-end"}
                    gap={4}
                  >
                    <Button onClick={previusQuestion} variant="outlined">
                      Anterior
                    </Button>
                    {isSendingData ? (
                      <LoadingButton
                        size="small"
                        loading={true}
                        variant="outlined"
                        disabled
                      >
                        <span>Enviando...</span>
                      </LoadingButton>
                    ) : (
                      <Button
                        disabled={isSendingData}
                        onClick={nextQuestion}
                        variant="contained"
                        color="primary"
                        type={isLastIndex ? "submit" : "button"}
                      >
                        {isLastIndex ? "Finalizar" : "Próxima"}
                      </Button>
                    )}
                  </Box>

                  {errorOnSendForm && (
                    <Alert
                      sx={{ maxWidth: "max-content", ml: "auto" }}
                      severity="error"
                    >
                      Ocorreu um erro ao enviar o formulário
                    </Alert>
                  )}
                </Box>
              </Paper>
            </>
          )}
        </Box>
      }
    />
  );
}
