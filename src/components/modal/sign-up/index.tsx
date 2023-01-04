import { FormControlLabel, Modal, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import { modalStyle, cardStyle, cardBodyStyle } from './style';
import { TPROPS } from './type';
import Header from '../header/index';
import TextField from '@components/text-field/index';
import ActionArea from '@components/modal/action-area';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { localStorageKeyEnum, loginTypeEnum, routerEnum } from 'src/core/enums';
import LoginUtils from 'src/utils/loginUtils';
import SignupService from './service';

//TODO: Criar validação de formalario antes de enviar dados para a API.
//TODO: Criar limpeza de campos apartir do callback fornecido por cada campo.
export default function Index(props: TPROPS) {
	let clearLoginField = () => console.log('Trying clear login field...');
	const { enqueueSnackbar } = useSnackbar();
	const signupService = new SignupService();
	const loginUtils = new LoginUtils();
	const router = useRouter();
	const [login, setLogin] = React.useState<string>(null);
	const [pwd, setPwd] = React.useState<string>(null);
	const [confirmPwd, setConfirmPwd] = React.useState<string>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [loginType, setLoginType] = React.useState<loginTypeEnum>(loginTypeEnum.CPF);
	const canSubmit = login && pwd && pwd === confirmPwd;

	const handleSelectLoginType = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginType(loginUtils.loginTypeList.filter(item => item.key === e.target.value)[0].key);
		clearLoginField();
	};

	const handleSubmit = async () => {
		setIsLoading(true);

		signupService
			.handleSignup({ login, pwd, typeId: 4 })
			.then(res => {
				if (res.data?.token) {
					enqueueSnackbar('Registro efetuado com sucesso!', { variant: 'success' });
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
					title='Cadastro'
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
							title='Senha'
							textType='password'
							onBlur={v => setPwd(v)}
						/>
					</div>

					<div style={{ marginTop: '1rem' }}>
						<TextField
							title='Confirmar senha'
							textType='password'
							onBlur={v => setConfirmPwd(v)}
						/>
					</div>
				</div>

				<ActionArea
					isLoading={isLoading}
					isDisabled={!canSubmit}
					onConfirm={() => handleSubmit()}
				/>
			</div>
		</Modal>
	);
}
