import AppBar from '../src/components/appBars/AppBar';
import Container from '../src/components/containers/Container';
import Footer from '../src/components/footers/Footer';
import LoginDialog from '../src/components/dialogs/logins/LoginDialog';
import React from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

export default function Index() {
	const [isOpenLogin, setIsOpenLogin] = React.useState<boolean>(false);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { enqueueSnackbar } = useSnackbar();

	const handleCloseLoginModal = () => setIsOpenLogin(false);
	const handleOpenLoginModal = () => setIsOpenLogin(true);
	const handleMakeLogin = (login: string, pwd: string) => {
		const auth = btoa(`${login}:${pwd}`);

		setIsLoading(true);

		axios
			.patch(`${process.env.API_URL}/login`, {}, { headers: { authorization: `Basic ${auth}` } })
			.then(res => {
				if (res.data.data.token) {
					setIsOpenLogin(false);
					enqueueSnackbar('Login efetuado com sucesso!', { variant: 'success' });
				} else enqueueSnackbar('Ops! Algo deu errado...', { variant: 'error' });
			})
			.catch(e => {
				enqueueSnackbar(e, { variant: 'error' });
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<div>
			<AppBar
				onClickLoginButton={() => {
					handleOpenLoginModal();
				}}
			/>
			<Container />
			<Footer />
			<LoginDialog
				isOpen={isOpenLogin}
				canSkip={true}
				isLoading={isLoading}
				onClose={() => {
					handleCloseLoginModal();
				}}
				onConfirm={(login: string, pwd: string) => {
					handleMakeLogin(login, pwd);
				}}
			/>
		</div>
	);
}
