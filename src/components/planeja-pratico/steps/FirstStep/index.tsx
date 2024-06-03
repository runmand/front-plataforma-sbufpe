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
import React from "react";

interface IProps {
  onSubmit: (values: IValues) => void;
  stepValues: IValues;
  onClickNextStep: () => void;
  onClickPrevStep: () => void;
}

interface IValues {
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

export const FirstStep = ({
  onSubmit,
  stepValues,
  onClickNextStep,
  onClickPrevStep,
}: IProps) => {
  const [values, setValues] = React.useState<IValues>({
    first_domain: stepValues.first_domain,
    first_degree: stepValues.first_degree,
    first_indicator: stepValues.first_indicator,
    second_domain: stepValues.second_domain,
    second_degree: stepValues.second_degree,
    second_indicator: stepValues.second_indicator,
    third_domain: stepValues.third_domain,
    third_degree: stepValues.third_degree,
    third_indicator: stepValues.third_indicator,
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
      <Typography fontWeight={400} fontSize={16} mt={5}>
        Como o PA-SB deve intervir sobre problemas, recomenda-se a seleção de
        pelo menos, 2 domínios / 3 indicadores com as piores classificações dos
        módulos avaliativos. E, pelo menos 2 indicadores do perfil
        socioepidemiológicos em piores condições. <b>Digite-os abaixo:</b>
      </Typography>

      <Box display={"flex"} flexDirection={"column"} gap={5} mt={10}>
        <Box display={"flex"} flexDirection={"column"} gap={5}>
          <Box width={"100%"}>
            <InputLabel id="first_domain">Domínio selecionado*</InputLabel>
            <TextField
              fullWidth
              value={values.first_domain}
              onChange={(e) =>
                updateValues({
                  name: "first_domain",
                  value: e.target.value,
                })
              }
            />
          </Box>
          <Box width={"100%"}>
            <InputLabel id="first_degree">Grau de governabilidade*</InputLabel>
            <Select
              fullWidth
              labelId="first_degree"
              id="first_degree"
              value={values.first_degree}
              onChange={(e) =>
                updateValues({
                  name: "first_degree",
                  value: e.target.value,
                })
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
            <InputLabel id="first_indicator">Indicador*</InputLabel>
            <TextField
              fullWidth
              value={values.first_indicator}
              onChange={(e) =>
                updateValues({
                  name: "first_indicator",
                  value: e.target.value,
                })
              }
            />
          </Box>
        </Box>
        <Divider orientation="horizontal" />
        <Box display={"flex"} flexDirection={"column"} gap={5}>
          <Box width={"100%"}>
            <InputLabel id="second_domain">
              Domínio selecionado(Opcional)
            </InputLabel>
            <TextField
              fullWidth
              value={values.second_domain}
              onChange={(e) =>
                updateValues({
                  name: "second_domain",
                  value: e.target.value,
                })
              }
            />
          </Box>
          <Box width={"100%"}>
            <InputLabel id="second_indicator">
              Grau de governabilidade(Opcional)
            </InputLabel>
            <Select
              fullWidth
              labelId="second_indicator"
              id="second_indicator"
              value={values.second_indicator}
              onChange={(e) =>
                updateValues({
                  name: "second_indicator",
                  value: e.target.value,
                })
              }
            >
              {Array.from(Array(10).keys()).map((item) => (
                <MenuItem key={item} value={item}>
                  {item + 1}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box width={"100%"}>
            <InputLabel id="second_indicator">Indicador(Opcional)</InputLabel>
            <TextField
              fullWidth
              value={values.second_indicator}
              onChange={(e) =>
                updateValues({
                  name: "second_indicator",
                  value: e.target.value,
                })
              }
            />
          </Box>
        </Box>
        <Divider orientation="horizontal" />
        <Box display={"flex"} flexDirection={"column"} gap={5}>
          <Box width={"100%"}>
            <InputLabel id="third_domain">
              Domínio selecionado(Opcional)
            </InputLabel>
            <TextField
              fullWidth
              value={values.third_domain}
              onChange={(e) =>
                updateValues({
                  name: "third_domain",
                  value: e.target.value,
                })
              }
            />
          </Box>
          <Box width={"100%"}>
            <InputLabel id="third_degree">
              Grau de governabilidade(Opcional)
            </InputLabel>
            <Select
              fullWidth
              labelId="third_degree"
              id="third_degree"
              value={values.third_degree}
              onChange={(e) =>
                updateValues({
                  name: "third_degree",
                  value: e.target.value,
                })
              }
            >
              {Array.from(Array(10).keys()).map((item) => (
                <MenuItem key={item} value={item}>
                  {item + 1}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box width={"100%"}>
            <InputLabel id="third_indicator">Indicador(Opcional)</InputLabel>
            <TextField
              fullWidth
              value={values.third_indicator}
              onChange={(e) =>
                updateValues({
                  name: "third_indicator",
                  value: e.target.value,
                })
              }
            />
          </Box>
        </Box>
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
