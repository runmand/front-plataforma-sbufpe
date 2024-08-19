import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import YouTube from 'react-youtube';

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
      <Typography fontWeight={500} fontSize={16}>
        Apesar de você já ter chegado na definição do (s) problema (s) à intervenção, na verdade o plano de ação não é para intervir diretamente o sobre ele, mas sim sobre a sua causa principal, denominado nó-crítico. Por isso, é necessário explicar o problema. Obs: caso você/equipe tenha definido mais de um problema à intervenção, particularmente de domínios ou módulos operacionais diferentes, talvez seja necessário fazer mais de um Plano de Ação. Estes PA-SB podem ser juntados, formando um programa de intervenção local! 
      </Typography>
      <Typography fontWeight={500} fontSize={24}>
        Explicação do problema
      </Typography>
      <Typography fontWeight={500} fontSize={16}>
      Geralmente, no momento explicativo do PES, a explicação do problema advém da descrição das causas e consequências com uso de técnicas como Árvore explicativa do problema ou Fluxograma situacional do problema (Moysés & Goes, 2012). Ver figura 1
      </Typography>

      <Typography fontWeight={500} fontSize={16}>
        <b>Dica:</b> Cada causa descrita, deve vir acompanhada implicitamente da
        pergunta “o que a causou?”, e assim por diante, até esgotar sua
        explicação. Desta forma, é necessário que no fluxo da relação causal
        para obter o fluxograma explicativo, as causas precedam as
        consequências. Faz-se uso de setas entre quadros para se estabelecer a
        relação causal.
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

      <Typography fontWeight={700} fontSize={24} textAlign={"center"}>
        Figura 1- Exemplo de Fluxograma explicativo
      </Typography>
      <Typography fontWeight={500} fontSize={16}>
      No entanto, aqui recorreremos a uma simplificação da técnica. Deve-se descrever, tanto quanto necessárias, as possíveis causas do problema definido e posteriormente após discussão da equipe, escolher a principal que poderá ser considerada como <b>nó-crítico.</b>
      </Typography>
      <Typography fontWeight={500} fontSize={16}>
      <b>Dica:</b> Cada causa descrita, deve vir acompanhada implicitamente da pergunta “o que a causou o problema?”, e assim por diante, até esgotar sua explicação. 
      Provavelmente, estabelece-se uma relação causal entre as causas para se obter a causa principal, ou causa das causas. 
      Por isso, pode-se mudar as causas descritas de posição e caso necessário incluir outras causas, basta clicar em ADICIONAR

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

      <Box width="100%" display="flex" justifyContent="center" mt={4}>
        <YouTube videoId="dePREs-CK9E" />
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
