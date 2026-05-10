import { AnswersForm, formsQuestionsFormsRegisters } from "@components/data-forms/types";

export function exportToCSV(
    filteredAnswers: AnswersForm[],
    columns: formsQuestionsFormsRegisters[],
    orderQuestions: number[],
    filename: string = "exportacao"
) {
    const ni = "Não Informado";

    const formatText = (text: string) => {
        if (!text) return ni;
        return `"${text.replace(/"/g, '""').replace(/\n/g, " ")}"`;
    };

    const headers = columns.map((col) => formatText(col.questionId.title)).join(",");

    const rows = filteredAnswers.map((a) => {
        return orderQuestions
            .map((questionId) => {
                const answer = a.answers.find((o) => o.questionId === questionId);
                const text = answer?.answerText;

                if (text === undefined) return formatText(ni);
                if (text === "") return formatText("Não respondido");
                return formatText(text);
            })
            .join(",");
    });

    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" }); // \uFEFF = BOM para Excel reconhecer UTF-8
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${filename}_${new Date().toLocaleDateString("pt-BR").replace(/\//g, "-")}.csv`;
    link.click();

    URL.revokeObjectURL(url);
}
