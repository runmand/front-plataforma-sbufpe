import Base from "@components/base-layout/index";
import Appbar from "@components/app-bar/index";
import HomeToolbar from "@components/toolbar/home";
import { Avatar, Box, Button, Typography, useMediaQuery } from "@mui/material";
import FormService from "../../src/pages/form/service";
import React, { useEffect, useRef, useState } from "react";
import { INDEX_RES } from "../../src/pages/form/type";
import { useSnackbar } from "notistack";
import { ID } from "src/core/types";
import router from "next/router";
import { localStorageKeyEnum, routerEnum } from "src/core/enums";
import NotFound from "@components/not-found/index";
import { theme } from "src/core/theme";
import FormAnswerService from "src/pages/form-answer/service";
import NewMenu from "@components/newMenu/index";
import FooterMain from "@components/footer/main/index";
import TcleModal from "@components/tcle/index";

export default function Index() {
    let firstOpen = useRef(1);
    const formService = new FormService();
    const formAnwerService = new FormAnswerService();
    const [openTCLE, setOpenTCLE] = useState<boolean>(false);
    const largeQuery = useMediaQuery("(min-width:720px)");
    const { enqueueSnackbar } = useSnackbar();
    const [forms, setForms] = React.useState<INDEX_RES[]>();
    const [formId, setFormId] = React.useState<ID>(0);
    const handleSelectForm = (id: ID) => {
        setFormId(id);
        setOpenTCLE(true);
    };

    async function goForm() {
        router.push({ pathname: routerEnum.FORM_ANSWER, query: { formId } });
    }

    async function getFormResult() {
        try {
            const { data: formResult } = await formAnwerService.getFormattedFormShow(3);
            console.log(formResult);
        } catch (err: any) {
            console.error(err);
        }
    }

    async function formServiceIndex() {
        formService
            .index()
            .then((res) => {
                if (!res.errors) {
                    const typeId = +localStorage.getItem(localStorageKeyEnum.TYPE_ID);
                    switch (typeId) {
                        case 1:
                            return setForms(res.data);
                        case 2:
                            return setForms(res.data);
                        case 3:
                            return setForms(
                                res.data.filter((form) => form.id !== 2 && form.id !== 5 && form.id !== 6 && form.id !== 7 && form.id !== 8)
                            );
                        case 4:
                            return setForms(res.data.filter((form) => form.id === 2));
                    }
                } else {
                    res.errors.forEach((error) => enqueueSnackbar(error, { variant: "error" }));
                }
            })
            .catch((e) => {
                enqueueSnackbar("Ops! Algo deu errado...", { variant: "error" }); //TODO: Tratar essa exception
            });
    }

    useEffect(() => {
        if (firstOpen.current == 0) {
            getFormResult();
            formServiceIndex();
        } else {
            firstOpen.current = 1;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Base
            appBarChild={<NewMenu />}
            mainContainerChild={
                forms ? (
                    forms.length === 0 ? (
                        <Typography>Sem formularios</Typography>
                    ) : (
                        <Box
                            sx={{
                                background: theme.greyLight,
                                minHeight: "88vh",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    marginY: { xs: "10rem", sm: "7rem" },
                                    marginX: { xs: "1rem", sm: "2rem" },
                                    minHeight: { xs: "500px", sm: "500px" },
                                    minWidth: { xs: "80%" },
                                    background: theme.greyLight,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    overflow: "unset",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: { xs: "h5.fontSize", md: "h4.fontSize" },
                                        fontWeight: "bold",
                                    }}
                                >
                                    Questionário Avaliativo
                                </Typography>
                                <Box
                                    sx={{
                                        paddingTop: "4rem",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "20px",
                                        justifyContent: "center",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {forms.map((v, i) => (
                                        <Button
                                            key={i}
                                            sx={{
                                                backgroundColor: theme.primaryColor,
                                                color: theme.white,
                                                width: { xs: "100%", sm: "350px" },
                                                height: "200px",
                                                borderWidth: "0.5rem",
                                                borderColor: theme.secundaryColor,
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "10px",
                                                fontWeight: "bold",
                                                "&:hover": {
                                                    backgroundColor: theme.secundaryColor,
                                                },
                                            }}
                                            onClick={() => handleSelectForm(v.id)}
                                        >
                                            <Avatar alt="Logo de Odontologia" src="/logo-transparent.png" sx={{ width: "56", height: "56" }} />
                                            {v.title}
                                            <></>
                                        </Button>
                                    ))}
                                </Box>
                            </Box>
                            {openTCLE ? <TcleModal idForm={formId} setOpenTCLE={setOpenTCLE} open={openTCLE} goForm={goForm} /> : <></>}
                        </Box>
                    )
                ) : (
                    <div></div>
                )
            }
            footerChild={<FooterMain />}
        />
    );
}
