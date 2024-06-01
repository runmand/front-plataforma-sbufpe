import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import React from "react";

interface IProps {
  onSubmit: (values: IValues) => void;
  stepValues: IValues;
  onClickNextStep: () => void;
  onClickPrevStep: () => void;
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
        Diante da técnica de priorização/hierarquização dos problemas, quais
        problemas foram definidos para a intervenção? Digite-os abaixo:
      </Typography>

      <Typography fontWeight={500} fontSize={16}>
        <b>Obs:</b> Na ausência de informações, provavelmente é porque o módulo
        não foi utilizado
      </Typography>

      <Box display={"flex"} flexDirection={"column"} gap={5} mt={10}>
        {values.defined_problems.map((item) => (
          <Box key={item.id} width={"100%"}>
            <InputLabel id="second_domain">
              Problemas definidos na intervenção:
            </InputLabel>
            <TextField
              fullWidth
              value={item.answer}
              onChange={(e) =>
                updateDefinedProblemValue(item.id, e.target.value)
              }
            />
          </Box>
        ))}
      </Box>

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

        <Button variant="contained" color="primary" type={"submit"}>
          {"Próxima"}
        </Button>
      </Box>
    </form>
  );
};
