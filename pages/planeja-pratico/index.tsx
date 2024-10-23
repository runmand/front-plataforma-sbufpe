import { Box, Button, Paper, Typography } from "@mui/material";
import Base from "@components/base-layout/index";
import Appbar from "@components/app-bar/index";
import HomeToolbar from "@components/toolbar/home";
import { useEffect, useState } from "react";
import { FirstStep } from "@components/planeja-pratico/steps/FirstStep";
import { SecondStep } from "@components/planeja-pratico/steps/SecondStep";
import { Welcome } from "@components/planeja-pratico/steps/Welcome";
import { ThirdStep } from "@components/planeja-pratico/steps/ThirdStep";
import { FourthStep } from "@components/planeja-pratico/steps/FourthStep";
import { FinishFormStep } from "@components/planeja-pratico/steps/FinishFormStep";
import { nameForm } from 'src/constants/constantsPlaneja';
import { http } from 'src/core/axios';
import { Info, Update } from '@mui/icons-material';
import LoadHistory from '@components/loadHistory';

export interface IStepsValues {
  firstStep: IFirstStep[];
  secondStep: ISecondStep;
  thirdStep: IThirdStep;
  fourthStep: IFourthStep;
}

export interface IFirstStep {
  domain: string;
  first_indicator: string;
  first_degree: number;
  second_indicator: string;
  second_degree: number;
}

export interface ISecondStep {
  defined_problems: IDefinedProblem[];
}

export interface IThirdStep {
  causas: ICouses[];
}

interface ICouses {
  id: number;
  causa: string;
  explicacao: string;
}

