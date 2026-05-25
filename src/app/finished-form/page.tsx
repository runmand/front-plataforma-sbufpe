'use client';

import { useEffect } from 'react';
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
                        marginY: '6rem',
                        display: 'flex',
                        marginX: 'auto',
                        flexDirection: 'column',
                        gap: '20px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingY: '50px',
                        paddingX: '40px',
                    }}
                >
                    <Typography textAlign={'center'} variant="h1" fontSize={40} sx={{ color: '#1b1b1b' }}>
                        Formulário Enviado! Obrigado.
                    </Typography>
                    <Image width={400} height={400} src={'/plan-finished-form.svg'} alt="" />
                    <Typography textAlign={'center'} variant="h3" fontSize={16} sx={{ color: '#1b1b1b97' }}>
                        Obs: Enviamos o certificado de conclusão para o email informado no formulario.
                    </Typography>

                    <Box display={'flex'} gap={5} justifyContent={'center'} alignItems={'center'}>
                        <Button href="/form" variant="contained">
                            Voltar ao inicio
                        </Button>
                    </Box>
                </Box>
            }
        />
    );
}
