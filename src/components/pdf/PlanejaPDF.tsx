import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { IPlanejaDataPDF } from '@components/planeja/planeja-form';
import { stylesPDF } from '@components/FormResultPdf';
import { nameForm } from '@components/planeja/planeja-form/types';
import { http } from 'src/core/axios';

type PlanejaPDF = {
  data: IPlanejaDataPDF[]
};

// Componente ModifiedPdf
const ModifiedPdfPlanejaTeorico = ({ data }: PlanejaPDF) => {
  return (
    <Document>
      <Page wrap={true}>
        <View style={stylesPDF.section}>
          <View style={stylesPDF.sectionSpacing}>
            <Text style={stylesPDF.title}>PlanejaSD</Text>
            {data.map((item) => (
              <View key={item.position}>
                <Text style={stylesPDF.sectionSubtitle}>
                  {item.content.replace("\r\n", "")}
                </Text>
                <Text style={stylesPDF.sectionText}>
                  Opção: {item.choices.question_answer}
                </Text>
                <Text style={stylesPDF.sectionTextPlaneja}>
                  Justificativa: {item.choices.justify}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default ModifiedPdfPlanejaTeorico;

async function getHistory(){
  const payload = {
    id: localStorage.getItem("userId"),
    form: nameForm
  }    

  const result = await http.post("/history/pdf", payload).then(r => {
    return r.data.data as IPlanejaDataPDF[];
  }).catch(error => {
    console.error('Erro ao obter o histórico:', error);
    throw error; // Lançar erro para tratamento posterior
  });

  return result;
}

export async function downloadPDFPlaneja() {
  const data: IPlanejaDataPDF[] = await getHistory();

  const blob = await pdf(<ModifiedPdfPlanejaTeorico data={data}/>).toBlob();
  
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