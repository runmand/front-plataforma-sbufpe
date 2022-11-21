import { Button, Modal } from '@mui/material';
import React from 'react';
import { IProps } from './contract';

export default function RegistersDialog(props: IProps) {
	// const [login, setLogin] = React.useState<string>(null);
	// const [pwd, setPwd] = React.useState<string>(null);
	// const getLogin = (v: string) => setLogin(v);
	// const getPwd = (v: string) => setPwd(v);

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
			<div className='form'>
				<form
					method='post'
					action='index.php'
				>
					<br></br>
					<h1>Faça o seu cadastro!</h1>
					<br></br>
					<h2>Cadastro</h2>
					<br></br>
					<label>Nome:</label>
					<input
						type='text'
						size={40}
						placeholder='Nome Completo'
						autoFocus
						required={true}
					/>
					<label>CPF:</label>
					<input
						type='text'
						id='cpf'
						minLength={11}
						maxLength={11}
						required
						autoComplete='off'
						placeholder='23123132100'
					/>
					<br></br>
					<label>Email:</label>
					<input
						type='email'
						size={64}
						placeholder='Email Válido'
						required
					/>
					<label>Senha:</label>
					<input
						type='password'
						minLength={8}
						maxLength={16}
						placeholder='Escolha sua senha'
						required={true}
					/>
					<label>Confirme sua senha</label>
					<input
						type='password'
						minLength={8}
						maxLength={16}
						placeholder='Confirme sua senha'
						required={true}
					/>
					<label>Telefone</label>
					<input
						type='text'
						id='phone'
						minLength={11}
						maxLength={11}
						required
						autoComplete='off'
						placeholder='DDD+Números'
					/>
					<br></br>
					<label>Sexo:</label> &nbsp;
					<label>Masculino</label>
					<input
						type='radio'
						name='opcao'
						id='op1'
					/>
					&nbsp;
					<label>Feminino</label>
					<input
						type='radio'
						name='opcao'
						id='op2'
					/>
					&nbsp;
					<label>Prefiro não responder</label>
					<input
						type='radio'
						name='opcao'
						id='op3'
					/>
					<br></br>
					<label>Data de Nascimento:</label>
					<input
						type='date'
						name='data'
						id='data'
					/>
					<br></br>
					<h2>Endereço</h2>
					<br></br>
					<label>CEP</label>
					<input
						type='CEP'
						required
						pattern='\d{5}-\d{3}'
						placeholder='00000-000'
					/>
					<label>Estado:</label>
					<select
						name='estado'
						id='uf'
					>
						<option value='0'>Escolha sua Região</option>
						<optgroup label='Norte'>
							<option value='1'>Acre</option>
							<option value='2'>Amazonas</option>
							<option value='3'>Amapá</option>
							<option value='4'>Pará</option>
							<option value='5'>Rondônia</option>
							<option value='6'>Roraima</option>
							<option value='7'>Tocantins</option>
						</optgroup>
						<optgroup label='Nordeste'>
							<option value='8'>Alagoas</option>
							<option value='9'>Bahia</option>
							<option value='10'>Ceará</option>
							<option value='11'>Maranhâo</option>
							<option value='12'>Piauí</option>
							<option value='13'>Pernambuco</option>
							<option value='14'>Paraíba</option>
							<option value='15'>Rio Grande do Norte</option>
							<option value='16'>Sergipe</option>
						</optgroup>
						<optgroup label='Centro-Oeste'>
							<option value='17'>Goiás</option>
							<option value='18'>Mato Grosso</option>
							<option value='19'>Mato Grosso do Sul</option>
							<option value='20'>Distrito Federal</option>
						</optgroup>
						<optgroup label='Sudeste'>
							<option value='21'>Espirito Santo</option>
							<option value='22'>Minas Gerais</option>
							<option value='23'>Rio de Janeiro</option>
							<option value='24'>São Paulo</option>
						</optgroup>
						<optgroup label='Sul'>
							<option value='25'>Paraná</option>
							<option value='26'>Rio Grande do Sul</option>
							<option value='27'>Santa Catarina</option>
						</optgroup>
					</select>
					<label>Cidade:</label>
					<input
						id='cidade'
						type='text'
						placeholder='Cidade'
					/>
					<br></br>
					<label>Bairro:</label>
					<input
						id='bairro'
						type='text'
						placeholder=' Bairro'
					/>
					<br></br>
					<label>Rua:</label>
					<input
						type='text'
						size={30}
						placeholder='Logradouro'
					/>
					<label>Número:</label>
					<input
						id='numero'
						type='text'
						size={5}
						placeholder=' Número'
					/>
					<br></br>
					<label>Complemento:</label>
					<input
						type='text'
						size={30}
						placeholder='Andar, Apartamento,Bloco'
					/>
					<br></br>
					<label>
						<b> Tipo de Perfil:</b>
					</label>{' '}
					&nbsp;
					<label>Usuário do sistema de Saúde</label>
					<input
						type='radio'
						name='opcao'
						id='op1'
					/>
					&nbsp;
					<label>Profissional de Saúde Bucal</label>
					<input
						type='radio'
						name='opcao'
						id='op2'
					/>
					&nbsp;
					<label>Pesquisa Epidemiológica</label>
					<input
						type='radio'
						name='opcao'
						id='op3'
					/>
					<br></br>
					<Button
						onClick={() => {
							props.onClose();
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
						Voltar
					</Button>
					&nbsp; &nbsp;
					<Button
						onClick={() => {
							props.onConfirm();
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
						Enviar cadastro
					</Button>
					<br></br>
				</form>
			</div>
		</Modal>
	);
}
