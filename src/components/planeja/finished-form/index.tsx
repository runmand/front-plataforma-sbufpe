import Image from "next/image";
import React from "react";
import Base from "@components/base-layout/index";
import Appbar from "@components/app-bar/index";
import HomeToolbar from "@components/toolbar/home";
import { Box, Button, Typography } from "@mui/material";
import { IPlanejaDataPDF } from '../planeja-form';
import { pdf, Document, Page, Text, View } from "@react-pdf/renderer";
import { stylesPDF } from "@components/FormResultPdf";

export const FinishedForm = () => {

  type teste = {
    data: IPlanejaDataPDF[]
  };

  localStorage.removeItem("plan-form");

  async function downloadPDF() {
    const data: IPlanejaDataPDF[] = JSON.parse(atob(localStorage.getItem("plan-last")))
    
    const blob = await pdf(<ModifiedPdf data={data}/>).toBlob();
    
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

  const ModifiedPdf = ({
    data
  }: teste) =>{
    return (
    <Document>
      <Page wrap={true}>
        <View style={stylesPDF.section}>
          
            <View style={stylesPDF.sectionSpacing}>
              <Text style={stylesPDF.title}>PlanejaSD</Text>
              {data.map((data) => (
                <View key={data.position}>
                    <Text style={stylesPDF.sectionSubtitle}>{data.content.replace("\r\n", "")}</Text>
                    <Text style={stylesPDF.sectionText}>
                        Opção: {data.choices.question_answer}
                    </Text>
                    <Text style={stylesPDF.sectionTextPlaneja} >
                        Justificativa: {data.choices.justify}
                    </Text>
                </View>
              ))}
            </View>
          </View>    
      </Page>
    </Document>
    );
  }

  return (
    <Base
      appBarChild={<Appbar toolbarChild={<HomeToolbar />} />}
      mainContainerChild={
        <Box
          sx={{
            width: "100%",
            marginY: "6rem",
            display: "flex",
            marginX: "auto",
            flexDirection: "column",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
            paddingY: "50px",
            paddingX: "40px",
          }}
        >
          <Typography
            textAlign={"center"}
            variant="h1"
            fontSize={40}
            sx={{ color: "#1b1b1b" }}
          >
            Formulário Enviado! Obrigado.
          </Typography>
          <Image width={400} height={400} src={"/plan-finished-form.svg"} alt='' />

          <Box
            display={"flex"}
            gap={5}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button href="/form" variant="text">
              Voltar ao inicio
            </Button>
            <Button onClick={downloadPDF} variant="text">
              Baixar PDF
            </Button>
            <Button href="/planeja-pratico" variant="contained">
              Ir para o formulário Planeja Prático
            </Button>
          </Box>
        </Box>
      }
    />
  );
};
