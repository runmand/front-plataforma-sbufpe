import React from 'react';
import Base from '@components/base-layout';
import AppBar from '@components/app-bar';
import FooterMain from '@components/footer/main/index';
import Carousel from 'react-material-ui-carousel';
import LoginModal from '@components/modal/log-in/index';
import SignupModal from '@components/modal/sign-up/index';
import IndexToolbar from '@components/toolbar/index';
import IndexToolbarMobile from '@components/toolbar/index-mobile'
import { useRouter } from 'next/router';
import {
	Box,
	Button,
	Grid,
	IconButton,
	Paper,
	Typography,
} from '@mui/material';
import { theme } from 'src/core/theme';
import AboutUsContainer from '@components/container/about-us';
import ContactUsContainer from '@components/container/contact-us';
import CollectionContainer from '@components/container/collection';
import Faq from '@components/container/faq';
import Tcle from '@components/container/tcle';
import Direction from '@components/container/direction';
import Informes from '@components/container/informes';
import WhatIs from '@components/container/what-is';
import { containerBodyTypeEnum, localStorageKeyEnum, routerEnum } from 'src/core/enums';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Height, Padding } from '@mui/icons-material';


export default function Index() {
	const router = useRouter();
	const [isOpenLogin, setIsOpenLogin] = React.useState<boolean>(false);
	const [isOpenSignup, setIsOpenSignup] = React.useState<boolean>(false);
	const [containerBodyType, setContainerBodyType] = React.useState<string>(containerBodyTypeEnum.MAIN);
	const largeQuery = useMediaQuery('(min-width:720px)')
	//TODO: Remover do hardcode
	const indexToolbarMenuList = [
		{
			title: 'Acervo',
			menuItems: [
				{
					title: 'Artigos',
					onClick: () => setContainerBodyType(containerBodyTypeEnum.COLLECTION),
				},
				{
					title: 'InformeSBPE',
					onClick: () => setContainerBodyType(containerBodyTypeEnum.INFORMES),
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
				{
					title: 'O que é GESTBUCAL SD?',
					onClick: () => setContainerBodyType(containerBodyTypeEnum.WHAT_IS),
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
	const items = [
		{
			subject: 'Novidades',
			subTitle: 'Questionários',
			description: 'Responda aos questionários de acordo com seu perfil e necessidade.',
			url: routerEnum.FORM

		},
		{
			subject: 'Referências',
			subTitle: 'Objetos de Estudos',
			description: 'Saiba quais referências foram utilizadas para a elaboração dos questionários disponíveis no projeto.',
			url: containerBodyTypeEnum.COLLECTION,
		},
		{
			subject: 'Contato',
			subTitle: 'Entre em contato conosco',
			description:
				'Tem dúvidas sobre o projeto, questionários, assuntos relacionados ou gostaria de contribuir? Acesse a página de contatos e nos mande suas dúvidas.',
			url: containerBodyTypeEnum.CONTACT_US,
		},
	];

	const handleShowPageByURL = (url: routerEnum | containerBodyTypeEnum) => {
		const isLogged = !!localStorage.getItem(localStorageKeyEnum.TOKEN);
		if (!isLogged && url == routerEnum.FORM) {
			setIsOpenLogin(true)
			return;
		}if (isLogged && url == routerEnum.FORM) {
			router.push(routerEnum.FORM)
			return;
		} else {
			setContainerBodyType(url) 
		}
	}
	const handleShowPageContact = () => {
		setContainerBodyType(containerBodyTypeEnum.CONTACT_US)
	}
	const handleShowTclePage = () =>{
		setContainerBodyType(containerBodyTypeEnum.TCLE)
	}


	return (
		<div>
			<Base
				appBarChild={
					<AppBar
						toolbarChild={largeQuery ?
							<IndexToolbar
								onClickInitialButton={() => setContainerBodyType(containerBodyTypeEnum.MAIN)}
								openLoginModal={() => setIsOpenLogin(true)}
								openSignupModal={() => setIsOpenSignup(true)}
								menuList={indexToolbarMenuList}
							/> : <IndexToolbarMobile
							onClickInitialButton={() => setContainerBodyType(containerBodyTypeEnum.MAIN)}
							openLoginModal={() => setIsOpenLogin(true)}
							menuList={indexToolbarMenuList}
							/>
						}
					/>
				}
				mainContainerChild={
					<Box
						sx={{
							background: theme.greyLight,
							marginTop:'5rem',
							paddingTop:!largeQuery? '2rem' : '1rem',
							minHeight:'88vh',
							display:'flex',
							flexDirection:'column',
							justifyContent:'center'
							
						}}>
						{containerBodyType === containerBodyTypeEnum.MAIN && (
							<Box
								sx={{
									width: 1,
								}}>
								<Grid
									container
									spacing={4}
									columns={{ xs: 4, md: 12 }}>
									<Grid
										item
										xs={6}>
										<Box
											textAlign={'justify'}
											sx={{ paddingX: '20px' }}>
											<Typography
												sx={{ textIndent: '2rem' }}
												paragraph={true}
												variant="body1"
												color={theme.primaryColor}>
												É desafio atual para a governança dos estabelecimentos públicos de saúde a tomada de decisão ágil e oportuna, pautada na evidência científica,possibilitando melhoria de qualidade e promoção de saúde no Sistema Único de Saúde (SUS). A gestão da informação em saúde e a inovação em saúde	digital podem ser solução.
											</Typography>
											<Typography
												sx={{ textIndent: '2rem' }}
												paragraph={true}
												variant="body1"
												color={theme.primaryColor}>
												O grupo de pesquisa GestBucal (CNPq), composto de pesquisadores,estudantes de graduação e pós-graduação, tem caráter multidisciplinar e intersetorial, tem operacionalizado através do Observatório de Saúde Bucal/UFPE projetos junto a rede de atenção em saúde bucal do SUS para amplificação da saúde digital.
											</Typography>
											<Typography
												sx={{ textIndent: '2rem' }}
												paragraph={true}
												variant="body1"
												color={theme.primaryColor}>
												Apresentamos, a plataforma GestBucalSD, que é uma ferramenta web-based de autoprocessamento de dados, a qual possui módulos operacionais para avaliação e vigilância em saúde bucal.
											</Typography>
											<Typography
												sx={{ textIndent: '2rem' }}
												variant="body1"
												color={theme.primaryColor}>
												O seu uso possibilitará a governança inteligente e melhoria da qualidade dos estabelecimentos de saúde da rede de atenção em saúde bucal.
											</Typography>
										</Box>
									</Grid>
									<Grid
										item
										xs={6}>
										<Paper
											sx={{ height: '100%' }}
											elevation={12}>
											<Carousel
												animation='fade'
												autoPlay={true}
												indicators={false}
												duration={150}
												sx={{
													backgroundColor: theme.greyLight
												}}
											>
												{items.map((item, i) => (
													<Paper
														key={i}
														sx={{
															display: 'flex',
															flexDirection: 'column',
															padding: '30px',
															justifyItems: 'center',
															gap: '2rem',
															minHeight: '100%'
														}}>
														<Typography
															variant='h4'
															color={theme.primaryColor}
															sx={{
																padding: '5px',
																textAlign: 'justify',
																alignContent: 'center',
															}}
														>
															{item.subject}
														</Typography>
														<Typography
															variant='h4'
															sx={{
																padding: '5px',
																textAlign: 'justify',
																alignContent: 'center',
																fontSize: '2rem'
															}}
														>
															{item.subTitle}
														</Typography>
														<Typography
															sx={{
																padding: '8px',
																color: theme.secundaryColor,
																textAlign: 'justify',
																alignItems: 'center',
																minHeight: '100px',
															}}>
															{item.description}
														</Typography>
														<Box
															sx={{
																width: '100%',
																display: 'flex',
																justifyContent: 'end',
															}}>
															<Button
																sx={{
																	width: '120px',
																	color: theme.primaryColor,
																	border: `2px solid ${theme.secundaryColor}`
																}}
																onClick={() => handleShowPageByURL(item.url)}
															>
																Saiba mais
															</Button>
														</Box>
													</Paper >
												))}
											</Carousel>
										</Paper>
									</Grid>
								</Grid>
							</Box>)}
						{containerBodyType === containerBodyTypeEnum.ABOUT_US && <AboutUsContainer />}
						{containerBodyType === containerBodyTypeEnum.CONTACT_US && <ContactUsContainer />}
						{containerBodyType === containerBodyTypeEnum.COLLECTION && <CollectionContainer/>}
						{containerBodyType === containerBodyTypeEnum.FAQ && <Faq/>}
						{containerBodyType === containerBodyTypeEnum.TCLE && <Tcle/>}
						{containerBodyType === containerBodyTypeEnum.DIRECTION && <Direction/>}
						{containerBodyType === containerBodyTypeEnum.INFORMES && <Informes/>}
						{containerBodyType === containerBodyTypeEnum.WHAT_IS && <WhatIs/>}
					</Box>
				}
				footerChild={<FooterMain
					handleClick={(url) => setContainerBodyType(url) }
				/>}
			/>

			<LoginModal
				isOpen={isOpenLogin}
				canSkip={true}
				onClose={() => {
					setIsOpenLogin(false);
				}}
				openSignupModal={() => setIsOpenSignup(true)}
				openContact={() => handleShowPageContact()}
			/>

			<SignupModal
				isOpen={isOpenSignup}
				canSkip={true}
				onClose={() => {
					setIsOpenSignup(false);
				}}
				openTclePage={() => handleShowTclePage()}
			/>
		</div>
	);
}
