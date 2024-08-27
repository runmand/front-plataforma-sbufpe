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
					console.log(typeId)
					switch(typeId){
						case 1:
							return setForms(res.data);
							case 2:
								return setForms(res.data
									.filter(form => form.id !== 6));
							case 3:
								return setForms(res.data
									.filter(form => form.id !== 2  && form.id !== 5 && form.id !== 6 && form.id !== 7 && form.id !== 8))
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
      mainContainerChild= {
      <Box
      style={{
        marginTop: "12vh",
        width:'100%',
        height: "85vh"
      }}>
        <Typography textAlign={"center"} fontSize={"32pt"} color={"#6D141A"} margin={"auto"}>CEO</Typography>
        <iframe
          title="Ceo data analytics"
          style={{
            minHeight:'600px',
            background: "red",
            width:'100%'}}   
          src="https://app.powerbi.com/view?r=eyJrIjoiZjcxYTJhMTctOWQ5Mi00NDNjLWFiYzAtZjZmZGU1ODEyMzUxIiwidCI6ImE2NTk5NGY3LTU1MjgtNGE4NC1iODU3LWJmMDRlMDBjNGRhNCJ9"></iframe>
      </Box>}
      />
  );
}

