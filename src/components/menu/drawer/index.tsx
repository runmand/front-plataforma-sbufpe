import { Drawer } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { TPROPS } from "./type";
import ListMenu from "@components/menu/list/index";
import { modalStyle } from "./style";
import FormAnswerService from "src/pages/form-answer/service";
import { ResultFormPdf, stylesPDF } from "@components/FormResultPdf";
import { pdf, Document, Page, Text, View } from "@react-pdf/renderer";
import { FormResultProps } from "@components/FormResultPdf/FormResultProps.types";

//TODO: Permitir configuração da posição do drawer menu
export default function Index(props: TPROPS) {
  const [formData, setFormData] = useState<FormResultProps>();
  const formAnwerService = useMemo(() => new FormAnswerService(), []);

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
          }}
        >
          Baixar PDF - Avaliações
        </button>
      )}
    </Drawer>
  );
}