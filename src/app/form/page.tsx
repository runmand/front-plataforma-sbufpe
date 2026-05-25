'use client';

import Base from '@components/base-layout/index';
import Image from 'next/image';
import { useMediaQuery } from '@mui/material';
import FormService from '../../modules/form/service';
import React, { useEffect, useRef, useState } from 'react';
import { INDEX_RES } from '../../modules/form/type';
import { useSnackbar } from 'notistack';
import { ID } from 'src/core/types';
import { useRouter } from 'next/navigation';
import { localStorageKeyEnum, routerEnum } from 'src/core/enums';
import FormAnswerService from 'src/modules/form-answer/service';
import NewMenu from '@components/newMenu/index';
import FooterMain from '@components/footer/main/index';
import TcleModal from '@components/tcle/index';

export default function Page() {
    let firstOpen = useRef(0);
    const router = useRouter();
    const formService = new FormService();
    const formAnwerService = new FormAnswerService();
    const [openTCLE, setOpenTCLE] = useState<boolean>(false);
    const largeQuery = useMediaQuery("(min-width:720px)");
    const { enqueueSnackbar } = useSnackbar();
    const [forms, setForms] = React.useState<INDEX_RES[]>();
    const [formId, setFormId] = React.useState<ID>(0);

    useEffect(() => {
        document.title = 'Formulários | GestBucal';
    }, []);

    const handleSelectForm = (id: ID) => {
        const typeId = +localStorage.getItem(localStorageKeyEnum.TYPE_ID);
        setFormId(id);

        if (typeId != 5){

        setOpenTCLE(true);
        }else{
            goForm(id)
        }


    };

    async function goForm(id?: ID) {
        const params = new URLSearchParams({ formId: String(id ?? formId) });
        router.push(`${routerEnum.FORM_ANSWER}?${params.toString()}`);
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
                                                  case 5:
                            return setForms(res.data);
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

    const ff = {
        display: "'Lora', Georgia, serif",
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
                forms ? (
                    forms.length === 0 ? (
                        <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: ff.body, color: C.muted, fontSize: '15px' }}>
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
                ) : (
                    <div style={{ minHeight: '70vh' }} />
                )
            }
            footerChild={<FooterMain />}
        />
    );
}
