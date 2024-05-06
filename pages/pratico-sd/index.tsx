import Base from '@components/base-layout/index';
import Appbar from '@components/app-bar/index';
import HomeToolbar from '@components/toolbar/home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Teorico from '@components/praticoSD/teorico';
import { Autocomplete, Box, Button, Container, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { theme } from 'src/core/theme';


interface FilmOptionType {
  inputValue?: string;
  title: string;
  year?: number;
}

export default function Index() {
	const[page, setPage] = useState(0)
	
	function pageable(numPage: number, page: number) {
    if (numPage == page) {
      return false;
    } else {
      return true;
    }
  }

	return (
		<Base
			appBarChild={
				<Appbar 
					toolbarChild ={
						<HomeToolbar/>
					}
				/>}
			mainContainerChild ={
				<div
				style={{
					marginTop:'6rem'
				}}>
					<Box
						hidden={pageable(0,page)}
						sx={{
							display:'flex',
							flexDirection:'column',
							gap:'10px',
							margin:'3rem'
						}}>
						<Box
							
							sx={{
								display:'flex',
								flexDirection:'column',
								gap:'3rem'
							}}
							
						>
						<Typography
							sx={{
								textAlign:'center',
								color:theme.primaryColor
							}}
							variant='h3'
						>
							Olá Bem vindo(a) ao PlanejaSD-componente prático</Typography>
						<Typography>
							Vamos vivenciar o PLANEJAMENTO, entendendo-o como ação humana para REDUÇÃO DE INCERTEZAS E INTERVENÇÃO NA REALIDADE.
							Este módulo operativo é baseado numa adaptação do Planejamento Estratégico Situacional (PES). No final do seu uso, você terá um Plano de Ação em Saúde Bucal (PA-SB), que deve ser exequível ou possível à intervenção e consequentemente melhoria de qualidade da sua realidade.
						</Typography>
						</Box>


						<Typography
							sx={{
								textAlign:'center',
								color:theme.primaryColor
							}}
							variant='h6'
						>
							Vamos Começar?
						</Typography>
						<Typography>
						Um planejamento deve partir da análise do diagnóstico situacional local.Você tem disponibilizado em nossos dados SD/GestBucalSD as informações necessárias ao diagnóstico situacional dos módulos:<br></br>•	AvaliaAPS - avaliação dos serviços de saúde bucal da Atenção Primária em Saúde<br></br>•	AvaliaCEO - avaliação dos serviços de saúde bucal do Centro de Especialidades Odontológicas<br></br>•	Avalia-Satisfação dos Usuários – avaliação do grau de satisfação dos usuários<br></br>•	VigiaSD – perfil socioepidemiológico local <br></br>Obs: Na ausência de informações, provavelmente é porque o módulo não foi utilizado.
						</Typography>
						<Button color="success" variant="contained" endIcon={<ArrowForwardIcon />}
              onClick={() => {setPage(1)}}>Vamos começar?!</Button>


							
						
					</Box>

					<Box
						hidden={pageable(1,page)}
						sx={{marginX:'3rem'}}>
							<Typography variant='h6'>
								pagina2
							</Typography>
						<Typography
							sx={{
								textAlign:'center',
								color:theme.primaryColor
							}}
							variant='h6'
						>
							COMO SELECIONAR, PRIORIZAR E DEFINIR OS PROBLEMAS?
						</Typography>
							<Typography>
							As informações estão sistematizadas em Classificações dos Domínios de qualidade, contendo a frequência do cumprimento dos indicadores avaliativos. E os do VigiaSD, em indicadores socioepidemiológicos. Como o PA-SB deve intervir sobre problemas, recomenda-se a seleção de pelo menos:
							
						</Typography>
						
						<Typography>
						2 domínios<br></br>3 indicadores com as piores classificações dos módulos avaliativos.<br></br>2 indicadores do perfil socioepidemiológicos em piores condições.<br></br>Digite-os abaixo:
						</Typography>
						<Typography
							sx={{
								textAlign:'center',
								color:theme.primaryColor
							}}
						>
							Priorização/hierarquização dos problemas
						</Typography>
							<Typography>
							Para cada Domínio/indicador selecionado, pontue o grau de governabilidade, usando uma escala 0-10, onde 0 corresponde a nenhuma governabilidade e 10 a maior governabilidade sobre problema. Quanto maior o grau de governabilidade sobre o problema, mais viabilidade você /equipe terá para resolvê-lo.
							
						</Typography>
						
						<Typography>
						Definição do problema<br></br>Diante da técnica de priorização/hierarquização dos problemas, quais problemas foram definidos para a intervenção? Digite-os abaixo:
						</Typography>
						<TextField
						fullWidth>
						</TextField>
						<Typography>
						Reflita bem, você pode repetir a técnica de seleção e priorização, até chegar à definição do problema que seja exequível!!!
						</Typography>
						<Button sx={{backgroundColor:theme.secundaryColor}} variant="contained" startIcon={<ArrowBackIcon/>}
              onClick={() => {setPage(1)}}>Voltar</Button>
						<Button color="success" variant="contained" endIcon={<ArrowForwardIcon />}
              onClick={() => {setPage(2)}}>Avançar</Button>
							

							</Box>


							<Box
						hidden={pageable(2,page)}
						sx={{marginX:'3rem',
							textAlign:'justify'
						}}>
							<Typography
							variant='h6'
							sx={{
								textAlign:'center',
								color:theme.primaryColor
							}}>
							COMO EXPLICAR O PROBLEMA?
							</Typography>
						
						<Button sx={{backgroundColor:theme.secundaryColor}} variant="contained" startIcon={<ArrowBackIcon/>}
              onClick={() => {setPage(1)}}>Voltar</Button>
						<Button color="success" variant="contained" endIcon={<ArrowForwardIcon />}
              onClick={() => {setPage(3)}}>Avançar</Button>
							

							</Box>
							
				</div>
				
				}
		/>
	);
}