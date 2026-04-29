'use client';

import Base from '@components/base-layout/index';
import Appbar from '@components/app-bar/index';
import HomeToolbar from '@components/toolbar/home';
import { Button } from '@mui/material';
import { formButtonStyle, mainContainerStyle } from 'src/modules/form/style';
import Image from 'next/image';
import FormService from 'src/modules/form/service';
import React, { useEffect } from 'react';
import { INDEX_RES } from 'src/modules/form/type';
import { useSnackbar } from 'notistack';
import { ID } from 'src/core/types';
import { useRouter } from 'next/navigation';
import { localStorageKeyEnum, routerEnum } from 'src/core/enums';
import NotFound from '@components/not-found/index';

export default function Index() {
	const formService = new FormService();
	const { enqueueSnackbar } = useSnackbar();
	const router = useRouter();
	const [forms, setForms] = React.useState<INDEX_RES[]>([]);

	const handleSelectForm = (id: ID) => {
		router.push(`${routerEnum.FORM_ANSWER}?id=${id}`);
	};

	useEffect(() => {
		formService
			.index()
			.then(res => {
				if (!res.errors) {
					const data = res.data ?? [];
					const typeId = +(localStorage.getItem(localStorageKeyEnum.TYPE_ID) ?? 0);
					switch (typeId) {
						case 1:
						case 2:
							return setForms(data);
						case 3:
							return setForms(data.filter(form => form.id !== 2));
						case 4:
							return setForms(data.filter(form => form.id === 2));
					}
				} else {
					res.errors.forEach(error => enqueueSnackbar(error, { variant: 'error' }));
				}
			})
			.catch(e => {
				console.error(e);
				enqueueSnackbar('Ops! Algo deu errado...', { variant: 'error' });
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Base
			appBarChild={<Appbar toolbarChild={<HomeToolbar />} />}
			mainContainerChild={
				forms.length === 0 ? (
					<NotFound msg={'Nenhum questionário encontrado.'} />
				) : (
					<div style={mainContainerStyle}>
						{forms.map((v, i) => (
							<Button key={i} style={formButtonStyle} onClick={() => handleSelectForm(v.id)}>
								<div style={{ width: '100%' }}>
									<div style={{ width: '100%' }}>
										<Image src='/logo-odontology.png' alt='logo-odontology' width={160} height={100} />
									</div>
									{v.title}
								</div>
							</Button>
						))}
					</div>
				)
			}
		/>
	);
}
