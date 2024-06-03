import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

interface IProps {
  onClickNextStep: () => void;
  onClickPrevStep: () => void;
}
export const ThirdStep = ({ onClickNextStep, onClickPrevStep }: IProps) => {
  return (
    <>
      <Typography fontWeight={700} fontSize={20} textAlign={"center"}>
        COMO EXPLICAR O PROBLEMA?
      </Typography>
      <Typography fontWeight={500} fontSize={24}>
        Explicação do problema
      </Typography>
      <Typography fontWeight={500} fontSize={16}>
        A explicação do problema advém da descrição das causas e consequências
        do problema definido. Aqui sugerimos o uso da técnica de elaboração do
        Fluxograma explicativo, Exemplo na Figura 1.
      </Typography>

      <Typography fontWeight={500} fontSize={16}>
        <b>Dica:</b> Cada causa descrita, deve vir acompanhada implicitamente da
        pergunta “o que a causou?”, e assim por diante, até esgotar sua
        explicação. Desta forma, é necessário que no fluxo da relação causal
        para obter o fluxograma explicativo, as causas precedam as
        consequências. Faz-se uso de setas entre quadros para se estabelecer a
        relação causal.
      </Typography>

      <Box width={"100%"} mt={5}>
        <Image layout="fill" src="/images/fluxograma.png" alt="" />
        <Typography fontWeight={700} fontSize={12}>
          Figura 1- Exemplo de Fluxograma explicativo
        </Typography>
      </Box>

      <Typography fontWeight={700} fontSize={24} textAlign={"center"}>
        Figura 1- Exemplo de Fluxograma explicativo
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
        efetivamente, transformá-lo. Geralmente a identificação do nó crítico é:
        a causa que tem maior afluxo de setas
      </Typography>

      <Typography fontWeight={700} fontSize={24} textAlign={"center"}>
        É a partir do Nó Crítico que o plano de ação é construído!
      </Typography>
      <Typography fontWeight={700} fontSize={16}>
        Agora, faça seu (s) fluxograma (s) explicativo(s) e identificação do
        nó-crítico!!!
      </Typography>

      <Box
        display="flex"
        alignItems="center"
        justifyContent={"flex-end"}
        gap={4}
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
          Próxima
        </Button>
      </Box>
    </>
  );
};
