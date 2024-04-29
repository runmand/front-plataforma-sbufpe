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

interface IPlanejaResponse {
  id: number;
  title: string;
  content: string;
  choices: IChoices[];
  position: number;
}

interface ISavedData {
  plan_question_id: number;
  user_id: number;
  answer: string;
  justify: string;
}

interface IAnswer {
  questionId: number;
  answer?: string;
  justify?: string;
}

export default function PlanForm({ onFinish }: PlanFormProps) {
  const [isSendingData, setIsSendingData] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<IPlanejaResponse[]>([]);
  const [savedDataToSend, setSavedDataToSend] = useState<ISavedData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
        console.log(data);
        setData(formattedData);
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  function handleAnswer({ questionId, answer, justify }: IAnswer) {
    const savedData = {
      plan_question_id: questionId,
      user_id: 1,
      answer,
      justify,
    };

    //check if the answer is already saved
    const existingData = savedDataToSend.find(
      (item) => item.plan_question_id === questionId
    );

    console.log(existingData);

    if (existingData) {
      //update the existing answer
      const updatedData = savedDataToSend.map((item) => {
        if (item.plan_question_id === questionId) {
          return {
            ...item,
            answer,
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
    console.log(formattedJSON);

    return JSON.parse(formattedJSON);
  }

  function findChoiceByQuestionId() {
    return savedDataToSend.find(
      (item) => item.plan_question_id === data[activeIndex].position
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
    setActiveIndex(activeIndex + 1);
  }

  function previusQuestion() {
    if (activeIndex === 0) return;
    setActiveIndex(activeIndex - 1);
  }

  function validateIfCanProcced() {
    //validate if all questions are answered

    if (
      !Boolean(savedDataToSend[activeIndex]) ||
      !savedDataToSend[activeIndex].justify
    ) {
      setError("Preencha a questão e justificativa antes de continuar");
      return false;
    }

    if (
      savedDataToSend[activeIndex].justify.length < 100 ||
      savedDataToSend[activeIndex].justify.length > 500
    ) {
      setError(
        "O campo de justificativa deve ter pelo menos 100 caracteres e menos que 500 caracteres"
      );
      return false;
    }
    setError("");
    return true;
  }

  async function sendData() {
    try {
      setIsSendingData(true);
      await http.post("/plan-question-answer");
      onFinish();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSendingData(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validateIfCanProcced() && savedDataToSend.length === data.length) {
      sendData();
    } else {
      setError("Preencha a questão e justificativa antes de continuar");
    }
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
                    <Typography sx={{ color: "black" }} variant="h5">
                      {data[activeIndex].title}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography sx={{ color: "black" }} variant="h6">
                      {data[activeIndex].content}
                    </Typography>
                    <Divider sx={{ mt: 4 }} />
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        {data[activeIndex].choices.map((choice, index) => (
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                            key={index}
                          >
                            <FormControlLabel
                              checked={
                                findChoiceByQuestionId()?.answer ===
                                choice.option_label
                              }
                              value={choice.option_label}
                              control={<Radio />}
                              label={choice.option_label}
                              onChange={() =>
                                handleAnswer({
                                  questionId: data[activeIndex].id,
                                  answer: choice.option_label,
                                  justify: findChoiceByQuestionId()?.justify,
                                })
                              }
                            />
                            {findChoiceByQuestionId()?.answer ===
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
                                      answer: findChoiceByQuestionId()?.answer,
                                      justify: e.target.value,
                                    })
                                  }
                                />
                                <FormHelperText id={index + ""}>
                                  O campo deve conter pelo menos 100 caracteres
                                  e menos que 500 caracteres - Faltam{" "}
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
                    </FormControl>
                  </Grid>
                </Grid>
                {error && <Typography color="error">{error}</Typography>}
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
                    >
                      {activeIndex + 1 === data.length
                        ? "Finalizar"
                        : "Próxima"}
                    </Button>
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
