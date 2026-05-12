import Head from 'next/head';
import NewMenu from "@components/newMenu/index";
import Image from "next/image";
import React from "react";
import Base from "@components/base-layout/index";
import { Box, Button, Typography } from "@mui/material";
import { downloadPDFPlaneja } from "@components/pdf/PlanejaPDF";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Index() {
    return (
        <>
            <Head>
                <title>Certificado | GestBucal</title>
            </Head>
            <Base
            appBarChild={<NewMenu />}
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
                    <Typography textAlign={"center"} variant="h1" fontSize={40} sx={{ color: "#1b1b1b" }}>
                        Formulário Enviado! Obrigado.
                    </Typography>
                    <Image width={400} height={400} src={"/plan-finished-form.svg"} alt="" />

                    <Typography textAlign={"center"} variant="h3" fontSize={16} sx={{ color: "#1b1b1b97" }}>
                        Obs: Enviamos o certificado de conclusão para o email informado no formulario.
                    </Typography>

                    <Box display={"flex"} gap={5} justifyContent={"center"} alignItems={"center"}>
                        <Button href="/form" variant="text">
                            <ArrowBackIcon /> Voltar ao inicio
                        </Button>
                        <Button onClick={downloadPDFPlaneja} variant="outlined">
                            <DownloadIcon /> Baixar PDF
                        </Button>
                        <Button onClick={downloadPDFPlaneja} variant="outlined">
                            <DownloadIcon /> Baixar Certificado
                        </Button>
                        <Button href="/planeja-pratico" variant="contained">
                            Ir para o formulário Planeja Prático <ArrowForwardIcon />
                        </Button>
                    </Box>
                </Box>
            }
        />
        </>
    );
}
