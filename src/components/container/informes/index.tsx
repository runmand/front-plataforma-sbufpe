import { Box, Paper, Typography } from "@mui/material";
import { theme } from "src/core/theme";

export default function Index(){
  return(
    <Box
      sx={{
        minHeight:'56vh'
      }}>
        <Paper
          sx={{
            marginTop:'3rem',
            maxWidth:'50rem',
            height:'100%',
            marginX:'auto',
        }}
          variant="outlined" elevation={24}>
            <Typography
              variant="h4"
              sx={{
                padding:3,
                color:theme.primaryColor,
                textAlign:'center'
              }}
              >Informe - SBPE</Typography>
              <Box
                sx={{
                  padding:'1rem'
                }}>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'justify',
                  textIndent:'2rem',
                  paddingY:'1rem'
                  }}>
              O OSB/UFPE produz Boletins Técnicos com o objetivo de trazer informações sobre a saúde bucal da Pernambuco.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'justify',
                  textIndent:'2rem',
              }}>
              Um panorama estadual sobre os atendimentos da rede de atenção em saúde bucal da Atenção Primária e Secundária pode ser encontrado, o qual pode servir para análise e tomada de decisão. Informação para a Ação!
              </Typography>
              </Box>
              

        </Paper>

    </Box>
    )
  }