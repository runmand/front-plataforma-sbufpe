'use client';

import Base from '@components/base-layout/index';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { routerEnum } from 'src/core/enums';
import NewMenu from '@components/newMenu/index';
import FooterMain from '@components/footer/main/index';

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

type DashboardLink = { href: string };

type DashboardTopic = {
    id: string;
    title: string;
    description: string;
    /** Dashboard "novo" (React, feito na plataforma) — indefinido se essa área ainda não tem um. */
    dashboard?: DashboardLink;
    /** Painel completo (dados fechados/internos) — indefinido se essa área ainda não tem um. */
    painel?: DashboardLink;
    /** Painel de respondentes (visão pública/aberta) — indefinido se essa área ainda não tem um. */
    painelRespondentes?: DashboardLink;
};

/**
 * Lista estática das áreas de dados disponíveis. Cada área pode ter um dashboard "novo" (React,
 * construído na própria plataforma — ver /dashboard/ceo e /dashboard/vigia), um painel completo
 * (Power BI "fechado", com os dados internos), um painel de respondentes (Power BI "aberto",
 * visão pública), ou qualquer combinação dos três — os badges no card de cada área refletem
 * exatamente isso, e servem de link direto pra cada um.
 */
const TOPICS: DashboardTopic[] = [
    {
        id: 'ceo',
        title: 'CEO',
        description: 'Indicadores e respostas dos Centros de Especialidades Odontológicas.',
        dashboard: { href: routerEnum.DASHBOARD_CEO },
        painel: { href: routerEnum.DATACEO },
        painelRespondentes: { href: routerEnum.CEO },
    },
    {
        id: 'aps',
        title: 'APS',
        description: 'Indicadores e respostas da Atenção Primária à Saúde.',
        painel: { href: routerEnum.DATAAPS },
        painelRespondentes: { href: routerEnum.APS },
    },
    {
        id: 'vigia',
        title: 'Vigia SD',
        description: 'Vigilância e monitoramento da saúde bucal em Sergipe.',
        dashboard: { href: routerEnum.DASHBOARD_VIGIA },
    },
    {
        id: 'usuarios',
        title: 'Usuários',
        description: 'Perfil e engajamento dos usuários cadastrados na plataforma.',
        painelRespondentes: { href: routerEnum.USER },
    },
];

const DashboardIcon = ({ color }: { color: string }) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 20V11m7 9V4m7 16v-6" />
    </svg>
);

const PainelIcon = ({ color }: { color: string }) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 12V4A8 8 0 0120 12Z" fill={color} stroke="none" />
    </svg>
);

const RespondentesIcon = ({ color }: { color: string }) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
        <circle cx="8.5" cy="7.5" r="2.6" />
        <path strokeLinecap="round" d="M2.5 19c0-3 2.7-5 6-5s6 2 6 5" />
        <circle cx="16.5" cy="8.2" r="2.1" />
        <path strokeLinecap="round" d="M14.8 11.3c2.4.3 4.1 1.9 4.1 3.9" />
    </svg>
);

type PillKind = 'dashboard' | 'painel' | 'painel-respondentes';

const PILL_META: Record<PillKind, { label: string; Icon: (props: { color: string }) => JSX.Element }> = {
    dashboard: { label: 'Dashboard', Icon: DashboardIcon },
    painel: { label: 'Painel', Icon: PainelIcon },
    'painel-respondentes': { label: 'Painel de Respondentes', Icon: RespondentesIcon },
};

/**
 * Badge clicável indicando se a área tem (ou não) esse tipo de painel. Quando não tem, renderiza
 * do mesmo jeito mas desabilitado/acinzentado — em vez de simplesmente omitir — porque o pedido é
 * "indicar se tem", e omitir não indica ausência, só emite silêncio.
 */
const Pill = ({ kind, link }: { kind: PillKind; link?: DashboardLink }) => {
    const router = useRouter();
    const available = !!link;
    const isDash = kind === 'dashboard';
    const { label, Icon } = PILL_META[kind];

    const bg = !available ? 'rgba(107,114,128,0.06)' : isDash ? 'rgba(109,20,26,0.08)' : 'rgba(217,119,6,0.08)';
    const border = !available ? 'rgba(107,114,128,0.18)' : isDash ? 'rgba(109,20,26,0.22)' : 'rgba(217,119,6,0.25)';
    const color = !available ? '#9ca3af' : isDash ? C.primary : '#b45309';

    return (
        <button
            type="button"
            disabled={!available}
            onClick={
                available
                    ? (e) => {
                          e.stopPropagation();
                          router.push(link!.href);
                      }
                    : undefined
            }
            title={available ? `Abrir ${label}` : `${label} não disponível para esta área`}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '100px',
                backgroundColor: bg,
                border: `1px solid ${border}`,
                color,
                fontSize: '0.72rem',
                fontWeight: 700,
                fontFamily: ff.body,
                letterSpacing: '0.02em',
                cursor: available ? 'pointer' : 'not-allowed',
            }}
        >
            <Icon color={color} />
            {label}
        </button>
    );
};

