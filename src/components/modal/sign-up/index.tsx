/* eslint-disable react-hooks/exhaustive-deps */
import {
	Autocomplete,
	Box,
	FormControlLabel,
	FormGroup,
	Modal,
	Radio,
	RadioGroup,
	TextField,
	Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { TPROPS, USER_TYPE } from './type';
import Header from '../header/index';
import CustomTextField from '@components/text-field/index';
import ActionArea from '@components/modal/action-area';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { localStorageKeyEnum, loginTypeEnum, routerEnum } from 'src/core/enums';
import LoginUtils from 'src/utils/loginUtils';
import SignupService from './service';
import { CheckBox, Label } from '@mui/icons-material';
import { theme } from 'src/core/theme';

//TODO: Criar validação de formalario antes de enviar dados para a API.
//TODO: Criar limpeza de campos apartir do callback fornecido por cada campo.
export default function Index(props: TPROPS) {
	let clearLoginField = () => console.log('Trying clear login field...');
	const { enqueueSnackbar } = useSnackbar();
	const signupService = new SignupService();
	const loginUtils = new LoginUtils();
	const router = useRouter();
	const [login, setLogin] = React.useState<string | null>(null);
	const [pwd, setPwd] = React.useState<string | null>(null);
	const [userType, setUserType] = React.useState<USER_TYPE | null>(null);
	const [userTypeList, setUserTypeList] = React.useState<USER_TYPE[]>([]);
	const [confirmPwd, setConfirmPwd] = React.useState<string | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [isChecked, setIsChecked] = React.useState<boolean>(false)
	const [loginType, setLoginType] = React.useState<loginTypeEnum>(loginTypeEnum.CPF);
	const canSubmit = login && userType && pwd && pwd === confirmPwd;

	useEffect(() => {
		signupService
			.getUserTypes()
			.then(res => setUserTypeList(res.data?.map(item => ({ id: item.id, label: item.description }))))
			.catch(e => {
				console.error(e);
				enqueueSnackbar('Ops! Algo deu errado...', { variant: 'error' }); //TODO: Tratar essa exception
				setIsLoading(false);
			});
	}, []);

	const handleSelectLoginType = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginType(loginUtils.loginTypeList.filter(item => item.key === e.target.value)[0].key);
		clearLoginField();
	};
	const handleTcle = ()=>{
		props.onClose()
		props.openTclePage()

	}
	const handleSubmit = async () => {
		setIsLoading(true);

		signupService
			.handleSignup({ login, pwd, typeId: userType.id })
			.then(res => {
				if (res.data?.token) {
					enqueueSnackbar('Registro efetuado com sucesso!', { variant: 'success' });
					localStorage.setItem(localStorageKeyEnum.TOKEN, res.data.token); //TODO: Melhorar para utilziar cookies.
					router.push(routerEnum.FORM);
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
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				transition: '0.6s',
				backgroundColor: theme.blur,
				color: theme.primaryColor
			}}
			onClose={() => {
				if (props.canSkip) props.onClose();
			}}
		>
			<Box
				sx={{
					backgroundColor: theme.white,
					borderRadius: theme.borderRadiusEdge,
					padding: theme.modal.card.padding,
					minWidth: theme.modal.card.minWidth,
				}}>
				<Header
					title='CADASTRE-SE'
					onClose={() => props.onClose()} />

				<Box sx={{ marginTop: '1rem' }}>
					<RadioGroup row defaultValue={loginTypeEnum.CPF}>
						{loginUtils.loginTypeList.map((item, i) => (
							<FormControlLabel
								key={i}
								value={item.key}
								control={<Radio />}
								label={item.title}
								onChange={handleSelectLoginType} />
						))}
					</RadioGroup>

					<CustomTextField
						title='CPF, Celular, E-mail ou Username'
						maskType={loginType}
						onBlur={v => setLogin(v)}
						onClear={toInvoke => (clearLoginField = toInvoke)}
					/>

					<Autocomplete
						style={{ marginTop: '1rem' }}
						options={userTypeList}
						multiple={false}
						renderInput={params => <TextField {...params} label='Tipo de Participante' />}
						onChange={(event: any, newValue: USER_TYPE | null) => setUserType(newValue)}
					/>

					<Box
						sx={{ marginTop: '1rem' }}>
						<CustomTextField
							title='Senha'
							textType='password'
							onBlur={v => setPwd(v)} />
					</Box>

					<Box sx={{ marginTop: '1rem' }}>
						<CustomTextField
							title='Confirmar senha'
							textType='password'
							onBlur={v => setConfirmPwd(v)} />
					</Box>
					<Box
						sx={{ marginTop: '1rem' }}>
						<FormControlLabel
							aria-required
							control={<CheckBox />}
							label="TCLE do GestBucalSD"
							onClick={() => handleTcle()}
						/>

					</Box>
				</Box>
				<ActionArea
					isLoading={isLoading}
					isDisabled={!canSubmit}
					onConfirm={() => handleSubmit()} />
			</Box>
		</Modal>
	);
}
