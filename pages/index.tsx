import React from 'react';
import Base from '../src/components/base-layout';

export default function Index() {
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

	return (
		<Base />
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
	);
}
