import { Padding } from "@mui/icons-material";
import { Box, Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { theme } from 'src/core/theme';

export default function Index() {
    const [name, setName] = useState('');
    const [assunto, setAssunto] = useState('');
    const [message, setMessage] = useState('');

    function sendEmail(e: { preventDefault: () => void; }) {
        e.preventDefault();

    }

    return (
        <>
            <Box sx={{
                position: 'justify',
                bgcolor: theme.greyLight,
                marginX: 'auto',
                marginY: '1rem',
                maxWidth: '50rem',
                height: 'auto',
                padding:'1rem'
            }}>
                <Typography
                    sx={{ padding: 2 }}
                    textAlign={'center'}
                    variant="h3"
                    color={theme.primaryColor}
                >
                    Entre em Contato Conosco
                </Typography>
                <form onSubmit={sendEmail}>
                    <Stack
                        spacing={6}
                        margin='2rem'
                    >
                        <TextField
                            required
                            label="Digite seu nome aqui"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            sx={{
                                backgroundColor: theme.white
                            }}
                        />
                        <TextField
                            required
                            label="Digite o motivo do contato"
                            onChange={(e) => setAssunto(e.target.value)}
                            value={assunto}
                            type="email"
                            sx={{
                                backgroundColor: theme.white
                            }}
                        />
                        <TextField
                            required
                            label="Insira sua mensagem aqui"
                            multiline
                            rows={4}
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            sx={{
                                backgroundColor: theme.white
                            }}
                        />
                        <Button 
                            variant="contained"
                            sx={{
                                background:theme.primaryColor,
                                '&:hover':{
                                    background:theme.secundaryColor,
                                },
                                padding:1,
                                margin:1,
                            }}
                            href={`mailto:sbufpe@gmail.com?subject=Assunto - ${assunto} (De - ${name})&body=${message}`}
                            >Enviar</Button>
                    </Stack>
                </form>
            </Box>
        </>

    );
}




