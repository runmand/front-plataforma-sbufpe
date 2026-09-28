import React, { Dispatch, useEffect, useRef, useState } from "react";
import { Modal, Box, useMediaQuery, CircularProgress } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { CardContainer, CardTitle, DocumentContainer, DocumentTitle, TermScrollArea, TermsButton, TermsButtonContainer, TermsContainer, TermsText } from "./styled";
import TCLE from "./tcle-document/TCLE";
import TALEU18 from "./tcle-document/TALEU18";
import TALEU13 from "./tcle-document/TALEU13";
import TCLE2 from "./tcle-document/TCLE2";
import TCLEPROF from "./tcle-document/TCLEPROF";
import TCLEUSABILIDADE from "./tcle-document/TCLEUSABILIDADE";
import { ID } from "src/core/types";
import { http } from "src/core/axios";
import { useSnackbar } from "notistack";
import TermRequirementService from "src/modules/termRequirements/service";
import { REQUIREMENTS_RES, TERM_VARIANT } from "src/modules/termRequirements/type";

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

/**
 * Metadados de exibição de cada variante — o que muda de formulário pra formulário é
 * QUAIS variantes aparecem e como se agrupam (`requirements.groups`, vindo do backend
 * via `GET /term-requirements/:formId`), não o texto de cada documento em si.
 */
const VARIANT_META: Record<TERM_VARIANT, { title: string; subtitle: string; docTitle: string }> = {
    TCLE: {
        title: "Termo de Consentimento — Responsável Legal",
        subtitle: "Para responsável legal pelo menor de 18 anos",
        docTitle: "Termo de Consentimento Livre e Esclarecido (Para Responsável Legal pelo Menor de 18 Anos)",
    },
    TCLEPROF: {
        title: "Termo de Consentimento — Profissionais",
        subtitle: "Módulos 1, 2 e 3 · Maiores de 18 anos",
        docTitle: "Termo de Consentimento Livre e Esclarecido – Módulos 1, 2 e 3 - Profissionais",
    },
    TCLEUSAB: {
        title: "Termo de Consentimento — Teste de Usabilidade",
        subtitle: "GestBucalSD · Teste de usabilidade da plataforma",
        docTitle: "Termo de Consentimento Livre e Esclarecido (TCLE) – Versão Digital",
    },
    TCLE2: {
        title: "Termo de Consentimento — Maiores de 18 Anos",
        subtitle: "Para maiores de 18 anos ou emancipados",
        docTitle: "Termo de Consentimento Livre e Esclarecido (Para Maiores de 18 Anos)",
    },
    TALE18: {
        title: "Termo de Assentimento — 13 a 18 Anos",
        subtitle: "Para menores entre 13 e 18 anos",
        docTitle: "Termo de Assentimento Livre e Esclarecido (Para Menores de 13 a 18 Anos)",
    },
    TALEU13: {
        title: "TALE Lúdico — 5 a 12 Anos",
        subtitle: "Termo de assentimento para crianças",
        docTitle: "Termo de Assentimento Livre e Esclarecido | TALE Lúdico (5 a 12 anos)",
    },
};
const VARIANT_ORDER: TERM_VARIANT[] = ["TCLE", "TCLEPROF", "TCLEUSAB", "TCLE2", "TALE18", "TALEU13"];

/** Os 3 tipos que o backend de fato persiste (`term_documents.type`) — TCLE/TCLE2/TCLEPROF/TCLEUSAB
 * pousam todos no "bucket" tcle; a granularidade fina só existe na tela. */
