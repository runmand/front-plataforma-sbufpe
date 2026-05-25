import { InputBaseComponentProps, TextField } from "@mui/material";
import { TPROPS } from "./type";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import React from "react";
import MaskUtils from "src/utils/maskUtils";
import { loginTypeEnum } from "src/core/enums";
import { config } from "src/core/config";

export default function Index(props: TPROPS) {
    const maskUtils = new MaskUtils();
    const textType = "text";
    const pwdType = "password";
    const [value, setValue] = React.useState<string>("");
    const [oldValue, setOldValue] = React.useState<string>("");
    const [isShowPwd, setIsShowPwd] = React.useState<boolean>(false);
    const [inputProps, setInputProps] = React.useState<InputBaseComponentProps>();

    /** Observador que define o comportamento do campo baseado no tipo de mascara definida, se houver uma... */
    const maskObserver: { [key: string]: (v: string) => string } = {
        [loginTypeEnum.CPF]: (v: string): string => {
            setInputProps({ ...inputProps, maxLength: config.cpfMaskedMaxLength });
            return maskUtils.apply(v, oldValue, config.cpfMask);
        },
        [loginTypeEnum.DDI_DDD_CELLPHONE]: (v: string): string => {
            setInputProps({ ...inputProps, maxLength: config.cellphoneMaskedMaxLength });
            return maskUtils.apply(v, oldValue, config.cellphoneMask);
        },
        default: (v: string): string => {
            setInputProps({ ...inputProps, maxLength: Infinity });
            return v;
        },
    };

    /** Função responsavel por formatar os dados caso exista uma mascara definida para este campo. */
    const onInputCapture = (e: React.FormEvent<HTMLDivElement>) => {
        const target = e.target as HTMLInputElement;
        const maskType = maskObserver.hasOwnProperty(props.maskType) ? props.maskType : "default";
        const maskedValue = maskObserver[maskType](target.value);
        setOldValue(maskedValue);
        setValue(maskedValue);

        /** Atualiza o valor do campo. Pois o autopreenchimento não ativa o onBlur. */
        props.onBlur(target.value);
    };

    /** Caso exista um callback para que outro componente possa limpar este campo, é aqui onda o clear é feito. */
    if (props.onClear) props.onClear(() => setValue(""));

    return (
        <div className="relative w-full">
            <TextField
                variant="outlined"
                label={props.title || undefined}
                placeholder={props.placeholder}
                fullWidth
                onBlur={(e) => props.onBlur(e.target.value)}
                type={props.textType ? (props.textType === pwdType ? (isShowPwd ? textType : props.textType) : props.textType) : textType}
                value={value}
                onInputCapture={(e) => onInputCapture(e)}
                inputProps={inputProps}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && props.loginMethod) {
                        props.loginMethod();
                    }
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        backgroundColor: "#f5f5f4",
                        borderRadius: "10px",
                        fontSize: "14px",
                        transition: "all 0.2s ease",
                        "& fieldset": {
                            borderColor: "transparent",
                        },
                        "&:hover fieldset": {
                            borderColor: "#e7e5e4",
                        },
                        "&.Mui-focused": {
                            backgroundColor: "#ffffff",
                            "& fieldset": {
                                borderColor: "#6D141A",
                                borderWidth: "1.5px",
                            },
                        },
                    },
                    "& .MuiOutlinedInput-input": {
                        padding: "13px 14px",
                        color: "#1c1917",
                        "&::placeholder": {
                            color: "#a8a29e",
                            opacity: 1,
                        },
                    },
                    "& .MuiInputLabel-root": {
                        fontSize: "14px",
                        color: "#a8a29e",
                        "&.Mui-focused": { color: "#6D141A" },
                    },
                }}
            />

            {props.textType === pwdType && (
                <IconButton
                    onClick={() => setIsShowPwd(!isShowPwd)}
                    sx={{
                        position: "absolute",
                        right: "6px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#a8a29e",
                    }}
                >
                    {isShowPwd ? <VisibilityOutlinedIcon fontSize="small" /> : <VisibilityOffOutlinedIcon fontSize="small" />}
                </IconButton>
            )}
        </div>
    );
}
