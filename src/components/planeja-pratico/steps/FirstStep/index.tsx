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
import Image from "next/image";

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
        Análise situacional
      </Typography>
      <Typography fontWeight={400} fontSize={16}>
        &nbsp;&nbsp;Primeiramente, você/equipe deve explorar as informações
        disponíveis no módulo Nossos Dados SD, pelo filtro USUÁRIOS, CEO ou APS.
        A busca se dá pela escolha de Estado-cidade-estabelecimento de saúde do
        qual será feito o planejamento em saúde.
        <br />
        &nbsp;&nbsp;Salienta-se que as informações estão sistematizadas em
        Classificações com notas: Geral e para os Domínios de qualidade; e, o
        cumprimento (ou não) dos indicadores avaliativos de cada Domínio
        <br />
        &nbsp;&nbsp;Na figura abaixo você tem a sumarização dos Domínios de
        Qualidade, dimensões e indicadores avaliativos que vieram da matriz
        avaliativa construída para os módulos avaliativos: AvaliaAPS, AvaliaCEO
        e AvaliaUsuários (GestBucalSD, 2024).
      </Typography>

      <Box
        width={"100%"}
        mt={5}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Typography fontWeight={700} fontSize={16} textAlign={"center"}>
          Figura 1 – Sumarização das matrizes avaliativas. GestBucalSD, 2024.
        </Typography>
        <Image
          width={"800"}
          height={"600"}
          objectFit="contain"
          src="/sumarizacao.png"
          alt="Sumarização das matrizes avaliativas"
        />
      </Box>
      <Typography fontWeight={700} fontSize={24} mt={10}>
        Seleção e Priorização/hierarquização dos problemas
      </Typography>

      <Typography fontWeight={700} fontSize={24}>
        Governabilidade – diz respeito às variáveis ou recursos que a equipe
        controla ou não, e que são necessários para implementar o plano de ação
        elaborado (Moysés & Goes, 2012).
      </Typography>
      <Typography fontWeight={400} fontSize={16}>
        &nbsp;&nbsp;Para cada Domínio selecionado, pode-se escolher até 2
        indicadores. Pontue o grau de governabilidade de cada indicador, usando
        uma escala 0-10, onde 0 corresponde a nenhuma governabilidade e 10 a
        maior governabilidade sobre problema. Quanto maior o grau de
        governabilidade sobre o problema, mais viabilidade você /equipe terá
        para resolvê-lo.
        <br />
        &nbsp;&nbsp;Agora, faça o preenchimento do Domínio e indicadores
        selecionados pontuando o grau de governabilidade.
      </Typography>
      <Typography fontWeight={400} fontSize={16}>
        <b>Atenção!!!</b> Você pode selecionar mais Domínio/indicadores, caso
        queira! Basta clicar em ADICIONAR
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
