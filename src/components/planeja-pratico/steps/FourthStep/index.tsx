import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface IProps {
  onSubmit: (values: IValues) => void;
  stepValues: IValues;
  onClickNextStep: () => void;
  onClickPrevStep: () => void;
}

interface IValues {
  mentalMapUrl: string;
  criticalNode: string;
  actions: IActiontructure[];
}

interface IActiontructure {
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

const motivationOptions = [
  {
    id: 1,
    option: "1-Apoiador",
  },
  {
    id: 2,
    option: "2-Indiferente ",
  },
  {
    id: 3,
    option: "3-Opositor",
  },
];

export const FourthStep = ({
  onClickNextStep,
  onClickPrevStep,
  onSubmit,
  stepValues,
}: IProps) => {
  const [values, setValues] = React.useState<IValues>({
    mentalMapUrl: stepValues.mentalMapUrl,
    criticalNode: stepValues.criticalNode,
    actions: stepValues.actions,
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

  function updateAction(actionIndex: number, name: string, value: string) {
    setValues((prevInputValues) => ({
      ...prevInputValues,
      actions: prevInputValues.actions.map((item, index) => {
        if (actionIndex === index) {
          return {
            ...item,
            [name]: value,
          };
        }
        return item;
      }),
    }));
  }

  function addResponsible(actionIndex: number) {
    setValues((prevInputValues) => ({
      ...prevInputValues,
      actions: prevInputValues.actions.map((item, index) => {
        if (actionIndex === index) {
          return {
            ...item,
            responsibles: [
              ...item.responsibles,
              {
                motivation: "",
                responsible: "",
                strategies: "",
              },
            ],
          };
        }
        return item;
      }),
    }));
  }

  function updateResponsible(
    actionIndex: number,
    index: number,
    field: string,
    value: string
  ) {
    setValues((prevInputValues) => ({
      ...prevInputValues,
      actions: prevInputValues.actions.map((item) => {
        if (actionIndex === actionIndex) {
          return {
            ...item,
            responsibles: item.responsibles.map((responsible, i) => {
              if (i === index) {
                return {
                  ...responsible,
                  [field]: value,
                };
              }
              return responsible;
            }),
          };
        }
        return item;
      }),
    }));
  }

  function addResource(actionIndex: number) {
    setValues((prevInputValues) => ({
      ...prevInputValues,
      actions: prevInputValues.actions.map((item, index) => {
        if (actionIndex === index) {
          return {
            ...item,
            resources: [
              ...item.resources,
              {
                described_strategies: "",
                itsCricticalResource: "",
                resource: "",
              },
            ],
          };
        }
        return item;
      }),
    }));
  }

  function updateResource(
    actionIndex: number,
    index: number,
    field: string,
    value: string
  ) {
    setValues((prevInputValues) => ({
      ...prevInputValues,
      actions: prevInputValues.actions.map((item) => {
        if (actionIndex === actionIndex) {
          return {
            ...item,
            resources: item.resources.map((resource, i) => {
              if (i === index) {
                return {
                  ...resource,
                  [field]: value,
                };
              }
              return resource;
            }),
          };
        }
        return item;
      }),
    }));
  }

  function addFormStructure() {
    if (values.actions.length === 4) return;
    setValues((prevInputValues) => ({
      ...prevInputValues,
      actions: [
        ...prevInputValues.actions,
        {
          name: "",
          deadline_compliance: "",
          responsibles: [
            {
              motivation: "",
              responsible: "",
              strategies: "",
            },
          ],
          resources: [
            {
              described_strategies: "",
              itsCricticalResource: "",
              resource: "",
            },
          ],
        },
      ],
    }));
  }

  return (
    <>
      <Typography fontWeight={500} fontSize={24} textAlign={"center"}>
        Crie o seu mapa mental
      </Typography>
      <Image
        src={"/exemplo-mapa-mental.png"}
        width={800}
        height={600}
        objectFit="contain"
      />
      <Typography fontWeight={500} fontSize={14} textAlign={"center"}>
        Uma nova aba vai abrir para você criar seu mapa mental, após finalizar o
        seu mapa mental, clique em <b>"Compartilhar"</b> e marque a opção{" "}
        <b>"Link para compartilhar"</b>. Após isso, cole o link no campo abaixo
      </Typography>
      <form
        action="https://www.mindmeister.com/external/show"
        target="new"
        method="POST"
        encType="multipart/form-data"
      >
        {" "}
        <input hidden type="text" name="file[save_action]" value="o" readOnly />
        <input
          hidden
          type="text"
          name="file[newcopy_url]"
          readOnly
          value="http://localhost:2000/practical-plan-question-answer/"
        />
        <input hidden type="text" name="file[id]" value="-1" />
        <input
          hidden
          type="text"
          name="file[success_url]"
          readOnly
          value="http://localhost:3000/planeja-pratico"
        />
        <input
          hidden
          type="text"
          name="file[name]"
          readOnly
          value="plano-pratico.mind"
        />
        <input
          hidden
          type="text"
          name="api_key"
          readOnly
          value="9e25c37325f5039b4ae2342f483633fc70b1b9d325711e1f5751e893c0dae0fa66ba8efea151567f7dba46406a13359c18bed70416c81524a06b47edeab2300a"
        />{" "}
        <Button sx={{ mx: "auto" }} variant="contained" type="submit">
          Criar mapa mental
        </Button>
      </form>

      <form onSubmit={handleSubmit}>
        <Box display={"flex"} flexDirection={"column"} gap={3} mt={10} mb={5}>
          <Box width={"100%"}>
            <InputLabel id="second_domain">
              Link do arquivo(Mapa mental)*
            </InputLabel>
            <TextField
              fullWidth
              value={values.mentalMapUrl}
              onChange={(e) =>
                updateValues({ name: "mentalMapUrl", value: e.target.value })
              }
              required
            />
          </Box>

          <Typography fontWeight={70} fontSize={24}>
            PLANO DE AÇÃO EM SAÚDE BUCAL (PA-SB)
          </Typography>
          <Typography fontWeight={400} fontSize={16}>
            O Plano de Ação expressa o que dever ser feito para resolução da
            situação problema. Descrever-se-á as ações que levarão à modificação
            positiva do problema.
          </Typography>
          <Typography fontWeight={400} fontSize={16}>
            <b>LEMBRE-SE!</b> Você pode consultar a Carta de recomendações
            gerada e disponibilizada pelo GestBucalSD após as avaliações. E
            ainda, consultar o acervo da plataforma que contém produção técnica
            e científica para propor as ações ao plano.
          </Typography>
          <Typography fontWeight={400} fontSize={16}>
            Para cada ação definida, <b>deve-se ter:</b> a identificação de
            responsáveis (atores sociais), o levantamento dos recursos
            necessários (material/tecnológico, financeiro, pessoal, etc.) e
            estabelecimento <b>prazo para execução do plano</b>.
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
            necessários. Para aqueles considerados críticos, também se
            descreverá as soluções para se obtê-los ou contorná-los.
          </Typography>
          <Typography fontWeight={700} fontSize={16}>
            O plano de ação pode ser descrito à intervenção sobre vários
            problemas simultaneamente, então caso se tenha identificado outros
            problemas/nós críticos, siga até esgotar a descrição das ações.
          </Typography>

          <Box width={"100%"}>
            <InputLabel id="criticalNode">
              Digite o Nó crítico identificado*
            </InputLabel>
            <TextField
              fullWidth
              value={values.criticalNode}
              onChange={(e) =>
                updateValues({
                  name: "criticalNode",
                  value: e.target.value,
                })
              }
              required
            />
          </Box>

          {values.actions.map((form, index) => (
            <Box
              key={index}
              display={"flex"}
              flexDirection={"column"}
              gap={3}
              mt={5}
              mb={5}
            >
              <Box width={"100%"}>
                <InputLabel id="name">Ação {index + 1}</InputLabel>
                <TextField
                  fullWidth
                  value={form.name}
                  onChange={(e) => updateAction(index, "name", e.target.value)}
                  required
                />
              </Box>

              <Divider />
              {form.responsibles.map((responsible, responsibleIndex) => (
                <Box pl={2} display={"flex"} flexDirection={"column"} gap={3}>
                  <Box width={"100%"}>
                    <InputLabel id={`responsible-${responsibleIndex}`}>
                      Responsável {responsibleIndex + 1}...n para ação{" "}
                      {index + 1} (indicar e analisar motivação de tantos atores
                      quanto forem necessários)*
                    </InputLabel>
                    <TextField
                      fullWidth
                      value={responsible.responsible}
                      onChange={(e) =>
                        updateResponsible(
                          index,
                          responsibleIndex,
                          "responsible",
                          e.target.value
                        )
                      }
                      required
                    />
                  </Box>

                  <Box width={"100%"}>
                    <InputLabel id="motivation">
                      Motivação de cada ator:
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="motivation"
                      id="motivation"
                      value={
                        values.actions[index].responsibles[responsibleIndex]
                          .motivation
                      }
                      onChange={(e) =>
                        updateResponsible(
                          index,
                          responsibleIndex,
                          "motivation",
                          e.target.value
                        )
                      }
                    >
                      {motivationOptions.map((item) => (
                        <MenuItem key={item.id} value={item.option}>
                          {item.option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>

                  {responsible.motivation !== "1-Apoiador" &&
                    responsible.motivation !== "" && (
                      <Box width={"100%"}>
                        <InputLabel id="strategies">
                          Descreva as estratégias:
                        </InputLabel>
                        <TextField
                          fullWidth
                          value={responsible.strategies}
                          onChange={(e) =>
                            updateResponsible(
                              index,
                              responsibleIndex,
                              "strategies",
                              e.target.value
                            )
                          }
                          required
                        />
                      </Box>
                    )}
                  <Divider />
                </Box>
              ))}

              <Box width={"100%"}>
                <Button onClick={() => addResponsible(index)}>
                  Adicionar outro responsável
                </Button>
              </Box>

              <Divider />

              {form.resources.map((resource, resourceIndex) => (
                <Box pl={2} display={"flex"} flexDirection={"column"} gap={3}>
                  <Box width={"100%"}>
                    <InputLabel id={`resource-${resourceIndex}`}>
                      Recurso {resourceIndex + 1}...n para ação {index + 1}
                    </InputLabel>
                    <TextField
                      fullWidth
                      value={resource.resource}
                      onChange={(e) =>
                        updateResource(
                          index,
                          resourceIndex,
                          "resource",
                          e.target.value
                        )
                      }
                      required
                    />
                  </Box>

                  <Box width={"100%"}>
                    <InputLabel id={`described_strategies-${resourceIndex}`}>
                      Este recurso é crítico?:
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId={`its_crictical_resource-${resourceIndex}`}
                      id={`its_crictical_resource-${resourceIndex}`}
                      value={resource.itsCricticalResource}
                      onChange={(e) =>
                        updateResource(
                          index,
                          resourceIndex,
                          "itsCricticalResource",
                          e.target.value
                        )
                      }
                    >
                      <MenuItem value="Sim">Sim</MenuItem>
                      <MenuItem value="Não">Não</MenuItem>
                    </Select>
                  </Box>

                  <Box width={"100%"}>
                    <InputLabel id={`described_strategies-${resourceIndex}`}>
                      DESCREVA AS ESTRATÉGIAS:
                    </InputLabel>
                    <TextField
                      fullWidth
                      value={resource.described_strategies}
                      onChange={(e) =>
                        updateResource(
                          index,
                          resourceIndex,
                          "described_strategies",
                          e.target.value
                        )
                      }
                      required
                    />
                  </Box>

                  <Divider />
                </Box>
              ))}

              <Box width={"100%"}>
                <Button onClick={() => addResource(index)}>
                  Abrir outro recurso?
                </Button>
              </Box>

              <Box width={"100%"}>
                <InputLabel id="deadline_compliance">
                  Prazo para cumprimento da Ação {index + 1}:
                </InputLabel>
                <TextField
                  fullWidth
                  value={form.deadline_compliance}
                  onChange={(e) =>
                    updateAction(index, "deadline_compliance", e.target.value)
                  }
                  required
                />
              </Box>
            </Box>
          ))}

          <Box width={"100%"}>
            <Button onClick={addFormStructure} type="button">
              Adicionar outra ação
            </Button>
          </Box>
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

          <Button variant="contained" color="primary" type={"submit"}>
            Próxima
          </Button>
        </Box>
      </form>
    </>
  );
};
