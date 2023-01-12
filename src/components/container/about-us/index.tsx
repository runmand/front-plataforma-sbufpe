/* eslint-disable @next/next/no-img-element */
import { ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import { iconStyle, mainContainerStyle, photoBarStyle, photoCardStyle, photoContainerStyle, titleStyle } from './style';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Index() {
	//TODO: Remover esse hard code.
	//TODO: Criar constantes para as keys dos contatos.
	const people = [
		{
			name: 'Marcelo Dias',
			role: 'CEO',
			photo:
				'https://media.licdn.com/dms/image/C4E03AQH3LX5g6TUn2A/profile-displayphoto-shrink_800_800/0/1629766160330?e=1678924800&v=beta&t=eSp9lZEfvHe-ZWKTXzsaoGQrdcaXXPGEYkc9iC9TqxA',
			contacts: [
				{
					id: 'linked-in',
					title: 'LinkedIn',
					url: 'https://www.linkedin.com/in/marcelo-dias-979003210/',
				},
			],
		},
		{
			name: 'Amanda Chaves',
			role: 'Pesquisadora',
			photo: 'http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8578676E7',
			contacts: [
				{
					id: 'linked-in',
					title: 'LinkedIn',
					url: 'https://www.linkedin.com/in/runmand/',
				},
				{
					id: 'cnpq',
					title: 'CNPq',
					url: 'http://lattes.cnpq.br/1330785215225954',
				},
			],
		},
		{
			name: 'Nilcema Figueiredo',
			role: 'Professora-pesquisadora UFPE',
			photo: 'http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4775310D8',
			contacts: [
				{
					id: 'linked-in',
					title: 'LinkedIn',
					url: 'https://www.linkedin.com/in/nilcema-figueiredo-3776a6240/',
				},
				{
					id: 'cnpq',
					title: 'CNPq',
					url: 'http://lattes.cnpq.br/6330860061557574',
				},
			],
		},
		{
			name: 'Danilo Almeida',
			role: 'Sanitarista - Pesquisador',
			photo:
				'https://media.licdn.com/dms/image/C4D03AQGFR-Hlri_dHw/profile-displayphoto-shrink_800_800/0/1645582308487?e=1678924800&v=beta&t=w4R45ItSQgxILDg4gzYSMFNQUPtUcE3OG6sPsFWcI-0',
			contacts: [
				{
					id: 'linked-in',
					title: 'LinkedIn',
					url: 'https://www.linkedin.com/in/danilo-almeida-25b952109/',
				},
			],
		},
		{
			name: 'Giovanna Tarquinio',
			role: 'Estudante',
			photo:
				'https://lh3.googleusercontent.com/QngEGRM4j1Bp64FKJXR-AsVZhFtIiEtgBj6kCYn6C2x6FRmZDc0RStIoyIERmZQ0k8Ppv6j2PwgDEJHgfvB3cFyqh-b_h1IcyDRm9zkgJOqy9aDe2jA45xoNpRFRvWBfNklmTvFX=w2400',
			contacts: [
				{
					id: 'cnpq',
					title: 'CNPq',
					url: 'http://lattes.cnpq.br/6729363004080110',
				},
			],
		},
		{
			name: 'Stephany Carvalho',
			role: 'Estudante',
			photo:
				'https://lh3.googleusercontent.com/LuXcfPpG4FcdygDsEzIh6NJSh_nWQ9bFXqgE3Rd3o5VYuwMjyG6G57WVJmy9E9QhG2Xb8CdZwdbvSycp9qvw6lhnMH6XFWM2PuN393so9SqEz-ZECdYbspRdTKyNOWwfRX4-O4fX=w2400',
			contacts: [
				{
					id: 'linked-in',
					title: 'LinkedIn',
					url: 'https://www.linkedin.com/in/stephany-carvalho/',
				},
				{
					id: 'cnpq',
					title: 'CNPq',
					url: 'http://lattes.cnpq.br/6759587473072785',
				},
			],
		},
	];

	return (
		<div style={mainContainerStyle}>
			<Typography
				variant='h2'
				style={titleStyle}
			>
				Nossa equipe
			</Typography>

			<div style={photoContainerStyle}>
				{people.map((item, index) => (
					<ImageListItem
						key={index}
						style={photoCardStyle}
					>
						<img
							src={item.photo}
							srcSet={item.photo}
							alt={item.photo}
							loading='eager'
						/>

						<ImageListItemBar
							title={item.name}
							subtitle={item.role}
							style={photoBarStyle}
							actionIcon={
								<div>
									{(() => {
										let linkedInObj = item.contacts.filter(item => item.id === 'linked-in')[0];

										if (linkedInObj) {
											return (
												<LinkedInIcon
													color='primary'
													style={iconStyle}
													onClick={() => window.open(linkedInObj.url, '_blank')}
												/>
											);
										}
									})()}
									{(() => {
										let cnpq = item.contacts.filter(item => item.id === 'cnpq')[0];

										if (cnpq) {
											return (
												<AccountCircleIcon
													color='primary'
													style={iconStyle}
													onClick={() => window.open(cnpq.url, '_blank')}
												/>
											);
										}
									})()}
								</div>
							}
						/>
					</ImageListItem>
				))}
			</div>
		</div>
	);
}
