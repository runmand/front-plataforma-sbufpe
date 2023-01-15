import { FormControlLabel, Modal, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react';
import { modalStyle, cardStyle, cardBodyStyle, optionsStyle, optionsLinkStyle } from './style';
import { TPROPS } from './type';
import Header from '../header/index';
import TextField from '@components/text-field/index';
import ActionArea from '@components/modal/action-area';
import LoginService from './service';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { localStorageKeyEnum, loginTypeEnum, routerEnum } from 'src/core/enums';
import LoginUtils from 'src/utils/loginUtils';

//TODO: Criar validação de formalario antes de enviar dados para a API.
//TODO: Redirecionar para modal de cadastro.
//TODO: Redirecionar para modal de recuperação de senha.

export default function Index(props: TPROPS) {
	let clearLoginField = () => console.log('Trying clear login field...');
	const loginUtils = new LoginUtils();
	const loginService = new LoginService();
	const [login, setLogin] = React.useState<string>(null);
	const [pwd, setPwd] = React.useState<string>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [loginType, setLoginType] = React.useState<loginTypeEnum>(loginTypeEnum.CPF);
	const { enqueueSnackbar } = useSnackbar();
	const router = useRouter();

	const handleSelectLoginType = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginType(loginUtils.loginTypeList.filter(item => item.key === e.target.value)[0].key);
		clearLoginField();
	};

	const handleSubmit = async () => {
		setIsLoading(true);

		loginService
			.handleLogin({ login, pwd })
			.then(res => {
				if (res.data?.token) {
					enqueueSnackbar('Login efetuado com sucesso!', { variant: 'success' });
					localStorage.setItem(localStorageKeyEnum.TOKEN, res.data.token); //TODO: Melhorar para utilziar cookies.
					router.push(routerEnum.HOME);
				} else {
					res.errors.forEach(error => enqueueSnackbar(error, { variant: 'error' }));
					setIsLoading(false);
				}
			})
			.catch(e => {
				console.error(e);
				enqueueSnackbar('Ops! Algo deu errado...', { variant: 'error' }); //TODO: Tratar essa exception
				setIsLoading(false);
			});
	};

	return (
		<Modal
			open={props.isOpen}
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
					<RadioGroup
						row
						defaultValue={loginTypeEnum.CPF}
					>
						{loginUtils.loginTypeList.map((item, i) => (
							<FormControlLabel
								key={i}
								value={item.key}
								control={<Radio />}
								label={item.title}
								onChange={handleSelectLoginType}
							/>
						))}
					</RadioGroup>

					<TextField
						title='CPF, Celular, E-mail ou Username'
						maskType={loginType}
						onBlur={v => setLogin(v)}
						onClear={toInvoke => (clearLoginField = toInvoke)}
					/>

					<div style={{ marginTop: '1rem' }}>
						<TextField
							title='Password'
							textType='password'
							onBlur={v => setPwd(v)}
						/>
					</div>
				</div>

				<Typography style={{ ...optionsStyle, marginTop: '1rem' }}>
					Primeiro acesso?&nbsp;<Typography style={optionsLinkStyle}>Cadastre-se agora!</Typography>
				</Typography>

				<Typography style={optionsStyle}>
					Esqueceu sua senha?&nbsp;<Typography style={optionsLinkStyle}>Recuperar senha!</Typography>
				</Typography>

				<ActionArea
					isLoading={isLoading}
					onConfirm={() => handleSubmit()}
				/>
			</div>
		</Modal>
	);
}
