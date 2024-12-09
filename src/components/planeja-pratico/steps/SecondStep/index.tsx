import SaveButton from '@components/saveButton';
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import React from "react";

interface IProps {
  onSubmit: (values: IValues) => void;
  stepValues: IValues;
  onClickNextStep: () => void;
  onClickPrevStep: () => void;
  saveData: () => void;
  dataSaved: boolean
}

interface IValues {
  defined_problems: IDefinedProblem[];
}

interface IDefinedProblem {
  id: number;
  answer: string;
}

export const SecondStep = ({
  onSubmit,
  stepValues,
  onClickNextStep,
  onClickPrevStep,
  saveData,
  dataSaved
}: IProps) => {
  const [values, setValues] = React.useState<IValues>({
    defined_problems: stepValues.defined_problems,
  });

  function updateValues({ name, value }: { name: string; value: any }) {
    setValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(values);
    onClickNextStep();
  }

  function addDefinedProblemValue() {
    if (values.defined_problems.length === 5) return;
    updateValues({
      name: "defined_problems",
      value: [
        ...values.defined_problems,
        { id: values.defined_problems.length + 1, answer: "" },
      ],
    });
  }

  function updateDefinedProblemValue(id: number, value: string) {
    updateValues({
      name: "defined_problems",
      value: values.defined_problems.map((item) =>
        item.id === id ? { ...item, answer: value } : item
      ),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography fontWeight={700} fontSize={20}>
        Definição do problema
      </Typography>
      <Typography fontWeight={500} fontSize={16} mt={4}>
      Diante da técnica de seleção, priorização/hierarquização dos problemas feita anteriormente, qual problema foi definido para a intervenção? 
      </Typography>

      <Box display={"flex"} flexDirection={"column"} gap={5} mt={10}>
        {values.defined_problems.map((item, index) => (
          <Box key={item.id} width={"100%"}>
            <InputLabel id="second_domain">
              Problemas definido à intervenção:
            </InputLabel>
            <TextField
              fullWidth
              value={item.answer}
              onChange={(e) =>
                updateDefinedProblemValue(item.id, e.target.value)
              }
              required={index === 0}
            />
          </Box>
        ))}

        <Button onClick={addDefinedProblemValue}>Adicionar</Button>
      </Box>
      <Typography fontWeight={700} fontSize={16} mt={10}>
        Reflita bem, você pode repetir a técnica de seleção e priorização, até
        chegar à definição do problema que seja exequível!!!
      </Typography>

      <Typography fontWeight={500} fontSize={16}>
        <b>Obs:</b> Para facilitar o andamento do planejamento aqui, no módulo PlanejaSD-prático, 
        você/equipe vai construir um PA-SB para um problema por vez.<br></br> 
        Então, caso se queira intervir noutros problemas, será necessário repetir o processo para cada problema separadamente. 
        Estes PA-SB podem ser juntados, formando um programa de intervenção local!

      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent={"flex-end"}
        gap={4}
        mt={10}
      >
        <Button onClick={onClickPrevStep} variant="outlined">
          Voltar
        </Button>

        <SaveButton dataSaved={dataSaved} saveData={saveData} />

        <Button variant="contained" color="primary" type={"submit"}>
          {"Próxima"}
        </Button>
      </Box>
    </form>
  );
};
