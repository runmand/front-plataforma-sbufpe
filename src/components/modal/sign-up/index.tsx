/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, Checkbox, Modal, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { TPROPS, USER_TYPE } from "./type";
import CustomTextField from "@components/text-field/index";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { emitterWindowEventEnum, localStorageKeyEnum, loginTypeEnum, routerEnum } from "src/core/enums";
import SignupService from "./service";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { validateCPF, validateEmail } from "src/utils/validators";

//TODO: Criar validação de formalario antes de enviar dados para a API.
//TODO: Criar limpeza de campos apartir do callback fornecido por cada campo.
export default function Index(props: TPROPS) {
    let clearLoginField = () => console.log("Trying clear login field...");
    const { enqueueSnackbar } = useSnackbar();
    const signupService = new SignupService();
    const router = useRouter();
    const [login, setLogin] = React.useState<string | null>(null);
    const [email, setEmail] = React.useState<string | null>(null);
    const [pwd, setPwd] = React.useState<string | null>(null);
    const [userType, setUserType] = React.useState<USER_TYPE | null>(null);
    const [userTypeList, setUserTypeList] = React.useState<USER_TYPE[]>([]);
    const [confirmPwd, setConfirmPwd] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isChecked, setIsChecked] = React.useState<boolean>(false);
    const canSubmit = login && userType && pwd && pwd === confirmPwd;

    useEffect(() => {
        signupService
            .getUserTypes()
            .then((res) =>
                setUserTypeList(
                    res.data
                        ?.filter((item) => item.description?.toLowerCase() !== "desenvolvedor")
                        .map((item) => ({ id: item.id, label: item.description }))
                )
            )
            .catch(() => setIsLoading(false));
    }, []);

    const handleTcle = () => {
        props.onClose();
        props.openTclePage();
    };

    const validateForm = () => {
        if (!validateEmail(email)) {
            enqueueSnackbar("Email invalido");
            return false;
        }

        if (pwd.length < 8) {
            enqueueSnackbar("A senha deve conter 8 caracteres");
            return false;
        }

        if (pwd !== confirmPwd) {
            enqueueSnackbar("As senhas devem ser igual, caso tenha esquecido clique no icone do olho ao lado da senha");
            return false;
        }

        if (!validateCPF(login)) {
            enqueueSnackbar("Cpf inserido é invalido, verifique tente novamente.");
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        if (!validateForm()) {
            setIsLoading(false);
            return;
        }

        signupService
            .handleSignup({ login, email, pwd, typeId: userType.id })
            .then((res) => {
                if (res.data?.token) {
                    enqueueSnackbar("Registro efetuado com sucesso!", { variant: "success" });
                    localStorage.setItem(localStorageKeyEnum.TOKEN, res.data.token);
                    localStorage.setItem(localStorageKeyEnum.TYPE_ID, res.data.user_type.typeId + "");
                    window.dispatchEvent(new Event(emitterWindowEventEnum.LOGIN_SUCCESS));
                    router.push(routerEnum.FORM);
                } else {
                    setIsLoading(false);
                }
            })
            .catch(() => setIsLoading(false));
    };

    const isReady = canSubmit && isChecked && !isLoading;

    return (
        <Modal
            open={props.isOpen}
            className="flex items-center justify-center p-4 bg-black/40"
            onClose={() => {
                if (props.canSkip) props.onClose();
            }}
        >
            <div className="relative w-full max-w-[480px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-9 shadow-2xl font-body outline-none">
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

                {/* Header */}
                <div className="mb-6 pr-8">
                    <h2 className="font-display text-[26px] font-bold text-gb-text leading-tight tracking-tight mb-1.5">
                        Crie sua conta
                    </h2>
                    <p className="text-sm text-gb-muted leading-relaxed">
                        Preencha os campos para começar a contribuir com a pesquisa
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
                        onClear={(toInvoke) => (clearLoginField = toInvoke)}
                    />
                </div>

                {/* Tipo de participante */}
                <div className="mb-5">
                    <label className="block text-[11px] font-bold tracking-widest uppercase text-gb-label mb-2">
                        Tipo de participante
                    </label>
                    <Autocomplete
                        options={userTypeList}
                        multiple={false}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Selecione o tipo"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#f5f5f4",
                                        borderRadius: "10px",
                                        fontSize: "14px",
                                        padding: "4px 8px",
                                        "& fieldset": { borderColor: "transparent" },
                                        "&:hover fieldset": { borderColor: "#e7e5e4" },
                                        "&.Mui-focused": {
                                            backgroundColor: "#ffffff",
                                            "& fieldset": { borderColor: "#6D141A", borderWidth: "1.5px" },
                                        },
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        padding: "8px 6px !important",
                                        color: "#1c1917",
                                        "&::placeholder": { color: "#a8a29e", opacity: 1 },
                                    },
                                }}
                            />
                        )}
                        onChange={(event: any, newValue: USER_TYPE | null) => setUserType(newValue)}
                    />
                </div>

                {/* Email */}
                <div className="mb-5">
                    <label className="block text-[11px] font-bold tracking-widest uppercase text-gb-label mb-2">
                        E-mail
                    </label>
                    <CustomTextField title="" placeholder="seu@email.com" onBlur={(em) => setEmail(em)} />
                </div>

                {/* Senha / Confirmar senha */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div>
                        <label className="block text-[11px] font-bold tracking-widest uppercase text-gb-label mb-2">
                            Senha
                        </label>
                        <CustomTextField title="" placeholder="Sua senha" textType="password" onBlur={(v) => setPwd(v)} />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold tracking-widest uppercase text-gb-label mb-2">
                            Confirmar senha
                        </label>
                        <CustomTextField title="" placeholder="Confirme sua senha" textType="password" onBlur={(v) => setConfirmPwd(v)} />
                    </div>
                </div>

                {/* TCLE */}
                <div className="mb-6 flex items-center">
                    <label className="flex items-center cursor-pointer select-none">
                        <Checkbox
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            size="small"
                            sx={{
                                padding: "4px",
                                color: "#e7e5e4",
                                "&.Mui-checked": { color: "#6D141A" },
                            }}
                        />
                        <span className="ml-1 text-sm text-gb-text">Li e concordo com o</span>
                    </label>
                    <button
                        type="button"
                        onClick={() => handleTcle()}
                        style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
                        className="ml-1 text-sm text-gb-primary font-semibold underline"
                    >
                        TCLE do GestBucalSD
                    </button>
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
                    {isLoading ? "Enviando..." : "Criar minha conta"}
                    {!isLoading && <ArrowForwardIcon fontSize="small" />}
                </button>
            </div>
        </Modal>
    );
}
