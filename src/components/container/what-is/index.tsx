import { Box, CardMedia, Grid, Typography } from "@mui/material";
import { theme } from "src/core/theme";

export default function Index(){
    return(
        <>
        <Box sx={{
            position: 'justify',
            bgcolor: theme.primaryColor,
            marginX: 'auto',
            maxWidth: '50rem',
            height: 'auto',
            marginTop: '6rem',
        }}
        >
            <Typography
                sx={{ padding: 2 }}
                textAlign={'center'}
                variant="h4"
                color={theme.white}
            >
                O que é GestBucal SD
            </Typography>
        </Box>
        
        <Box sx={{
            position: 'justify',
            bgcolor: theme.greyLight,
            marginX: 'auto',
            maxWidth: '50rem',
            height: 'auto',
            marginBottom: '1rem',
        }}
        >
            <Typography
                sx={{ padding: 1.5 }}
                textAlign={'center'}
                variant="body1"
                color={theme.black}
            >
                A plataforma GestBucalSD é uma ferramenta web-based de autoprocessamento de dados para monitorar e avaliar a saúde bucal.
            </Typography>
            <Typography
                sx={{ padding: 1.5 }}
                textAlign={'center'}
                variant="body1"
                color={theme.black}
            >
                Ela permite o processamento automático de dados coletados nas unidades de saúde, gerando informações úteis para monitorar e avaliar a situação da saúde bucal da população.
            </Typography>
            <Typography
                sx={{ padding: 1.5 }}
                textAlign={'center'}
                variant="body1"
                color={theme.black}
            >
                Com essa plataforma, os usuários podem acessar diferentes módulos operacionais que oferecem indicadores, gráficos, mapas e relatórios sobre a qualidade e a efetividade dos serviços de atenção em saúde bucal.
            </Typography>
            <Typography
                sx={{ padding: 1.5 }}
                textAlign={'center'}
                variant="body1"
                color={theme.black}
            >
                Assim, a GestBucalSD contribui para a governança inteligente e a melhoria contínua da rede de atenção em saúde bucal.
            </Typography>
        </Box>
        <Box sx={{
            position: 'justify',
            bgcolor: theme.primaryColor,
            marginX: 'auto',
            maxWidth: '50rem',
            height: 'auto',
        }}
        >
            <Typography
                sx={{ padding: 2 }}
                textAlign={'center'}
                variant="h4"
                color={theme.white}
            >
                Parceiros
            </Typography>
        </Box>

        <Box sx={{
            position: 'justify',
            bgcolor: theme.greyLight,
            marginX: 'auto',
            maxWidth: '50rem',
            height: 'auto',
            marginBottom: '1rem',
        }}
        >
            <Grid 
                container
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs>
                        <CardMedia
                            component="img"
                            image="https://i.imgur.com/cI60QB5.png"
                            alt="Logo SUS"
                            sx={{
                                marginLeft: '10px',
                                width: '90%',
                            }}
                        />
                </Grid>

                <Grid item xs>
                        <CardMedia
                            component="img"
                            image="https://i.imgur.com/5hxmD5z.png"
                            alt="Logo ABC"
                            sx={{
                                width: '80%',
                            }}
                        />

                </Grid>
                
                <Grid item xs>
                    <CardMedia
                        component="img"
                        image="https://i.imgur.com/9UbYlhV.png"
                        alt="Logo FACEPE"
                        sx={{
                            width: '80%',
                        }}
                    />
                </Grid>

            </Grid>

            <Grid 
                container
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs>
                    <CardMedia
                        component="img"
                        image="https://i.imgur.com/ZedrNah.png"
                        alt="Logo CNPq"
                        sx={{
                            marginLeft: '10px',
                            width: '80%',
                        }}
                    />
                </Grid>

                <Grid item xs>
                    <CardMedia
                        component="img"
                        image="https://i.imgur.com/Tshctlr.png"
                        alt="Logo Prefeitura do Recife"
                        sx={{
                            width: '80%',
                        }}
                    />
                </Grid>

                <Grid item xs>
                    <CardMedia
                        component="img"
                        image="https://i.imgur.com/B1VsMhf.png"
                        alt="Logo do Governo do Estado de Pernambuco"
                        sx={{
                            width: '80%',
                        }}
                    />
                </Grid>
            </Grid>

            <Grid 
                container
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs>

                </Grid>

                <Grid item xs>
                    <CardMedia
                        component="img"
                        image="https://i.imgur.com/Z1oobdG.png"
                        alt="Logo UFPE"
                        sx={{
                            width: '80%',
                            marginBottom: '1rem'
                        }}
                    />
                </Grid>

                <Grid item xs>

                </Grid>
            </Grid>
        </Box>

        <Box sx={{
            position: 'justify',
            bgcolor: theme.primaryColor,
            marginX: 'auto',
            maxWidth: '50rem',
            height: 'auto',
        }}
        >
            <Typography
                sx={{ padding: 2 }}
                textAlign={'center'}
                variant="h4"
                color={theme.white}
            >
                Números do GestBucal SD
            </Typography>
        </Box>
        <Box sx={{
            position: 'justify',
            bgcolor: theme.greyLight,
            marginX: 'auto',
            maxWidth: '50rem',
            height: 'auto',
            marginBottom: '1rem',
        }}
        >
            <Grid 
                container
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs>
                    <Typography
                        textAlign={'center'}
                        variant="h6"
                        color={theme.black}
                    >
                        42
                    </Typography>
                </Grid>

                <Grid item xs>
                    <Typography
                        textAlign={'center'}
                        variant="h6"
                        color={theme.black}
                    >
                        15
                    </Typography>
                </Grid>

                <Grid item xs>
                    <Typography
                        textAlign={'center'}
                        variant="h6"
                        color={theme.black}
                    >
                        256
                    </Typography>
                </Grid>
            </Grid>

            <Grid 
                container
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs>
                    <Typography
                        textAlign={'center'}
                        variant="h6"
                        color={theme.black}
                    >
                        Usuários Cadastrados
                    </Typography>
                </Grid>

                <Grid item xs>
                    <Typography
                        textAlign={'center'}
                        variant="h6"
                        color={theme.black}
                    >
                        Municípios Parceiros
                    </Typography>
                </Grid>

                <Grid item xs>
                <Typography
                    textAlign={'center'}
                    variant="h6"
                    color={theme.black}
                >
                    Artigos no Acervo
                </Typography>
                </Grid>
            </Grid>
        </Box>

        </>
    )
}