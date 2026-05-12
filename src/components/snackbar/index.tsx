import React, { forwardRef } from "react";
import { CustomContentProps, useSnackbar } from "notistack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CloseIcon from "@mui/icons-material/Close";

const variantConfig = {
    success: {
        icon: CheckCircleOutlineIcon,
        bar: "bg-[#15803d]",
        iconColor: "text-[#15803d]",
        bg: "bg-white",
    },
    error: {
        icon: ErrorOutlineIcon,
        bar: "bg-[#6D141A]",
        iconColor: "text-[#6D141A]",
        bg: "bg-white",
    },
    warning: {
        icon: WarningAmberIcon,
        bar: "bg-[#b45309]",
        iconColor: "text-[#b45309]",
        bg: "bg-white",
    },
    info: {
        icon: InfoOutlinedIcon,
        bar: "bg-[#1d4ed8]",
        iconColor: "text-[#1d4ed8]",
        bg: "bg-white",
    },
    default: {
        icon: InfoOutlinedIcon,
        bar: "bg-[#44403c]",
        iconColor: "text-[#44403c]",
        bg: "bg-white",
    },
};

const CustomSnackbar = forwardRef<HTMLDivElement, CustomContentProps>(
    ({ id, message, variant }, ref) => {
        const { closeSnackbar } = useSnackbar();
        const config = variantConfig[variant as keyof typeof variantConfig] ?? variantConfig.default;
        const Icon = config.icon;

        return (
            <div
                ref={ref}
                className={`relative flex items-start gap-3 ${config.bg} rounded-xl shadow-lg overflow-hidden min-w-[280px] max-w-[400px] pr-4 pl-4 py-3.5`}
                style={{ border: "1px solid #e7e5e4" }}
            >
                {/* colored left bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.bar} rounded-l-xl`} />

                {/* icon */}
                <div className={`mt-0.5 shrink-0 ${config.iconColor} ml-2`}>
                    <Icon fontSize="small" />
                </div>

                {/* message */}
                <p className="flex-1 text-sm text-[#1c1917] font-body leading-snug pt-0.5">{message}</p>

                {/* close */}
                <button
                    type="button"
                    onClick={() => closeSnackbar(id)}
                    style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
                    className="shrink-0 text-[#a8a29e] hover:text-[#1c1917] transition-colors mt-0.5"
                    aria-label="Fechar"
                >
                    <CloseIcon style={{ fontSize: 16 }} />
                </button>
            </div>
        );
    }
);

CustomSnackbar.displayName = "CustomSnackbar";

export default CustomSnackbar;
