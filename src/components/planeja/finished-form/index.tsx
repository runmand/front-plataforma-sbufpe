import Image from "next/image";
import React from "react";
import Base from "@components/base-layout/index";
import Appbar from "@components/app-bar/index";
import HomeToolbar from "@components/toolbar/home";
import { Box, Button, Typography } from "@mui/material";
import { downloadPDFPlaneja } from '@components/pdf/PlanejaPDF';


export const FinishedForm = () => {
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
            <Button onClick={downloadPDFPlaneja} variant="text">
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
