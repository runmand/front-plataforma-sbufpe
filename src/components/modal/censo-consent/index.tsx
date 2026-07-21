'use client';

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal, Box, useMediaQuery } from "@mui/material";
import { DocumentContainer, DocumentData, DocumentTitle, TermScrollArea, TermsButton, TermsButtonContainer, TermsText } from "@components/tcle/styled";
import { PD, DocumentParagraphyTitle } from "@components/tcle/tcle-document/styled";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { http } from "src/core/axios";
import type { DataTerm } from "@components/tcle";
import { generatePDF } from "@components/tcle/exportpdf";
import { emitterWindowEventEnum, localStorageKeyEnum, routerEnum } from "src/core/enums";
import {
    censoTermIntro,
    censoTermSections,
    censoTermDeclarationHeading,
    censoTermDeclarationIntro,
    censoTermAcceptLabel,
    censoTermDeclineLabel,
} from "@components/tcle-censo/content";

const LOGOUT_WARNING_SECONDS = 10;

// Rota provisória — ainda não implementada no backend. Espelha o contrato de
// POST /term/send (mesmo formato de DataTerm), mas sem formId por não estar
// atrelada a um formulário específico. Alinhar com o time de backend antes de subir.
const CENSO_TERM_SEND_URL = "/term/censo/send";

type Choice = "accept" | "decline";

const getStatusKey = (userId: string) => `${localStorageKeyEnum.CENSO_TCLE_STATUS}_${userId}`;

