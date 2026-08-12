import { Box, Button, Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useImperativeHandle, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { theme } from "src/core/theme";
import { items } from "./data";
import { containerBodyTypeEnum, localStorageKeyEnum, routerEnum } from "src/core/enums";
import LoginModal from "@components/newMenu/login";
import { TProps } from "./type";

export default function Index() {
    const router = useRouter();
    const largeQuery = useMediaQuery("(min-width:720px)");
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [clickLogin, setClickLogin] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem(localStorageKeyEnum.TOKEN);
        setIsLogged(!!token);
    }, []);

    const handleShowPageByURL = (url: routerEnum | containerBodyTypeEnum) => {
        if (!isLogged && url == routerEnum.FORM) {
            const event = new CustomEvent("clickLoginEvent");
            window.dispatchEvent(event);
            return;
        }
        if (isLogged && url == routerEnum.FORM) {
            router.push(routerEnum.FORM);
            return;
        } else {
            router.push(url);
        }
    };

    return (
        <Box
            sx={{
                background: theme.greyLight,
                marginTop: "5rem",
                paddingTop: !largeQuery ? "2rem" : "1rem",
                minHeight: "88vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    width: 1,
                }}
            >
                <Grid container spacing={4} columns={{ xs: 4, md: 12 }}>
                    <Grid item xs={4} md={6}>
                        <Box textAlign={"justify"} sx={{ paddingX: { xs: "12px", md: "20px" } }}>
                            <Typography sx={{ textIndent: "2rem" }} paragraph={true} variant="body1" color={theme.primaryColor}>
                                É desafio atual para a governança dos estabelecimentos públicos de saúde a tomada de decisão ágil e oportuna, pautada
                                na evidência científica,possibilitando melhoria de qualidade e promoção de saúde no Sistema Único de Saúde (SUS). A
                                gestão da informação em saúde e a inovação em saúde digital podem ser solução.
                            </Typography>
                            <Typography sx={{ textIndent: "2rem" }} paragraph={true} variant="body1" color={theme.primaryColor}>
                                O grupo de pesquisa GestBucal (CNPq), composto de pesquisadores,estudantes de graduação e pós-graduação, tem caráter
                                multidisciplinar e intersetorial, tem operacionalizado através do Observatório de Saúde Bucal/UFPE projetos junto a
                                rede de atenção em saúde bucal do SUS para amplificação da saúde digital.
                            </Typography>
                            <Typography sx={{ textIndent: "2rem" }} paragraph={true} variant="body1" color={theme.primaryColor}>
                                Apresentamos, a plataforma GestBucalSD, que é uma ferramenta web-based de autoprocessamento de dados, a qual possui
                                módulos operacionais para avaliação e vigilância em saúde bucal.
                            </Typography>
                            <Typography sx={{ textIndent: "2rem" }} variant="body1" color={theme.primaryColor}>
                                O seu uso possibilitará a governança inteligente e melhoria da qualidade dos estabelecimentos de saúde da rede de
                                atenção em saúde bucal.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={6}>
                        <Paper sx={{ height: "100%" }} elevation={12}>
                            <Carousel
                                animation="fade"
                                autoPlay={true}
                                indicators={false}
                                duration={150}
                                sx={{
                                    backgroundColor: theme.greyLight,
                                }}
                            >
                                {items.map((item, i) => (
                                    <Paper
                                        key={i}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            padding: "30px",
                                            justifyItems: "center",
                                            gap: "2rem",
                                            minHeight: "100%",
                                        }}
                                    >
                                        <Typography
                                            variant="h4"
                                            color={theme.primaryColor}
                                            sx={{
                                                padding: "5px",
                                                textAlign: "justify",
                                                alignContent: "center",
                                            }}
                                        >
                                            {item.subject}
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                padding: "5px",
                                                textAlign: "justify",
                                                alignContent: "center",
                                                fontSize: { xs: "1.3rem", md: "2rem" },
                                            }}
                                        >
                                            {item.subTitle}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                padding: "8px",
                                                color: theme.secundaryColor,
                                                textAlign: "justify",
                                                alignItems: "center",
                                                minHeight: "100px",
                                            }}
                                        >
                                            {item.description}
                                        </Typography>
                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "end",
                                            }}
                                        >
                                            <Button
                                                sx={{
                                                    width: { xs: "100%", sm: "120px" },
                                                    color: theme.primaryColor,
                                                    border: `2px solid ${theme.secundaryColor}`,
                                                }}
                                                onClick={() => handleShowPageByURL(item.url)}
                                            >
                                                {item.id === 1 ? (isLogged ? "Saiba mais" : "Faça login") : "Saiba mais"}
                                            </Button>
                                        </Box>
                                    </Paper>
                                ))}
                            </Carousel>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
