import React from 'react';
import Base from '@components/base-layout';
import AppBar from '@components/app-bar';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import Avatar from '@mui/material/Avatar/Avatar';
import Typography from '@mui/material/Typography/Typography';
import TextField from '@mui/material/TextField/TextField';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import { Copyright } from '@mui/icons-material';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import FooterMain from '@components/footer/main/index';
import LoginModal from '@components/modal/log-in/index';
import IndexToolbar from '@components/toolbar/index';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { theme } from 'src/core/theme';
import { infoStyle, listItemStyle, listStyle, listTitleStyle } from './style';

export default function Index() {
	const [isOpenLogin, setIsOpenLogin] = React.useState<boolean>(false);
	const handleCloseLoginModal = () => setIsOpenLogin(false);
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

	return (
		<div>
			<Base
				appBarChild={
					<AppBar
						toolbarChild={
							<IndexToolbar
								openLoginModal={() => setIsOpenLogin(true)}
								openSignupModal={() => setIsOpenLogin(true)}
							/>
						}
					/>
				}
				mainContainerChild={
					<div>
						<div style={infoStyle}>
							{infoList.map((info, index) => (
								<Typography
									key={index}
									variant={'subtitle1'}
									style={listTitleStyle}
								>
									{info.title}

									<List
										disablePadding
										style={listStyle}
									>
										{info.items.map((item, i) => (
											<ListItem
												key={i}
												disablePadding
												style={listItemStyle}
											>
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
									onSubmit={() => {}}
									sx={{ mt: 1 }}
								>
									<TextField
										margin='normal'
										required
										fullWidth
										id='email'
										label='Email Address'
										name='email'
										autoComplete='email'
										autoFocus
									/>
									<TextField
										margin='normal'
										required
										fullWidth
										name='password'
										label='Password'
										type='password'
										id='password'
										autoComplete='current-password'
									/>
									<FormControlLabel
										control={
											<Checkbox
												value='remember'
												color='primary'
											/>
										}
										label='Remember me'
									/>
									<Button
										type='submit'
										fullWidth
										variant='contained'
										sx={{ mt: 3, mb: 2 }}
									>
										Sign In
									</Button>
									<Grid container>
										<Grid
											item
											xs
										>
											{/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
										</Grid>
										<Grid item>
											{/* <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
										</Grid>
									</Grid>
									<Copyright sx={{ mt: 5 }} />
								</Box>
							</Box>
						</Grid>
					</Grid>
				}
				footerChild={<FooterMain />}
			/>

			<LoginModal
				isOpen={isOpenLogin}
				canSkip={true}
				onClose={() => {
					handleCloseLoginModal();
				}}
			/>
		</div>
	);

	// 	<RegistersDialog
	// 		isOpen={isOpenRegister}
	// 		canSkip={true}
	// 		isLoading={isLoading}
	// 		onClose={() => {
	// 			handleCloseRegisterModal();
	// 		}}
	// 		onConfirm={() => {
	// 			handleSendRegister();
	// 		}}
	// 	/>
	// </div>
}
