import { Modal } from '@mui/material';
import React from 'react';
import { modalStyle, cardStyle, cardBodyStyle } from './style';
import { IProps } from './type';
import Header from '../header/index';
import TextField from '@components/text-field/index';
import ActionArea from '@components/modal/action-area';
import LoginService from './service';
import { useSnackbar } from 'notistack';
import { mapRequestErrors } from 'src/utils/errorUtils';

//TODO: Criar validação de formalario antes de enviar dados para a API.

export default function Index(props: IProps) {
	const loginService = new LoginService();
	const [login, setLogin] = React.useState<string>(null);
	const [pwd, setPwd] = React.useState<string>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { enqueueSnackbar } = useSnackbar();

	const handleLogin = async () => {
		setIsLoading(true);

		await loginService
			.handleLogin({ login, pwd })
			.then(res => {
				if (res.data.data.token) {
					// setIsOpenLogin(false);
					enqueueSnackbar('Login efetuado com sucesso!', { variant: 'success' });
					// window.location.href += '/AnswerForm';
				} else enqueueSnackbar('Ops! Algo deu errado...', { variant: 'error' });
			})
			.catch(e => {
				const errors = mapRequestErrors(e);
				errors.forEach(error => enqueueSnackbar(error, { variant: 'error' }));
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<Modal
			open={props.isOpen}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
			style={modalStyle}
			onClose={() => {
				if (props.canSkip) props.onClose();
			}}
		>
			<div style={cardStyle}>
				<Header
					title='Log In'
					onClose={() => props.onClose()}
				/>

				<div style={cardBodyStyle}>
					<TextField
						title='CPF | E-mail | Username'
						onBlur={v => setLogin(v)}
					/>

					<div style={{ marginTop: '1rem' }}>
						<TextField
							title='Password'
							type='password'
							onBlur={v => setPwd(v)}
						/>
					</div>
				</div>

				<ActionArea
					isLoading={isLoading}
					onConfirm={() => handleLogin()}
				/>
			</div>
			{/*





				<form method='POST'>

				</form>
				<a href='recover.html'>Esqueci minha senha!</a>
				<p>Ainda não tem uma conta?</p>
				<a href='#'>Cadastre-se agora!</a>
			</Box> */}
		</Modal>
	);
}
