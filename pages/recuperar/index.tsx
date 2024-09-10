import Base from '@components/base-layout/index';
import {Box, Button, InputLabel, TextField, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import AppBar from '@components/app-bar';
import { containerBodyTypeEnum, localStorageKeyEnum, routerEnum } from 'src/core/enums';
import IndexToolbar from '@components/toolbar/index';
import IndexToolbarMobile from '@components/toolbar/index-mobile'
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Index() {
  const [login, setLogin] = useState('');;
	const [isOpenLogin, setIsOpenLogin] = React.useState<boolean>(false);
	const [isOpenSignup, setIsOpenSignup] = React.useState<boolean>(false);
	const [containerBodyType, setContainerBodyType] = React.useState<string>(containerBodyTypeEnum.MAIN);
	const largeQuery = useMediaQuery('(min-width:720px)')
  const [viewportHeight, setViewportHeight] = React.useState<number>(0);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

	async function handleReset(login: string) {
		const http = axios.create({ baseURL: process.env.API_URL });
		return await http.post("/reset/", {login: login})
	}

  async function sendReset() {
    if(login.split('').length > 0){
      await handleReset(login).then(r => {   
        enqueueSnackbar(r.data.data.response, { variant: "success"});
      }).catch(r =>{
        enqueueSnackbar(r.response.data.errors[0].message, { variant: "error" });
      })
    }else{
      enqueueSnackbar("Preencha o campo de Login", { variant: "error" });
    }
  }

	const indexToolbarMenuList = [
		{
			title: 'Acervo',
			menuItems: [
				{
					title: 'Artigos',
					onClick: () => setContainerBodyType(containerBodyTypeEnum.COLLECTION),
				},
			],
		},
		{
			title: 'Quem Somos',
			menuItems: [
				{
					title: 'Quem somos?',
					onClick: () => setContainerBodyType(containerBodyTypeEnum.ABOUT_US),
				},
				{
					title: 'O que é GESTBUCAL SD?',
					onClick: () => setContainerBodyType(containerBodyTypeEnum.WHAT_IS),
				},
			],
		},
		{
			title: 'Contato',
			menuItems: [
				{
					title: 'Contato',
					onClick: () => setContainerBodyType(containerBodyTypeEnum.CONTACT_US),
				}
			]
		},
		{
			title: 'F.A.Q',
			menuItems: [
				{
					title: 'Perguntas Frequentes',
					onClick: () => setContainerBodyType(containerBodyTypeEnum.FAQ),
				},
			],
		},
		{
			title: 'NOSSOS DADOS SD',
			menuItems: [
				{
					title: 'USUÁRIOS',
					onClick: () => setContainerBodyType(containerBodyTypeEnum.USER_DATA),
				},
				{
					title: 'CEO',
					onClick: () => setContainerBodyType(containerBodyTypeEnum.CEO_DATA),
				},
				{
					title: 'APS',
					onClick: () => setContainerBodyType(containerBodyTypeEnum.APS_DATA),
				},
			],
		},
	];
	const items = [
		{
			subject: 'Novidades',
			subTitle: 'Questionários',
			description: 'Responda aos questionários de acordo com seu perfil e necessidade.',
			url: routerEnum.FORM

		},
		{
			subject: 'Referências',
			subTitle: 'Objetos de Estudos',
			description: 'Saiba quais referências foram utilizadas para a elaboração dos questionários disponíveis no projeto.',
			url: containerBodyTypeEnum.COLLECTION,
		},
		{
			subject: 'Contato',
			subTitle: 'Entre em contato conosco',
			description:
				'Tem dúvidas sobre o projeto, questionários, assuntos relacionados ou gostaria de contribuir? Acesse a página de contatos e nos mande suas dúvidas.',
			url: containerBodyTypeEnum.CONTACT_US,
		},
	];

	const handleShowPageByURL = (url: routerEnum | containerBodyTypeEnum) => {
		const isLogged = !!localStorage.getItem(localStorageKeyEnum.TOKEN);
		if (!isLogged && url == routerEnum.FORM) {
			setIsOpenLogin(true)
			return;
		}if (isLogged && url == routerEnum.FORM) {
			router.push(routerEnum.FORM)
			return;
		} else {
			setContainerBodyType(url) 
		}
	}
	const handleShowPageContact = () => {
		setContainerBodyType(containerBodyTypeEnum.CONTACT_US)
	}
	const handleShowTclePage = () =>{
		setContainerBodyType(containerBodyTypeEnum.TCLE)
	}

  useEffect(()=>{
		if(router.query.containerBody){
			setContainerBodyType(router.query.containerBody as string)
		}

	},[router])

	useEffect(()=>{
		setViewportHeight(window.innerHeight);
	}, [])
  
  return (
    <Base
    appBarChild={
      <AppBar
        toolbarChild={largeQuery ?
          <IndexToolbar
            onClickInitialButton={() => setContainerBodyType(containerBodyTypeEnum.MAIN)}
            openLoginModal={() => setIsOpenLogin(true)}
            openSignupModal={() => setIsOpenSignup(true)}
            menuList={indexToolbarMenuList}
          /> : <IndexToolbarMobile
          onClickInitialButton={() => setContainerBodyType(containerBodyTypeEnum.MAIN)}
          openLoginModal={() => setIsOpenLogin(true)}
          menuList={indexToolbarMenuList}
          />
        }
      />
    }
    mainContainerChild= {
      <Box
      style={{
        width: largeQuery ? '30vw' : '80vw',
        height: largeQuery ? "70vh": `${(viewportHeight * 0.8)}px`,
        backgroundColor: "#6D141A",
        margin: "auto",
        marginTop: largeQuery ? "20vh" : `${(viewportHeight *0.15)}px`,
        borderRadius: "20px",
        padding: "30px",
        display: "grid",
        boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)"
      }}>
        <Typography textAlign={"center"} width={"100%"} fontSize={"32pt"} color={"#ffffff"} margin={"auto"}>Recuperar Senha</Typography>

        <Box
          style={{
            width:'100%',
            margin: "auto",
            marginTop: "5vh",
            display: "grid",
          }}
        >
          <InputLabel style={{color:"#ffffff"}} >Digite seu login: </InputLabel>
          <TextField style={{color:"#ffffff", marginTop: "10px", backgroundColor: "#ffffff" , borderRadius: "5px",}} fullWidth value={login} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}/>
          <Button sx={{width: '120px', background: "#921c22", color:"#ffffff", margin: "auto", marginTop: "50px"}} onClick={sendReset}> Solicitar</Button>
        </Box>
        <Typography textAlign={"center"} width={"100%"} fontSize={"10pt"}  color={"#ffffff"} marginTop={"auto"}>OBS: Precisa ter um email cadastrado previamente, caso não tenha entre em contato conosco!!</Typography>
        </Box>}
      />

  );
	
}

