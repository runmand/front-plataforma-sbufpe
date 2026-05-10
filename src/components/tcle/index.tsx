import React, { Dispatch, useEffect, useRef, useState } from "react";
import { Modal, Box, useMediaQuery, CircularProgress } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { CardContainer, CardTitle, DocumentContainer, DocumentTitle, TermScrollArea, TermsButton, TermsButtonContainer, TermsContainer, TermsText } from "./styled";
import TCLE from "./tcle-document/TCLE";
import TALEU18 from "./tcle-document/TALEU18";
import TALEU13 from "./tcle-document/TALEU13";
import TCLE2 from "./tcle-document/TCLE2";
import TCLEPROF from "./tcle-document/TCLEPROF";
import { ID } from "src/core/types";
import { http } from "src/core/axios";
import { useSnackbar } from "notistack";
import { AxiosError, AxiosResponse } from "axios";

type Props = {
    open: boolean;
    setOpenTCLE: Dispatch<React.SetStateAction<boolean>>;
    idForm: ID;
    goForm: (id?: ID) => Promise<void>;
};

export type PropsTerm = {
    validateData: (fn: () => boolean) => void;
};

export type DataTerm = {
    valid: boolean;
    type: string;
    email: string;
    account: number;
    pdf: string;
    created_at: Date;
    form?: number;
};

type TermRef = { getStates: () => Promise<DataTerm> };
type TermRefNew = { getStatesNew: () => Promise<DataTerm> };

const Badge = ({ checked }: { checked: boolean }) => (
    <span style={{
        fontSize: '0.68rem', fontWeight: 700, padding: '3px 10px', borderRadius: '100px',
        flexShrink: 0, letterSpacing: '0.03em',
        backgroundColor: checked ? 'rgba(22,163,74,0.1)' : 'rgba(217,119,6,0.1)',
        color: checked ? '#16a34a' : '#d97706',
        border: `1px solid ${checked ? 'rgba(22,163,74,0.25)' : 'rgba(217,119,6,0.25)'}`,
    }}>
        {checked ? '✓ Concluído' : '● Pendente'}
    </span>
);

