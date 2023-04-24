import { Box, Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { theme } from 'src/core/theme';

export default function Index() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    function sendEmail(e: { preventDefault: () => void; }){
        e.preventDefault();
        alert("Teste")
    }

    return(
        <>
        <Box sx = {{
            position:'justify',
            bgcolor:theme.greyLight,
            margin: 'auto',
            width: '50%'
            }}>
                <Typography
                sx={{padding:2}}
                textAlign={'center'}
                variant= "h3"
                color={theme.primaryColor}
                >
                    Entre em Contato Conosco
                </Typography>

                <form onSubmit={sendEmail}>
                <Stack 
                spacing={6}
                margin='30px'
                >
                    <TextField 
                    required
                    id="" //Lembrar de colocar o id
                    label="Coloque seu nome aqui"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    sx={{
                        backgroundColor: theme.white
                    }}
                    />

                    <TextField
                    required
                    id="" // Lembrar de colocar o id
                    label="Digite um e-mail válido"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type = "email"
                    sx={{
                        backgroundColor: theme.white
                    }}
                    />
                    
                    <TextField
                    required
                    id="" // Lembrar de colocar o id
                    label="Mensagem"
                    multiline
                    rows={4}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    sx={{
                        backgroundColor: theme.white
                    }}
                    />

                    <Button href={`mailto:sbufpe@gmail.com?subject=Contato - ${name} (${email})&body=${message}`} variant="contained" type="submit"
                    sx={{
                        backgroundColor: theme.primaryColor
                    }}
                    >
                        Enviar
                    </Button>

                    </Stack>
                </form>

        </Box>
        </>

    );
}