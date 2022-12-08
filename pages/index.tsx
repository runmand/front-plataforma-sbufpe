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
import Footer from '@components/footers/Footer';
import LoginModal from '@components/modal/log-in/index';
import IndexToolbar from '@components/toolbar/index';

export default function Index() {
	const [isOpenLogin, setIsOpenLogin] = React.useState<boolean>(false);
	const handleCloseLoginModal = () => setIsOpenLogin(false);

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
				footerChild={<Footer />}
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

	// 	<Container />
	// 	<Footer />

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
