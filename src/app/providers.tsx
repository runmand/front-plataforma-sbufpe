'use client';

import React, { useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'src/core/theme';
import { setSnackbarRef } from 'src/core/snackbar';
import CustomSnackbar from 'src/components/snackbar';
import CensoConsentModal from '@components/modal/censo-consent';

function SnackbarConfigurator(): null {
    const ctx = useSnackbar();
    useEffect(() => {
        setSnackbarRef(ctx);
    }, [ctx]);
    return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
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
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <SnackbarConfigurator />
                <CensoConsentModal />
                {children}
            </SnackbarProvider>
        </ThemeProvider>
    );
}
