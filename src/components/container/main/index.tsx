import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { containerBodyTypeEnum } from "src/core/enums";
import { theme } from "src/core/theme";



const items = [
  {
    img:'',
    subject: 'Novidades',
    subTitle: 'Questionários',
    description: 'Responda aos questionários de acordo com seu perfil e necessidade.',
    url:'' ,
  },
  {
    subject: 'Referências',
    subTitle: 'Objetos de Estudos',
    description: 'Saiba quais referências foram utilizadas para a elaboração dos questionários disponíveis no projeto.',
    url: containerBodyTypeEnum.REFERENCE,
  },
  {
    subject: 'Contato',
    subTitle: 'Entre em contato conosco',
    description:
      'Tem dúvidas sobre o projeto, questionários, assuntos relacionados ou gostaria de contrinuir? Acesse a página de contatos e nos mande suas dúvidas.',
    url: '/',
  },
]

export default function Index(){
  return(
    <>
      <Box
        sx={{
          width:1,
          minHeight:'56.5vh',
          padding:'30px'
        }}>
          <Grid
          container
          spacing={4}
          columns={{ xs: 4, md: 12 }}>
            <Grid 
            item
            xs={6}>
              <Box
              textAlign={'justify'}
              sx={{padding:'10px'}}>
              <Typography
              
                variant="body1"
                color={theme.primaryColor}>
                É desafio atual para a governança dos estabelecimentos públicos de saúde a tomada de decisão ágil e oportuna, pautada na evidência científica,possibilitando melhoria de qualidade e promoção de saúde no Sistema Único de Saúde (SUS). A gestão da informação em saúde e a inovação em saúde	digital podem ser solução.
              </Typography>
              <Typography
                variant="body1"
                color={theme.primaryColor}>
                O grupo de pesquisa GestBucal (CNPq), composto de pesquisadores,estudantes de graduação e pós-graduação, tem caráter multidisciplinar e intersetorial, tem operacionalizado através do Observatório de Saúde Bucal/UFPE projetos junto a rede de atenção em saúde bucal do SUS para amplificação da saúde digital.
              </Typography>
              <Typography
                variant="body1"
                color={theme.primaryColor}>
                Apresentamos, a plataforma GestBucalSD, que é uma ferramenta web-based de autoprocessamento de dados, a qual possui módulos operacionais para avaliação e vigilância em saúde bucal.
              </Typography>
              <Typography
                variant="body1"
                color={theme.primaryColor}>
                O seu uso possibilitará a governança inteligente e melhoria da qualidade dos estabelecimentos de saúde da rede de atenção em saúde bucal.
              </Typography>
              </Box>
            </Grid>
            <Grid
            item
            xs={6}>
              <Paper
              elevation={12}>
                <Carousel
									animation='fade'
									autoPlay={true}
									indicators={false}
									duration={150}
                  sx={{
                    backgroundColor:theme.greyLight

                  }}
									>
									{items.map((item, i) => (
										<Paper 
											key={i}
                      sx={{
                        display:'flex',
                        flexDirection:'column',
                        padding:'30px',
                        height:'300px'
                      }}>
													<Typography 
													variant='h4'
                          color={theme.primaryColor}
                          sx={{
                            padding:'5px',
                            textAlign:'justify',
                            alignContent:'center',
                          }}
													>
														{item.subject}
													</Typography>
													<Typography 
													variant='h4'
                          sx={{
                            padding:'5px',
                            textAlign:'justify',
                            alignContent:'center',
                            fontSize:'2.5rem'
                          }} 
													>
														{item.subTitle}
													</Typography>
													<Typography
                          sx={{
                            padding:'8px',
                            color:theme.secundaryColor,
                            textAlign:'justify',
                            alignItems:'center',
                            minHeight:'100px',
                          }}>
														{item.description}
													</Typography>
													<Button
                          sx={{
                            width:'120px',
                            color:theme.primaryColor,
                            border:`2px solid ${theme.secundaryColor}`
                          }}
                          // href={item.url}
                          >
														Saiba mais
													</Button>

										</Paper >
									))}
								</Carousel>
              </Paper>
            </Grid>

          </Grid>

      </Box>
    </>
  )
}