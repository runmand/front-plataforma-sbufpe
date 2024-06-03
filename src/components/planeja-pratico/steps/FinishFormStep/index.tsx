import { Box, Button, Divider, Typography, Paper, Alert } from "@mui/material";
import { http } from "src/core/axios";
import React, { useState } from "react";
import { localStorageKeyEnum } from "src/core/enums";
import { useRouter } from "next/router";
import { ErrorOutlineOutlined } from "@mui/icons-material";

interface IProps {
  stepValues: IStepsValues;

  onClickPrevStep: () => void;
}

interface IStepsValues {
  firstStep: IFirstStep;
  secondStep: ISecondStep;
  thirdStep: IThirdStep;
}

interface IFirstStep {
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

interface ISecondStep {
  defined_problems: IDefinedProblem[];
}
interface IThirdStep {
  mentalMapUrl: string;
  criticalNode: string;
  actions: IThirdFormStructure[];
}

interface IThirdFormStructure {
  name: string;
  deadline_compliance: string;
  responsibles: IResponsible[];
  resources: IResource[];
}

interface IResponsible {
  responsible: string;
  motivation: string;
  strategies: string;
}
interface IResource {
  resource: string;
  itsCricticalResource: string;
  described_strategies: string;
}

interface IDefinedProblem {
  id: number;
  answer: string;
}

interface ICreatePayload {
  userId: number;
  question_answer: string;
  flowchart_file: string;
}

export const FinishFormStep = ({ stepValues, onClickPrevStep }: IProps) => {
  const router = useRouter();
  const [error, setError] = useState(false);

  async function sendData(payload: ICreatePayload) {
    try {
      const { data } = await http.post(
        "/practical-plan-question-answer",
        payload
      );
      if (data) {
        router.push("/finished-form");
      }

      return data;
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }

  function handleSendForm(e: React.FormEvent) {
    e.preventDefault();
    console.log(stepValues);
    const strifiedData = JSON.stringify(stepValues);
    sendData({
      userId: Number(localStorage.getItem(localStorageKeyEnum.USER_ID)),
      question_answer: strifiedData,
      flowchart_file: stepValues.thirdStep.mentalMapUrl,
    });
  }

  return (
    <form onSubmit={handleSendForm}>
      <Typography fontWeight={700} fontSize={24} mb={10} textAlign={"center"}>
        Confirmar o envio do formulário
      </Typography>

      <Paper sx={{ mt: 5, p: 4 }}>
        <Typography fontWeight={700} fontSize={20}>
          Como o PA-SB deve intervir sobre problemas, recomenda-se a seleção de
          pelo menos, 2 domínios / 3 indicadores com as piores classificações
          dos módulos avaliativos. E, pelo menos 2 indicadores do perfil
          socioepidemiológicos em piores condições. Digite-os abaixo:
        </Typography>
        <Box display={"flex"} flexDirection={"column"} gap={5} mt={5}>
          <Box pl={2} display={"flex"} flexDirection={"column"} gap={2}>
            <Typography fontWeight={700} fontSize={16}>
              DOMÍNIO SELECIONADO: {stepValues.firstStep.first_domain}
            </Typography>
            <Typography fontWeight={700} fontSize={16}>
              Grau de governabilidade: {stepValues.firstStep.first_degree}
            </Typography>
            <Typography fontWeight={700} fontSize={16}>
              Indicador: {stepValues.firstStep.first_indicator}
            </Typography>

            {Boolean(stepValues.firstStep.second_domain.length) && (
              <Typography fontWeight={700} fontSize={16}>
                DOMÍNIO SELECIONADO: {stepValues.firstStep.second_domain}
              </Typography>
            )}
            {Boolean(stepValues.firstStep.second_degree) && (
              <Typography fontWeight={700} fontSize={16}>
                Grau de governabilidade: {stepValues.firstStep.second_degree}
              </Typography>
            )}
            {Boolean(stepValues.firstStep.second_indicator) && (
              <Typography fontWeight={700} fontSize={16}>
                Indicador: {stepValues.firstStep.second_indicator}
              </Typography>
            )}

            {Boolean(stepValues.firstStep.third_domain.length) && (
              <Typography fontWeight={700} fontSize={16}>
                DOMÍNIO SELECIONADO: {stepValues.firstStep.third_domain}
              </Typography>
            )}
            {Boolean(stepValues.firstStep.third_degree) && (
              <Typography fontWeight={700} fontSize={16}>
                Grau de governabilidade: {stepValues.firstStep.third_degree}
              </Typography>
            )}
            {Boolean(stepValues.firstStep.third_indicator) && (
              <Typography fontWeight={700} fontSize={16}>
                Indicador: {stepValues.firstStep.third_indicator}
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ mt: 5, p: 4 }}>
        <Typography fontWeight={700} fontSize={20}>
          Diante da técnica de priorização/hierarquização dos problemas, quais
          problemas foram definidos para a intervenção? Digite-os abaixo:
        </Typography>
        <Box display={"flex"} flexDirection={"column"} gap={5} mt={5}>
          <Box pl={2} display={"flex"} flexDirection={"column"} gap={2}>
            <Typography fontWeight={700} fontSize={16}>
              Problemas definidos na intervenção:{" "}
              {stepValues.secondStep.defined_problems.map((item, index) => (
                <Typography key={item.id} fontWeight={700} fontSize={16}>
                  {item.answer}
                  {index !==
                    stepValues.secondStep.defined_problems.length - 1 && (
                    <>
                      {", "}
                      <br />
                      <br />
                    </>
                  )}
                </Typography>
              ))}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ mt: 5, p: 4 }}>
        <Typography fontWeight={70} fontSize={24}>
          PLANO DE AÇÃO EM SAÚDE BUCAL (PA-SB)
        </Typography>
        <Typography fontWeight={400} fontSize={16}>
          O Plano de Ação expressa o que dever ser feito para resolução da
          situação problema. Descrever-se-á as ações que levarão à modificação
          positiva do problema.
        </Typography>
        <Typography fontWeight={400} fontSize={16}>
          <b>LEMBRE-SE!</b> Você pode consultar a Carta de recomendações gerada
          e disponibilizada pelo GestBucalSD após as avaliações. E ainda,
          consultar o acervo da plataforma que contém produção técnica e
          científica para propor as ações ao plano.
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
          motivação/interesse dos atores sociais e a viabilidade para os
          recursos considerados críticos.
        </Typography>
        <Typography fontWeight={400} fontSize={16}>
          Um ator social pode ser, apoiador, indiferente ou opositor as
          ações/plano, então quando o ator for considerado indiferente ou
          opositor, a equipe deve descrever estratégias com o objetivo de
          eliminar resistências e buscar o apoio para a resolução do problema,
          apoio ao plano. Isso vale também para a análise sobre os recursos
          necessários. Para aqueles considerados críticos, também se descreverá
          as soluções para se obtê-los ou contorná-los.
        </Typography>
        <Typography fontWeight={700} fontSize={16}>
          O plano de ação pode ser descrito à intervenção sobre vários problemas
          simultaneamente, então caso se tenha identificado outros problemas/nós
          críticos, siga até esgotar a descrição das ações.
        </Typography>

        <Box mt={3} display={"flex"} flexDirection={"column"} gap={2}>
          <Typography fontWeight={500} fontSize={16}>
            Link do arquivo(Mapa mental):{" "}
            <b>{stepValues.thirdStep.mentalMapUrl}</b>
          </Typography>
        </Box>

        <Box mt={3} display={"flex"} flexDirection={"column"} gap={2}>
          <Typography fontWeight={500} fontSize={16}>
            Digite o Nó crítico identificado:{" "}
            <b>{stepValues.thirdStep.criticalNode}</b>
          </Typography>
        </Box>
      </Paper>

      <Box display={"flex"} flexDirection={"column"} gap={5} mt={5}>
        {stepValues.thirdStep.actions.map((item, index) => (
          <Paper>
            <Box p={4} display={"flex"} flexDirection={"column"} gap={2}>
              <Typography fontWeight={500} fontSize={16}>
                Ação: <b>{item.name}</b>
              </Typography>
              {item.responsibles.map((responsible, responsibleIndex) => (
                <Box pl={2} display={"flex"} flexDirection={"column"} gap={2}>
                  <Typography fontWeight={500} fontSize={16}>
                    Responsável {responsibleIndex + 1}...n para ação {item.name}
                    : <b>{responsible.responsible}</b>
                  </Typography>
                  <Typography fontWeight={500} fontSize={16}>
                    Motivação de cada ator: <b>{responsible.motivation}</b>
                  </Typography>
                  {Boolean(responsible.strategies.length) && (
                    <Typography fontWeight={500} fontSize={16}>
                      Descreva as estratégias: <b>{responsible.strategies}</b>
                    </Typography>
                  )}

                  <Divider />
                </Box>
              ))}
              {item.resources.map((resource, resourceIndex) => (
                <Box pl={2} display={"flex"} flexDirection={"column"} gap={2}>
                  <Typography fontWeight={500} fontSize={16}>
                    Recurso {resourceIndex + 1}...n para ação {index + 1}:{" "}
                    <b>{resource.resource}</b>
                  </Typography>
                  <Typography fontWeight={500} fontSize={16}>
                    Este recurso é crítico?:{" "}
                    <b>{resource.itsCricticalResource}</b>
                  </Typography>
                  <Typography fontWeight={500} fontSize={16}>
                    DESCREVA AS ESTRATÉGIAS:{" "}
                    <b>{resource.described_strategies}</b>
                  </Typography>

                  <Divider />
                </Box>
              ))}

              <Typography fontWeight={500} fontSize={16}>
                Prazo para cumprimento da Ação {index + 1}:{" "}
                <b>{item.deadline_compliance}</b>
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {error && (
        <Alert
          icon={<ErrorOutlineOutlined fontSize="inherit" />}
          severity="error"
        >
          Não foi possível enviar o formulário. Tente novamente mais tarde.
        </Alert>
      )}
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
          {"Finalizar"}
        </Button>
      </Box>
    </form>
  );
};
