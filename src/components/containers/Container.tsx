//TODO: Melhorar essa tela.
export default function Container(props: any) {
	return (
		<div className='card-lista'>
			<div className='card'>
				<p>
					É desafio atual para a governança dos estabelecimentos públicos de saúde a tomada de decisão ágil e oportuna, pautada na evidência científica,
					possibilitando melhoria de qualidade e promoção de saúde no Sistema Único de Saúde (SUS). A gestão da informação em saúde e a inovação em saúde
					digital podem ser solução.
				</p>
				<p>
					O grupo de pesquisa GestBucal (CNPq), composto de pesquisadores, estudantes de graduação e pós-graduação, tem caráter multidisciplinar e
					intersetorial, tem operacionalizado através do Observatório de Saúde Bucal/UFPE projetos junto a rede de atenção em saúde bucal do SUS para
					amplificação da saúde digital.
				</p>
				<p>
					Apresentamos, a plataforma GestBucalSD, que é uma ferramenta web-based de autoprocessamento de dados, a qual possui módulos operacionais para
					avaliação e vigilância em saúde bucal.
				</p>
				<p>O seu uso possibilitará a governança inteligente e melhoria da qualidade dos estabelecimentos de saúde da rede de atenção em saúde bucal.</p>
			</div>

			<div className='inner-part'>
				<div className='content content-1'>
					<span>Questionários</span>
					<div className='title'>Acesse aqui os questionários</div>
					<div className='text'>Responda aos questionários de acordo com ser perfil</div>
					<a href='.\questionarioceo.html'>
						<button>Saiba mais</button>
					</a>
				</div>
			</div>

			<div className='inner-part'>
				<div className='content content-2'>
					<span>Referências</span>
					<div className='title'>Acesse aqui as referências</div>
					<div className='text'>Saiba quais referências foram utilizadas para a elaboração dos questionários disponíveis no projeto.</div>
					<a href='.\acervoinicio.html'>
						<button>Saiba mais</button>
					</a>
				</div>
			</div>

			<div className='inner-part'>
				<div className='content content-3'>
					<span>Contato</span>
					<div className='title'>Entre em contato conosco</div>
					<div className='text'>
						Tem dúvidas sobre o projeto, questionários ou sobre qualquer outro assunto relacionado? Acesse a página de contatos e nos mande suas dúvidas.
					</div>
					<a href='.\contatoindex.html'>
						<button>Saiba mais</button>
					</a>
				</div>
			</div>
		</div>
	);
}
