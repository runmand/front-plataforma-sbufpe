import React from 'react';
import Base from '@components/base-layout';
import AppBar from '@components/app-bar';
import LoginButton from '@components/log-in-button';
import SignupButton from '@components/sign-up-button';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import Avatar from '@mui/material/Avatar/Avatar';
import Typography from '@mui/material/Typography/Typography';
import TextField from '@mui/material/TextField/TextField';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import { Copyright, Link } from '@mui/icons-material';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Footer from '@components/footers/Footer';

export default function Index() {
	return (
		<Base
			appBarChild={
				<AppBar
					loginButtonChild={<LoginButton />}
					signupButtonChild={<SignupButton />}
				/>
			}
			mainContainerChild={
				<Grid
					container
					component='main'
					sx={{ height: '100vh' }}
				>
					<Grid
						item
						sm={6}
						md={6}
						sx={{
							backgroundImage: 'url(/logo-transparent.png)',
							backgroundRepeat: 'no-repeat',
							backgroundColor: 'red',
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
					/>
					<Grid
						item
						xs={12}
						sm={6}
						md={6}
						component={Paper}
						square
					>
						<Box
							sx={{
								my: 8,
								mx: 4,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>{/* <LockOutlinedIcon /> */}</Avatar>
							<Typography
								component='h1'
								variant='h5'
							>
								Sign in
							</Typography>
							<Box
								component='form'
								noValidate
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
			footerChild={
				<Footer/>
			}
		/>
	);
	// const { enqueueSnackbar } = useSnackbar();
	// const [isOpenLogin, setIsOpenLogin] = React.useState<boolean>(false);
	// const [isOpenRegister, setIsOpenRegister] = React.useState<boolean>(false);
	// const [isLoading, setIsLoading] = React.useState<boolean>(false);
	// const handleCloseLoginModal = () => setIsOpenLogin(false);
	// const handleCloseRegisterModal = () => setIsOpenRegister(false);
	// const handleOpenLoginModal = () => setIsOpenLogin(true);
	// const handleOpenRegisterModal = () => setIsOpenRegister(true);

	// const handleMakeLogin = (login: string, pwd: string) => {
	// 	const auth = btoa(`${login}:${pwd}`);

	// 	setIsLoading(true);

	// 	axios
	// 		.patch(`${process.env.API_URL}/login`, {}, { headers: { authorization: `Basic ${auth}` } })
	// 		.then(res => {
	// 			if (res.data.data.token) {
	// 				setIsOpenLogin(false);
	// 				enqueueSnackbar('Login efetuado com sucesso!', { variant: 'success' });
	// 				window.location.href += '/AnswerForm';
	// 			} else enqueueSnackbar('Ops! Algo deu errado...', { variant: 'error' });
	// 		})
	// 		.catch(e => {
	// 			enqueueSnackbar(e, { variant: 'error' });
	// 		})
	// 		.finally(() => {
	// 			setIsLoading(false);
	// 		});
	// };

	// const handleSendRegister = () => {};

	// <div>
	// 	<AppBar
	// 		onClickLoginButton={() => {
	// 			handleOpenLoginModal();
	// 		}}
	// 		onClickRegisterButton={() => {
	// 			handleOpenRegisterModal();
	// 		}}
	// 	/>
	// 	<Container />
	// 	<Footer />
	// 	<LoginDialog
	// 		isOpen={isOpenLogin}
	// 		canSkip={true}
	// 		isLoading={isLoading}
	// 		onClose={() => {
	// 			handleCloseLoginModal();
	// 		}}
	// 		onConfirm={(login: string, pwd: string) => {
	// 			handleMakeLogin(login, pwd);
	// 		}}
	// 	/>
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
