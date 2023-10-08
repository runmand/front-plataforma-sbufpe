import Base from '@components/base-layout/index';
import Appbar from '@components/app-bar/index';
import HomeToolbar from '@components/toolbar/home';
import { Button } from '@mui/material';
import { formButtonStyle, mainContainerStyle } from '../../src/pages/form/style';
import Image from 'next/image';
import FormService from '../../src/pages/form/service';
import React, { useEffect } from 'react';
import { INDEX_RES } from '../../src/pages/form/type';
import { useSnackbar } from 'notistack';
import { ID } from 'src/core/types';
import router from 'next/router';
import { localStorageKeyEnum, routerEnum } from 'src/core/enums';
import NotFound from '@components/not-found/index';
import { http } from 'src/core/axios';

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
								return setForms(res.data.filter(form => form.id !== 2 && form.id !==4))
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
						<div style={mainContainerStyle}>
							{forms.map((v, i) => (
								<Button
									key={i}
									style={formButtonStyle}
									onClick={() => handleSelectForm(v.id)}
								>
									<div style={{ width: '100%' }}>
										<div style={{ width: '100%' }}>
											<Image
												src='/logo-odontology.png'
												alt='logo-odontology'
												width={'160%'}
												height={'100rem'}
											/>
										</div>
										{v.title}
									</div>
								</Button>
							))}
						</div>
					)
				) : (
					<div></div>
				)
			}
		/>
	);
}
