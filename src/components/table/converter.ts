// converter.ts

import { AnswersForm, AnswersFormData, formsQuestionsFormsRegisters, FormsRegisters, Question, requestResponse } from "@components/data-forms/types";

export type planAnswer = {
    id: number;
    createdAt: string;
    deletedAt: string;
    userId: number;
    questionId: number;
    title: string;
    answer: string;
    typeUser: string;
    titleJustify?: string;
    justify?: string;
};

export type praticalResponse = {
    firstStep: string[];
    secondStep: string[];
    thirdStep: string;
    fourthStep: string[];
    dataUser: string;
};

export type praticalAnswerObj = {
    createdAt: string;
    deletedAt: string;
    id: number;
    question_answer: string;
    typeuser: string;
    userId: number;
};

const columnsPratico = [
    { id: 1, title: "Nomes" },
    { id: 2, title: "Estabelecimento" },
    { id: 3, title: "Cidade" },
    { id: 4, title: "Email" },
    { id: 5, title: "Primeiro passo 1° Indicador" },
    { id: 6, title: "Primeiro passo 2° Indicador" },
    { id: 7, title: "Primeiro passo 3° Indicador" },
    { id: 8, title: "Segundo passo 1° Problema" },
    { id: 9, title: "Segundo passo 2° Problema" },
    { id: 10, title: "Segundo passo 3° Problema" },
    { id: 11, title: "Segundo passo 4° Problema" },
    { id: 12, title: "Segundo passo 5° Problema" },
    { id: 13, title: "Terceiro passo" },
    { id: 14, title: "Quarto passo 1° Ação" },
    { id: 15, title: "Quarto passo 2° Ação" },
    { id: 16, title: "Quarto passo 3° Ação" },
    { id: 17, title: "Quarto passo 4° Ação" },
];

interface PraticalJSON {
    firstStep: {
        domain: string;
        first_indicator: string;
        first_degree: number;
        second_indicator: string;
        second_degree: number;
    }[];
    secondStep: {
        defined_problems: { id: number; answer: string }[];
    };
    thirdStep: {
        causas: { id: number; causa: string; explicacao: string }[];
    };
    fourthStep: {
        mentalMapUrl: string;
        criticalNode: string;
        actions: {
            name: string;
            deadline_compliance: string;
            responsibles: { responsible: string; motivation: string; strategies: string }[];
            resources: { resource: string; described_strategies: string; itsCricticalResource: string }[];
        }[];
    };
    dados_para_certificado: {
        names: string;
        email: string;
        city: string;
        health_establishment: string;
    };
}

export function convertPraticalToReadable(data: PraticalJSON, typeUser?: string): string[] {
    const lines: string[] = [];
    const ni = "Não informado";

    lines.push(data.dados_para_certificado?.names || ni);
    lines.push(data.dados_para_certificado?.health_establishment || ni);
    lines.push(data.dados_para_certificado?.city || ni);
    lines.push(data.dados_para_certificado?.email || ni);
    if (typeUser) lines.push(`Profissional: ${typeUser}`);

    data.firstStep?.forEach((step) => {
        lines.push(
            `Domínio: ${step.domain || ni}\n` +
                `Primeiro indicador: ${step.first_indicator || ni}\n` +
                `Primeiro degrau: ${step.first_degree ?? ni}\n` +
                `Segundo indicador: ${step.second_indicator || ni}\n` +
                `Segundo degrau: ${step.second_degree ?? ni}`
        );
    });

    data.secondStep?.defined_problems?.forEach((p) => {
        lines.push(`Problema ${p.id ?? ni}:\n` + `${p.answer || ni}`);
    });

    data.thirdStep?.causas?.forEach((c) => {
        lines.push(`Causa ${c.id ?? ni}: ${c.causa || ni}\n` + `${c.explicacao || ni}`);
    });

    lines.push(`Nó crítico:\n${data.fourthStep?.criticalNode || ni}`);

    data.fourthStep?.actions?.forEach((action, i) => {
        lines.push(`Ação ${i + 1}:\n` + `${action.name || ni}\n` + `Prazo: ${action.deadline_compliance || ni}`);

        action.responsibles?.forEach((r) => {
            lines.push(`Responsável: ${r.responsible || ni}\n` + `Motivação: ${r.motivation || ni}`);
        });

        action.resources?.forEach((r) => {
            lines.push(
                `Recurso: ${r.resource || ni}\n` + `Estratégia: ${r.described_strategies || ni}\n` + `Crítico: ${r.itsCricticalResource || ni}`
            );
        });
    });

    return lines;
}

