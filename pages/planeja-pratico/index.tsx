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
import { FinishFormStep } from "@components/planeja-pratico/steps/FinishFormStep";

interface IStepsValues {
  firstStep: IFirstStep[];
  secondStep: ISecondStep;
  thirdStep: IThirdStep;
  fourthStep: IFourthStep;
}

interface IFirstStep {
  domain: string;
  first_indicator: string;
  first_degree: number;
  second_indicator: string;
  second_degree: number;
}

interface ISecondStep {
  defined_problems: IDefinedProblem[];
}

interface IThirdStep {
  causas: ICouses[];
}

interface ICouses {
  id: number;
  causa: string;
  explicacao: string;
}

interface IFourthStep {
  mentalMapUrl: string;
  criticalNode: string;
  actions: IThirdFormStructure[];
}

interface IThirdFormStructure {
  name: string;
  deadline_compliance: string;
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepsValues, setStepsValues] = useState<IStepsValues>({
    firstStep: [
      {
        domain: "",
        first_indicator: "",
        first_degree: null,
        second_indicator: "",
        second_degree: null,
      },
    ],
    secondStep: {
      defined_problems: [
        {
          id: 1,
          answer: "",
        },
      ],
    },
    thirdStep: {
      causas: [
        {
          id: 1,
          causa: "",
          explicacao: "",
        },
        {
          id: 2,
          causa: "",
          explicacao: "",
        },
        {
          id: 3,
          causa: "",
          explicacao: "",
        },
        {
          id: 4,
          causa: "",
          explicacao: "",
        },
      ],
    },
    fourthStep: {
      mentalMapUrl: "",
      criticalNode: "",
      actions: [
        {
          name: "",
          deadline_compliance: "",
          responsibles: [
            {
              responsible: "",
              motivation: "",
              strategies: "",
            },
          ],
          resources: [
            {
              resource: "",
              described_strategies: "",
              itsCricticalResource: "",
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
  function handleUpdateFirstStep(values: IFirstStep[]) {
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

  function handleUpdateFourthStep(values: IFourthStep) {
    console.log(values);
    setStepsValues({
      ...stepsValues,
      fourthStep: values,
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
                  stepValues={stepsValues.thirdStep}
                  onSubmit={(data) => handleUpdateThirdStep(data)}
                />
              )}
              {activeIndex === 4 && (
                <FourthStep
                  stepValues={stepsValues.fourthStep}
                  onSubmit={(data) => handleUpdateFourthStep(data)}
                  onClickNextStep={nextQuestion}
                  onClickPrevStep={previusQuestion}
                />
              )}
              {activeIndex === 5 && (
                <FinishFormStep
                  stepValues={stepsValues}
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
