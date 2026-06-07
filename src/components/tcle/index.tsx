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

const Badge = ({ checked, skippable }: { checked: boolean; skippable?: boolean }) => {
    if (skippable && !checked) return (
        <span style={{
            fontSize: '0.68rem', fontWeight: 700, padding: '3px 10px', borderRadius: '100px',
            flexShrink: 0, letterSpacing: '0.03em',
            backgroundColor: 'rgba(107,114,128,0.08)',
            color: '#9ca3af',
            border: '1px solid rgba(107,114,128,0.2)',
        }}>
            ○ Não se aplica
        </span>
    );
    return (
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
};

const DocIcon = ({ checked, skippable }: { checked: boolean; skippable?: boolean }) => (
    <span style={{
        width: 38, height: 38, borderRadius: '10px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: skippable && !checked ? 'rgba(107,114,128,0.06)' : checked ? '#6D141A' : 'rgba(109,20,26,0.08)',
        transition: 'background-color 0.2s',
    }}>
        {checked ? (
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        ) : skippable ? (
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#c4c4c4" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
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
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    useEffect(() => {
        setCheckedTCLE(sessionStorage.getItem('tcle_TCLE') === '1');
        setCheckedTCLE2(sessionStorage.getItem('tcle_TCLE2') === '1');
        setCheckedTCLEPROF(sessionStorage.getItem('tcle_TCLEPROF') === '1');
        setCheckedTALE18(sessionStorage.getItem('tcle_TALE18') === '1');
        setCheckedTALEUNDER13(sessionStorage.getItem('tcle_TALEU13') === '1');
    }, []);

    useEffect(() => { setHasReadTerm(false); setShowConfirmDialog(false); }, [termSelected]);

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
        const isForm6 = props.idForm == "6" || props.idForm == "2";

        // Form 6 — caminho adulto: apenas TCLE2
        if (isForm6 && checkedTCLE2) {
            if (!dataTCLE2) { props.goForm(); props.setOpenTCLE(false); return; }
            setLoading(true);
            const response = await http.post("/term/send", { tcle: dataTCLE2, tale: null, taleu: null, formId: props.idForm });
            if (response.data) { snackBar.enqueueSnackbar(response.data, { variant: "success" }); props.goForm(); props.setOpenTCLE(false); }
            else { const r = response as unknown as { errors: string[] }; snackBar.enqueueSnackbar(r.errors?.[0] ?? "Houve um erro ao tentar enviar seu termo, tente refazer e mande novamente", { variant: "error" }); }
            setLoading(false);
            return;
        }

        // Caminho menor 13-18: TCLE + TALE18
        if (isForm6 && checkedTCLE && checkedTALE18) {
            if (!dataTCLE) { props.goForm(); props.setOpenTCLE(false); return; }
            setLoading(true);
            const response = await http.post("/term/send", { tcle: dataTCLE, tale: dataTALE, taleu: null, formId: props.idForm });
            if (response.data) { snackBar.enqueueSnackbar(response.data, { variant: "success" }); props.goForm(); props.setOpenTCLE(false); }
            else { const r = response as unknown as { errors: string[] }; snackBar.enqueueSnackbar(r.errors?.[0] ?? "Houve um erro ao tentar enviar seu termo, tente refazer e mande novamente", { variant: "error" }); }
            setLoading(false);
            return;
        }

        // Caminho criança 5-12 (form 2): TCLE + TALEU13
        if (props.idForm == "2" && checkedTCLE && checkedTALEUNDER13) {
            if (!dataTCLE) { props.goForm(); props.setOpenTCLE(false); return; }
            setLoading(true);
            const response = await http.post("/term/send", { tcle: dataTCLE, tale: null, taleu: dataTALEU, formId: props.idForm });
            if (response.data) { snackBar.enqueueSnackbar(response.data, { variant: "success" }); props.goForm(); props.setOpenTCLE(false); }
            else { const r = response as unknown as { errors: string[] }; snackBar.enqueueSnackbar(r.errors?.[0] ?? "Houve um erro ao tentar enviar seu termo, tente refazer e mande novamente", { variant: "error" }); }
            setLoading(false);
            return;
        }

        // Nenhum caminho completo
        if (isForm6) {
            if (checkedTCLE && !checkedTALE18 && !checkedTALEUNDER13) {
                snackBar.enqueueSnackbar("Assine o Termo de Assentimento (13 a 18 Anos) ou o TALE Lúdico (5 a 12 Anos) para continuar.", { variant: "warning" });
            } else {
                snackBar.enqueueSnackbar("Você precisa asssinar os termos obrigatorios (*)!", { variant: "warning" });
            }
            return;
        }

        // Demais forms
        const tcleData = dataTCLE ?? dataTCLEPROF;

        if (tcleData) {
            setLoading(true);
            const response = await http.post("/term/send", { tcle: tcleData, tale: dataTALE, taleu: dataTALEU, formId: props.idForm });
            if (response.data) { snackBar.enqueueSnackbar(response.data, { variant: "success" }); props.goForm(); props.setOpenTCLE(false); }
            else { const r = response as unknown as { errors: string[] }; snackBar.enqueueSnackbar(r.errors?.[0] ?? "Houve um erro ao tentar enviar seu termo, tente refazer e mande novamente", { variant: "error" }); }
            setLoading(false);
        } else {
            snackBar.enqueueSnackbar("Você precisa asssinar os termos obrigatorios (*)!", { variant: "warning" });
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

                        {(props.idForm == "6" || props.idForm == "2") && checkedTCLE2 && (
                            <div style={{
                                display: 'flex', alignItems: 'flex-start', gap: '10px',
                                backgroundColor: 'rgba(22,163,74,0.06)', border: '1px solid rgba(22,163,74,0.2)',
                                borderRadius: '10px', padding: '10px 14px', marginBottom: '12px',
                            }}>
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth={2} style={{ flexShrink: 0, marginTop: '1px' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p style={{ margin: 0, fontSize: '0.78rem', color: '#15803d', lineHeight: 1.5, fontFamily: "'Source Sans 3', sans-serif" }}>
                                    Você pode prosseguir — o <strong>Termo de Maiores de 18 Anos</strong> já cobre sua participação. Os demais termos são para outros perfis de participante.
                                </p>
                            </div>
                        )}
                        {(props.idForm == "6" || props.idForm == "2") && checkedTCLE && !checkedTCLE2 && checkedTALE18 && (
                            <div style={{
                                display: 'flex', alignItems: 'flex-start', gap: '10px',
                                backgroundColor: 'rgba(22,163,74,0.06)', border: '1px solid rgba(22,163,74,0.2)',
                                borderRadius: '10px', padding: '10px 14px', marginBottom: '12px',
                            }}>
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth={2} style={{ flexShrink: 0, marginTop: '1px' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p style={{ margin: 0, fontSize: '0.78rem', color: '#15803d', lineHeight: 1.5, fontFamily: "'Source Sans 3', sans-serif" }}>
                                    Você pode prosseguir — o <strong>Termo do Responsável Legal</strong> e o <strong>Termo de Assentimento (13 a 18 Anos)</strong> estão assinados.
                                </p>
                            </div>
                        )}
                        {props.idForm == "2" && checkedTCLE && !checkedTCLE2 && checkedTALEUNDER13 && !checkedTALE18 && (
                            <div style={{
                                display: 'flex', alignItems: 'flex-start', gap: '10px',
                                backgroundColor: 'rgba(22,163,74,0.06)', border: '1px solid rgba(22,163,74,0.2)',
                                borderRadius: '10px', padding: '10px 14px', marginBottom: '12px',
                            }}>
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth={2} style={{ flexShrink: 0, marginTop: '1px' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p style={{ margin: 0, fontSize: '0.78rem', color: '#15803d', lineHeight: 1.5, fontFamily: "'Source Sans 3', sans-serif" }}>
                                    Você pode prosseguir — o <strong>Termo do Responsável Legal</strong> e o <strong>TALE Lúdico (5 a 12 Anos)</strong> estão assinados.
                                </p>
                            </div>
                        )}
                        {(props.idForm == "6" || props.idForm == "2") && checkedTCLE && !checkedTCLE2 && !checkedTALE18 && !checkedTALEUNDER13 && (
                            <div style={{
                                display: 'flex', alignItems: 'flex-start', gap: '10px',
                                backgroundColor: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.2)',
                                borderRadius: '10px', padding: '10px 14px', marginBottom: '12px',
                            }}>
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth={2} style={{ flexShrink: 0, marginTop: '1px' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p style={{ margin: 0, fontSize: '0.78rem', color: '#92400e', lineHeight: 1.5, fontFamily: "'Source Sans 3', sans-serif" }}>
                                    {props.idForm == "2"
                                        ? <>Assine o <strong>Termo de Assentimento — 13 a 18 Anos</strong> ou o <strong>TALE Lúdico (5 a 12 Anos)</strong> para concluir e prosseguir.</>
                                        : <>Assine também o <strong>Termo de Assentimento — 13 a 18 Anos</strong> para concluir e prosseguir.</>
                                    }
                                </p>
                            </div>
                        )}

                        <TermsContainer>
                            <TermsText
                                $checked={checkedTCLE}
                                style={{
                                    display: props.idForm == "5" || props.idForm == "6" || props.idForm == "2" ? "" : "none",
                                    opacity: ((props.idForm == "6" || props.idForm == "2") && checkedTCLE2 && !checkedTCLE) ? 0.5 : 1,
                                    cursor: (checkedTCLE || ((props.idForm == "6" || props.idForm == "2") && checkedTCLE2 && !checkedTCLE)) ? 'default' : 'pointer',
                                    pointerEvents: (checkedTCLE || ((props.idForm == "6" || props.idForm == "2") && checkedTCLE2 && !checkedTCLE)) ? 'none' : 'auto',
                                }}
                                onClick={() => { setOpenForm(true); setTermSelected("TCLE"); }}
                            >
                                <DocIcon checked={checkedTCLE} skippable={(props.idForm == "6" || props.idForm == "2") && checkedTCLE2 && !checkedTCLE} />
                                <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: checkedTCLE ? '#6D141A' : ((props.idForm == "6" || props.idForm == "2") && checkedTCLE2) ? '#9ca3af' : '#1c1917', lineHeight: 1.3 }}>
                                        Termo de Consentimento — Responsável Legal
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 400 }}>Para responsável legal pelo menor de 18 anos</span>
                                </span>
                                <Badge checked={checkedTCLE} skippable={(props.idForm == "6" || props.idForm == "2") && checkedTCLE2 && !checkedTCLE} />
                            </TermsText>
                            <TermsText
                                $checked={checkedTCLEPROF}
                                style={{
                                    display: props.idForm == "1" || props.idForm == "3" || props.idForm == "4" || props.idForm == "15" ? "" : "none",
                                    cursor: checkedTCLEPROF ? 'default' : 'pointer',
                                    pointerEvents: checkedTCLEPROF ? 'none' : 'auto',
                                }}
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
                            {(() => {
                                const tcle2Skippable = (props.idForm == "6" || props.idForm == "2") && checkedTCLE && !checkedTCLE2;
                                return (
                                    <TermsText
                                        $checked={checkedTCLE2}
                                        style={{
                                            display: props.idForm == "6" || props.idForm == "2" ? "" : "none",
                                            opacity: tcle2Skippable ? 0.5 : 1,
                                            cursor: (checkedTCLE2 || tcle2Skippable) ? 'default' : 'pointer',
                                            pointerEvents: (checkedTCLE2 || tcle2Skippable) ? 'none' : 'auto',
                                        }}
                                        onClick={() => { setOpenForm(true); setTermSelected("TCLE2"); }}
                                    >
                                        <DocIcon checked={checkedTCLE2} skippable={tcle2Skippable} />
                                        <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: checkedTCLE2 ? '#6D141A' : tcle2Skippable ? '#9ca3af' : '#1c1917', lineHeight: 1.3 }}>
                                                Termo de Consentimento — Maiores de 18 Anos
                                            </span>
                                            <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 400 }}>Para maiores de 18 anos ou emancipados</span>
                                        </span>
                                        <Badge checked={checkedTCLE2} skippable={tcle2Skippable} />
                                    </TermsText>
                                );
                            })()}
                            {(() => {
                                const tale18Skippable = !checkedTALE18 && (
                                    ((props.idForm == "6" || props.idForm == "2") && checkedTCLE2 && !checkedTCLE) ||
                                    (props.idForm == "2" && checkedTCLE && checkedTALEUNDER13)
                                );
                                return (
                                    <TermsText
                                        $checked={checkedTALE18}
                                        style={{
                                            display: props.idForm == "6" || props.idForm == "2" ? "" : "none",
                                            opacity: tale18Skippable ? 0.5 : 1,
                                            cursor: (checkedTALE18 || tale18Skippable) ? 'default' : 'pointer',
                                            pointerEvents: (checkedTALE18 || tale18Skippable) ? 'none' : 'auto',
                                        }}
                                        onClick={() => { setOpenForm(true); setTermSelected("TALE18"); }}
                                    >
                                        <DocIcon checked={checkedTALE18} skippable={tale18Skippable} />
                                        <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: checkedTALE18 ? '#6D141A' : tale18Skippable ? '#9ca3af' : '#1c1917', lineHeight: 1.3 }}>
                                                Termo de Assentimento — 13 a 18 Anos
                                            </span>
                                            <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 400 }}>Para menores entre 13 e 18 anos</span>
                                        </span>
                                        <Badge checked={checkedTALE18} skippable={tale18Skippable} />
                                    </TermsText>
                                );
                            })()}
                            {(() => {
                                const taleuSkippable = props.idForm == "2" && !checkedTALEUNDER13 &&
                                    (checkedTCLE2 || (checkedTCLE && checkedTALE18));
                                return (
                                    <TermsText
                                        $checked={checkedTALEUNDER13}
                                        style={{
                                            display: props.idForm == "5" || props.idForm == "2" ? "" : "none",
                                            opacity: taleuSkippable ? 0.5 : 1,
                                            cursor: (checkedTALEUNDER13 || taleuSkippable) ? 'default' : 'pointer',
                                            pointerEvents: (checkedTALEUNDER13 || taleuSkippable) ? 'none' : 'auto',
                                        }}
                                        onClick={() => { setOpenForm(true); setTermSelected("TALEU13"); }}
                                    >
                                        <DocIcon checked={checkedTALEUNDER13} skippable={taleuSkippable} />
                                        <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: checkedTALEUNDER13 ? '#6D141A' : taleuSkippable ? '#9ca3af' : '#1c1917', lineHeight: 1.3 }}>
                                                TALE Lúdico — 5 a 12 Anos
                                            </span>
                                            <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 400 }}>Termo de assentimento para crianças</span>
                                        </span>
                                        <Badge checked={checkedTALEUNDER13} skippable={taleuSkippable} />
                                    </TermsText>
                                );
                            })()}
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
                            onClick={hasReadTerm && !loading ? () => setShowConfirmDialog(true) : undefined}
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

                    {showConfirmDialog && (
                        <div style={{
                            position: 'absolute', inset: 0, borderRadius: '24px',
                            backgroundColor: 'rgba(0,0,0,0.45)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            zIndex: 10,
                        }}>
                            <div style={{
                                backgroundColor: '#fff', borderRadius: '16px',
                                padding: '28px 28px 24px', maxWidth: '360px', width: '90%',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                                display: 'flex', flexDirection: 'column', gap: '16px',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{
                                        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                                        backgroundColor: 'rgba(217,119,6,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                        </svg>
                                    </span>
                                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1c1917', fontFamily: "'Source Sans 3', sans-serif" }}>
                                        Confirmar assinatura
                                    </span>
                                </div>
                                <p style={{ margin: 0, fontSize: '0.83rem', color: '#57534e', lineHeight: 1.6, fontFamily: "'Source Sans 3', sans-serif" }}>
                                    Após confirmar, <strong>não será mais possível revisar ou editar</strong> este termo. Deseja prosseguir?
                                </p>
                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                    <button
                                        onClick={() => setShowConfirmDialog(false)}
                                        style={{
                                            padding: '8px 18px', borderRadius: '8px', border: '1.5px solid #e7e5e4',
                                            background: '#fff', color: '#57534e', fontSize: '0.83rem', fontWeight: 600,
                                            cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif",
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={() => { setShowConfirmDialog(false); confirmTerm(); }}
                                        style={{
                                            padding: '8px 18px', borderRadius: '8px', border: 'none',
                                            background: '#6D141A', color: '#fff', fontSize: '0.83rem', fontWeight: 700,
                                            cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif",
                                        }}
                                    >
                                        Sim, confirmar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </Box>
            )}
        </Modal>
    );
}
