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

  useEffect(()=>{
		if(router.query.containerBody){
			setContainerBodyType(router.query.containerBody as string)
		}

	},[router])

	useEffect(()=>{
		setViewportHeight(window.innerHeight);
	}, [])
  
  return (
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
        </Box>
  );
	
}

