import { Button, Modal } from '@mui/material';
import React from 'react';
import { modal, modalCard } from './style';
import { IProps } from './type';

export default function Index(props: IProps) {
	const [login, setLogin] = React.useState<string>(null);
	const [pwd, setPwd] = React.useState<string>(null);
	const getLogin = (v: string) => setLogin(v);
	const getPwd = (v: string) => setPwd(v);

	return (
		<Modal
			open={props.isOpen}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
			style={modal}
      onClose={() => {
				if (props.canSkip) props.onClose();
			}}
		>
			<div
				className='login'
				style={modalCard}
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
