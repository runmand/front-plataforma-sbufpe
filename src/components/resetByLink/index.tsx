import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import CustomTextField from "@components/text-field/index";
import { http } from "src/core/axios";
import { showError, showSuccess } from "src/core/snackbar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Index() {
    const [pwd, setPwd] = useState<string | null>(null);
    const [pwdConfirm, setPwdConfirm] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const isReady = !!pwd && !!pwdConfirm && !isLoading;

    async function sendReset() {
        if (!pwd || !pwdConfirm) {
            showError("Preencha os campos de senha");
            return;
        }
        if (pwd !== pwdConfirm) {
            showError("As senhas devem ser iguais");
            return;
        }
        setIsLoading(true);
        http.post("/reset/execute", { password: pwd, token: router.query.token?.toString() })
            .then(() => {
                showSuccess("Senha alterada com sucesso!");
                router.push("/");
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
                        Redefinir senha
                    </h2>
                    <p className="text-sm text-gb-muted leading-relaxed">
                        Crie uma nova senha para acessar a plataforma
                    </p>
                </div>

                {/* Nova senha */}
                <div className="mb-5">
                    <label className="block text-[11px] font-bold tracking-widest uppercase text-gb-label mb-2">
                        Nova senha
                    </label>
                    <CustomTextField
                        title=""
                        placeholder="Digite sua nova senha"
                        textType="password"
                        onBlur={(v) => setPwd(v)}
                    />
                </div>

                {/* Confirmar */}
                <div className="mb-6">
                    <label className="block text-[11px] font-bold tracking-widest uppercase text-gb-label mb-2">
                        Confirmar senha
                    </label>
                    <CustomTextField
                        title=""
                        placeholder="Confirme sua nova senha"
                        textType="password"
                        onBlur={(v) => setPwdConfirm(v)}
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
                    {isLoading ? "Alterando..." : "Alterar senha"}
                    {!isLoading && <ArrowForwardIcon fontSize="small" />}
                </button>
            </div>
        </div>
    );
}
