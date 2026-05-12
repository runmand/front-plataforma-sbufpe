import type { ProviderContext, VariantType } from "notistack";

let snackbarRef: ProviderContext | null = null;

export const setSnackbarRef = (ref: ProviderContext) => {
    snackbarRef = ref;
};

export const showSnackbar = (message: string, variant: VariantType = "default") => {
    snackbarRef?.enqueueSnackbar(message, { variant });
};

export const showError = (message: string) => showSnackbar(message, "error");
export const showSuccess = (message: string) => showSnackbar(message, "success");
export const showWarning = (message: string) => showSnackbar(message, "warning");
export const showInfo = (message: string) => showSnackbar(message, "info");