const DocIcon = ({ checked }: { checked: boolean }) => (
    <span style={{
        width: 38, height: 38, borderRadius: '10px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: checked ? '#6D141A' : 'rgba(109,20,26,0.08)',
        transition: 'background-color 0.2s',
    }}>
        {checked ? (
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        ) : (
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#6D141A" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        )}
    </span>
);

export default function TcleModal(props: Props) {
    const TCLERef = useRef<TermRef>(null);
    const TCLE2Ref = useRef<TermRef>(null);
    const TALERef = useRef<TermRef>(null);
    const TALEURef = useRef<TermRefNew>(null);
    const TCLEPROFRef = useRef<TermRef>(null);
    const [openForm, setOpenForm] = useState(false);
    const [checkedTCLE, setCheckedTCLE] = useState(false);
    const [dataTCLE, setDataTCLE] = useState<DataTerm | null>(null);
    const [checkedTCLE2, setCheckedTCLE2] = useState(false);
    const [dataTCLE2, setDataTCLE2] = useState<DataTerm | null>(null);
    const [checkedTCLEPROF, setCheckedTCLEPROF] = useState(false);
    const [dataTCLEPROF, setDataTCLEPROF] = useState<DataTerm | null>(null);
    const [checkedTALE18, setCheckedTALE18] = useState(false);
    const [dataTALE, setDataTALE] = useState<DataTerm | null>(null);
    const [checkedTALEUNDER13, setCheckedTALEUNDER13] = useState(false);
    const [dataTALEU, setDataTALEU] = useState<DataTerm | null>(null);
    const largeQuery = useMediaQuery("(min-width:720px)");
    const snackBar = useSnackbar();

    const [termSelected, setTermSelected] = useState<"TCLE" | "TCLE2" | "TALE18" | "TALEU13" | "TCLEPROF">("TCLEPROF");
    const [hasReadTerm, setHasReadTerm] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setCheckedTCLE(sessionStorage.getItem('tcle_TCLE') === '1');
        setCheckedTCLE2(sessionStorage.getItem('tcle_TCLE2') === '1');
        setCheckedTCLEPROF(sessionStorage.getItem('tcle_TCLEPROF') === '1');
        setCheckedTALE18(sessionStorage.getItem('tcle_TALE18') === '1');
        setCheckedTALEUNDER13(sessionStorage.getItem('tcle_TALEU13') === '1');
    }, []);

    useEffect(() => { setHasReadTerm(false); }, [termSelected]);

    useEffect(() => { if (!props.open) setOpenForm(false); }, [props.open]);


    const handleTermScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollTop + clientHeight >= scrollHeight - 30) setHasReadTerm(true);
    };

    const confirmTerm = async () => {
        setLoading(true);
        try {
            let states = null;
            if (termSelected == "TCLE") {
                states = await TCLERef.current?.getStates();
                if (states) { states.form = Number(props.idForm); setDataTCLE(states); setCheckedTCLE(true); sessionStorage.setItem('tcle_TCLE', '1'); }
            } else if (termSelected == "TCLE2") {
                states = await TCLE2Ref.current?.getStates();
                if (states) { states.form = Number(props.idForm); setDataTCLE2(states); setCheckedTCLE2(true); sessionStorage.setItem('tcle_TCLE2', '1'); }
            } else if (termSelected == "TCLEPROF") {
                states = await TCLEPROFRef.current?.getStates();
                if (states) { states.form = Number(props.idForm); setDataTCLEPROF(states); setCheckedTCLEPROF(true); sessionStorage.setItem('tcle_TCLEPROF', '1'); }
            } else if (termSelected == "TALE18") {
                states = await TALERef.current?.getStates();
                if (states) { states.form = Number(props.idForm); setDataTALE(states); setCheckedTALE18(true); sessionStorage.setItem('tcle_TALE18', '1'); }
            } else if (termSelected == "TALEU13") {
                states = await TALEURef.current?.getStatesNew();
                if (states) { states.form = Number(props.idForm); setDataTALEU(states); setCheckedTALEUNDER13(true); sessionStorage.setItem('tcle_TALEU13', '1'); }
            }
            if (states) setOpenForm(false);
        } finally {
            setLoading(false);
        }
    };

    async function iCanGo() {
        if (dataTCLE || dataTCLEPROF) {
        const tcleData = dataTCLE ?? dataTCLEPROF;
            setLoading(true);
            let response = await http.post("/term/send", {
                tcle: tcleData,
                tale: dataTALE,
                taleu: dataTALEU,
                formId: props.idForm,
            });

            if (response.data) {
                snackBar.enqueueSnackbar(response.data, { variant: "success" });
                props.goForm();
                props.setOpenTCLE(false);
            } else {
                type ErrorResponse = { errors: string[] };
                const newResponse = response as unknown as ErrorResponse;
                snackBar.enqueueSnackbar(
                    newResponse.errors?.[0] ?? "Houve um erro ao tentar enviar seu termo, tente refazer e mande novamente",
                    { variant: "error" }
                );
            }
            setLoading(false);
        } else {
            snackBar.enqueueSnackbar("Você precisa asssinar os termos obrigatorios (*)!", {
                variant: "warning",
            });
        }
    }

    return (
        <Modal
            sx={{
                width: largeQuery ? "60vw" : "100vw",
                margin: largeQuery ? "auto" : "0",
            }}
            open={props.open}
            onClose={() => props.setOpenTCLE(false)}
            onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key == "Escape") {
                    props.setOpenTCLE(false);
                }
            }}
        >
            {!openForm ? (
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "100%",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        borderRadius: 3,
                        p: 4,
                    }}
                >
                    <CardContainer>
                        <CardTitle>Termos de Consentimento</CardTitle>
                        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#9ca3af', margin: '0 0 14px', fontFamily: "'Source Sans 3', sans-serif" }}>
                            Clique em cada termo, leia e assine para continuar
                        </p>
                        <TermsContainer>
                            <TermsText
                                $checked={checkedTCLE}
                                style={{ display: props.idForm == "5" || props.idForm == "6" || props.idForm == "2" ? "" : "none" }}
                                onClick={() => { setOpenForm(true); setTermSelected("TCLE"); }}
                            >
                                <DocIcon checked={checkedTCLE} />
                                <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: checkedTCLE ? '#6D141A' : '#1c1917', lineHeight: 1.3 }}>
                                        Termo de Consentimento — Responsável Legal
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 400 }}>Para responsável legal pelo menor de 18 anos</span>
                                </span>
                                <Badge checked={checkedTCLE} />
                            </TermsText>
                            <TermsText
                                $checked={checkedTCLEPROF}
                                style={{ display: props.idForm == "1" || props.idForm == "3" || props.idForm == "4" ? "" : "none" }}
                                onClick={() => { setOpenForm(true); setTermSelected("TCLEPROF"); }}
                            >
                                <DocIcon checked={checkedTCLEPROF} />
                                <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: checkedTCLEPROF ? '#6D141A' : '#1c1917', lineHeight: 1.3 }}>
                                        Termo de Consentimento — Profissionais
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 400 }}>Módulos 1, 2 e 3 · Maiores de 18 anos</span>
                                </span>
                                <Badge checked={checkedTCLEPROF} />
                            </TermsText>
                            <TermsText
                                $checked={checkedTCLE2}
                                style={{ display: props.idForm == "6" || props.idForm == "2" ? "" : "none" }}
                                onClick={() => { setOpenForm(true); setTermSelected("TCLE2"); }}
                            >
                                <DocIcon checked={checkedTCLE2} />
                                <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: checkedTCLE2 ? '#6D141A' : '#1c1917', lineHeight: 1.3 }}>
                                        Termo de Consentimento — Maiores de 18 Anos
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 400 }}>Para maiores de 18 anos ou emancipados</span>
                                </span>
                                <Badge checked={checkedTCLE2} />
                            </TermsText>
                            <TermsText
                                $checked={checkedTALE18}
                                style={{ display: props.idForm == "6" || props.idForm == "2" ? "" : "none" }}
                                onClick={() => { setOpenForm(true); setTermSelected("TALE18"); }}
                            >
                                <DocIcon checked={checkedTALE18} />
                                <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: checkedTALE18 ? '#6D141A' : '#1c1917', lineHeight: 1.3 }}>
                                        Termo de Assentimento — 13 a 18 Anos
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 400 }}>Para menores entre 13 e 18 anos</span>
                                </span>
                                <Badge checked={checkedTALE18} />
                            </TermsText>
                            <TermsText
                                $checked={checkedTALEUNDER13}
                                style={{ display: props.idForm == "5" || props.idForm == "2" ? "" : "none" }}
                                onClick={() => { setOpenForm(true); setTermSelected("TALEU13"); }}
                            >
                                <DocIcon checked={checkedTALEUNDER13} />
                                <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: checkedTALEUNDER13 ? '#6D141A' : '#1c1917', lineHeight: 1.3 }}>
                                        TALE Lúdico — 5 a 12 Anos
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 400 }}>Termo de assentimento para crianças</span>
                                </span>
                                <Badge checked={checkedTALEUNDER13} />
                            </TermsText>
                        </TermsContainer>
                    </CardContainer>
                    <TermsButtonContainer>
                        <TermsButton disabled={loading} onClick={() => props.setOpenTCLE(false)}>
                            <ArrowBack />
                            Voltar
                        </TermsButton>
                        <TermsButton disabled={loading} onClick={iCanGo}>
                            {loading ? <CircularProgress size={18} color="inherit" /> : <>Próximo <ArrowForward /></>}
                        </TermsButton>
                    </TermsButtonContainer>
                </Box>
            ) : (
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "100%",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        borderRadius: 3,
                        p: 2,
                        px: 3,
                    }}
                >
                    <DocumentContainer>
                        {termSelected == "TCLE" && <DocumentTitle>Termo de Consentimento Livre e Esclarecido (Para Responsável Legal pelo Menor de 18 Anos)</DocumentTitle>}
                        {termSelected == "TALEU13" && <DocumentTitle>Termo de Assentimento Livre e Esclarecido | TALE Lúdico (5 a 12 anos)</DocumentTitle>}
                        {termSelected == "TALE18" && <DocumentTitle>Termo de Assentimento Livre e Esclarecido (Para Menores de 13 a 18 Anos)</DocumentTitle>}
                        {termSelected == "TCLE2" && <DocumentTitle>Termo de Consentimento Livre e Esclarecido (Para Maiores de 18 Anos)</DocumentTitle>}
                        {termSelected == "TCLEPROF" && <DocumentTitle>Termo de Consentimento Livre e Esclarecido – Módulos 1, 2 e 3 - Profissionais</DocumentTitle>}

                        <TermScrollArea onScroll={handleTermScroll}>
                            <div style={{ display: termSelected == "TCLE" ? "" : "none" }}><TCLE ref={TCLERef} /></div>
                            <div style={{ display: termSelected == "TALEU13" ? "" : "none" }}><TALEU13 ref={TALEURef} /></div>
                            <div style={{ display: termSelected == "TALE18" ? "" : "none" }}><TALEU18 ref={TALERef} /></div>
                            <div style={{ display: termSelected == "TCLE2" ? "" : "none" }}><TCLE2 ref={TCLE2Ref} /></div>
                            <div style={{ display: termSelected == "TCLEPROF" ? "" : "none" }}><TCLEPROF ref={TCLEPROFRef} /></div>
                        </TermScrollArea>

                        {!hasReadTerm && (
                            <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: '#9ca3af', textAlign: 'center' }}>
                                Role até o final do documento para continuar
                            </p>
                        )}
                    </DocumentContainer>
                    <TermsButtonContainer>
                        <TermsButton disabled={loading} onClick={() => setOpenForm(false)}>
                            <ArrowBack />
                            Voltar
                        </TermsButton>
                        <TermsButton
                            disabled={loading || !hasReadTerm}
                            onClick={hasReadTerm && !loading ? confirmTerm : undefined}
                            style={{
                                opacity: hasReadTerm ? 1 : 0.45,
                                cursor: hasReadTerm && !loading ? 'pointer' : 'not-allowed',
                            }}
                        >
                            {loading
                                ? <CircularProgress size={18} color="inherit" />
                                : <>Próximo <ArrowForward /></>
                            }
                        </TermsButton>
                    </TermsButtonContainer>
                </Box>
            )}
        </Modal>
    );
}
