import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

interface IProps {
  onClickNextStep: () => void;
  onClickPrevStep: () => void;
}
export const FourthStep = ({ onClickNextStep, onClickPrevStep }: IProps) => {
  return (
    <>
      <form
        action="https://www.mindmeister.com/external/show"
        target="new"
        method="POST"
        encType="multipart/form-data"
      >
        {" "}
        <input hidden type="file" name="file[save_action]" value="o" />
        <input
          hidden
          type="file"
          name="file[newcopy_url]"
          value="http://localhost:2000/practical-plan-question-answer/"
        />
        <input
          hidden
          type="file"
          name="file[overwrite_url]"
          value="http://localhost:2000/practical-plan-question-answer/"
        />
        <input hidden type="text" name="file[id]" value="-1" />
        <input hidden type="text" name="file[name]" value="plano-de-acao" />
        <input
          hidden
          type="text"
          name="api_key"
          value="9e25c37325f5039b4ae2342f483633fc70b1b9d325711e1f5751e893c0dae0fa66ba8efea151567f7dba46406a13359c18bed70416c81524a06b47edeab2300a"
        />{" "}
        <input hidden type="checkbox" name="file[allow_export]" />{" "}
        <Button sx={{ mx: "auto" }} type="submit">
          Iniciar mapa mental
        </Button>
      </form>
      <Typography fontWeight={500} fontSize={24}>
        PLANO DE AÇÃO EM SAÚDE BUCAL (PA-SB)
      </Typography>
      <Typography fontWeight={400} fontSize={16}>
        O Plano de Ação expressa o que dever ser feito para resolução da
        situação problema. Descrever-se-á as ações que levarão à modificação
        positiva do problema.
      </Typography>
      <Typography fontWeight={400} fontSize={16}>
        <b>LEMBRE-SE!</b> Você pode consultar a Carta de recomendações gerada e
        disponibilizada pelo GestBucalSD após as avaliações. E ainda, consultar
        o acervo da plataforma que contém produção técnica e científica para
        propor as ações ao plano.
      </Typography>
      <Typography fontWeight={400} fontSize={16}>
        Para cada ação definida, <b>deve-se ter:</b> a identificação de
        responsáveis (atores sociais), o levantamento dos recursos necessários
        (material/tecnológico, financeiro, pessoal, etc.) e estabelecimento{" "}
        <b>prazo para execução do plano</b>.
      </Typography>
      <Typography fontWeight={400} fontSize={16}>
        Como o ideal nem sempre é o real, pode-se antever estrategicamente
        algumas situações para se garantir maior viabilidade ao plano.
      </Typography>
      <Typography fontWeight={400} fontSize={16}>
        Estrategicamente, para cada ação definida, será analisada a
        motivação/interesse dos atores sociais e a viabilidade para os recursos
        considerados críticos.
      </Typography>
      <Typography fontWeight={400} fontSize={16}>
        Um ator social pode ser, apoiador, indiferente ou opositor as
        ações/plano, então quando o ator for considerado indiferente ou
        opositor, a equipe deve descrever estratégias com o objetivo de eliminar
        resistências e buscar o apoio para a resolução do problema, apoio ao
        plano. Isso vale também para a análise sobre os recursos necessários.
        Para aqueles considerados críticos, também se descreverá as soluções
        para se obtê-los ou contorná-los.
      </Typography>
      <Typography fontWeight={700} fontSize={16}>
        O plano de ação pode ser descrito à intervenção sobre vários problemas
        simultaneamente, então caso se tenha identificado outros problemas/nós
        críticos, siga até esgotar a descrição das ações.
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
