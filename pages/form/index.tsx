import Base from '@components/base-layout/index';
import Appbar from '@components/app-bar/index';
import HomeToolbar from '@components/toolbar/home';
import { Box, Button, Divider, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Image from 'next/image';
import FormService from '../../src/pages/form/service';
import React, { useEffect } from 'react';
import { INDEX_RES } from '../../src/pages/form/type';
import { useSnackbar } from 'notistack';
import { ID } from 'src/core/types';
import router from 'next/router';
import { localStorageKeyEnum, routerEnum } from 'src/core/enums';
import NotFound from '@components/not-found/index';
import { theme } from 'src/core/theme';
import VisibilityIcon from '@mui/icons-material/Visibility';


export default function Index() {
	const formService = new FormService();
	const { enqueueSnackbar } = useSnackbar();
	const [forms, setForms] = React.useState<INDEX_RES[]>();

	const handleSelectForm = (id: ID) => {
		router.push({ pathname: routerEnum.FORM_ANSWER, query: { id } });
	};

	useEffect(() => {
		formService
			.index()
			.then(res => {
				if (!res.errors) {
					//Verificar qual o tipo de usuário está logado
					const typeId = +localStorage.getItem(localStorageKeyEnum.TYPE_ID)
					
					switch(typeId){
						case 1:
							return setForms(res.data);
							case 2:
								return setForms(res.data);
							case 3:
								return setForms(res.data.filter(form => form.id !== 2))
							case 4:
								return setForms(res.data.filter(form => form.id === 2))
					}					
				} else {
					res.errors.forEach(error => enqueueSnackbar(error, { variant: 'error' }));
				}
			})
			.catch(e => {
				console.error(e);
				enqueueSnackbar('Ops! Algo deu errado...', { variant: 'error' }); //TODO: Tratar essa exception
			});
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
								width:1,
								height:'100vh',
								display:'flex',
								alignItems:'center',
								justifyContent:'center',
								gap:'10px',
								flexWrap:'wrap',
								backgroundColor:theme.greyLight
								
							}}>
								<Paper elevation={3}
								sx={{
									marginTop:'5%',
									width:'80%',
									height:'80%',
									display:'flex',
									flexDirection:'column',
									alignItems:'center',
									justifyContent:'center',
								}}>
									<Box component="span"
									sx={{
										display:'flex',
										flexDirection:'column',
										alignContent:'center',
										justifyContent:'center',
										margin:'5%',
										gap:'20px'
									}}>
									<Typography variant='h5'
									sx={{
										textAlign:'center',
										color:theme.primaryColor
									}}>
										Questionario
									</Typography>
									<Typography
									sx={{textAlign:'justify'}}>
										Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, officiis vitae. Iure commodi autem eum voluptatem aut quas quidem, error voluptatum nulla sunt dolor possimus? Nihil repellendus inventore consectetur sit?
										Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem debitis praesentium quos tempora repudiandae iure sint quasi sequi officia, quae repellat odio non dolores ullam iste fugiat laudantium saepe earum?Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi dolorum provident rem aperiam sapiente at delectus amet asperiores incidunt nihil, impedit consectetur, molestiae doloribus dicta! Illum fuga dolore fugit consequatur.
									</Typography>
									</Box>
									<Box component="span"
									sx={{
										display:'flex',
										flexDirection:'column',
										alignContent:'center',
										justifyContent:'center',
										margin:'5%',
										gap:'20px'
									}}>
										<TableContainer component={Paper}>
              				<Table
											sx={{minWidth:'80%'}}
												size="small" 
												aria-label="a dense table">
                  			<TableHead>
                    			<TableRow>
                      			<TableCell align="center">Titulo</TableCell>
                      			<TableCell align="center">Arquivo</TableCell>
                    			</TableRow>
                  			</TableHead>
                  			<TableBody>
                    			{forms.map((v,i) => (
                      		<TableRow
                        		key={i}
                        		sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      		>

                        <TableCell align="center">{v.title}</TableCell>
                        <TableCell align="center" >
                          <Button
													onClick={()=> handleSelectForm(v.id)}>
														<VisibilityIcon></VisibilityIcon>
													</Button>
                          </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
									</Box>
									

									
								</Paper>
							{/* {forms.map((v, i) => (
								<Button
									key={i}
									variant='contained'
									sx={{
										width:'200px',
										minHeight:'200px',
										background:theme.primaryColor,
										border:'solid',
										fontWeight: 'bold',
										flexWrap:'wrap',
										":hover"
										:{background:theme.secundaryColor}
										
									}}
									// style={formButtonStyle}
									onClick={() => handleSelectForm(v.id)}
								>
									
									<div style={{ width: '100%' }}>
										<div style={{ width: '100%' }}>
											<Image
												src='/card-form/user.png'
												alt='logo-odontology'
												width={'100%'}
												height={'100rem'}
												color='white'
											/>
										</div>

										{v.title}
									</div>
								</Button>
							))} */}
						</Box>
					)
				) : (
					<div></div>
				)
			}
		/>
	);
}
