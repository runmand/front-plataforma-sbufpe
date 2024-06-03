import Image from "next/image";
import React from "react";
import Base from "@components/base-layout/index";
import Appbar from "@components/app-bar/index";
import HomeToolbar from "@components/toolbar/home";
import { Box, Button, Typography } from "@mui/material";

export default function Index() {
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
          <Image width={400} height={400} src={"/plan-finished-form.svg"} />

          <Button href="/form" variant="contained">
            Voltar ao inicio
          </Button>
        </Box>
      }
    />
  );
}
