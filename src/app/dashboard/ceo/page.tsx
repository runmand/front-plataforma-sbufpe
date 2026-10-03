'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { Button, CircularProgress } from '@mui/material';
import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index';
import FooterMain from '@components/footer/main/index';
import CeoDashboard from '@components/dashboard/ceo/index';
import { localStorageKeyEnum } from 'src/core/enums';

function subscribeToSession(onChange: () => void) {
    window.addEventListener('storage', onChange);
    window.addEventListener('focus', onChange);
    return () => {
        window.removeEventListener('storage', onChange);
        window.removeEventListener('focus', onChange);
    };
}

const getSession = () => !!localStorage.getItem(localStorageKeyEnum.TOKEN);
const getServerSession = (): null => null;

export default function Page() {
    const isLoggedIn = useSyncExternalStore(subscribeToSession, getSession, getServerSession);

    useEffect(() => {
        document.title = 'Dashboard CEO | GestBucal';
    }, []);

    return (
        <Base
            appBarChild={<NewMenu />}
            mainContainerChild={
                isLoggedIn ? (
                    <CeoDashboard />
                ) : (
                    <div style={{ minHeight: '60vh', padding: '100px 24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {isLoggedIn === null ? (
                            <CircularProgress sx={{ color: '#6D141A' }} aria-label="Verificando sessão" />
                        ) : (
                            <div style={{ textAlign: 'center', maxWidth: 480 }}>
                                <h1 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 28, color: '#1c1917' }}>Dashboard CEO</h1>
                                <p style={{ color: '#6b7280', margin: '16px 0 24px' }}>Entre na sua conta para consultar os dados do Dashboard CEO.</p>
                                <Button
                                    variant="contained"
                                    onClick={() => window.dispatchEvent(new CustomEvent('clickLoginEvent'))}
                                    sx={{ backgroundColor: '#6D141A', '&:hover': { backgroundColor: '#921c22' } }}
                                >
                                    Entrar na minha conta
                                </Button>
                            </div>
                        )}
                    </div>
                )
            }
            footerChild={<FooterMain />}
        />
    );
}
