import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CustomTextField from "@components/text-field/index";
import { http } from "src/core/axios";
import { showSuccess } from "src/core/snackbar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { loginTypeEnum } from "src/core/enums";

export default function Index() {
    const [login, setLogin] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const isReady = !!login && !isLoading;

    async function sendReset() {
        if (!login) return;
        setIsLoading(true);
        http.post("/reset/", { login })
            .then((r: any) => {
                if (r?.data?.response) {
                    showSuccess(r.data.response);
                }
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }

    return (
        <div className="flex items-center justify-center px-4 py-12 min-h-[70vh]">
            <div className="w-full max-w-[440px] rounded-2xl bg-white p-6 sm:p-9 shadow-2xl font-body" style={{ border: "1px solid #e7e5e4" }}>
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gb-primary flex items-center justify-center overflow-hidden">
                        <Image src="/logo-transparent.png" alt="Logo" width={44} height={44} style={{ objectFit: "contain" }} />
                    </div>
                </div>

                {/* Header */}
                <div className="mb-6 text-center">
                    <h2 className="font-display text-[24px] font-bold text-gb-text leading-tight tracking-tight mb-1.5">
                        Recuperar senha
                    </h2>
                    <p className="text-sm text-gb-muted leading-relaxed">
                        Informe seu CPF para receber as instruções de redefinição por e-mail
                    </p>
                </div>

                {/* CPF */}
                <div className="mb-6">
                    <label className="block text-[11px] font-bold tracking-widest uppercase text-gb-label mb-2">
                        CPF
                    </label>
                    <CustomTextField
                        title=""
                        placeholder="000.000.000-00"
                        maskType={loginTypeEnum.CPF}
                        onBlur={(v) => setLogin(v)}
                        loginMethod={() => sendReset()}
                    />
                </div>

                {/* Submit */}
                <button
                    type="button"
                    disabled={!isReady}
                    onClick={() => sendReset()}
                    style={{ border: "none" }}
                    className={`w-full py-3.5 rounded-[10px] text-[15px] font-semibold flex items-center justify-center gap-2 transition-all ${
                        isReady
                            ? "bg-gb-primary text-white cursor-pointer hover:bg-gb-secondary"
                            : "bg-gb-border text-gb-muted cursor-not-allowed"
                    }`}
                >
                    {isLoading ? "Enviando..." : "Solicitar recuperação"}
                    {!isLoading && <ArrowForwardIcon fontSize="small" />}
                </button>

                {/* Note */}
                <p className="mt-5 text-xs text-gb-muted leading-relaxed text-center">
                    É necessário ter um e-mail cadastrado previamente. Caso não tenha, entre em contato conosco.
                </p>

                {/* Back */}
                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={() => router.push("/")}
                        style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
                        className="inline-flex items-center gap-1 text-sm text-gb-primary font-semibold"
                    >
                        <ArrowBackIcon style={{ fontSize: 16 }} />
                        Voltar para o início
                    </button>
                </div>
            </div>
        </div>
    );
}
