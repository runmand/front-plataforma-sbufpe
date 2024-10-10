import {
  Box,
  Button,
  Divider,
  Typography,
  Paper,
  Alert,
  InputLabel,
  TextField,
} from "@mui/material";
import { http } from "src/core/axios";
import React, { useState } from "react";
import { localStorageKeyEnum } from "src/core/enums";
import { useRouter } from "next/router";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import { nameForm } from 'src/constants/constantsPlaneja';
import { downloadPdfPlanejaPratico } from '@components/pdf/PlanejaPraticoPDF';

interface IProps {
  stepValues: IStepsValues;
  onClickPrevStep: () => void;
}

export interface IStepsValues {
  firstStep: IFirstStep[];
  secondStep: ISecondStep;
  thirdStep: IThirdStep;
  fourthStep: IFourthStep;
}

interface IFourthStep {
  mentalMapUrl: string;
  criticalNode: string;
  actions: IThirdFormStructure[];
}

interface IFirstStep {
  domain: string;
  first_indicator: string;
  first_degree: number;
  second_indicator: string;
  second_degree: number;
}

interface ISecondStep {
  defined_problems: IDefinedProblem[];
}
interface IThirdStep {
  causas: ICouse[];
}

interface ICouse {
  id: number;
  causa: string;
  explicacao: string;
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

  const [values, setValues] = useState({
    names: "",
    email: "",
    health_establishment: "",
  });

  function updateValues({ name, value }: { name: string; value: any }) {
    setValues({
      ...values,
      [name]: value,
    });
  }

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

    function clearHistory() {
      localStorage.removeItem("historyPratical")
      localStorage.removeItem("pratical-config")
    }

    //Seta o historico para proxima abertura
    async function setHistory(newData: IStepsValues) {
      const payload = {
        id: localStorage.getItem("userId"),
        form: nameForm.pratic,
        data: newData,
        finished: true,
      }  
      
      
  
      const result = await http.put("/history/", payload).then(r => {
        clearHistory();
        return r.data as IStepsValues;
      }).catch(error => {
        console.error('Erro ao obter o histórico:', error);
        throw error; // Lançar erro para tratamento posterior
      });
    }

  function handleSendForm(e: React.FormEvent) {
    e.preventDefault();
    const strifiedData = JSON.stringify({
      ...stepValues,
      dados_para_certificado: {
        ...values,
      },
    })
    
    setHistory(stepValues);
    sendData({
      userId: Number(localStorage.getItem(localStorageKeyEnum.USER_ID)),
      question_answer: strifiedData,
      flowchart_file: stepValues.fourthStep.mentalMapUrl,
    });
  }

  function downloadPDF() {
    downloadPdfPlanejaPratico(stepValues);
  }

