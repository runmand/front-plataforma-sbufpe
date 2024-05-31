import { Box, Button, Typography } from "@mui/material";
import React from "react";

interface IProps {
  onClickNextQuestion: () => void;
}
export const Welcome = ({ onClickNextQuestion }: IProps) => {
  return (
    <>
      <Typography fontWeight={700} fontSize={20} textAlign={"center"}>
        PlanejaSD
      </Typography>
      <Typography fontWeight={500} fontSize={24}>
        Olá! Bem-vindo (a) ao PlanejaSD-componente prático!
      </Typography>
      <Typography fontWeight={500} fontSize={16}>
        Vamos vivenciar o PLANEJAMENTO, entendendo-o como ação humana para
        REDUÇÃO DE INCERTEZAS E INTERVENÇÃO NA REALIDADE. Este módulo operativo
        é baseado numa adaptação do Planejamento Estratégico Situacional (PES).
        No final do seu uso, você terá um Plano de Ação em Saúde Bucal (PA-SB),
        que deve ser exequível ou possível à intervenção e consequentemente
        melhoria de qualidade da sua realidade.
      </Typography>
      <Typography fontWeight={700} fontSize={20}>
        VAMOS COMEÇAR?
      </Typography>
      <Typography fontWeight={500} fontSize={16}>
        Um planejamento deve partir da análise do diagnóstico situacional local.
        Você tem disponibilizado em <b>nossos dados SD/GestBucalSD</b> as
        informações necessárias ao diagnóstico situacional dos módulos:
      </Typography>
      <ul>
        <li>
          <Typography fontWeight={500} fontSize={16}>
            <b> ⦁ AvaliaAPS</b> - avaliação dos serviços de saúde bucal da
            Atenção Primária em Saúde
          </Typography>
        </li>
        <li>
          <Typography mt={2} fontWeight={500} fontSize={16}>
            <b> ⦁ AvaliaCEO</b> - avaliação dos serviços de saúde bucal do
            Centro de Especialidades Odontológicas
          </Typography>
        </li>
        <li>
          <Typography mt={2} fontWeight={500} fontSize={16}>
            <b> ⦁ Avalia-Satisfação dos Usuários</b> - avaliação do grau de
            satisfação dos usuários
          </Typography>
        </li>
        <li>
          <Typography mt={2} fontWeight={500} fontSize={16}>
            <b> ⦁ VigiaSD</b> - perfil socioepidemiológico local
          </Typography>
        </li>
      </ul>

      <Typography fontWeight={500} fontSize={16}>
        <b>Obs:</b> Na ausência de informações, provavelmente é porque o módulo
        não foi utilizado
      </Typography>

      <Box
        display="flex"
        alignItems="center"
        justifyContent={"flex-end"}
        gap={4}
      >
        <Button
          onClick={onClickNextQuestion}
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
