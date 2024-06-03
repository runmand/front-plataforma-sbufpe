import {
  Box,
  Button,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { http } from "src/core/axios";

interface IProps {
  onSubmit: (values: IValues[]) => void;
  stepValues: IValues[];
  onClickNextStep: () => void;
  onClickPrevStep: () => void;
}

interface IValues {
  domain: string;
  first_indicator: string;
  first_degree: number;
  second_indicator: string;
  second_degree: number;
}

interface IResponse {
  id: number;
  title: string;
  step: number;
}

export const FirstStep = ({
  onSubmit,
  stepValues,
  onClickNextStep,
  onClickPrevStep,
}: IProps) => {
  const [values, setValues] = React.useState<IValues[]>(stepValues);

  const [questions, setQuestions] = useState<IResponse[]>([]);

  async function getQuestion() {
    try {
      const { data } = await http.get<IResponse[]>("/practical-plan-question");

      setQuestions(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  function addValue() {
    if (values.length === 3) return;
    setValues((prevInputValues) => [
      ...prevInputValues,
      {
        domain: "",
        first_indicator: "",
        first_degree: 0,
        second_indicator: "",
        second_degree: 0,
      },
    ]);
  }

  function updateField(
    index: number,
    fieldName: string,
    value: string | number
  ) {
    const updatedValues = [...values];
    updatedValues[index] = { ...updatedValues[index], [fieldName]: value };
    setValues(updatedValues);
  }

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

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Typography fontWeight={700} fontSize={20} textAlign={"center"}>
        COMO SELECIONAR, PRIORIZAR E DEFINIR OS PROBLEMAS?
      </Typography>
      <Typography fontWeight={700} fontSize={24}>
        Seleção dos problemas
      </Typography>
      <Typography fontWeight={400} fontSize={16}>
        As informações estão sistematizadas em Classificações dos Domínios de
        qualidade, contendo a frequência do cumprimento dos indicadores
        avaliativos. E os do VigiaSD, em indicadores socioepidemiológicos.
      </Typography>
      <Typography fontWeight={700} fontSize={24}>
        Priorização/hierarquização dos problemas
      </Typography>
      <Typography fontWeight={400} fontSize={16}>
        Para cada Domínio/indicador selecionado, pontue o grau de
        governabilidade, usando uma escala 0-10, onde 0 corresponde a nenhuma
        governabilidade e 10 a maior governabilidade sobre problema. Quanto
        maior o grau de governabilidade sobre o problema, mais viabilidade você
        /equipe terá para resolvê-lo.
      </Typography>
      {questions.length > 0 && (
        <Typography fontWeight={600} fontSize={16} mt={5}>
          {questions[0].title}
        </Typography>
      )}

      <Box display={"flex"} flexDirection={"column"} gap={5} mt={10}>
        {values.map((item, index) => (
          <Box key={index} display={"flex"} flexDirection={"column"} gap={5}>
            <Box width={"100%"}>
              <InputLabel id={`domain-${index}`}>
                Domínio selecionado*
              </InputLabel>
              <TextField
                fullWidth
                value={item.domain}
                onChange={(e) => updateField(index, "domain", e.target.value)}
              />
            </Box>
            <Box width={"100%"}>
              <InputLabel id={`first_indicator-${index}`}>
                Indicador*
              </InputLabel>
              <TextField
                fullWidth
                value={item.first_indicator}
                onChange={(e) =>
                  updateField(index, "first_indicator", e.target.value)
                }
              />
            </Box>
            <Box width={"100%"}>
              <InputLabel id={`first_degree-${index}`}>
                Grau de governabilidade*
              </InputLabel>
              <Select
                fullWidth
                labelId="first_degree"
                id="first_degree"
                value={item.first_degree}
                onChange={(e) =>
                  updateField(index, "first_degree", e.target.value)
                }
              >
                {Array.from(Array(10).keys()).map((item) => (
                  <MenuItem key={item} value={item + 1}>
                    {item + 1}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box width={"100%"}>
              <InputLabel id={`second_indicator-${index}`}>
                Indicador*
              </InputLabel>
              <TextField
                fullWidth
                value={item.second_indicator}
                onChange={(e) =>
                  updateField(index, "second_indicator", e.target.value)
                }
              />
            </Box>
            <Box width={"100%"}>
              <InputLabel id={`second_degree-${index}`}>
                Grau de governabilidade*
              </InputLabel>
              <Select
                fullWidth
                labelId="second_degree"
                id="second_degree"
                value={item.second_degree}
                onChange={(e) =>
                  updateField(index, "second_degree", e.target.value)
                }
              >
                {Array.from(Array(10).keys()).map((item) => (
                  <MenuItem key={item} value={item + 1}>
                    {item + 1}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Divider />
          </Box>
        ))}

        <Button onClick={addValue}>Adicionar</Button>
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
