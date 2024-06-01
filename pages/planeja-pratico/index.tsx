import { Box, Button, Paper, Typography } from "@mui/material";
import Base from "@components/base-layout/index";
import Appbar from "@components/app-bar/index";
import HomeToolbar from "@components/toolbar/home";
import { useState } from "react";
import { FirstStep } from "@components/planeja-pratico/steps/FirstStep";
import { SecondStep } from "@components/planeja-pratico/steps/SecondStep";
import { Welcome } from "@components/planeja-pratico/steps/Welcome";
import { ThirdStep } from "@components/planeja-pratico/steps/ThirdStep";
import { FourthStep } from "@components/planeja-pratico/steps/FourthStep";

interface IStepsValues {
  firstStep: IFirstStep;
  secondStep: ISecondStep;
  thirdStep: IThirdStep;
}

interface IFirstStep {
  first_domain: string;
  first_degree: number;
  first_indicator: string;
  second_domain: string;
  second_degree: number;
  second_indicator: string;
  third_domain: string;
  third_degree: number;
  third_indicator: string;
}

interface ISecondStep {
  defined_problems: IDefinedProblem[];
}
interface IThirdStep {
  mentalMapUrl: string;
  criticalNode: string;
  actions: IThirdFormStructure[];
}

interface IThirdFormStructure {
  name: string;
  responsibles: IResponsible[];
  resources: IResource[];
}

interface IResponsible {
  responsible: string;
  motivation: string;
  strategies: string;
}
interface IResource {
  resource: string;
  itsCricticalResource: string;
  described_strategies: string;
}

interface IDefinedProblem {
  id: number;
  answer: string;
}

export default function Index() {
  const [savedDataToSend, setSavedDataToSend] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(4);
  const [stepsValues, setStepsValues] = useState<IStepsValues>({
    firstStep: {
      first_domain: "",
      first_degree: null,
      first_indicator: "",
      second_domain: "",
      second_degree: null,
      second_indicator: "",
      third_domain: "",
      third_degree: null,
      third_indicator: "",
    },
    secondStep: {
      defined_problems: [
        {
          id: 1,
          answer: "",
        },
      ],
    },
    thirdStep: {
      mentalMapUrl: "",
      criticalNode: "",
      actions: [
        {
          name: "",
          responsibles: [
            {
              responsible: "",
              motivation: "",
              strategies: "",
            },
          ],
          resources: [
            {
              described_strategies: "",
              itsCricticalResource: "",
              resource: "",
            },
          ],
        },
      ],
    },
  });
  const [error, setError] = useState("");
  const data = [];
  const isLastIndex = activeIndex + 1 === data.length;

  //atualizar os valores do primeiro passo
  function handleUpdateFirstStep(values: IFirstStep) {
    console.log(values);
    setStepsValues({
      ...stepsValues,
      firstStep: values,
    });
  }

  //atualizar os valores do primeiro passo
  function handleUpdateSecondStep(values: ISecondStep) {
    console.log(values);
    setStepsValues({
      ...stepsValues,
      secondStep: values,
    });
  }
  //atualizar os valores do primeiro passo
  function handleUpdateThirdStep(values: IThirdStep) {
    console.log(values);
    setStepsValues({
      ...stepsValues,
      thirdStep: values,
    });
  }

  function nextQuestion() {
    if (!validateIfCanProcced()) return;

    setActiveIndex(activeIndex + 1);
  }

  function previusQuestion() {
    if (activeIndex === 0) return;
    setActiveIndex(activeIndex - 1);
  }

  function validateIfCanProcced() {
    //validate if all questions are answered

    // if (
    //   !Boolean(savedDataToSend[activeIndex]) ||
    //   !savedDataToSend[activeIndex].justify
    // ) {
    //   setError("Preencha a questão e justificativa antes de continuar");
    //   return false;
    // }

    return true;
  }
  //enviar o formulário

  return (
    <Base
      appBarChild={<Appbar toolbarChild={<HomeToolbar />} />}
      mainContainerChild={
        <Box
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
          <Paper elevation={1} sx={{ p: 3, my: 2, width: "100%" }}>
            <Box
              width={"100%"}
              height={"100%"}
              my={4}
              display="flex"
              flexDirection={"column"}
              gap={4}
              color={"black"}
            >
              {activeIndex === 0 && (
                <Welcome onClickNextQuestion={nextQuestion} />
              )}
              {activeIndex === 1 && (
                <FirstStep
                  stepValues={stepsValues.firstStep}
                  onSubmit={(data) => handleUpdateFirstStep(data)}
                  onClickNextStep={nextQuestion}
                  onClickPrevStep={previusQuestion}
                />
              )}
              {activeIndex === 2 && (
                <SecondStep
                  stepValues={stepsValues.secondStep}
                  onSubmit={(data) => handleUpdateSecondStep(data)}
                  onClickNextStep={nextQuestion}
                  onClickPrevStep={previusQuestion}
                />
              )}
              {activeIndex === 3 && (
                <ThirdStep
                  onClickNextStep={nextQuestion}
                  onClickPrevStep={previusQuestion}
                />
              )}
              {activeIndex === 4 && (
                <FourthStep
                  stepValues={stepsValues.thirdStep}
                  onSubmit={(data) => handleUpdateThirdStep(data)}
                  onClickNextStep={nextQuestion}
                  onClickPrevStep={previusQuestion}
                />
              )}
            </Box>
          </Paper>
        </Box>
      }
    />
  );
}
