import { Box, CardMedia, Grid, Link, Typography } from "@mui/material";
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
    }}>
      <Typography
        sx={{ padding: 2 }}
        textAlign={'center'}
        variant="h5"
        color={theme.white}
      >
        1. Como posso acessar a plataforma?
      </Typography>
    </Box>
    <Box sx={{
      position: 'justify',
      bgcolor: theme.greyLight,
      marginX: 'auto',
      maxWidth: '50rem',
      height: 'auto',
      marginBottom: '1rem',
    }}>
      <Typography
        sx={{ padding: 1.5 }}
        textAlign={'center'}
        variant="body1"
        color={theme.black}
      >
        A plataforma pode ser acessada através do link: <Link href="https://sdufpe.up.railway.app/">https://sdufpe.up.railway.app/</Link>  ou através do código QR apresentado abaixo, para tal, basta apontar a câmera do seu celular: 
      </Typography>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
      >
        <Grid item xs></Grid>
        <Grid item xs>
          <CardMedia
              component="img"
              image="https://i.imgur.com/RIRV5ir.png"
              alt="Código QR da plataforma"
              sx={{
                  width: '90%',
              }}
          />
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </Box>

    <Box sx={{
      position: 'justify',
      bgcolor: theme.primaryColor,
      marginX: 'auto',
      maxWidth: '50rem',
      height: 'auto',
    }}>
      <Typography
        sx={{ padding: 2 }}
        textAlign={'center'}
        variant="h5"
        color={theme.white}
      >
        2. Como posso realizar meu cadastro na plataforma?
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
        Primeiro clique em “ENTRAR” na plataforma: 
      </Typography>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
      >
        <Grid item xs></Grid>
        <Grid item xs></Grid>
        <Grid item xs></Grid>
        <Grid item xs>
          <CardMedia
                  component="img"
                  image="https://i.imgur.com/Xgdjlm0.png"
                  alt="Imagem do Botão de ENTRAR"
                  sx={{
                      width: '100%',
                  }}
          />
        </Grid>
        <Grid item xs></Grid>
        <Grid item xs></Grid>
        <Grid item xs></Grid>
      </Grid>
      <Typography
        sx={{ padding: 1.5 }}
        variant="body1"
        textAlign={'center'}
        color={theme.black}
      >
        Um modal se abrirá e você deve clicar em “CADASTRE-SE AGORA”:
      </Typography>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
      >
        <Grid item xs></Grid>
        <Grid item xs>
          <CardMedia
            component="img"
            image="https://i.imgur.com/COZX0Sz.png"
            alt="Imagem do Modal de ENTRAR"
            sx={{
                width: '100%',
                marginLeft: '1rem',
            }}
          />
        </Grid>
        <Grid item xs></Grid>
      </Grid>
      <Typography
        sx={{ padding: 1.5 }}
        textAlign={'center'}
        variant="body1"
        color={theme.black}
      >
        O Modal Atual irá mudar para este e você deve escolher uma das quatro opções de cadastro:<br/>
        - CPF;<br/>- Telefone;<br/>- e-mail;<br/>- username<br/>
      </Typography>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
      >
        <Grid item xs></Grid>
        <Grid item xs>
          <CardMedia
            component="img"
            image="https://i.imgur.com/BuGROFW.png"
            alt="Modal de Cadastro"
            sx={{
                width: '100%',
            }}
          />
        </Grid>
        <Grid item xs></Grid>
        </Grid>
      <Typography
        sx={{ padding: 1.5 }}
        textAlign={'center'}
        variant="body1"
        color={theme.black}
      >
        Para garantir que você lembre do seu login, sugerimos que você se cadastre utilizando o seu CPF;<br/><br/>
        Posteriormente, você terá que escolher seu tipo de usuário, e isso acontecerá clicando na caixa de seleção;<br/><br/>
        Para profissionais de saúde deve-se selecionar “Oral Health Professional” ou “Profissionais de Saúde”, a depender do idioma que estiver o seu navegador.<br/><br/>
        Posteriormente escolha uma senha e a confirme, se preferir, pode clicar no ícone do login ao lado para visualizar.<br/><br/>
        OBS: A senha deve conter 8 ou mais caracteres.<br/><br/>
        Ao clicar em confirmar você verá a mensagem “Registro feito com sucesso!” e já terá acesso à plataforma.<br/>
      </Typography>
    </Box>

    <Box sx={{
      position: 'justify',
      bgcolor: theme.primaryColor,
      marginX: 'auto',
      maxWidth: '50rem',
      height: 'auto',
    }}>
      <Typography
        sx={{ padding: 2 }}
        textAlign={'center'}
        variant="h5"
        color={theme.white}
      >
        3. Como posso realizar login na plataforma?
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
        variant="body1"
        textAlign={'center'}
        color={theme.black}
      >
        Primeiro, deve-se clicar em ENTRAR na barra superior: 
      </Typography>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
      >
        <Grid item xs></Grid>
        <Grid item xs></Grid>
        <Grid item xs></Grid>
        <Grid item xs>
          <CardMedia
                  component="img"
                  image="https://i.imgur.com/Xgdjlm0.png"
                  alt="Imagem do Botão de ENTRAR"
                  sx={{
                      width: '100%',
                  }}
            />
        </Grid>
        <Grid item xs></Grid>
        <Grid item xs></Grid>
        <Grid item xs></Grid>
      </Grid>
      <Typography
        sx={{ padding: 1.5 }}
        variant="body1"
        textAlign={'center'}
        color={theme.black}
      >
        Um modal se abrirá e você deverá selecionar o tipo de Login que foi selecionado no momento do cadastro, bem como, a senha que você inseriu anteriormente.      
      </Typography>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
      >
        <Grid item xs></Grid>
        <Grid item xs>
        <CardMedia
                component="img"
                image="https://i.imgur.com/nq0ndHl.png"
                alt="Modal do LOGIN"
                sx={{
                    width: '100%',
                }}
            />
        </Grid>
        <Grid item xs></Grid>
      </Grid>
      <Typography>⠀⠀⠀⠀⠀⠀⠀⠀⠀</Typography>
    </Box>

    <Box sx={{
      position: 'justify',
      bgcolor: theme.primaryColor,
      marginX: 'auto',
      maxWidth: '50rem',
      height: 'auto',
    }}>
      <Typography
        sx={{ padding: 2 }}
        textAlign={'center'}
        variant="h5"
        color={theme.white}
      >
        4. O que posso fazer se esqueci meu Login e/ou a minha senha?
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
        variant="body1"
        textAlign={'center'}
        color={theme.black}
      >
      Estamos instalando um modelo de recuperação de senha, bem como, uma página de Contato onde os usuários poderão solicitar a mudança de senha, porém, por enquanto você pode fazer a solicitação de nova senha e/ou do seu login, para tal envie:<br/>
      <br/>Nome completo<br/>CPF<br/>E-mail<br/>Senha desejada<br/><br/>Para o e-mail: sbufpe@gmail.com<br/>
      </Typography>
    </Box>
    <Box sx={{
      position: 'justify',
      bgcolor: theme.primaryColor,
      marginX: 'auto',
      maxWidth: '50rem',
      height: 'auto',
    }}>
      <Typography
        sx={{ padding: 2 }}
        textAlign={'center'}
        variant="h5"
        color={theme.white}
      >
        5. Qual questionário devo responder primeiro?
      </Typography>
    </Box>
    <Box sx={{
      position: 'justify',
      bgcolor: theme.greyLight,
      marginX: 'auto',
      maxWidth: '50rem',
      height: 'auto',
      marginBottom: '1rem',
    }}>
      <Typography
        sx={{ padding: 1.5 }}
        textAlign={'center'}
        variant="body1"
        color={theme.black}
      >
        Para profissionais, o primeiro questionário a ser respondido é o Inicial ou Prévio, que está disponível através do QR Code:<br/>
      </Typography>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
      >
        <Grid item xs></Grid>
        <Grid item xs>
          <CardMedia
              component="img"
              image="https://i.imgur.com/BJdeiKe.jpg"
              alt="Código QR da plataforma"
              sx={{
                  width: '90%',
              }}
          />
        </Grid>
        <Grid item xs></Grid>
      </Grid>
      <Typography
        sx={{ padding: 1.5 }}
        textAlign={'center'}
        variant="body1"
        color={theme.black}
      >
        O questionário prévio também está disponível na plataforma, porém, se já foi respondido na reunião de implantação não precisa ser respondido novamente: 
      </Typography>
      <CardMedia
        component="img"
        image="https://i.imgur.com/O4Hne6q.jpg"
        alt="Tela Pós Login"
        sx={{
            width: '100%',
        }}
      />
      <Typography>⠀⠀⠀⠀⠀⠀⠀⠀⠀</Typography>
    </Box>

    <Box sx={{
      position: 'justify',
      bgcolor: theme.primaryColor,
      marginX: 'auto',
      maxWidth: '50rem',
      height: 'auto',
    }}>
      <Typography
        sx={{ padding: 2 }}
        textAlign={'center'}
        variant="h5"
        color={theme.white}
      >
        6. Como posso responder os questionários?
      </Typography>
    </Box>
    <Box sx={{
      position: 'justify',
      bgcolor: theme.greyLight,
      marginX: 'auto',
      maxWidth: '50rem',
      height: 'auto',
      marginBottom: '1rem',
    }}>
      <Typography
        sx={{ padding: 1.5 }}
        textAlign={'center'}
        variant="body1"
        color={theme.black}
      >
        Após o Login você estará na página inicial, ela dependerá do tipo de sua conta:<br/><br/>
        Caso você seja um Profissional da área de Saúde, essa tela será exibida:
      </Typography>
        <CardMedia
            component="img"
            image="https://i.imgur.com/ek0PSoN.png"
            alt="Tela dos Questionários"
            sx={{
                width: '100%',
            }}
        />
        <Typography
          sx={{ padding: 1.5 }}
          textAlign={'center'}
          variant="body1"
          color={theme.black}
        >
          <br/>Caso você seja um Usuário, essa tela será exibida:
        </Typography>
        <CardMedia
            component="img"
            image="https://i.imgur.com/5aXyov7.png"
            alt="Tela dos Questionários"
            sx={{
                width: '100%',
            }}
        />
        <Typography><br/></Typography>
    </Box>

    <Box sx={{
      position: 'justify',
      bgcolor: theme.primaryColor,
      marginX: 'auto',
      maxWidth: '50rem',
      height: 'auto',
    }}>
      <Typography
        sx={{ padding: 2 }}
        textAlign={'center'}
        variant="h5"
        color={theme.white}
      >
        7. Como posso ver as respostas do meu questionário?
      </Typography>
    </Box>
    <Box sx={{
      position: 'justify',
      bgcolor: theme.greyLight,
      marginX: 'auto',
      maxWidth: '50rem',
      height: 'auto',
      marginBottom: '1rem',
    }}>
      <Typography
        sx={{ padding: 1.5 }}
        textAlign={'center'}
        variant="body1"
        color={theme.black}
      >
        Após responder o questionário clique em ENVIAR, Recomendamos que você BAIXE O PDF e depois CONFIRME:
      </Typography>
        <CardMedia
              component="img"
              image="https://i.imgur.com/3Id4px3.png"
              alt="Modal dos Resultados"
              sx={{
                  width: '100%',
              }}
          />
      <Typography>⠀⠀⠀⠀⠀⠀⠀⠀⠀</Typography>
    </Box>
    </>
  )
}