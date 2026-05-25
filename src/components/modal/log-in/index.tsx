'use client';

import { Modal } from "@mui/material";
import Image from "next/image";
import React from "react";
import { TPROPS } from "./type";
import CustomTextField from "@components/text-field/index";
import LoginService from "./service";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { localStorageKeyEnum, loginTypeEnum, routerEnum } from "src/core/enums";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Index(props: TPROPS) {
    const loginService = new LoginService();
    const [login, setLogin] = React.useState<string>(null);
    const [pwd, setPwd] = React.useState<string>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const loginType = loginTypeEnum.ALL;
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    const handleSubmit = async () => {
        setIsLoading(true);

        if (!login) {
            enqueueSnackbar("Login é obrigatório", { variant: "error" });
            setIsLoading(false);
            return;
        }

        if (!pwd) {
            enqueueSnackbar("Senha é obrigatória", { variant: "error" });
            setIsLoading(false);
            return;
        }
        loginService
            .handleLogin({ login, pwd, loginType })
            .then((res) => {
                if (res.data?.token) {
                    enqueueSnackbar("Login efetuado com sucesso!", { variant: "success" });
                    localStorage.setItem(localStorageKeyEnum.TOKEN, res.data.token);
                    localStorage.setItem(localStorageKeyEnum.USER_ID, res.data.user_id + "");
                    localStorage.setItem(localStorageKeyEnum.TYPE_ID, res.data.user_type.typeId + "");
                    router.push(routerEnum.FORM);
                } else {
                    setIsLoading(false);
                }
            })
            .catch(() => setIsLoading(false));
    };

    const handleSignUp = () => {
        props.onClose();
        props.openSignupModal();
    };

    const handleResetPassword = () => {
        router.push("/recuperar");
    };

    const isReady = login && pwd && !isLoading;

    return (
        <Modal
            open={props.isOpen}
            className="flex items-center justify-center p-4 bg-black/40"
            onClose={() => {
                if (props.canSkip) props.onClose();
            }}
        >
            <div className="relative w-full max-w-[440px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-9 shadow-2xl font-body outline-none">
                {/* Close */}
                <button
                    type="button"
                    onClick={() => props.onClose()}
                    style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
                    className="absolute top-5 right-5 text-gb-muted hover:text-gb-text transition-colors flex items-center justify-center"
                    aria-label="Fechar"
                >
                    <CloseIcon fontSize="small" />
                </button>

                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gb-primary flex items-center justify-center overflow-hidden">
                        <Image src="/logo-transparent.png" alt="Logo" width={44} height={44} style={{ objectFit: "contain" }} />
                    </div>
                </div>

                {/* Header */}
                <div className="mb-6 text-center">
                    <h2 className="font-display text-[24px] font-bold text-gb-text leading-tight tracking-tight mb-1.5">
                        Bem-vindo de volta
                    </h2>
                    <p className="text-sm text-gb-muted leading-relaxed">
                        Entre com suas credenciais para acessar a plataforma
                    </p>
                </div>

                {/* CPF */}
                <div className="mb-5">
                    <label className="block text-[11px] font-bold tracking-widest uppercase text-gb-label mb-2">
                        CPF
                    </label>
                    <CustomTextField
                        title=""
                        placeholder="000.000.000-00"
                        maskType={loginTypeEnum.CPF}
                        onBlur={(v) => setLogin(v)}
                        loginMethod={() => handleSubmit()}
                    />
                </div>

                {/* Senha */}
                <div className="mb-6">
                    <label className="block text-[11px] font-bold tracking-widest uppercase text-gb-label mb-2">
                        Senha
                    </label>
                    <CustomTextField
                        title=""
                        placeholder="Sua senha"
                        textType="password"
                        onBlur={(v) => setPwd(v)}
                        loginMethod={() => handleSubmit()}
                    />
                </div>

                {/* Submit */}
                <button
                    type="button"
                    disabled={!isReady}
                    onClick={() => handleSubmit()}
                    style={{ border: "none" }}
                    className={`w-full py-3.5 rounded-[10px] text-[15px] font-semibold flex items-center justify-center gap-2 transition-all ${
                        isReady
                            ? "bg-gb-primary text-white cursor-pointer hover:bg-gb-secondary"
                            : "bg-gb-border text-gb-muted cursor-not-allowed"
                    }`}
                >
                    {isLoading ? "Entrando..." : "Entrar"}
                    {!isLoading && <ArrowForwardIcon fontSize="small" />}
                </button>

                {/* Divider OU */}
                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gb-border" />
                    <span className="px-4 text-[11px] font-bold tracking-widest uppercase text-gb-label">ou</span>
                    <div className="flex-1 h-px bg-gb-border" />
                </div>

                {/* Links */}
                <div className="text-center text-sm text-gb-text mb-2">
                    Primeiro acesso?{" "}
                    <button
                        type="button"
                        onClick={() => handleSignUp()}
                        style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
                        className="text-gb-primary font-semibold"
                    >
                        Cadastre-se agora
                    </button>
                </div>
                <div className="text-center text-sm text-gb-text">
                    Esqueceu sua senha?{" "}
                    <button
                        type="button"
                        onClick={() => handleResetPassword()}
                        style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
                        className="text-gb-primary font-semibold"
                    >
                        Recuperar senha
                    </button>
                </div>
            </div>
        </Modal>
    );
}