const TopicCard = ({ topic }: { topic: DashboardTopic }) => (
    <div
        style={{
            backgroundColor: C.white,
            border: `1.5px solid ${C.border}`,
            borderRadius: '16px',
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            fontFamily: ff.body,
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            transition: 'box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = C.primary;
            el.style.boxShadow = '0 8px 24px rgba(109,20,26,0.12)';
            el.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = C.border;
            el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
            el.style.transform = 'translateY(0)';
        }}
    >
        {/* Icon */}
        <div
            style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: C.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                overflow: 'hidden',
            }}
        >
            <Image src="/logo-transparent.png" alt="Logo" width={44} height={44} style={{ objectFit: 'contain' }} />
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.9rem', fontWeight: 700, color: C.text, margin: '0 0 6px', lineHeight: 1.4 }}>{topic.title}</p>
            <p style={{ fontSize: '0.78rem', color: C.muted, margin: 0, lineHeight: 1.5 }}>{topic.description}</p>
        </div>

        {/* Badges — também são os links de entrada */}
        <div
            style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                borderTop: `1px solid ${C.border}`,
                paddingTop: '14px',
                marginTop: '4px',
            }}
        >
            <Pill kind="dashboard" link={topic.dashboard} />
            <Pill kind="painel" link={topic.painel} />
            <Pill kind="painel-respondentes" link={topic.painelRespondentes} />
        </div>
    </div>
);

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        document.title = 'Dashboards | GestBucal';
    }, []);

    return (
        <Base
            appBarChild={<NewMenu />}
            mainContainerChild={
                <div style={{ backgroundColor: C.bg, minHeight: '88vh', padding: '0 0 80px' }}>
                    {/* Hero header */}
                    <div
                        style={{
                            backgroundColor: C.white,
                            borderBottom: `1px solid ${C.border}`,
                            padding: '72px 24px 52px',
                            marginBottom: '48px',
                            textAlign: 'center',
                        }}
                    >
                        <div
                            style={{
                                display: 'inline-block',
                                width: '40px',
                                height: '3px',
                                background: `linear-gradient(90deg, ${C.primary}, ${C.secondary})`,
                                borderRadius: '2px',
                                marginBottom: '20px',
                            }}
                        />
                        <h1
                            style={{
                                fontFamily: ff.display,
                                fontSize: 'clamp(24px, 3.5vw, 38px)',
                                fontWeight: 700,
                                color: C.text,
                                margin: '0 0 12px',
                                letterSpacing: '-0.02em',
                                lineHeight: 1.2,
                            }}
                        >
                            Central de Dashboards
                        </h1>
                        <p style={{ fontFamily: ff.body, fontSize: '15px', color: C.muted, margin: '0 0 16px', lineHeight: 1.6 }}>
                            Selecione uma área para visualizar os dados
                        </p>

                        {/* Alterna entre Formulários e Dashboards */}
                        <div style={{
                            display: 'inline-flex', gap: '4px', padding: '4px', marginBottom: '20px',
                            backgroundColor: C.bg, border: `1px solid ${C.border}`, borderRadius: '100px',
                        }}>
                            <button
                                type="button"
                                onClick={() => router.push(routerEnum.FORM)}
                                style={{
                                    padding: '7px 18px', borderRadius: '100px', border: 'none',
                                    backgroundColor: 'transparent', color: C.muted,
                                    fontSize: '0.8rem', fontWeight: 700, fontFamily: ff.body, cursor: 'pointer',
                                }}
                            >
                                Formulários
                            </button>
                            <span style={{
                                padding: '7px 18px', borderRadius: '100px',
                                backgroundColor: C.primary, color: C.white,
                                fontSize: '0.8rem', fontWeight: 700, fontFamily: ff.body,
                            }}>
                                Dashboards
                            </span>
                        </div>

                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: C.muted, fontFamily: ff.body }}>
                                <DashboardIcon color={C.primary} />
                                Dashboard — painel próprio da plataforma
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: C.muted, fontFamily: ff.body }}>
                                <PainelIcon color="#b45309" />
                                Painel — dados completos
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: C.muted, fontFamily: ff.body }}>
                                <RespondentesIcon color="#b45309" />
                                Painel de Respondentes — visão pública
                            </span>
                        </div>
                    </div>

                    {/* Cards grid */}
                    <div
                        style={{
                            maxWidth: '900px',
                            margin: '0 auto',
                            padding: '0 24px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                            gap: '20px',
                        }}
                    >
                        {TOPICS.map((topic) => (
                            <TopicCard key={topic.id} topic={topic} />
                        ))}
                    </div>
                </div>
            }
            footerChild={<FooterMain />}
        />
    );
}
