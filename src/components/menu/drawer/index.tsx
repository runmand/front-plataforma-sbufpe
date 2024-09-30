import { Drawer } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { TPROPS } from "./type";
import ListMenu from "@components/menu/list/index";
import { modalStyle } from "./style";
import FormAnswerService from "src/pages/form-answer/service";
import { ResultFormPdf, stylesPDF } from "@components/FormResultPdf";
import { pdf, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { FormResultProps } from "@components/FormResultPdf/FormResultProps.types";
import { IPlanejaDataPDF } from '@components/planeja/planeja-form';
import { IStepsValues } from '@components/planeja-pratico/steps/FinishFormStep';
import { http } from 'src/core/axios';
import ModifiedPdfPlanejaTeorico from '@components/pdf/PlanejaPDF';

//TODO: Permitir configuração da posição do drawer menu
export default function Index(props: TPROPS) {
  const [formData, setFormData] = useState<FormResultProps>();
  const formAnwerService = useMemo(() => new FormAnswerService(), []);

  type typeDataTeorico = {
    data: IPlanejaDataPDF[]
  };

  type typeDataPratico = {
    stepValues: IStepsValues
  };

  type requestResponse = {
    type: string,
    data: IPlanejaDataPDF[] |IStepsValues
  }

  const stylesPDFTeorico = StyleSheet.create({
    page: { padding: 30 },
    section: { margin: 10, padding: 10, flexGrow: 1 },
    flex: { display: "flex", flexDirection: "row" },
    title: { fontSize: 16, fontWeight: "bold" },
    subtitle: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
    text: { fontSize: 12, marginTop: 5 },
  });

  const getFormResult = useCallback(async (formId: number) => {
    try {
      const { data: formResult } = await formAnwerService.getUserResultFromForm(
        formId
      );
      setFormData(formResult);
    } catch (err: any) {
      console.error(err);
    }
  }, [formAnwerService])

  useEffect(() => {
    const formIdFromLocalStorage = localStorage.getItem("lastFormSubmited");
    if (formIdFromLocalStorage) {
      getFormResult(Number(formIdFromLocalStorage));
    }
  }, [getFormResult]);

  const ModifiedPdf = ({
    maxScore,
    score,
    domainList,
    answer,
    formTitle,
    date
  }: FormResultProps) => {
    return (
      <Document>
        <Page wrap={false}>
          <View style={stylesPDF.section}>
            <View style={stylesPDF.flex}>
              <Text>Pontuação maxíma:</Text>
              <Text style={stylesPDF.points}>{maxScore} pts</Text>
            </View>
          </View>
          <View style={stylesPDF.section}>
            <View style={stylesPDF.flex}>
              <Text>Pontuação atingida:</Text>
              <Text style={stylesPDF.points}>{score} pts</Text>
            </View>
          </View>
          <View style={stylesPDF.section}>
            <View style={stylesPDF.flex}>
              <Text>Nome do CEO:</Text>
              <Text style={{ maxWidth: "300px", marginLeft: "10px" }}>
                {answer.title}
              </Text>
            </View>
          </View>

          <View style={stylesPDF.section}>
            <View style={stylesPDF.sectionSpacing}>
              {domainList.map((domain) => (
                <View key={domain.cod}>
                  <Text style={stylesPDF.sectionTitle}>{domain.name}</Text>
                  {domain.questionList.map((question, key) => (
                    <View key={key}>
                      <Text style={stylesPDF.sectionSubtitle}>{question.title}</Text>
                      <Text style={stylesPDF.sectionText}>
                        {question.recommendationMessage}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    );
  }

  async function downloadPdf() {
    const localStorageAnswer = localStorage.getItem("selectedAnswer");
    const { domainList, maxScore, score, formTitle, date } = formData;
    const blob = await pdf(
      <ModifiedPdf
        domainList={domainList}
        maxScore={maxScore}
        score={score}
        answer={JSON.parse(localStorageAnswer)}
        formTitle={formTitle}
        date={date}
      />
    ).toBlob();

    // Create a URL for the blob object
    const url = URL.createObjectURL(blob);
    // Create an anchor element and set its href to the PDF URL
    const a = document.createElement("a");
    a.href = url;

    // Set the anchor element's download attribute to the PDF file name
    a.download = new Date() + "";

    // Append the anchor element to the document body
    document.body.appendChild(a);

    // Click the anchor element to initiate the download
    a.click();

    // Remove the anchor element from the document body
    document.body.removeChild(a);
  }

  useEffect(() => {
    const formIdFromLocalStorage = localStorage.getItem("lastFormSubmited");
    if (formIdFromLocalStorage) {
      getFormResult(Number(formIdFromLocalStorage));
    }
  }, [getFormResult]);




  async function getPDF(){
    const payload = {
      id: localStorage.getItem("userId"),
    }    

    const result = await http.post("/history/pdf", payload).then(r => {
      return r.data as requestResponse;
    }).catch(error => {
      console.error('Erro ao obter o histórico:', error);
      throw error; // Lançar erro para tratamento posterior
    });

    return result;
  }

  async function downloadPlanejaPDF() {
    
    const {data, type} = await getPDF();

    let blob = null;
    
    if (type == "PLANEJATEORICO"){
      blob = await pdf(<ModifiedPdfPlanejaTeorico data={data as IPlanejaDataPDF[]}/>).toBlob();
    }else{
      blob = await pdf(<ModifiedPdfPratico stepValues={data as IStepsValues} />).toBlob();
    }

    // Create a URL for the blob object
    const url = URL.createObjectURL(blob);
    // Create an anchor element and set its href to the PDF URL
    const a = document.createElement("a");
    a.href = url;

    const now = new Date();
  
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Mês começa de 0
    const year = now.getFullYear();

    // Set the anchor element's download attribute to the PDF file name
    a.download = `Resposta do planeja - ${hours}:${minutes}:${seconds}-${day}-${month}-${year}`;

    // Append the anchor element to the document body
    document.body.appendChild(a);

    // Click the anchor element to initiate the download
    a.click();

    // Remove the anchor element from the document body
    document.body.removeChild(a);
  }


  const ModifiedPdfPratico = ({stepValues}: typeDataPratico ) => (
    <Document>
      <Page style={stylesPDFTeorico.page}>
        {/* First Step */}
        <View style={stylesPDFTeorico.section}>
          <Text style={stylesPDFTeorico.title}>Primeira Etapa</Text>
          {stepValues.firstStep.map((item, index) => (
            <View key={index}>
              <Text style={stylesPDFTeorico.subtitle}>Domínio: {item.domain}</Text>
              <Text style={stylesPDFTeorico.text}>
                Primeiro Indicador: {item.first_indicator}
              </Text>
              <Text style={stylesPDFTeorico.text}>
                Grau do Primeiro Indicador: {item.first_degree}
              </Text>
              <Text style={stylesPDFTeorico.text}>
                Segundo Indicador: {item.second_indicator}
              </Text>
              <Text style={stylesPDFTeorico.text}>
                Grau do Segundo Indicador: {item.second_degree}
              </Text>
            </View>
          ))}
        </View>
  
        {/* Second Step */}
        <View style={stylesPDFTeorico.section}>
          <Text style={stylesPDFTeorico.title}>Segunda Etapa</Text>
          {stepValues.secondStep.defined_problems.map((problem, index) => (
            <View key={index}>
              <Text style={stylesPDFTeorico.subtitle}>
                Problema Definido {problem.id}
              </Text>
              <Text style={stylesPDFTeorico.text}>{problem.answer}</Text>
            </View>
          ))}
        </View>
  
        <View style={stylesPDFTeorico.section}>
          <Text style={stylesPDFTeorico.title}>Terceira Etapa</Text>
          {stepValues.thirdStep.causas.map((causa, index) => (
            <View key={index}>
              <Text style={stylesPDFTeorico.subtitle}>Causa {causa.id}</Text>
              <Text style={stylesPDFTeorico.text}>{causa.causa}</Text>
              <Text style={stylesPDFTeorico.text}>{causa.explicacao}</Text>
            </View>
          ))}
        </View>
  
        {/* Third Step */}
        <View style={stylesPDFTeorico.section}>
          <Text style={stylesPDFTeorico.title}>Terceira Etapa</Text>
  
          <Text style={stylesPDFTeorico.text}>
            Nó Crítico: {stepValues.fourthStep.criticalNode}
          </Text>
          {stepValues.fourthStep.actions.map((action, index) => (
            <View key={index}>
              <Text style={stylesPDFTeorico.subtitle}>Ação: {action.name}</Text>
              <Text style={stylesPDFTeorico.text}>
                Prazo: {action.deadline_compliance}
              </Text>
              <Text style={stylesPDFTeorico.text}>Responsáveis:</Text>
              {action.responsibles.map((responsible, i) => (
                <View key={i}>
                  <Text style={stylesPDFTeorico.text}>
                    Responsável: {responsible.responsible}
                  </Text>
                  <Text style={stylesPDFTeorico.text}>
                    Motivação: {responsible.motivation}
                  </Text>
                  <Text style={stylesPDFTeorico.text}>
                    Estratégias: {responsible.strategies}
                  </Text>
                </View>
              ))}
              <Text style={stylesPDFTeorico.text}>Recursos:</Text>
              {action.resources.map((resource, i) => (
                <View key={i}>
                  <Text style={stylesPDFTeorico.text}>
                    Recurso: {resource.resource}
                  </Text>
                  <Text style={stylesPDFTeorico.text}>
                    É Recurso Crítico: {resource.itsCricticalResource}
                  </Text>
                  <Text style={stylesPDFTeorico.text}>
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

  
  return (
    <Drawer
      anchor={"left"}
      open={props.isOpen}
      onClose={() => props.onClose()}
      style={modalStyle}
    >

      <ListMenu items={props.menuItems} />
      {formData && (
        <button
          onClick={() => downloadPdf()}
          style={{
            padding: "3px",
            height: "38px",
            textTransform: "uppercase",
            background: "#921c22",
            borderRadius: "8px",
            textAlign: "center",
            cursor: "pointer",
            width: "90%",
            margin: "0 auto",
            color: "white"
          }}
        >
          Baixar PDF - Avaliações
        </button>
      )}

      {formData && (
        <button
          onClick={() => downloadPlanejaPDF()}
          style={{
            padding: "3px",
            height: "38px",
            textTransform: "uppercase",
            background: "#921c22",
            borderRadius: "8px",
            textAlign: "center",
            cursor: "pointer",
            width: "90%",
            margin: "0 auto",
            color: "white"
          }}
        >
          Baixar PDF - PlanejaSD
        </button>
      )}
    </Drawer>
  );
}