export default function CensoConsentModal() {
    const [open, setOpen] = useState(false);
    const [hasReadTerm, setHasReadTerm] = useState(false);
    const [choice, setChoice] = useState<Choice | null>(null);
    const [showLogoutWarning, setShowLogoutWarning] = useState(false);
    const [logoutCountdown, setLogoutCountdown] = useState(LOGOUT_WARNING_SECONDS);
    const [submitting, setSubmitting] = useState(false);
    const largeQuery = useMediaQuery("(min-width:720px)");
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const finalizeDeclineAndLogoutRef = useRef<() => void>(() => {});
    const hasFinalizedRef = useRef(false);

    /**
     * PROVISÓRIO: a checagem de aceite hoje é 100% client-side (localStorage),
     * então é trivialmente contornável via DevTools. Isso deve ser substituído
     * assim que o backend expuser uma forma autoritativa de saber se a conta
     * já aceitou o termo (ex.: um campo no retorno do login, ou um
     * GET /term/censo/status) — aí o valor do servidor manda, e o localStorage
     * vira só um cache/fallback offline.
     */
    const checkAndMaybeOpen = useCallback(() => {
        const token = localStorage.getItem(localStorageKeyEnum.TOKEN);
        const userId = localStorage.getItem(localStorageKeyEnum.USER_ID);
        if (!token || !userId) return;

        // Só "accept" dispensa o gate. Uma recusa anterior não deve liberar
        // logins futuros sem que o termo seja de fato aceito.
        const raw = localStorage.getItem(getStatusKey(userId));
        const status = raw ? (JSON.parse(raw) as { status?: Choice }).status : null;

        if (status !== "accept") {
            setHasReadTerm(false);
            setChoice(null);
            setOpen(true);
        }
    }, []);

    useEffect(() => {
        checkAndMaybeOpen();
        window.addEventListener(emitterWindowEventEnum.LOGIN_SUCCESS, checkAndMaybeOpen);
        return () => window.removeEventListener(emitterWindowEventEnum.LOGIN_SUCCESS, checkAndMaybeOpen);
    }, [checkAndMaybeOpen]);

    useEffect(() => {
        if (!showLogoutWarning) return;

        hasFinalizedRef.current = false;
        let remaining = LOGOUT_WARNING_SECONDS;
        setLogoutCountdown(remaining);

        const interval = setInterval(() => {
            remaining -= 1;
            setLogoutCountdown(Math.max(remaining, 0));

            if (remaining <= 0) {
                clearInterval(interval);
                finalizeDeclineAndLogoutRef.current();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [showLogoutWarning]);

    const handleTermScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollTop + clientHeight >= scrollHeight - 30) setHasReadTerm(true);
    };

    /**
     * Envia o registro do consentimento (aceite ou recusa) para o backend.
     * O endpoint ainda não existe — falha aqui é esperada até o backend
     * implementar CENSO_TERM_SEND_URL; por isso não bloqueia o fluxo local.
     */
    const submitToBackend = async (valid: boolean, userId: string) => {
        try {
            const node = document.getElementById("TCLE_CENSO")?.children;
            const pdf = node ? await generatePDF(node) : "";

            const tcle: DataTerm = {
                valid,
                type: "TCLE_CENSO",
                email: "",
                account: Number(userId),
                pdf,
                created_at: new Date(),
            };

            await http.post(CENSO_TERM_SEND_URL, { tcle }, { silent: true });
        } catch (err) {
            console.error("censo-consent:submitToBackend", err);
        }
    };

    const handleConfirm = async () => {
        if (!choice || submitting) return;

        if (choice === "decline") {
            setShowLogoutWarning(true);
            return;
        }

        const userId = localStorage.getItem(localStorageKeyEnum.USER_ID);
        if (!userId) return;

        setSubmitting(true);
        await submitToBackend(true, userId);
        setSubmitting(false);

        localStorage.setItem(getStatusKey(userId), JSON.stringify({ status: "accept", respondedAt: new Date().toISOString() }));
        enqueueSnackbar("Consentimento registrado. Obrigado por participar da pesquisa!", { variant: "success" });
        setOpen(false);
    };

    const finalizeDeclineAndLogout = async () => {
        if (hasFinalizedRef.current) return;
        hasFinalizedRef.current = true;

        const userId = localStorage.getItem(localStorageKeyEnum.USER_ID);

        setSubmitting(true);
        if (userId) await submitToBackend(false, userId);
        setSubmitting(false);

        if (userId) {
            localStorage.setItem(getStatusKey(userId), JSON.stringify({ status: "decline", respondedAt: new Date().toISOString() }));
        }

        localStorage.removeItem(localStorageKeyEnum.TOKEN);
        localStorage.removeItem(localStorageKeyEnum.TYPE_ID);
        localStorage.removeItem(localStorageKeyEnum.USER_ID);

        enqueueSnackbar("Você foi desconectado por não aceitar o termo de consentimento.", { variant: "info" });
        setOpen(false);
        setShowLogoutWarning(false);
        router.push(routerEnum.INITIAL);
    };

    // Mantém a ref sempre apontando para a versão mais recente da função,
    // para que o setInterval (que não é recriado a cada render) possa chamá-la.
    finalizeDeclineAndLogoutRef.current = finalizeDeclineAndLogout;

    if (!open) return null;

    return (
        <Modal
            sx={{ width: largeQuery ? "60vw" : "100vw", margin: largeQuery ? "auto" : "0" }}
            open={open}
            disableEscapeKeyDown
            onClose={() => { /* mandatory gate: dismissible only via an explicit choice */ }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    maxHeight: "92vh",
                    overflowY: "auto",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: 3,
                    p: 3,
                    boxSizing: "border-box",
                }}
            >
                <DocumentContainer style={{ height: "50vh" }}>
                    <DocumentTitle>Termo de Consentimento Livre e Esclarecido — Censo CEO/SESB</DocumentTitle>

                    <TermScrollArea onScroll={handleTermScroll}>
                        <DocumentData id="TCLE_CENSO">
                            <DocumentParagraphyTitle>
                                <b>COLETA DE DADOS VIRTUAL</b>
                            </DocumentParagraphyTitle>

                            {censoTermIntro.map((text, i) => <PD key={`intro-${i}`}>{text}</PD>)}

                            {censoTermSections.map((section) => (
                                <React.Fragment key={section.heading}>
                                    <DocumentParagraphyTitle><b>{section.heading}</b></DocumentParagraphyTitle>
                                    {section.paragraphs.map((p, i) => <PD key={i}>{p}</PD>)}
                                </React.Fragment>
                            ))}

                            <DocumentParagraphyTitle><b>{censoTermDeclarationHeading}</b></DocumentParagraphyTitle>
                            <PD>{censoTermDeclarationIntro}</PD>
                        </DocumentData>
                    </TermScrollArea>

                    {!hasReadTerm && (
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center',
                            backgroundColor: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.2)',
                            borderRadius: '10px', padding: '8px 14px', margin: '8px 0 0',
                        }}>
                            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth={2} style={{ flexShrink: 0 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            <p style={{ margin: 0, fontSize: '0.78rem', color: '#92400e', fontWeight: 600, lineHeight: 1.4, textAlign: 'center', fontFamily: "'Source Sans 3', sans-serif" }}>
                                Leia atentamente todo o documento acima. As opções de aceite só são liberadas depois de você rolar até a última linha do texto.
                            </p>
                        </div>
                    )}
                </DocumentContainer>

                {hasReadTerm && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '16px 0' }}>
                        <TermsText $checked={choice === "accept"} onClick={() => setChoice("accept")}>
                            <span style={{ flex: 1, fontSize: '0.85rem', fontWeight: 600, color: '#1c1917' }}>{censoTermAcceptLabel}</span>
                        </TermsText>
                        <TermsText $checked={choice === "decline"} onClick={() => setChoice("decline")}>
                            <span style={{ flex: 1, fontSize: '0.85rem', fontWeight: 600, color: '#1c1917' }}>{censoTermDeclineLabel}</span>
                        </TermsText>
                    </div>
                )}

                <p style={{ textAlign: 'center', margin: '12px 0' }}>
                    <button
                        type="button"
                        onClick={() => window.open(routerEnum.TCLE_CENSO, '_blank')}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#6D141A', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'underline' }}
                    >
                        Ver termo completo em uma nova aba
                    </button>
                </p>

                <TermsButtonContainer style={{ gridTemplateColumns: '100%', marginTop: 4 }}>
                    <TermsButton
                        disabled={!hasReadTerm || !choice || submitting}
                        onClick={hasReadTerm && choice && !submitting ? handleConfirm : undefined}
                        style={{
                            opacity: hasReadTerm && choice && !submitting ? 1 : 0.45,
                            cursor: hasReadTerm && choice && !submitting ? 'pointer' : 'not-allowed',
                        }}
                    >
                        {submitting ? 'Enviando...' : 'Confirmar'}
                    </TermsButton>
                </TermsButtonContainer>

                {showLogoutWarning && (
                    <div style={{
                        position: 'absolute', inset: 0, borderRadius: '12px',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 10,
                    }}>
                        <div style={{
                            backgroundColor: '#fff', borderRadius: '16px',
                            padding: '28px 28px 24px', maxWidth: '380px', width: '90%',
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
                                    Você será desconectado
                                </span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.83rem', color: '#57534e', lineHeight: 1.6, fontFamily: "'Source Sans 3', sans-serif" }}>
                                O aceite deste termo é necessário para continuar utilizando a plataforma. Como você optou por <strong>não participar da pesquisa</strong>, sua sessão será encerrada automaticamente em instantes — ou clique em "Sair agora" para sair imediatamente. Você pode fazer login novamente a qualquer momento caso queira reconsiderar.
                            </p>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                <button
                                    disabled={submitting}
                                    onClick={() => setShowLogoutWarning(false)}
                                    style={{
                                        padding: '8px 18px', borderRadius: '8px', border: '1.5px solid #e7e5e4',
                                        background: '#fff', color: '#57534e', fontSize: '0.83rem', fontWeight: 600,
                                        cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: "'Source Sans 3', sans-serif",
                                    }}
                                >
                                    Voltar
                                </button>
                                <button
                                    disabled={submitting}
                                    onClick={finalizeDeclineAndLogout}
                                    style={{
                                        padding: '8px 18px', borderRadius: '8px', border: 'none',
                                        background: submitting ? '#c9a3a6' : '#6D141A', color: '#fff',
                                        fontSize: '0.83rem', fontWeight: 700, minWidth: '140px',
                                        cursor: submitting ? 'not-allowed' : 'pointer',
                                        fontFamily: "'Source Sans 3', sans-serif",
                                    }}
                                >
                                    {submitting ? 'Enviando...' : `Sair agora (${logoutCountdown}s)`}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Box>
        </Modal>
    );
}
