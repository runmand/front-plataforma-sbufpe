import React, { useEffect, useState } from "react";
import { http } from "src/core/axios";
import { TProps } from "./type";
import { Box, CircularProgress, Typography, useMediaQuery } from "@mui/material";

export default function Index(props: TProps) {
    const [link, setLink] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const isLarge = useMediaQuery("(min-width:720px)");

    useEffect(() => {
        async function handleReset() {
            try {
                const res = await http.get(`/bi${props.type}/${props.form}`);
                if (res.data.link) {
                    setLink(res.data.link);
                }
            } catch (error) {
                console.error("Erro ao carregar o link:", error);
            } finally {
                setLoading(false);
            }
        }

        handleReset();
    }, [props.type, props.form]);

    const titleSize    = isLarge ? "32pt" : "20pt";
    // 800px garante que o conteúdo + barra de paginação do PowerBI apareçam sem corte
    const iframeHeight = isLarge ? "800px" : "500px";

    return (
        <Box sx={{ marginTop: "84px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: iframeHeight }}>
                    <CircularProgress color="secondary" />
                </Box>
            ) : link ? (
                <>
                    <Typography textAlign="center" fontSize={titleSize} color="#6D141A" sx={{ py: isLarge ? 2 : 1 }}>
                        {props.type === "closed" ? "Dados " : "Respondentes "}{" "}
                        {props.form === "usuario" ? "- Usuários" : props.form === "aps" ? "APS" : "CEO"}
                    </Typography>
                    <iframe
                        title={`${props.form} data Analysis`}
                        style={{ width: "100%", height: iframeHeight, display: "block", border: "none" }}
                        src={link}
                        allow="fullscreen"
                    />
                </>
            ) : (
                <Typography textAlign="center" fontSize={titleSize} color="#6D141A" sx={{ mt: 4 }}>
                    Link temporariamente não disponível
                </Typography>
            )}
        </Box>
    );
}
