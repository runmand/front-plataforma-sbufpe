'use client';

import Base from '@components/base-layout/index';
import Image from 'next/image';
import { CircularProgress } from '@mui/material';
import FormService from 'src/modules/form/service';
import React, { useCallback, useEffect, useState } from 'react';
import { INDEX_RES } from 'src/modules/form/type';
import { ID } from 'src/core/types';
import { useRouter } from 'next/navigation';
import { routerEnum } from 'src/core/enums';
import NewMenu from '@components/newMenu/index';
import FooterMain from '@components/footer/main/index';
import TcleModal from '@components/tcle/index';
import TermRequirementService from 'src/modules/termRequirements/service';

export default function Page() {
    const router = useRouter();
    const [openTCLE, setOpenTCLE] = useState<boolean>(false);
    const [forms, setForms] = useState<INDEX_RES[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadError, setLoadError] = useState<boolean>(false);
    const [formId, setFormId] = useState<ID>(0);

    useEffect(() => {
        document.title = 'Formulários | GestBucal';
    }, []);

    const handleSelectForm = (id: ID) => {
        setFormId(id);

        // Só abre o modal de TCLE se o backend disser que este formulário exige algum
        // termo pro tipo de usuário atual (objetivo 4 do painel admin) — antes isso era
        // decidido só pelo typeId==5 no client, hardcoded.
        new TermRequirementService()
            .getForForm(id)
            .then((res) => {
                const requirements = res.data;
                if (res.errors || !requirements || requirements.exempt || requirements.groups.length === 0) {
                    goForm(id);
                } else {
                    setOpenTCLE(true);
                }
            })
            .catch(() => goForm(id));
    };

    async function goForm(id?: ID) {
        router.push(`${routerEnum.FORM_ANSWER}?formId=${id ?? formId}`);
    }

    const fetchForms = useCallback(async () => {
        try {
            // A lista já vem filtrada pelo backend por permissão do usuário autenticado
            // (objetivo 5 do painel admin) — não precisa mais de switch(typeId) aqui.
            const res = await new FormService().index();
            if (!res.errors && Array.isArray(res.data)) {
                setForms(res.data);
                setLoadError(false);
            } else {
                setLoadError(true);
            }
        } catch {
            setLoadError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleRetry = useCallback(() => {
        setLoading(true);
        setLoadError(false);
        void fetchForms();
    }, [fetchForms]);

    useEffect(() => {
        let active = true;
        Promise.resolve().then(() => {
            if (active) void fetchForms();
        });
        return () => {
            active = false;
        };
    }, [fetchForms]);

    const ff = {
        display: "'Newsreader', Georgia, serif",
        body: "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif",
    };
    const C = {
        primary: '#6D141A',
        secondary: '#921c22',
        bg: '#FAF7F2',
        white: '#fff',
        text: '#1c1917',
        muted: '#a8a29e',
        border: '#e7e5e4',
    };

    return (
        <Base
            appBarChild={<NewMenu />}
            mainContainerChild={
                loading ? (
                    <div
                        style={{
                            minHeight: '70vh',
                            backgroundColor: C.bg,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '16px',
                            padding: '100px 24px 48px',
                            fontFamily: ff.body,
                            color: C.muted,
                        }}
                    >
                        <CircularProgress sx={{ color: C.primary }} size={36} aria-label="Carregando formulários" />
                        <span style={{ fontSize: '15px', color: C.text }}>Carregando formulários...</span>
                    </div>
                ) : loadError ? (
                    <div
                        style={{
                            minHeight: '70vh',
                            backgroundColor: C.bg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '100px 24px 48px',
                            fontFamily: ff.body,
                        }}
                    >
                        <div
                            style={{
                                maxWidth: '460px',
                                width: '100%',
                                backgroundColor: C.white,
                                border: `1px solid ${C.border}`,
                                borderRadius: '16px',
                                padding: '32px 24px',
                                textAlign: 'center',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                            }}
                        >
                            <h2 style={{ fontFamily: ff.display, fontSize: '22px', color: C.text, margin: '0 0 10px' }}>
                                Não foi possível carregar os formulários
                            </h2>
                            <p style={{ fontSize: '14px', color: C.muted, margin: '0 0 24px', lineHeight: 1.6 }}>
                                Ocorreu uma instabilidade ao buscar os formulários disponíveis. Verifique sua conexão e tente novamente.
                            </p>
                            <button
                                type="button"
                                onClick={handleRetry}
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '100px',
                                    border: 'none',
                                    backgroundColor: C.primary,
                                    color: C.white,
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    fontFamily: ff.body,
                                    cursor: 'pointer',
                                }}
                            >
                                Tentar novamente
                            </button>
                        </div>
                    </div>
                ) : forms.length === 0 ? (
                    <div
                        style={{
                            minHeight: '70vh',
                            backgroundColor: C.bg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '100px 24px 48px',
                            fontFamily: ff.body,
                            color: C.muted,
                            fontSize: '15px',
                        }}
                    >
                        Nenhum formulário disponível no momento.
                    </div>
                ) : (
                    <div style={{ backgroundColor: C.bg, minHeight: '88vh', padding: '0 0 80px' }}>

                            {/* Hero header */}
                            <div style={{
                                backgroundColor: C.white,
                                borderBottom: `1px solid ${C.border}`,
                                padding: '72px 24px 52px',
                                marginBottom: '48px',
                                textAlign: 'center',
                            }}>
                                <div style={{
                                    display: 'inline-block', width: '40px', height: '3px',
                                    background: `linear-gradient(90deg, ${C.primary}, ${C.secondary})`,
                                    borderRadius: '2px', marginBottom: '20px',
                                }} />
                                <h1 style={{
                                    fontFamily: ff.display,
                                    fontSize: 'clamp(24px, 3.5vw, 38px)',
                                    fontWeight: 700,
                                    color: C.text,
                                    margin: '0 0 12px',
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1.2,
                                }}>
                                    Questionário Avaliativo
                                </h1>
                                <p style={{
                                    fontFamily: ff.body,
                                    fontSize: '15px',
                                    color: C.muted,
                                    margin: 0,
                                    lineHeight: 1.6,
                                }}>
                                    Selecione o formulário que deseja responder
                                </p>

                                {/* Alterna entre Formulários e Dashboards */}
                                <div style={{
                                    display: 'inline-flex', gap: '4px', padding: '4px', marginTop: '20px',
                                    backgroundColor: C.bg, border: `1px solid ${C.border}`, borderRadius: '100px',
                                }}>
                                    <span style={{
                                        padding: '7px 18px', borderRadius: '100px',
                                        backgroundColor: C.primary, color: C.white,
                                        fontSize: '0.8rem', fontWeight: 700, fontFamily: ff.body,
                                    }}>
                                        Formulários
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => router.push(routerEnum.DASHBOARD)}
                                        style={{
                                            padding: '7px 18px', borderRadius: '100px', border: 'none',
                                            backgroundColor: 'transparent', color: C.muted,
                                            fontSize: '0.8rem', fontWeight: 700, fontFamily: ff.body, cursor: 'pointer',
                                        }}
                                    >
                                        Dashboards
                                    </button>
                                </div>
                            </div>

                            {/* Cards grid */}
                            <div style={{
                                maxWidth: '900px',
                                margin: '0 auto',
                                padding: '0 24px',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                                gap: '20px',
                            }}>
                                {forms.map((v, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSelectForm(v.id)}
                                        style={{
                                            backgroundColor: C.white,
                                            border: `1.5px solid ${C.border}`,
                                            borderRadius: '16px',
                                            padding: '28px 24px',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '16px',
                                            transition: 'all 0.2s ease',
                                            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                                            fontFamily: ff.body,
                                        }}
                                        onMouseEnter={e => {
                                            const el = e.currentTarget;
                                            el.style.borderColor = C.primary;
                                            el.style.boxShadow = '0 8px 24px rgba(109,20,26,0.12)';
                                            el.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={e => {
                                            const el = e.currentTarget;
                                            el.style.borderColor = C.border;
                                            el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
                                            el.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        {/* Icon */}
                                        <div style={{
                                            width: '56px', height: '56px', borderRadius: '12px',
                                            backgroundColor: '#6D141A',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            flexShrink: 0, overflow: 'hidden',
                                        }}>
                                            <Image src="/logo-transparent.png" alt="Logo" width={44} height={44} style={{ objectFit: 'contain' }} />
                                        </div>

                                        {/* Content */}
                                        <div style={{ flex: 1 }}>
                                            <p style={{
                                                fontSize: '0.9rem',
                                                fontWeight: 700,
                                                color: C.text,
                                                margin: '0 0 6px',
                                                lineHeight: 1.4,
                                            }}>
                                                {v.title}
                                            </p>
                                            <p style={{
                                                fontSize: '0.78rem',
                                                color: C.muted,
                                                margin: '0 0 6px',
                                                lineHeight: 1.5,
                                            }}>
                                                Clique para iniciar o preenchimento
                                            </p>
                                            <p style={{
                                                fontSize: '0.72rem',
                                                color: '#b45309',
                                                margin: 0,
                                                lineHeight: 1.4,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                            }}>
                                                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#b45309" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Requer assinatura de termos
                                            </p>
                                        </div>

                                        {/* Arrow */}
                                        <div style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            borderTop: `1px solid ${C.border}`, paddingTop: '12px', marginTop: '4px',
                                        }}>
                                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: C.primary, letterSpacing: '0.05em' }}>
                                                INICIAR
                                            </span>
                                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={C.primary} strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <TcleModal idForm={formId} setOpenTCLE={setOpenTCLE} open={openTCLE} goForm={goForm} />
                        </div>
                )
            }
            footerChild={<FooterMain />}
        />
    );
}
