import { Box, Button, Typography } from "@mui/material";
import React from "react";

interface IProps {
  onSubmit: (values: IValues) => void;
  stepValues: IValues;
  onClickNextStep: () => void;
  onClickPrevStep: () => void;
}

interface IValues {}

export const SecondStep = ({
  onSubmit,
  stepValues,
  onClickNextStep,
  onClickPrevStep,
}: IProps) => {
  const [values, setValues] = React.useState<IValues>({});

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

  return (
    <form onSubmit={handleSubmit}>
      <Typography fontWeight={700} fontSize={20}>
        Definição do problema
      </Typography>
      <Typography fontWeight={500} fontSize={16}>
        Diante da técnica de priorização/hierarquização dos problemas, quais
        problemas foram definidos para a intervenção? Digite-os abaixo:
      </Typography>

      <Typography fontWeight={500} fontSize={16}>
        <b>Obs:</b> Na ausência de informações, provavelmente é porque o módulo
        não foi utilizado
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

        <Button
          onClick={onClickNextStep}
          variant="contained"
          color="primary"
          type={"submit"}
        >
          {"Próxima"}
        </Button>
      </Box>
    </form>
  );
};
