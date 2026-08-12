'use client';

import { useEffect, useState } from 'react';
import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index';
import FooterMain from '@components/footer/main/index';
import { localStorageKeyEnum } from 'src/core/enums';
import { Box, Typography, useMediaQuery } from '@mui/material';

const PUBLIC_URL =
    'https://app.powerbi.com/view?r=eyJrIjoiNmMxYTU1YzItYmM4YS00ZjY4LTlhOWItNjM4NWE2N2IxOGIxIiwidCI6ImE2NTk5NGY3LTU1MjgtNGE4NC1iODU3LWJmMDRlMDBjNGRhNCJ9';

const LOGGED_URL =
    'https://app.powerbi.com/view?r=eyJrIjoiN2Y1OWNkYWQtMTA3Zi00ZWQ3LWIzYjQtNWViZWRiMDU0NmQwIiwidCI6ImE2NTk5NGY3LTU1MjgtNGE4NC1iODU3LWJmMDRlMDBjNGRhNCJ9&pageName=ReportSection';

function ApsEmbed({ url, title }: { url: string; title: string }) {
    const isLarge = useMediaQuery('(min-width:720px)');

    return (
        <Box sx={{ marginTop: '84px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 8 }}>
            <Typography
                textAlign="center"
                fontSize={isLarge ? '28pt' : '18pt'}
                color="#6D141A"
                sx={{ py: 1 }}
            >
                {title}
            </Typography>
            <iframe
                title={title}
                style={{
                    width: '100%',
                    maxWidth: '1280px',
                    aspectRatio: '16 / 10',
                    display: 'block',
                    border: 'none',
                }}
                src={url}
                allow="fullscreen"
            />
        </Box>
    );
}

export default function Page() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        document.title = 'APS | GestBucal';
        setIsLoggedIn(!!localStorage.getItem(localStorageKeyEnum.TOKEN));
    }, []);

    return (
        <Base
            appBarChild={<NewMenu />}
            mainContainerChild={
                isLoggedIn === null
                    ? null
                    : isLoggedIn
                        ? <ApsEmbed url={LOGGED_URL} title="Dados APS" />
                        : <ApsEmbed url={PUBLIC_URL} title="Respondentes - APS" />
            }
            footerChild={<FooterMain />}
        />
    );
}
