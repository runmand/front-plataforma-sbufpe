import React from "react";
import { http } from "src/core/axios";
import { nameForm } from "src/constants/constantsPlaneja";
import type { FormResultProps } from "@components/FormResultPdf/FormResultProps.types";
import type { IPlanejaDataPDF } from "@components/planeja/planeja-form";
import type { IStepsValues } from "@components/planeja-pratico/steps/FinishFormStep";

type HistoryResponse = {
    type: string;
    data: IPlanejaDataPDF[] | IStepsValues;
};

function timestamp() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}-${now.getFullYear()}`;
}

function downloadBlob(blob: Blob, fileName: string) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);

    try {
        anchor.click();
    } finally {
        anchor.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 0);
    }
}

export async function downloadFormResultPdf(formResult: FormResultProps, answer: FormResultProps["answer"], formTitle: string) {
    const [{ pdf }, { ResultFormPdf }] = await Promise.all([import("@react-pdf/renderer"), import("@components/FormResultPdf")]);
    const blob = await pdf(
        <ResultFormPdf
            domainList={formResult.domainList}
            maxScore={formResult.maxScore}
            score={formResult.score}
            date={new Date(formResult.date)}
            answer={answer}
            formTitle={formTitle}
        />
    ).toBlob();

    downloadBlob(blob, new Date() + "");
}

export async function downloadLastFormResultPdf() {
    const id = Number(localStorage.getItem("lastFormSubmited"));

    if (!id) throw new Error("Nenhuma avaliação disponível para download.");

    const { data: formResult } = await http.get<FormResultProps>(`/user-answers/${id}`);
    const [{ pdf }, { HistoryResultPdf }] = await Promise.all([
        import("@react-pdf/renderer"), import("@components/pdf/history-documents"),
    ]);
    const blob = await pdf(
        <HistoryResultPdf {...formResult} answer={JSON.parse(localStorage.getItem("selectedAnswer") ?? "null")} />
    ).toBlob();
    downloadBlob(blob, new Date() + "");
}

export async function downloadPlanejaHistoryPdf(typeData: "teoric" | "pratical") {
    const { data: response } = await http.post<HistoryResponse>(`/history/pdf/${typeData}`, {
        id: localStorage.getItem("userId"),
    });

    if (!response?.data) throw new Error("Nenhum documento disponível para download.");

    const { pdf } = await import("@react-pdf/renderer");
    const blob =
        response.type === "PLANEJATEORICO"
            ? await createTheoreticalBlob(pdf, response.data as IPlanejaDataPDF[])
            : await createHistoryPracticalBlob(pdf, response.data as IStepsValues);

    downloadBlob(blob, `PlanejaSD ${typeData === "pratical" ? "pratico" : "teórico"} - ${timestamp()}`);
}

export async function downloadPlanejaTheoreticalPdf() {
    const { data: response } = await http.post<{ data: IPlanejaDataPDF[] }>("/history/pdf", {
        id: localStorage.getItem("userId"),
        form: nameForm.teoric,
    });

    if (!response?.data) throw new Error("Nenhum documento disponível para download.");

    const { pdf } = await import("@react-pdf/renderer");
    const blob = await createTheoreticalBlob(pdf, response.data);
    downloadBlob(blob, `Resposta do planeja - ${timestamp()}`);
}

export async function downloadPlanejaPracticalPdf(stepValues: IStepsValues) {
    const { pdf } = await import("@react-pdf/renderer");
    const blob = await createPracticalBlob(pdf, stepValues);
    downloadBlob(blob, `relatorio_${new Date().toLocaleDateString()}.pdf`);
}

async function createTheoreticalBlob(pdf: (document: React.ReactElement) => { toBlob: () => Promise<Blob> }, data: IPlanejaDataPDF[]) {
    const { default: ModifiedPdfPlanejaTeorico } = await import("@components/pdf/PlanejaPDF");
    return pdf(<ModifiedPdfPlanejaTeorico data={data} />).toBlob();
}

async function createPracticalBlob(pdf: (document: React.ReactElement) => { toBlob: () => Promise<Blob> }, stepValues: IStepsValues) {
    const { default: ModifiedPdfPlanejaPratico } = await import("@components/pdf/PlanejaPraticoPDF");
    return pdf(<ModifiedPdfPlanejaPratico stepValues={stepValues} />).toBlob();
}

async function createHistoryPracticalBlob(pdf: (document: React.ReactElement) => { toBlob: () => Promise<Blob> }, stepValues: IStepsValues) {
    const { HistoryPracticalPdf } = await import("@components/pdf/history-documents");
    return pdf(<HistoryPracticalPdf stepValues={stepValues} />).toBlob();
}