export function convertPlanejaPraticoToForm(planData: praticalAnswerObj[]): requestResponse {
    const data = getFormsRegistersDefault();
    const formsQuestionsFormsRegistersVariable: formsQuestionsFormsRegisters[] = [];
    columnsPratico.map((d, index) => {
        formsQuestionsFormsRegistersVariable.push({
            id: d.id,
            createdAt: undefined,
            deletedAt: undefined,
            questionId: {
                createdAt: "",
                deletedAt: "",
                id: d.id,
                recommendationMessage: "",
                title: d.title,
                domainId: undefined,
                formsQuestionsFormsQuestionChoices: undefined,
                typeId: undefined,
            },
        });
    });
    data.formsQuestionsFormsRegisters = formsQuestionsFormsRegistersVariable;

    const answer: AnswersForm[] = [];

    planData.map((a) => {
        const dataJson = convertPraticalToReadable(JSON.parse(a.question_answer), a.typeuser);
        let date = new Date();
        let userId = 0;
        const answers: AnswersFormData[] = [];
        dataJson.map((v, index) => {
            answers.push({
                answer: undefined,
                answerText: v,
                createdAt: new Date(a.createdAt),
                id: a.id,
                questionId: index + 1,
            });
        });
        answer.push({
            date,
            userId,
            answers,
        });
    });

    return {
        data: { data, answer },
    };
}

export function convertPlanejaTeoricoToForm(planData: planAnswer[][]): requestResponse {
    const data = getFormsRegistersDefault();
    const formsQuestionsFormsRegistersVariable: formsQuestionsFormsRegisters[] = [];
    getHeaderTeorico(planData).map((d) => {
        formsQuestionsFormsRegistersVariable.push({
            id: d.id,
            createdAt: undefined,
            deletedAt: undefined,
            questionId: {
                createdAt: "",
                deletedAt: "",
                id: d.id,
                recommendationMessage: "",
                title: d.title,
                domainId: undefined,
                formsQuestionsFormsQuestionChoices: undefined,
                typeId: undefined,
            },
        });
    });
    data.formsQuestionsFormsRegisters = formsQuestionsFormsRegistersVariable;

    const answer: AnswersForm[] = [];

    planData.map((a) => {
        let date = new Date();
        let userId = 0;
        const answers: AnswersFormData[] = [];
        a.map((v, index) => {
            date = new Date(v.createdAt);
            userId = v.userId;
            if (v.questionId == 9) {
                answers.push({
                    answer: undefined,
                    answerText: v.answer + (v.justify ? `, ${v.justify}` : ""),
                    createdAt: new Date(v.createdAt),
                    id: v.id,
                    questionId: Number(`${v.questionId}.${index}`),
                });
            } else {
                answers.push({
                    answer: undefined,
                    answerText: v.answer + (v.justify ? `, ${v.justify}` : ""),
                    createdAt: new Date(v.createdAt),
                    id: v.id,
                    questionId: v.questionId,
                });
            }
        });
        answer.push({
            date,
            userId,
            answers,
        });
    });

    return {
        data: { data, answer },
    };
}

function getHeaderTeorico(planData: planAnswer[][]): { id: number; title: string }[] {
    const headers: { id: number; title: string }[] = [];

    const cleanTitle = (text: string) =>
        text
            .replace(/[\r\n\t]+/g, " ")
            .replace(/\s+/g, " ")
            .trim();

    planData.map((d) => {
        d.map((v) => {
            const title = cleanTitle(v.title + (v.titleJustify ? `, ${v.titleJustify}` : ""));
            const exists = headers.some((h) => h.id === v.questionId && h.title === title);
            if (!exists) headers.push({ id: v.questionId, title });
        });
    });

    const uniqueHeaders = headers.filter((h, index, self) => self.findIndex((o) => o.id === h.id && o.title === h.title) === index);

    uniqueHeaders.map((v, index) => {
        if (v.id == 9) {
            v.id = Number(`${v.id}.${index}`);
        }
    });

    return uniqueHeaders;
}

function getFormsRegistersDefault() {
    const data: FormsRegisters = {
        completionMessage: "",
        created_at: undefined,
        deleted_at: undefined,
        id: undefined,
        title: undefined,
        formsQuestionsFormsRegisters: [
            {
                id: undefined,
                createdAt: undefined,
                deletedAt: undefined,
                questionId: {
                    createdAt: undefined,
                    deletedAt: undefined,
                    id: undefined,
                    recommendationMessage: undefined,
                    title: undefined,
                    domainId: undefined,
                    formsQuestionsFormsQuestionChoices: undefined,
                    typeId: undefined,
                },
            },
        ],
    };
    return data;
}
