import Base from '@components/base-layout/index';
import Appbar from '@components/app-bar/index';
import HomeToolbar from '@components/toolbar/home';
import { Avatar, Box, Button, Typography } from '@mui/material';
import FormService from '../../src/pages/form/service';
import React, { useEffect } from 'react';
import { INDEX_RES } from '../../src/pages/form/type';
import { useSnackbar } from 'notistack';
import { ID } from 'src/core/types';
import router from 'next/router';
import { localStorageKeyEnum, routerEnum } from 'src/core/enums';
import NotFound from '@components/not-found/index';
import { theme } from 'src/core/theme';
import FormAnswerService from 'src/pages/form-answer/service';

export default function Index() {
	const formService = new FormService();
	const formAnwerService = new FormAnswerService();

	const { enqueueSnackbar } = useSnackbar();
	const [forms, setForms] = React.useState<INDEX_RES[]>();
	const handleSelectForm = (id: ID) => {
		router.push({ pathname: routerEnum.FORM_ANSWER, query: { id } });
	};

	async function getFormResult(){
		try{
			
			const {data:formResult} = await formAnwerService.getFormattedFormShow(3)
			console.log(formResult)
		
		}catch(err:any){
			console.error(err)
		}
	}
	

	useEffect(() => {
		getFormResult()


		formService
			.index()
			.then(res => {
				if (!res.errors) {
					const typeId = +localStorage.getItem(localStorageKeyEnum.TYPE_ID)
					switch(typeId){
						case 1:
							console.log(forms)
							return setForms(res.data);
							case 2:
								return setForms(res.data);
							case 3:
								return setForms(res.data
									.filter(form => form.id !== 2 && form.id !== 4 && form.id !== 5))
							case 4:
								return setForms(res.data
									.filter(form => form.id === 2))
					}
				} else {
					res.errors.forEach(error => enqueueSnackbar(error, { variant: 'error' }));
				}
			})
			.catch(e => {
				console.error(e);
				enqueueSnackbar('Ops! Algo deu errado...', { variant: 'error' }); //TODO: Tratar essa exception
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Base
			appBarChild={<Appbar toolbarChild={<HomeToolbar />} />}
			mainContainerChild={
				forms ? (
					forms.length === 0 ? (
						<NotFound msg={'Nenhum questionário encontrado.'} />
					) : (
						<Box
							sx={{
								marginY:{xs:'10rem',sm:'7rem' },
								marginX:{xs:'1rem', sm:'2rem'},
								minHeight:{xs:'500px', sm:'500px'},
								minWidth:{xs:'80%'},
								background:theme.greyLight,
								display:'flex',
								flexDirection:'column',
								alignItems:'center',
								overflow:'unset'
						}}>
							<Typography
								sx={{
									fontSize:{xs:'h5.fontSize',md:'h4.fontSize'},
									fontWeight:'bold'
								}}>
								Questionário Avaliativo
							</Typography>
							<Box
								sx={{
									paddingTop:'4rem',
									display:'flex',
									alignItems:'center',
									gap:'20px',
									justifyContent:'center',
									flexWrap:'wrap',
								}}>
								{forms.map((v, i) => (
									<Button
									key={i}
									sx={{
										backgroundColor:theme.primaryColor,
										color:theme.white,
										width:{xs:'100%',sm: '350px'},
										height:'200px',
										borderWidth:'0.5rem',
										borderColor:theme.secundaryColor,
										display:'flex',
										flexDirection:'column',
										gap:'10px',
										fontWeight:'bold',
										'&:hover':{
											backgroundColor:theme.secundaryColor,
										}
									}}
									onClick={() => handleSelectForm(v.id)}
								>
									<Avatar 
										alt="Logo de Odontologia"
										src="/logo-transparent.png"
										sx={{ width:'56', height: '56' }}/>
									{v.title}
									<>
									</>
								</Button>							
							))}
							</Box>
						</Box>
						
					)
				) : (
					<div></div>
				)
			}
		/>
	);
}