const bucketOf = (v: TERM_VARIANT): "tcle" | "tale" | "taleu" => (v === "TALE18" ? "tale" : v === "TALEU13" ? "taleu" : "tcle");

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
    const termRequirementService = new TermRequirementService();

    const TCLERef = useRef<TermRef>(null);
    const TCLE2Ref = useRef<TermRef>(null);
    const TALE18Ref = useRef<TermRef>(null);
    const TALEU13Ref = useRef<TermRefNew>(null);
    const TCLEPROFRef = useRef<TermRef>(null);
    const TCLEUSABRef = useRef<TermRef>(null);

    const [requirements, setRequirements] = useState<REQUIREMENTS_RES | null>(null);
    const [loadingRequirements, setLoadingRequirements] = useState(false);

    const [openForm, setOpenForm] = useState(false);
    const [checkedMap, setCheckedMap] = useState<Partial<Record<TERM_VARIANT, boolean>>>({});
    const [dataMap, setDataMap] = useState<Partial<Record<TERM_VARIANT, DataTerm | null>>>({});
    const largeQuery = useMediaQuery("(min-width:720px)");
    const snackBar = useSnackbar();

    const [termSelected, setTermSelected] = useState<TERM_VARIANT>("TCLEPROF");
    const [hasReadTerm, setHasReadTerm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    // Restaura o que já foi assinado em visitas anteriores (o PDF/base64 em si não
    // sobrevive a um reload, só a marcação — ver comentário em `iCanGo`).
    useEffect(() => {
        const restored: Partial<Record<TERM_VARIANT, boolean>> = {};
        VARIANT_ORDER.forEach((v) => {
            restored[v] = sessionStorage.getItem(`tcle_${v}`) === '1';
        });
        setCheckedMap(restored);
    }, []);

    useEffect(() => { setHasReadTerm(false); setShowConfirmDialog(false); }, [termSelected]);

    useEffect(() => { if (!props.open) setOpenForm(false); }, [props.open]);

    // Busca do backend quais termos este formulário exige do usuário atual (objetivo 4
    // do painel admin) — substitui o mapeamento hardcoded por `idForm` que existia aqui.
    useEffect(() => {
        if (!props.open || !props.idForm) return;
        setLoadingRequirements(true);
        termRequirementService
            .getForForm(props.idForm)
            .then((res) => setRequirements(res.data ?? { exempt: false, groups: [] }))
            .catch(() => setRequirements({ exempt: false, groups: [] }))
            .finally(() => setLoadingRequirements(false));
    }, [props.open, props.idForm]);

    const groups = requirements?.groups ?? [];
    const visibleVariants = VARIANT_ORDER.filter((v) => groups.some((g) => g.variants.includes(v)));
    const isGroupSatisfied = (variants: TERM_VARIANT[]) => variants.length > 0 && variants.every((v) => checkedMap[v]);
    const satisfiedGroup = groups.find((g) => isGroupSatisfied(g.variants));
    const isSkippable = (variant: TERM_VARIANT) => !!satisfiedGroup && !satisfiedGroup.variants.includes(variant) && !checkedMap[variant];

    const REF_MAP: Record<TERM_VARIANT, React.RefObject<any>> = {
        TCLE: TCLERef,
        TCLE2: TCLE2Ref,
        TALE18: TALE18Ref,
        TALEU13: TALEU13Ref,
        TCLEPROF: TCLEPROFRef,
        TCLEUSAB: TCLEUSABRef,
    };

    const confirmTerm = async () => {
        setLoading(true);
        try {
            const ref = REF_MAP[termSelected];
            const states: DataTerm | undefined =
                termSelected === "TALEU13" ? await (ref.current as TermRefNew | null)?.getStatesNew() : await (ref.current as TermRef | null)?.getStates();

            if (states) {
                states.form = Number(props.idForm);
                setDataMap((prev) => ({ ...prev, [termSelected]: states }));
                setCheckedMap((prev) => ({ ...prev, [termSelected]: true }));
                sessionStorage.setItem(`tcle_${termSelected}`, '1');
                setOpenForm(false);
            }
        } finally {
            setLoading(false);
        }
    };

    async function iCanGo() {
        if (loadingRequirements) return;

        // Nenhuma regra configurada pra este formulário = nenhum termo exigido
        // (fail-open — ver `FormTermRequirement`). Corrige o bug antigo de formulários
        // sem `idForm` mapeado travarem o usuário sem chance de prosseguir.
        if (requirements?.exempt || groups.length === 0) {
            props.goForm();
            props.setOpenTCLE(false);
            return;
        }

        const satisfied = groups.find((g) => isGroupSatisfied(g.variants));
        if (!satisfied) {
            snackBar.enqueueSnackbar("Você precisa assinar os termos obrigatórios (*)!", { variant: "warning" });
            return;
        }

        const tcleVariant = satisfied.variants.find((v) => bucketOf(v) === 'tcle');
        const tcleData = tcleVariant ? dataMap[tcleVariant] : null;

        // Termo já assinado em uma visita anterior (sessionStorage), mas o payload
        // (PDF/base64) não sobrevive a um reload — não precisa reenviar, só liberar.
        if (!tcleData) {
            props.goForm();
            props.setOpenTCLE(false);
            return;
        }

        const taleVariant = satisfied.variants.find((v) => bucketOf(v) === 'tale');
        const taleuVariant = satisfied.variants.find((v) => bucketOf(v) === 'taleu');

        setLoading(true);
        const response = await http.post("/term/send", {
            tcle: tcleData,
            tale: taleVariant ? dataMap[taleVariant] ?? null : null,
            taleu: taleuVariant ? dataMap[taleuVariant] ?? null : null,
            formId: props.idForm,
        });
        if (response.data) {
            snackBar.enqueueSnackbar(response.data, { variant: "success" });
            props.goForm();
            props.setOpenTCLE(false);
        } else {
            const r = response as unknown as { errors: string[] };
            snackBar.enqueueSnackbar(r.errors?.[0] ?? "Houve um erro ao tentar enviar seu termo, tente refazer e mande novamente", { variant: "error" });
        }
        setLoading(false);
    }

    const DOC_COMPONENT: Record<TERM_VARIANT, JSX.Element> = {
        TCLE: <TCLE ref={TCLERef} />,
        TALEU13: <TALEU13 ref={TALEU13Ref} />,
        TALE18: <TALEU18 ref={TALE18Ref} />,
        TCLE2: <TCLE2 ref={TCLE2Ref} />,
        TCLEPROF: <TCLEPROF ref={TCLEPROFRef} />,
        TCLEUSAB: <TCLEUSABILIDADE ref={TCLEUSABRef} />,
    };

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

                        {satisfiedGroup && (
                            <div style={{
                                display: 'flex', alignItems: 'flex-start', gap: '10px',
                                backgroundColor: 'rgba(22,163,74,0.06)', border: '1px solid rgba(22,163,74,0.2)',
                                borderRadius: '10px', padding: '10px 14px', marginBottom: '12px',
                            }}>
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth={2} style={{ flexShrink: 0, marginTop: '1px' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p style={{ margin: 0, fontSize: '0.78rem', color: '#15803d', lineHeight: 1.5, fontFamily: "'Source Sans 3', sans-serif" }}>
                                    Você pode prosseguir — os termos necessários para o seu perfil já estão assinados. Os demais são para outros perfis de participante.
                                </p>
                            </div>
                        )}

                        {loadingRequirements ? (
                            <div style={{ padding: '24px', textAlign: 'center', color: '#9ca3af', fontSize: '0.85rem' }}>Carregando termos...</div>
                        ) : (
                            <TermsContainer>
                                {visibleVariants.map((variant) => {
                                    const checked = !!checkedMap[variant];
                                    const skippable = isSkippable(variant);
                                    const meta = VARIANT_META[variant];
                                    return (
                                        <TermsText
                                            key={variant}
                                            $checked={checked}
                                            style={{
                                                opacity: skippable ? 0.5 : 1,
                                                cursor: (checked || skippable) ? 'default' : 'pointer',
                                                pointerEvents: (checked || skippable) ? 'none' : 'auto',
                                            }}
                                            onClick={() => { setOpenForm(true); setTermSelected(variant); }}
                                        >
                                            <DocIcon checked={checked} skippable={skippable} />
                                            <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: checked ? '#6D141A' : skippable ? '#9ca3af' : '#1c1917', lineHeight: 1.3 }}>
                                                    {meta.title}
                                                </span>
                                                <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 400 }}>{meta.subtitle}</span>
                                            </span>
                                            <Badge checked={checked} skippable={skippable} />
                                        </TermsText>
                                    );
                                })}
                            </TermsContainer>
                        )}
                    </CardContainer>
                    <TermsButtonContainer>
                        <TermsButton disabled={loading} onClick={() => props.setOpenTCLE(false)}>
                            <ArrowBack />
                            Voltar
                        </TermsButton>
                        <TermsButton disabled={loading || loadingRequirements} onClick={iCanGo}>
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
                        <DocumentTitle>{VARIANT_META[termSelected].docTitle}</DocumentTitle>

                        <TermScrollArea onScroll={(e: React.UIEvent<HTMLDivElement>) => {
                            const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
                            if (scrollTop + clientHeight >= scrollHeight - 30) setHasReadTerm(true);
                        }}>
                            {VARIANT_ORDER.map((variant) => (
                                <div key={variant} style={{ display: termSelected === variant ? "" : "none" }}>
                                    {DOC_COMPONENT[variant]}
                                </div>
                            ))}
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
