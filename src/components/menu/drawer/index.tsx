'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { TPROPS } from './type';
import FormAnswerService from 'src/services/form-answer/service';
import { ResultFormPdf, stylesPDF } from '@components/FormResultPdf';
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { FormResultProps } from '@components/FormResultPdf/FormResultProps.types';
import { IPlanejaDataPDF } from '@components/planeja/planeja-form';
import { IStepsValues } from '@components/planeja-pratico/steps/FinishFormStep';
import { http } from 'src/core/axios';
import ModifiedPdfPlanejaTeorico from '@components/pdf/PlanejaPDF';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

const C = {
    primary:     '#6D141A',
    primaryDark: '#4E0E13',
    secondary:   '#921c22',
    white:       '#fff',
    text:        '#1c1917',
    textMid:     '#57534e',
    muted:       '#a8a29e',
    border:      '#e7e5e4',
    borderLight: '#f5f5f4',
    bg:          '#FAF7F2',
};
const ff = {
    display: "'Lora', Georgia, serif",
    body:    "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif",
};

export default function Index(props: TPROPS) {
    const router = useRouter();
    const [formData, setFormData] = useState<FormResultProps>();
    const formAnwerService = useMemo(() => new FormAnswerService(), []);
    const { enqueueSnackbar } = useSnackbar();

    type typeDataPratico  = { stepValues: IStepsValues };
    type requestResponse  = { type: string; data: IPlanejaDataPDF[] | IStepsValues };

    const stylesPDFTeorico = StyleSheet.create({
        page:     { padding: 30 },
        section:  { margin: 10, padding: 10, flexGrow: 1 },
        flex:     { display: 'flex', flexDirection: 'row' },
        title:    { fontSize: 16, fontWeight: 'bold' },
        subtitle: { fontSize: 14, fontWeight: 'bold', marginTop: 10 },
        text:     { fontSize: 12, marginTop: 5 },
    });

    const ModifiedPdf = ({ maxScore, score, domainList, answer, formTitle, date }: FormResultProps) => (
        <Document>
            <Page wrap={false}>
                <View style={stylesPDF.section}><View style={stylesPDF.flex}><Text>Pontuação maxíma:</Text><Text style={stylesPDF.points}>{maxScore} pts</Text></View></View>
                <View style={stylesPDF.section}><View style={stylesPDF.flex}><Text>Pontuação atingida:</Text><Text style={stylesPDF.points}>{score} pts</Text></View></View>
                <View style={stylesPDF.section}><View style={stylesPDF.flex}><Text>Nome do CEO:</Text><Text style={{ maxWidth: '300px', marginLeft: '10px' }}>{answer.title}</Text></View></View>
                <View style={stylesPDF.section}>
                    <View style={stylesPDF.sectionSpacing}>
                        {domainList.map((domain) => (
                            <View key={domain.cod}>
                                <Text style={stylesPDF.sectionTitle}>{domain.name}</Text>
                                {domain.questionList.map((question, key) => (
                                    <View key={key}>
                                        <Text style={stylesPDF.sectionSubtitle}>{question.title}</Text>
                                        <Text style={stylesPDF.sectionText}>{question.recommendationMessage}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );

    const ModifiedPdfPratico = ({ stepValues }: typeDataPratico) => (
        <Document>
            <Page style={stylesPDFTeorico.page}>
                <View style={stylesPDFTeorico.section}>
                    <Text style={stylesPDFTeorico.title}>Primeira Etapa</Text>
                    {stepValues.firstStep.map((item, i) => (
                        <View key={i}>
                            <Text style={stylesPDFTeorico.subtitle}>Domínio: {item.domain}</Text>
                            <Text style={stylesPDFTeorico.text}>Primeiro Indicador: {item.first_indicator}</Text>
                            <Text style={stylesPDFTeorico.text}>Grau do Primeiro Indicador: {item.first_degree}</Text>
                            <Text style={stylesPDFTeorico.text}>Segundo Indicador: {item.second_indicator}</Text>
                            <Text style={stylesPDFTeorico.text}>Grau do Segundo Indicador: {item.second_degree}</Text>
                        </View>
                    ))}
                </View>
                <View style={stylesPDFTeorico.section}>
                    <Text style={stylesPDFTeorico.title}>Segunda Etapa</Text>
                    {stepValues.secondStep.defined_problems.map((p, i) => (
                        <View key={i}><Text style={stylesPDFTeorico.subtitle}>Problema {p.id}</Text><Text style={stylesPDFTeorico.text}>{p.answer}</Text></View>
                    ))}
                </View>
                <View style={stylesPDFTeorico.section}>
                    <Text style={stylesPDFTeorico.title}>Terceira Etapa</Text>
                    {stepValues.thirdStep.causas.map((c, i) => (
                        <View key={i}><Text style={stylesPDFTeorico.subtitle}>Causa {c.id}</Text><Text style={stylesPDFTeorico.text}>{c.causa}</Text><Text style={stylesPDFTeorico.text}>{c.explicacao}</Text></View>
                    ))}
                </View>
                <View style={stylesPDFTeorico.section}>
                    <Text style={stylesPDFTeorico.title}>Quarta Etapa</Text>
                    <Text style={stylesPDFTeorico.text}>Nó Crítico: {stepValues.fourthStep.criticalNode}</Text>
                    {stepValues.fourthStep.actions.map((action, i) => (
                        <View key={i}>
                            <Text style={stylesPDFTeorico.subtitle}>Ação: {action.name}</Text>
                            <Text style={stylesPDFTeorico.text}>Prazo: {action.deadline_compliance}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );

    async function downloadPdf() {
        const localStorageAnswer = localStorage.getItem('selectedAnswer');
        let data: FormResultProps = null;
        if (!formData) {
            const id = localStorage.getItem('lastFormSubmited');
            if (Number(id)) {
                data = await http.get(`/user-answers/${Number(id)}`).then((r) => r.data as FormResultProps);
            }
        }
        try {
            const { domainList, maxScore, score, formTitle, date } = data;
            const blob = await pdf(<ModifiedPdf domainList={domainList} maxScore={maxScore} score={score} answer={JSON.parse(localStorageAnswer)} formTitle={formTitle} date={date} />).toBlob();
            const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = new Date() + ''; document.body.appendChild(a); a.click(); document.body.removeChild(a);
        } catch { enqueueSnackbar('Não existem documentos para baixar!', { variant: 'error' }); }
    }

    async function downloadPlanejaPDF(typeData: 'teoric' | 'pratical') {
        const result = await http.post(`/history/pdf/${typeData}`, { id: localStorage.getItem('userId') })
            .then((r) => { const d = r.data as requestResponse; if (d?.data) return d; enqueueSnackbar('Não existem documentos para baixar!', { variant: 'error' }); throw 'sem dados'; })
            .catch((e) => { console.error(e); throw e; });

        const { data, type } = result;
        const blob = type === 'PLANEJATEORICO'
            ? await pdf(<ModifiedPdfPlanejaTeorico data={data as IPlanejaDataPDF[]} />).toBlob()
            : await pdf(<ModifiedPdfPratico stepValues={data as IStepsValues} />).toBlob();

        const now = new Date();
        const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}-${String(now.getMonth()+1).padStart(2,'0')}-${now.getFullYear()}`;
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `PlanejaSD ${typeData === 'pratical' ? 'pratico' : 'teórico'} - ${ts}`; document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }

    if (!props.isOpen) return null;

    return (
        <>
            <style>{`@keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>

            {/* Overlay */}
            <div
                onClick={() => props.onClose()}
                style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }}
            />

            {/* Drawer panel */}
            <div style={{
                position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 201,
                width: '300px', backgroundColor: C.white,
                display: 'flex', flexDirection: 'column',
                boxShadow: '4px 0 32px rgba(0,0,0,0.12)',
                animation: 'slideIn 0.3s cubic-bezier(0.4,0,0.2,1)',
            }}>
                {/* Header */}
                <div style={{
                    height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 20px', backgroundColor: C.primary, flexShrink: 0,
                }}>
                    <span style={{ fontFamily: ff.display, color: '#fff', fontWeight: 700, fontSize: '18px' }}>
                        GestBucal<span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300, marginLeft: '4px' }}>SD</span>
                    </span>
                    <button
                        onClick={() => props.onClose()}
                        style={{ border: 'none', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'background 0.2s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                    >
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Menu items */}
                <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
                    {props.menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => { router.push(item.url); props.onClose(); }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                width: '100%', padding: '13px 20px',
                                border: 'none', background: 'transparent', cursor: 'pointer',
                                fontFamily: ff.body, fontSize: '15px', fontWeight: 500,
                                color: C.textMid, textAlign: 'left',
                                borderBottom: `1px solid ${C.borderLight}`,
                                transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.primary; e.currentTarget.style.paddingLeft = '24px'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.textMid; e.currentTarget.style.paddingLeft = '20px'; }}
                        >
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: C.primary, opacity: 0.4, flexShrink: 0 }} />
                            {item.title}
                        </button>
                    ))}
                </nav>

                {/* PDF buttons */}
                <div style={{ padding: '16px', borderTop: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                    {[
                        { label: 'Baixar PDF — Avaliações',       action: () => downloadPdf() },
                        { label: 'Baixar PDF — PlanejaSD Teórico', action: () => downloadPlanejaPDF('teoric') },
                        { label: 'Baixar PDF — PlanejaSD Prático', action: () => downloadPlanejaPDF('pratical') },
                    ].map(({ label, action }, i) => (
                        <button key={i} onClick={action} style={{
                            width: '100%', padding: '11px 16px',
                            background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
                            color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer',
                            fontFamily: ff.body, fontSize: '13px', fontWeight: 700,
                            textTransform: 'uppercase', letterSpacing: '0.05em',
                            transition: 'opacity 0.2s',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
