import { AppProps } from "next/app";
import React, { useEffect } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import "../styles/globals.css";
import "../src/css/index.css";
import "../src/css/login.css";
import "../src/css/register.css";
import "../src/css/table.css";
import "../src/css/sendData.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "src/core/theme";
import { setSnackbarRef } from "src/core/snackbar";
import CustomSnackbar from "src/components/snackbar";

function SnackbarConfigurator(): null {
    const ctx = useSnackbar();
    useEffect(() => {
        setSnackbarRef(ctx);
    }, [ctx]);
    return null;
}

//TODO: Deixar configuravel
export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider
                Components={{
                    default: CustomSnackbar,
                    success: CustomSnackbar,
                    error: CustomSnackbar,
                    warning: CustomSnackbar,
                    info: CustomSnackbar,
                }}
                preventDuplicate
                autoHideDuration={4000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <SnackbarConfigurator />
                <Component {...pageProps} />
            </SnackbarProvider>
        </ThemeProvider>
    );
}
