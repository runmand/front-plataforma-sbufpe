import SaveButton from '@components/saveButton';
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

interface IProps {
  onClickNextStep: () => void;
  onClickPrevStep: () => void;
  stepValues: IValues;
  onSubmit: (values: IValues) => void;
  saveData: () => void;
  dataSaved: boolean
}

interface IThirdStep {
  causa: string;
  explicacao: string;
}

interface IValues {
  causas: ICouses[];
}

interface ICouses {
  id: number;
  causa: string;
  explicacao: string;
}

export const ThirdStep = ({
  onClickNextStep,
  onClickPrevStep,
  stepValues,
  onSubmit,
  saveData,
  dataSaved
}: IProps) => {
  const [values, setValues] = React.useState<IValues>({
    causas: stepValues.causas,
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

  function addCouseValue() {
    updateValues({
      name: "causas",
      value: [
        ...values.causas,
        { id: values.causas.length + 1, causa: "", explicacao: "" },
      ],
    });
  }

  function updateCouseValue(id: number, value: string) {
    updateValues({
      name: "causas",
      value: values.causas.map((item) =>
        item.id === id
          ? { ...item, causa: value, explicacao: item.explicacao }
          : item
      ),
    });
  }

  function updateExplanationValue(id: number, value: string) {
    updateValues({
      name: "causas",
      value: values.causas.map((item) =>
        item.id === id
          ? { ...item, causa: item.causa, explicacao: value }
          : item
      ),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography fontWeight={700} fontSize={20} textAlign={"center"}>
        COMO EXPLICAR O PROBLEMA?
      </Typography>
      <Typography fontWeight={500} fontSize={16}>
        Apesar de você já ter chegado na definição do problema para a
        intervenção, na verdade o plano de ação não é para intervir diretamente
        sobre ele, mas sim sobre a sua causa principal, denominado nó-crítico.
        Por isso, é necessário explicar o problema.
      </Typography>
      <Typography fontWeight={600} fontSize={16} marginTop={2} marginBottom={2} textAlign={"center"}>
        A explicação do problema está contida no Momento explicativo!
      </Typography>
      <Typography fontWeight={500} fontSize={24}>
        Explicação do problema
      </Typography>
      <Typography fontWeight={500} fontSize={16}>
        Geralmente, no momento explicativo do PES, a explicação do problema
        advém da descrição das causas e consequências com uso de técnicas como
        Árvore explicativa do problema ou Fluxograma situacional do problema
        (Moysés & Goes, 2012). Ver figura 1
      </Typography>

      <Box
        width={"100%"}
        mt={5}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Image
          width={"800"}
          height={"600"}
          objectFit="contain"
          src="/fluxograma.png"
          alt="Exemplo de Fluxograma explicativo"
        />
      </Box>

      <Typography fontWeight={700} fontSize={24} textAlign={"center"} mb={5}>
        Figura 1- Exemplo de Fluxograma situacional do problema
      </Typography>
      <Typography fontWeight={500} fontSize={24}>
        Técnica simplificada
      </Typography>
      <Typography fontWeight={500} fontSize={16}>
        Aqui recorreremos a uma simplificação da técnica para explicação do problema. 
        Deve-se descrever, tanto quanto necessárias, as possíveis causas do problema definido, 
        explicando-as. A explicação pode ser uma maior descrição da causa com informações de 
        quantitativas ou qualitativas da causa indicada.
      </Typography>
      <Typography fontWeight={500} fontSize={16}>
        <b>Dica:</b> Para cada causa descrita e explicada, deve-se ter implicitamente a pergunta “o que a causou?”, e assim por diante, até esgotar sua explicação
      </Typography>
      <Typography fontWeight={500} fontSize={16}>
        Deve-se estabelecer uma relação causal entre as causas para se obter a causa principal, 
        ou causa das causas. Por isso, pode-se mudar as causas e explicações descritas de posição 
        nos quadros abaixo. E, caso necessário, incluir outras causas, basta clicar em ADICIONAR
      </Typography>
      <Typography fontWeight={500} fontSize={24}>
        Identificação do Nó-crítico
      </Typography>

      <Typography fontWeight={400} fontSize={16}>
        O nó crítico é sobre qual causa se deve atuar, ou seja, aquela
        considerada mais importante na origem do problema. Traz a ideia de algo
        sobre o qual eu posso intervir, ou seja, está dentro do meu espaço de
        governabilidade e de viabilidade política para modificá-lo. É um tipo de
        causa do problema que, quando atacado, é capaz de impactar o problema
        efetivamente, transformá-lo.
      </Typography>

      <Typography fontWeight={700} fontSize={24} textAlign={"center"} mt={5}>
        É a partir do Nó Crítico que o plano de ação é construído!
      </Typography>

      <Typography fontWeight={600} fontSize={16} textAlign={"center"} mt={2}>
        A identificação do nó-crítico pode ser considerada a primeira etapa do Momento Normativo .
      </Typography>

      <Box display={"flex"} flexDirection={"column"} gap={10} mt={10}>
        {values.causas.map((causa, index) => (
          <Box key={causa.id} display={"flex"} flexDirection={"column"} gap={3}>
            <Box pl={2}>
              <InputLabel id="second_domain">
                Causa {index + 1} {index < 4 && "*"}
              </InputLabel>
              <TextField
                fullWidth
                value={causa.causa}
                onChange={(e) => updateCouseValue(causa.id, e.target.value)}
                required={index < 4}
              />
            </Box>
            <Box pl={2}>
              <InputLabel id="second_domain">
                Explicação para causa {index + 1} {index < 3 && "*"}
              </InputLabel>
              <TextField
                fullWidth
                value={causa.explicacao}
                onChange={(e) =>
                  updateExplanationValue(causa.id, e.target.value)
                }
                required={index < 4}
              />
            </Box>
          </Box>
        ))}

        <Button onClick={addCouseValue}>Adicionar</Button>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent={"flex-end"}
        gap={4}
      >
        <Button onClick={onClickPrevStep} variant="outlined">
          Voltar
        </Button>

        <SaveButton dataSaved={dataSaved} saveData={saveData} />

        <Button variant="contained" color="primary" type={"submit"}>
          Próxima
        </Button>
      </Box>
    </form>
  );
};
