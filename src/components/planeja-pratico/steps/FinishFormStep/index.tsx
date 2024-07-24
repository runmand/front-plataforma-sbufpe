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
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

interface IProps {
  stepValues: IStepsValues;

  onClickPrevStep: () => void;
}

interface IStepsValues {
  firstStep: IFirstStep[];
  secondStep: ISecondStep;
  thirdStep: IThirdStep;
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

  function handleSendForm(e: React.FormEvent) {
    e.preventDefault();
    console.log(stepValues);
    const strifiedData = JSON.stringify({
      ...stepValues,
      dados_para_certificado: {
        ...values,
      },
    });
    sendData({
      userId: Number(localStorage.getItem(localStorageKeyEnum.USER_ID)),
      question_answer: strifiedData,
      flowchart_file: stepValues.thirdStep.mentalMapUrl,
    });
  }

  const stylesPDF = StyleSheet.create({
    page: { padding: 30 },
    section: { margin: 10, padding: 10, flexGrow: 1 },
    flex: { display: "flex", flexDirection: "row" },
    title: { fontSize: 16, fontWeight: "bold" },
    subtitle: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
    text: { fontSize: 12, marginTop: 5 },
  });

  const GeneratePdf = () => (
    <Document>
      <Page style={stylesPDF.page}>
        {/* First Step */}
        <View style={stylesPDF.section}>
          <Text style={stylesPDF.title}>Primeira Etapa</Text>
          {stepValues.firstStep.map((item, index) => (
            <View key={index}>
              <Text style={stylesPDF.subtitle}>Domínio: {item.domain}</Text>
              <Text style={stylesPDF.text}>
                Primeiro Indicador: {item.first_indicator}
              </Text>
              <Text style={stylesPDF.text}>
                Grau do Primeiro Indicador: {item.first_degree}
              </Text>
              <Text style={stylesPDF.text}>
                Segundo Indicador: {item.second_indicator}
              </Text>
              <Text style={stylesPDF.text}>
                Grau do Segundo Indicador: {item.second_degree}
              </Text>
            </View>
          ))}
        </View>

        {/* Second Step */}
        <View style={stylesPDF.section}>
          <Text style={stylesPDF.title}>Segunda Etapa</Text>
          {stepValues.secondStep.defined_problems.map((problem, index) => (
            <View key={index}>
              <Text style={stylesPDF.subtitle}>
                Problema Definido {problem.id}
              </Text>
              <Text style={stylesPDF.text}>{problem.answer}</Text>
            </View>
          ))}
        </View>

        {/* Third Step */}
        <View style={stylesPDF.section}>
          <Text style={stylesPDF.title}>Terceira Etapa</Text>
          <Text style={stylesPDF.text}>
            URL do Mapa Mental: {stepValues.thirdStep.mentalMapUrl}
          </Text>
          <Text style={stylesPDF.text}>
            Nó Crítico: {stepValues.thirdStep.criticalNode}
          </Text>
          {stepValues.thirdStep.actions.map((action, index) => (
            <View key={index}>
              <Text style={stylesPDF.subtitle}>Ação: {action.name}</Text>
              <Text style={stylesPDF.text}>
                Prazo: {action.deadline_compliance}
              </Text>
              <Text style={stylesPDF.text}>Responsáveis:</Text>
              {action.responsibles.map((responsible, i) => (
                <View key={i}>
                  <Text style={stylesPDF.text}>
                    Responsável: {responsible.responsible}
                  </Text>
                  <Text style={stylesPDF.text}>
                    Motivação: {responsible.motivation}
                  </Text>
                  <Text style={stylesPDF.text}>
                    Estratégias: {responsible.strategies}
                  </Text>
                </View>
              ))}
              <Text style={stylesPDF.text}>Recursos:</Text>
              {action.resources.map((resource, i) => (
                <View key={i}>
                  <Text style={stylesPDF.text}>
                    Recurso: {resource.resource}
                  </Text>
                  <Text style={stylesPDF.text}>
                    É Recurso Crítico: {resource.itsCricticalResource}
                  </Text>
                  <Text style={stylesPDF.text}>
                    Estratégias Descritas: {resource.described_strategies}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  async function downloadPdf() {
    const blob = await pdf(<GeneratePdf />).toBlob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio_${new Date().toLocaleDateString()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
          Como o PA-SB deve intervir sobre problemas, recomenda-se a seleção de
          pelo menos, 2 domínios / 3 indicadores com as piores classificações
          dos módulos avaliativos. E, pelo menos 2 indicadores do perfil
          socioepidemiológicos em piores condições. Digite-os abaixo:
        </Typography>
        <Box display={"flex"} flexDirection={"column"} gap={3} mt={5}>
          {stepValues.firstStep.map((item, index) => (
            <Box key={index} display={"flex"} flexDirection={"column"} gap={2}>
              <Typography fontWeight={700} fontSize={16}>
                {item.domain}
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
          onClick={downloadPdf}
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
