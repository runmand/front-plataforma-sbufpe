import React, { useState } from "react";
import { TPROPS } from "./type";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

const C = {
    primary: "#6D141A",
    primaryDark: "#4E0E13",
    secondary: "#921c22",
    white: "#fff",
    text: "#1c1917",
    textMid: "#57534e",
    muted: "#a8a29e",
    border: "#e7e5e4",
    borderLight: "#f5f5f4",
    bg: "#FAF7F2",
};
const ff = {
    display: "'Newsreader', Georgia, serif",
    body: "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif",
};

export default function Index(props: TPROPS) {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [downloading, setDownloading] = useState<string | null>(null);

    async function downloadPdf(type: "form" | "teoric" | "pratical") {
        setDownloading(type);
        try {
            const downloads = await import("@components/pdf/downloads");
            if (type === "form") await downloads.downloadLastFormResultPdf();
            else await downloads.downloadPlanejaHistoryPdf(type);
        } catch (error) {
            console.error(error);
            enqueueSnackbar("Não foi possível gerar o PDF. Verifique se há dados disponíveis e tente novamente.", { variant: "error" });
        } finally {
            setDownloading(null);
        }
    }

    if (!props.isOpen) return null;

    return (
        <>
            <style>{`@keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>

            {/* Overlay */}
            <div
                onClick={() => props.onClose()}
                style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
            />

            {/* Drawer panel */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    zIndex: 201,
                    width: "300px",
                    backgroundColor: C.white,
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "4px 0 32px rgba(0,0,0,0.12)",
                    animation: "slideIn 0.3s cubic-bezier(0.4,0,0.2,1)",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        height: "68px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 20px",
                        backgroundColor: C.primary,
                        flexShrink: 0,
                    }}
                >
                    <span style={{ fontFamily: ff.display, color: "#fff", fontWeight: 700, fontSize: "18px" }}>
                        GestBucal<span style={{ color: "rgba(255,255,255,0.35)", fontWeight: 300, marginLeft: "4px" }}>SD</span>
                    </span>
                    <button
                        onClick={() => props.onClose()}
                        style={{
                            border: "none",
                            background: "rgba(255,255,255,0.1)",
                            borderRadius: "8px",
                            cursor: "pointer",
                            padding: "6px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                        }}
                    >
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Menu items */}
                <nav style={{ flex: 1, overflowY: "auto", padding: "12px 0" }}>
                    {props.menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                router.push(item.url);
                                props.onClose();
                            }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                width: "100%",
                                padding: "13px 20px",
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                fontFamily: ff.body,
                                fontSize: "15px",
                                fontWeight: 500,
                                color: C.textMid,
                                textAlign: "left",
                                borderBottom: `1px solid ${C.borderLight}`,
                                transition: "all 0.15s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = C.bg;
                                e.currentTarget.style.color = C.primary;
                                e.currentTarget.style.paddingLeft = "24px";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = C.textMid;
                                e.currentTarget.style.paddingLeft = "20px";
                            }}
                        >
                            <div
                                style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.primary, opacity: 0.4, flexShrink: 0 }}
                            />
                            {item.title}
                        </button>
                    ))}
                </nav>

                {/* PDF buttons */}
                {props.showExit ? (
                    <div
                        style={{
                            padding: "16px",
                            borderTop: `1px solid ${C.border}`,
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            flexShrink: 0,
                        }}
                    >
                        <button
                            onClick={() => {
                                props.exitFunction();
                                props.onClose();
                            }}
                            style={{
                                width: "100%",
                                padding: "11px 16px",
                                background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
                                color: "#fff",
                                border: "none",
                                borderRadius: "10px",
                                cursor: "pointer",
                                fontFamily: ff.body,
                                fontSize: "13px",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                transition: "opacity 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = "0.85";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = "1";
                            }}
                        >
                            → Sair
                        </button>
                    </div>
                ) : (
                    props.showPDF ||
                    (props.showPDF == undefined && (
                        <div
                            style={{
                                padding: "16px",
                                borderTop: `1px solid ${C.border}`,
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                                flexShrink: 0,
                            }}
                        >
                            {[
                                { id: "form" as const, label: "Baixar PDF — Avaliações" },
                                { id: "teoric" as const, label: "Baixar PDF — PlanejaSD Teórico" },
                                { id: "pratical" as const, label: "Baixar PDF — PlanejaSD Prático" },
                            ].map(({ id, label }, i) => (
                                <button
                                    key={i}
                                    onClick={() => downloadPdf(id)}
                                    disabled={downloading !== null}
                                    style={{
                                        width: "100%",
                                        padding: "11px 16px",
                                        background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "10px",
                                        cursor: downloading ? "wait" : "pointer",
                                        opacity: downloading && downloading !== id ? 0.6 : 1,
                                        fontFamily: ff.body,
                                        fontSize: "13px",
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                        transition: "opacity 0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.opacity = "0.85";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.opacity = "1";
                                    }}
                                >
                                    {downloading === id ? "Gerando PDF..." : label}
                                </button>
                            ))}
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
