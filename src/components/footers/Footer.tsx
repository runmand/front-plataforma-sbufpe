export default function Footer(props: any) {
	return (
		<footer>
			<div className='menu'>
				<div className='textos'>
					<ul>
						<h3>GestBucal</h3>
						<li>
							<a href='.\inicio.html'>Início</a>
						</li>
						<li>
							<a href='.\acervoinicio.html'>Acervo</a>
						</li>
						<li>
							<a href='.\quemsomos.html'>Quem somos</a>
						</li>
						<li>
							<a href='.\contatoindex.html'>Contato</a>
						</li>
					</ul>
					<ul>
						<h3>Endereço</h3>
						<li>
							{/* <a
								href='https://goo.gl/maps/15PdF3D4uSJsjGQv6'
								target='_blank'
								rel='noreferrer'
							>
								<p>Avenida Prof. Moraes Rego, 1235</p>
								<p>Cidade Universitária, Recife</p>
								<p>PE, 50670-901</p>
							</a> */}
						</li>
					</ul>
					<ul>
						<h3>Contato</h3>
						<li>(81) 3194-4900</li>
						<li>(81) 3038-6405</li>
					</ul>
				</div>
			</div>
			<div className='dominio'>
				<div className='autoria'>
					{/* <a
						href='https://www.ufpe.br/'
						target='_blank'
						rel='noreferrer'
					>
						UFPE
					</a> */}
				</div>
				<div className='copyright'>2022 Copyright &copy; GestBucal</div>
			</div>
		</footer>
	);
}
