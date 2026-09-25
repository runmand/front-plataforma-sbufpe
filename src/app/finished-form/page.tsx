'use client';

import React, { useEffect } from 'react';
import NewMenu from '@components/newMenu/index';
import Image from 'next/image';
import Base from '@components/base-layout/index';
import { Box, Button, Typography } from '@mui/material';

export default function Page() {
    useEffect(() => {
        document.title = 'Formulário Enviado | GestBucal';
    }, []);

    return (
        <Base
            appBarChild={<NewMenu />}
            mainContainerChild={
                <Box
                    sx={{
                        width: '100%',
                        boxSizing: 'border-box',
                        marginY: '6rem',
                        display: 'flex',
                        marginX: 'auto',
                        flexDirection: 'column',
                        gap: '20px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingY: { xs: '32px', sm: '50px' },
                        paddingX: { xs: '16px', sm: '40px' },
                    }}
                >
                    <Typography textAlign={'center'} variant="h1" sx={{ color: '#1b1b1b', fontSize: { xs: 32, sm: 40 }, overflowWrap: 'anywhere' }}>
                        Formulário Enviado! Obrigado.
                    </Typography>
                    <Image width={400} height={400} src={'/plan-finished-form.svg'} alt="" style={{ maxWidth: '100%', height: 'auto' }} />
                    <Typography textAlign={'center'} variant="h3" fontSize={16} sx={{ color: '#1b1b1b97' }}>
                        Obs: Enviamos o certificado de conclusão para o email informado no formulario.
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        flexWrap: 'wrap',
                        gap: { xs: 2, md: 5 },
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        '& > .MuiButton-root': { width: { xs: '100%', sm: 'auto' }, maxWidth: '100%', minHeight: 44 },
                    }}>
                        <Button href="/form" variant="contained">
                            Voltar ao inicio
                        </Button>
                    </Box>
                </Box>
            }
        />
    );
}
