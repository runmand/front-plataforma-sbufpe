import {Box, Button, InputLabel, TextField, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { containerBodyTypeEnum, localStorageKeyEnum, routerEnum } from 'src/core/enums';
import axios from 'axios';

export default function Index() {
  const [pwd, setPwd] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');
  const router = useRouter();
	const [containerBodyType, setContainerBodyType] = React.useState<string>(containerBodyTypeEnum.MAIN);
	const largeQuery = useMediaQuery('(min-width:720px)')
	const [viewportHeight, setViewportHeight] = React.useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();
  
	async function handleResetConfirm(password: string, token: string){
		const http = axios.create({ baseURL: process.env.API_URL });
		return await http.post("/reset/execute", {password: password, token: token});
	}

  async function sendReset() {
    if(pwd.split('').length > 0 || pwdConfirm.split('').length > 0){
      if (pwd === pwdConfirm){
        await handleResetConfirm(pwd, router.query.token.toString()).then(r => {   
          enqueueSnackbar("Senha Trocada com sucesso", { variant: "success"});
          router.push("/")
        }).catch(r =>{
          enqueueSnackbar(r.response.data.errors[0].message, { variant: "error" });
        })
      }else{
        enqueueSnackbar("A Senha deve ser igual", { variant: "error" });
      }

    }else{
      enqueueSnackbar("Preencha os campos de senha", { variant: "error" });
    }
  }


	useEffect(()=>{
		setViewportHeight(window.innerHeight);
	}, [])

  useEffect(()=>{
		if(router.query.containerBody){
			setContainerBodyType(router.query.containerBody as string)
		}
	},[router])
  
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
        <Typography textAlign={"center"} width={"100%"} fontSize={"32pt"} color={"#ffffff"} margin={"auto"}>Redefinir senha</Typography>

        <Box
          style={{
            width:'100%',
            margin: "auto",
            marginTop: "5vh",
            display: "grid",
          }}
        >
          <InputLabel style={{color:"#ffffff" , marginTop: "10px",}} >Digite sua nova senha: </InputLabel>
          <TextField style={{color:"#ffffff", marginTop: "10px", backgroundColor: "#ffffff" , borderRadius: "5px",}} fullWidth value={pwd} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value)}/>
          <InputLabel style={{color:"#ffffff" , marginTop: "10px",}} >Confirme sua senha: </InputLabel>
          <TextField style={{color:"#ffffff", marginTop: "10px", backgroundColor: "#ffffff" , borderRadius: "5px",}} fullWidth value={pwdConfirm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPwdConfirm(e.target.value)}/>
          <Button sx={{width: '120px', background: "#921c22", color:"#ffffff", margin: "auto", marginTop: "50px"}} onClick={sendReset}> Alterar</Button>
        </Box>
      </Box>);
}