  return (
    <form onSubmit={handleSendForm}>
      <Typography fontWeight={1000} fontSize={16} marginBottom={"15px"}>
        Parabéns!!! Você (s) tem um Plano de Ação em Saúde Bucal, incluindo as
        estratégias para aumentar sua governabilidade e viabilidade, para
        intervenção sobre seu estabelecimento de saúde (ou rede de atenção).
        Você pode baixá-lo em PDF e utilizá-lo à execução das ações idealizadas.
      </Typography>
      <Typography fontWeight={500} fontSize={16} marginBottom={"15px"}>
        <b>Lembre-se!</b> O PA-SB pode ser revisto e adequado sempre que
        necessário ao longo de sua execução e monitoramento das ações previstas!
        Faz-se importante dar um tempo maior (quadrimestralmente, por exemplo)
        para realização de novas avaliações (avaliações formativas) para
        averiguação da melhoria da situação local. Os demais módulos do
        GestBucalSD servirão para essa finalidade.
      </Typography>
      <Typography fontWeight={1000} fontSize={16} marginBottom={"15px"}>
        Agradecemos sua participação, esperando que o GestBucalSD esteja
        promovendo governança inteligente e melhoria da qualidade dos serviços
        de saúde bucal e fortalecimento do Sistema Único de Saúde
      </Typography>

      <Typography fontWeight={700} fontSize={24} mb={10} textAlign={"center"}>
        Confirmar o envio do formulário
      </Typography>

      <Paper sx={{ mt: 5, p: 4 }}>
        <Typography fontWeight={700} fontSize={20}>
          Indique para cada Domínio, até 2 indicadores com piores
          classificações. Digite-os abaixo:
        </Typography>
        <Box display={"flex"} flexDirection={"column"} gap={3} mt={5}>
          {stepValues.firstStep.map((item, index) => (
            <Box key={index} display={"flex"} flexDirection={"column"} gap={2}>
              <Typography fontWeight={700} fontSize={16}>
                Domínio:{item.domain}
              </Typography>
              <Typography fontWeight={700} fontSize={16}>
                Indicador: {item.first_indicator}
              </Typography>
              <Typography fontWeight={700} fontSize={16}>
                Grau de governabilidade: {item.first_degree}
              </Typography>
              <Typography fontWeight={700} fontSize={16}>
                Indicador: {item.second_indicator}
              </Typography>
              <Typography fontWeight={700} fontSize={16}>
                Grau de governabilidade: {item.second_degree}
              </Typography>
            </Box>
          ))}
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
        <Typography fontWeight={700} fontSize={20}>
          COMO EXPLICAR O PROBLEMA?
        </Typography>
        <Typography fontWeight={700} fontSize={20} mt={5}>
          Apesar de você já ter chegado na definição do (s) problema (s) para a
          intervenção, na verdade o plano de ação não é para intervir
          diretamente o sobre ele, mas sim sobre a sua causa principal,
          denominado nó-crítico. Por isso, é necessário explicar o problema.
          Obs: caso você/equipe tenha definido mais de um problema à intervenção
          de domínios ou módulos operacionais diferentes, talvez seja necessário
          fazer Planos distintos Ação de Saúde Bucal. Estes PA-SB podem ser
          juntados, formando um programa de intervenção local!
        </Typography>
        <Box display={"flex"} flexDirection={"column"} gap={5} mt={5}>
          <Typography fontWeight={700} fontSize={16}>
            Causas:{" "}
          </Typography>
          {stepValues.thirdStep.causas.map((causa, index) => (
            <Box
              key={index}
              pl={2}
              display={"flex"}
              flexDirection={"column"}
              gap={2}
            >
              <Typography fontWeight={700} fontSize={16}>
                Causa: {causa.causa}
              </Typography>
              <Typography key={causa.id} fontWeight={700} fontSize={16}>
                Explicação: {causa.explicacao}
              </Typography>
            </Box>
          ))}
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
            <b>{stepValues.fourthStep.mentalMapUrl}</b>
          </Typography>
        </Box>

        <Box mt={3} display={"flex"} flexDirection={"column"} gap={2}>
          <Typography fontWeight={500} fontSize={16}>
            Digite o Nó crítico identificado:{" "}
            <b>{stepValues.fourthStep.criticalNode}</b>
          </Typography>
        </Box>
      </Paper>

      <Box display={"flex"} flexDirection={"column"} gap={5} mt={5}>
        {stepValues.fourthStep.actions.map((item, index) => (
          <Paper key={index}>
            <Box p={4} display={"flex"} flexDirection={"column"} gap={2}>
              <Typography fontWeight={500} fontSize={16}>
                Ação: <b>{item.name}</b>
              </Typography>
              {item.responsibles.map((responsible, responsibleIndex) => (
                <Box
                  key={responsibleIndex}
                  pl={2}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={2}
                >
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
                <Box
                  key={resourceIndex}
                  pl={2}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={2}
                >
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

        <Box display={"flex"} flexDirection={"column"} gap={5} mt={5}>
          <Paper>
            <Box p={4} display={"flex"} flexDirection={"column"} gap={2}>
              <Typography fontWeight={700} fontSize={16}>
                Por favor, preencha os dados abaixo para receber o certificado
                de conclusão do curso:{" "}
              </Typography>

              <Box width={"100%"}>
                <InputLabel id="names">Nome do(s) Participante(s)</InputLabel>
                <TextField
                  fullWidth
                  value={values.names}
                  onChange={(e) =>
                    updateValues({
                      name: "names",
                      value: e.target.value,
                    })
                  }
                  required
                />
              </Box>

              <Box width={"100%"}>
                <InputLabel id="health_establishment">
                  Estabelecimento de Saúde
                </InputLabel>
                <TextField
                  fullWidth
                  value={values.health_establishment}
                  onChange={(e) =>
                    updateValues({
                      name: "health_establishment",
                      value: e.target.value,
                    })
                  }
                  required
                />
              </Box>

              <Box width={"100%"}>
                <InputLabel id="email">
                  E-mail do Responsável (para recebimento do certificado)
                </InputLabel>
                <TextField
                  fullWidth
                  value={values.email}
                  onChange={(e) =>
                    updateValues({
                      name: "email",
                      value: e.target.value,
                    })
                  }
                  required
                />
              </Box>
            </Box>
          </Paper>
        </Box>
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

        <Button
          onClick={downloadPDF}
          variant="contained"
          color="primary"
          type={"submit"}
        >
          {"Baixar PDF"}
        </Button>

        <Button variant="contained" color="primary" type={"submit"}>
          {"Finalizar"}
        </Button>
      </Box>
    </form>
  );
};
