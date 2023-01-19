import React from 'react';
import Base from '@components/base-layout';
import AppBar from '@components/app-bar';
import FooterMain from '@components/footer/main/index';
import LoginModal from '@components/modal/log-in/index';
import SignupModal from '@components/modal/sign-up/index';
import IndexToolbar from '@components/toolbar/index';
import { Button, List, ListItem, ListItemButton, Paper, Typography } from '@mui/material';
import { theme } from 'src/core/theme';
import { carouselStyle, infoStyle, listItemStyle, listStyle, listTitleStyle } from '../src/pages/style';
import Carousel from 'react-material-ui-carousel';
import Image from 'next/image';
import AboutUsContainer from '@components/container/about-us';
import { containerBodyTypeEnum } from 'src/core/enums';

//TODO: Estilizar melhor o carrosel
export default function Index() {
	const [isOpenLogin, setIsOpenLogin] = React.useState<boolean>(false);
	const [isOpenSignup, setIsOpenSignup] = React.useState<boolean>(false);
	const [containerBodyType, setContainerBodyType] = React.useState<string>(containerBodyTypeEnum.MAIN);
	//TODO: Remover o hardcode dessas infos.
	const infoList = [
		{
			title: 'GestBucal',
			items: [
				{
					title: 'Início',
					url: '/',
				},
				{
					title: 'Acervo',
					url: '/',
				},
			],
		},
		{
			title: 'Sobre',
			items: [
				{
					title: 'Quem somos?',
					url: '/',
				},
				{
					title: 'O que é GestBucal',
					url: '/',
				},
				{
					title: 'GestBucal & Tear Technology',
					url: '/',
				},
			],
		},
		{
			title: 'Suporte',
			items: [
				{
					title: 'Central SAC | +55(81)3194-4900',
					url: '/',
				},
				{
					title: 'Duvidas | +55(81)3038-6405',
					url: '/',
				},
				{
					title: 'Avenida Prof. Moraes Rego, 1235\nCidade Universitária\nRecife PE, 50670-901',
					url: '/',
				},
			],
		},
	];

	//TODO: Remover hardcode
	const items = [
		{
			subject: 'Novidades',
			subTitle: 'Questionários',
			description: 'Responda aos questionários de acordo com seu perfil e necessidade.',
			url: '/',
		},
		{
			subject: 'Referências',
			subTitle: 'Objetos de Estudos',
			description: 'Saiba quais referências foram utilizadas para a elaboração dos questionários disponíveis no projeto.',
			url: '/',
		},
		{
			subject: 'Contato',
			subTitle: 'Entre em contato conosco',
			description:
				'Tem dúvidas sobre o projeto, questionários, assuntos relacionados ou gostaria de contrinuir? Acesse a página de contatos e nos mande suas dúvidas.',
			url: '/',
		},
	];

	//TODO: Remover do hardcode
	const indexToolbarMenuList = [
		{
			title: 'Acervo',
			menuItems: [
				{
					title: 'Quem somos?',
					onClick: () => setContainerBodyType(containerBodyTypeEnum.ABOUT_US),
				},
			],
		},
	];

	return (
		<div>
			<Base
				appBarChild={
					<AppBar
						toolbarChild={
							<IndexToolbar
								onClickInitialButton={() => setContainerBodyType(containerBodyTypeEnum.MAIN)}
								openLoginModal={() => setIsOpenLogin(true)}
								openSignupModal={() => setIsOpenSignup(true)}
								menuList={indexToolbarMenuList}
							/>
						}
					/>
				}
				mainContainerChild={
					<div>
						{containerBodyType === containerBodyTypeEnum.MAIN && (
							<div>
								<Carousel sx={{ height: '800px' }}>
									{items.map((item, i) => (
										<Paper key={i} style={carouselStyle}>
											<Image src={'/logo-transparent.png'} alt='logo-transparent' width='100%' height='100%' />
											<div style={{ margin: 'auto 0px auto 4rem', maxWidth: '30%' }}>
												<Typography variant='h5' style={{ color: theme.grey }}>
													{item.subject}
												</Typography>

												<Typography variant='h4' style={{ color: theme.secundaryColor, fontWeight: 'bold' }}>
													{item.subTitle}
												</Typography>

												<Typography style={{ fontSize: '1rem', color: theme.black, marginTop: '1rem' }}>{item.description}</Typography>

												<Button
													style={{
														...theme.button,
														marginTop: '1rem',
														borderRadius: '16px',
														backgroundColor: theme.white,
														borderColor: theme.secundaryColor,
														color: theme.secundaryColor,
													}}
												>
													Saiba mais
												</Button>
											</div>
										</Paper>
									))}
								</Carousel>
							</div>
						)}

						{containerBodyType === containerBodyTypeEnum.ABOUT_US && <AboutUsContainer />}

						<div style={infoStyle}>
							{infoList.map((info, index) => (
								<Typography key={index} variant={'subtitle1'} style={listTitleStyle}>
									{info.title}

									<List disablePadding style={listStyle}>
										{info.items.map((item, i) => (
											<ListItem key={i} disablePadding style={listItemStyle}>
												<ListItemButton style={{ padding: 0, fontSize: '0.8rem', fontWeight: 'bold', color: theme.grey, whiteSpace: 'pre-line' }}>
													{item.title}
												</ListItemButton>
											</ListItem>
										))}
									</List>
								</Typography>
							))}
						</div>
					</div>
				}
				footerChild={<FooterMain />}
			/>

			<LoginModal
				isOpen={isOpenLogin}
				canSkip={true}
				onClose={() => {
					setIsOpenLogin(false);
				}}
			/>

			<SignupModal
				isOpen={isOpenSignup}
				canSkip={true}
				onClose={() => {
					setIsOpenSignup(false);
				}}
			/>
		</div>
	);
}
