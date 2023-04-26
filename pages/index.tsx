import React from 'react';
import Base from '@components/base-layout';
import AppBar from '@components/app-bar';
import FooterMain from '@components/footer/main/index';
import LoginModal from '@components/modal/log-in/index';
import SignupModal from '@components/modal/sign-up/index';
import IndexToolbar from '@components/toolbar/index';
import { List, ListItem, ListItemButton, Typography } from '@mui/material';
import { theme } from 'src/core/theme';
import {  infoStyle, listItemStyle, listStyle, listTitleStyle } from '../src/pages/style';
import AboutUsContainer from '@components/container/about-us';
import ContactUsContainer from '@components/container/contact-us';
import CollectionContainer from '@components/container/collection';
import MainBody from '@components/container/main';
import Faq from '@components/container/faq';
import { containerBodyTypeEnum } from 'src/core/enums';


export default function Index() {
	const [isOpenLogin, setIsOpenLogin] = React.useState<boolean>(false);
	const [isOpenSignup, setIsOpenSignup] = React.useState<boolean>(false);
	const [containerBodyType, setContainerBodyType] = React.useState<string>(containerBodyTypeEnum.MAIN);
	//TODO: Remover o hardcode dessas infos.
	const infoList = [
		
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
			title: 'Endereço',
			items: [
				{
					title: 'Avenida Prof. Moraes Rego, 1235\nCidade Universitária\nRecife PE, 50670-901',
					url: '/',
				},
			]

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
				
			],
		},
	];
	//TODO: Remover do hardcode
	const indexToolbarMenuList = [
		{
			title: 'Acervo',
			menuItems: [
				{
					title: 'Artigos',
					onClick: () => setContainerBodyType(containerBodyTypeEnum.COLLECTION),
				},
			],
		},
		{
			title: 'Quem Somos',
			menuItems: [
				{
					title: 'Quem somos?',
					onClick: () => setContainerBodyType(containerBodyTypeEnum.ABOUT_US),
				},
			],
		},
		{
			title: 'Contato',
			menuItems: [
				{
					title: 'Contato',
					onClick: () => setContainerBodyType(containerBodyTypeEnum.CONTACT_US),
				}
			]
		},
		{
			title: 'F.A.Q',
			menuItems: [
				{
					title: 'Perguntas Frequentes',
					onClick: () => setContainerBodyType(containerBodyTypeEnum.FAQ),
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
						{containerBodyType === containerBodyTypeEnum.MAIN &&   (<MainBody/>)}
						{containerBodyType === containerBodyTypeEnum.ABOUT_US && <AboutUsContainer />}
						{containerBodyType === containerBodyTypeEnum.CONTACT_US && <ContactUsContainer />}
						{containerBodyType === containerBodyTypeEnum.COLLECTION && <CollectionContainer/>}
						{containerBodyType === containerBodyTypeEnum.FAQ && <Faq/>}
						<div style={infoStyle}>
							{infoList.map((info, index) => (
								<Typography 
								key={index} 
								variant={'subtitle1'} 
								style={listTitleStyle}>
									{info.title}
									<List 
										disablePadding 
										style={listStyle}>
										{info.items.map((item, i) => (
											<ListItem 
												key={i} 
												disablePadding 
												style={listItemStyle}>
												<ListItemButton 
												style={{ 
													padding: 0, 
													fontSize: '0.8rem', 
													fontWeight: 'bold', 
													color: theme.white, 
													whiteSpace: 'pre-line' }}>
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