export interface IFourthStep {
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

interface IPraticalConfig{
  thisPrincial: boolean
}

export default function Index() {
  const [activeIndex, setActiveIndex] = useState(-1);
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
  const [next, setNext] = useState<Boolean>(false);
  const [error, setError] = useState("");
  const data = [];
  const isLastIndex = activeIndex + 1 === data.length;
  const [thisPrincipal, setThisPrincipal] = useState(true);
  const [dataSaved, setDataSaved] = useState(false);
  const [stepsValuesDatabase, setStepsValuesDatabase] = useState<IStepsValues>()
  //atualizar os valores do primeiro passo
  function handleUpdateFirstStep(values: IFirstStep[]) {
    const payload = {
      ...stepsValues,
      firstStep: values,
    };

    setHistory(payload);
    setStepsValues(payload);
  }

  //atualizar os dados do segundo passo
  function handleUpdateSecondStep(values: ISecondStep) {
    const payload = {
      ...stepsValues,
      secondStep: values,
    };

    setHistory(payload);
    setStepsValues(payload);
  }

  //atualizar os valores do terceiro passo
  function handleUpdateThirdStep(values: IThirdStep) {
    const payload = {
      ...stepsValues,
      thirdStep: values,
    };

    setHistory(payload);
    setStepsValues(payload);
  }

  //atualizar os valores do quarto passo
  function handleUpdateFourthStep(values: IFourthStep) {
    const payload = {
      ...stepsValues,
      fourthStep: values,
    };

    setHistory(payload);
    setStepsValues(payload);
  }

  function nextQuestion() {
    if (!validateIfCanProcced()) return;
    setNext(true);
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

  async function setHistory(newData: IStepsValues) {
    localStorage.setItem("historyPratical", btoa(JSON.stringify(newData))); 
  }

  //Seta o historico para proxima abertura
  async function setHistoryDatabase(newData: IStepsValues) {
    const payload = {
      id: localStorage.getItem("userId"),
      form: nameForm.pratic,
      data: newData,
      finished: false,
    }    

    const result = await http.put("/history/", payload).then(r => {
      return r.data as IStepsValues;
    }).catch(error => {
      console.error('Erro ao obter o histórico:', error);
      throw error; // Lançar erro para tratamento posterior
    });
  }

    //Pega o historico
    async function getHistory() {
      const payload = {
        id: localStorage.getItem("userId"),
        form: nameForm.pratic,
      }    
  
      const result = await http.post("/history/", payload).then(r => {
        return r.data as IStepsValues;
      }).catch(error => {
        console.error('Erro ao obter o histórico:', error);
        throw error; // Lançar erro para tratamento posterior
      });

      return result;
    }

  //enviar o formulário
  useEffect(() => {
    const loadHistory = (async () => {
      const historyBD : IStepsValues = await getHistory();
      const localData: IStepsValues = getLocalHistory();
      let data : IStepsValues  = null;

    
      if (historyBD !== undefined){
        if (localData !== null){ 
            setStepsValuesDatabase(historyBD);
            setThisPrincipal(false);
        }else{
          setThisPrincipal(false);
        }
      }else{
        setThisPrincipal(true);
      }
      

      if (localData !== null){
        data = localData;   
      }  

      if (data !== null){
        setStepsValues(data);
      }


    })

    loadHistory()
  }, []);

  useEffect(() => {
    // Só após stepsValues ser atualizado, esse efeito será acionado
    if(!next){
      if (stepsValues.firstStep[0].domain == "") {
          setActiveIndex(0);
        } else if (stepsValues.secondStep.defined_problems[0].answer == "") {
          setActiveIndex(2);
        } else if (
          stepsValues.thirdStep.causas.every((causa) => causa.causa === "")
        ) {
          setActiveIndex(3);
        } else if (stepsValues.fourthStep.actions[0].name == "") {
          setActiveIndex(4);
        }else{
          setActiveIndex(5);
        }
    }
  }, [stepsValues, next]);

  async function updateForm() {
    setThisPrincipal(true); 
    const data = stepsValuesDatabase;   
    setStepsValues(data)
    setHistory(data);
  }

  function useThis() {
    localStorage.setItem("pratical-config", JSON.stringify({thisPrincipal: true}))
    updateConfig();
  }

  function updateConfig() {
    const config = getConfig()
    setThisPrincipal(config.thisPrincial);
  }

  function getConfig() : IPraticalConfig {
    try{
      const principal = JSON.parse(localStorage.getItem("pratical-config"))
      return principal
    }catch{
      return null;
    }
  }

  function getLocalHistory(): IStepsValues {
    try {
      return JSON.parse(atob(localStorage.getItem("historyPratical")));
    } catch (error) {
      return null
    }
  }

  async function saveData(){
    setDataSaved(true);
    setHistoryDatabase(stepsValues);
  }

  useEffect(() =>{
    setDataSaved(false);
  }, [stepsValues])


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
          <LoadHistory
            thisPrincipal={thisPrincipal} 
            updateForm={updateForm} 
            useThis={useThis} 
          /> 
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
                  dataSaved={dataSaved}
                  saveData={saveData}
                />
              )}
              {activeIndex === 2 && (
                <SecondStep
                  stepValues={stepsValues.secondStep}
                  onSubmit={(data) => handleUpdateSecondStep(data)}
                  onClickNextStep={nextQuestion}
                  onClickPrevStep={previusQuestion}
                  dataSaved={dataSaved}
                  saveData={saveData}
                />
              )}
              {activeIndex === 3 && (
                <ThirdStep
                  onClickNextStep={nextQuestion}
                  onClickPrevStep={previusQuestion}
                  stepValues={stepsValues.thirdStep}
                  onSubmit={(data) => handleUpdateThirdStep(data)}
                  dataSaved={dataSaved}
                  saveData={saveData}
                />
              )}
              {activeIndex === 4 && (
                <FourthStep
                  stepValues={stepsValues.fourthStep}
                  onSubmit={(data) => handleUpdateFourthStep(data)}
                  onClickNextStep={nextQuestion}
                  onClickPrevStep={previusQuestion}
                  dataSaved={dataSaved}
                  saveData={saveData}
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
