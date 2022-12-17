import Base from '@components/base-layout/index';
import Appbar from '@components/app-bar/index';
import HomeToolbar from '@components/toolbar/home';
import { Button } from '@mui/material';
import { formButtonStyle, mainContainerStyle } from './style';
import Image from 'next/image';
import FormService from './service';
import React from 'react';
import { INDEX_RES } from './contract';
import { useSnackbar } from 'notistack';

export default function Index() {
	const formService = new FormService();
	const { enqueueSnackbar } = useSnackbar();
	const [forms, setForms] = React.useState<INDEX_RES[]>();

	formService
		.index()
		.then(res => {
			if (!res.errors) {
				setForms(res.data);
			} else {
				res.errors.forEach(error => enqueueSnackbar(error, { variant: 'error' }));
			}
		})
		.catch(e => {
			console.error(e);
			enqueueSnackbar('Ops! Algo deu errado...', { variant: 'error' });
		});

	return (
		<div>
			<Base
				appBarChild={<Appbar toolbarChild={<HomeToolbar />} />}
				mainContainerChild={
					<div style={mainContainerStyle}>
						{forms?.length > 0 ? (
							forms.map((v, i) => (
								<Button
									key={i}
									style={formButtonStyle}
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
							))
						) : (
							<h1>Nenhum dado encontrado.</h1>
						)}
					</div>
				}
			/>
		</div>
	);
}
