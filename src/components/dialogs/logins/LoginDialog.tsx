import { Button, Modal } from '@mui/material';
import React from 'react';
import { IProps } from './contract';

export default function LoginDialog(props: IProps) {
	const [login, setLogin] = React.useState<string>(null);
	const [pwd, setPwd] = React.useState<string>(null);
	const getLogin = (v: string) => setLogin(v);
	const getPwd = (v: string) => setPwd(v);

	return (
		<Modal
			open={props.isOpen}
			onClose={() => {
				if (props.canSkip) props.onClose();
			}}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
			style={{ backgroundColor: '#000000DD' }}
		>
			<div
				className='login'
				style={{
					position: 'absolute' as 'absolute',
					top: '40%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					height: 375,
				}}
			>
				<div className='login-name'>
					<h1>Bem vindo(a) ao LOGIN</h1>
				</div>
				<h2 className='preencha'>Preencha os dados para acessar!</h2>
				<form method='POST'>
					<input
						type='text'
						name='nome'
						placeholder='Nome do Usuário'
						autoFocus
						onBlur={e => {
							getLogin(e.target.value);
						}}
					/>
					<input
						type='password'
						name='senha'
						placeholder='Insira sua Senha'
						autoFocus
						onBlur={e => {
							getPwd(e.target.value);
						}}
					/>
					<Button
						onClick={() => {
							props.onConfirm(login, pwd);
						}}
						style={{
							marginTop: '5px',
							backgroundColor: '#6D141A',
							height: '45px',
							borderRadius: '8px',
							color: 'white',
							paddingLeft: '10px',
							marginBottom: '5px',
							fontWeight: 'bold',
							fontSize: '18px',
						}}
					>
						Entrar
					</Button>
				</form>
				<a href='recover.html'>Esqueci minha senha!</a>
				<p>Ainda não tem uma conta?</p>
				<a href='#'>Cadastre-se agora!</a>
			</div>
		</Modal>
	);
}
