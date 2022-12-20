import { TPROPS } from './contract';

//TODO: Melhorar essa tela.
export default function AppBar(props: TPROPS) {
	return (
		<header>
			<div className='logo'>
				<a href='#'>
					<img src='https://lh3.googleusercontent.com/ZPuYmJnl2t1TfUOXgKZIjdbK0nk1t40kQbmryb78vhdSPNlxRxiRz4p1pT1W2lmBWx6yfoFVoWKccDOeMfhzxjjx3uLxDH7RpTzsm65X1f3fKKAhPbDLlJt7cb8HPYkcc4nlrTxe=w2400' />
				</a>
			</div>

			<nav>
				<ul>
					<li>
						<a href='.\inicio.html'>Início</a>
					</li>
					<li>
						<a href='.\acervoinicio.html'>Acervo</a>
					</li>
					<li>
						<a href='#'>Quem somos</a>
					</li>
					<li>
						<a href='.\contatoindex.html'>Contato</a>
					</li>
					<li>
						<button
							className='button-header'
							onClick={() => {
								props.onClickLoginButton();
							}}
						>
							Entrar
						</button>
					</li>
					<li>
						<button
							className='button-header'
							onClick={() => {
								props.onClickRegisterButton();
							}}
							style={{ marginRight: '30px' }}
						>
							Registrar-se
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
}
