import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { stylesPDF } from "@components/FormResultPdf";
import type { FormResultProps } from "@components/FormResultPdf/FormResultProps.types";
import type { IStepsValues } from "@components/planeja-pratico/steps/FinishFormStep";

// Preserve the existing history documents separately from the form completion PDFs.
const stylesPDFTeorico = StyleSheet.create({
    page: { padding: 30 },
    section: { margin: 10, padding: 10, flexGrow: 1 },
    flex: { display: "flex", flexDirection: "row" },
    title: { fontSize: 16, fontWeight: "bold" },
    subtitle: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
    text: { fontSize: 12, marginTop: 5 },
});

export const HistoryResultPdf = ({ maxScore, score, domainList, answer, formTitle, date }: FormResultProps) => (
    <Document>
        <Page wrap={false}>
            <View style={stylesPDF.section}>
                <View style={stylesPDF.flex}>
                    <Text>Pontuação maxíma:</Text>
                    <Text style={stylesPDF.points}>{maxScore} pts</Text>
                </View>
            </View>
            <View style={stylesPDF.section}>
                <View style={stylesPDF.flex}>
                    <Text>Pontuação atingida:</Text>
                    <Text style={stylesPDF.points}>{score} pts</Text>
                </View>
            </View>
            <View style={stylesPDF.section}>
                <View style={stylesPDF.flex}>
                    <Text>Nome do CEO:</Text>
                    <Text style={{ maxWidth: "300px", marginLeft: "10px" }}>{answer.title}</Text>
                </View>
            </View>
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

export const HistoryPracticalPdf = ({ stepValues }: { stepValues: IStepsValues }) => (
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
                    <View key={i}>
                        <Text style={stylesPDFTeorico.subtitle}>Problema {p.id}</Text>
                        <Text style={stylesPDFTeorico.text}>{p.answer}</Text>
                    </View>
                ))}
            </View>
            <View style={stylesPDFTeorico.section}>
                <Text style={stylesPDFTeorico.title}>Terceira Etapa</Text>
                {stepValues.thirdStep.causas.map((c, i) => (
                    <View key={i}>
                        <Text style={stylesPDFTeorico.subtitle}>Causa {c.id}</Text>
                        <Text style={stylesPDFTeorico.text}>{c.causa}</Text>
                        <Text style={stylesPDFTeorico.text}>{c.explicacao}</Text>
                    </View>
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
