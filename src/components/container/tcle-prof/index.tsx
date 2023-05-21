import * as React from 'react';
import { theme } from 'src/core/theme';
import Box from '@mui/material/Box';
import { Typography, TextareaAutosize, TextField } from '@mui/material';
import { start } from 'repl';

export default function Index() {
  return (
    <Box
      sx={{
        width: 1,
        // height: '60vh',
		position:'justify',
		margin: 'auto',
	  }}
    >
		<Box
			sx={{
				// height: '100vh',
				textAlign: 'center',
				margin: '0 15vw',
				backgroundColor: theme.greyLight
			}}
		>
			<Typography
				sx={{
					color: theme.primaryColor,
					padding: '1em 0',
				}}
                variant= "h4"
			>
				Termo de Consentimento Livre e Esclarecido
			</Typography>
			
			<Box sx={{padding: '0 2em 1em'}}>

				<img style={{paddingBottom: '1em'}} alt="Logo UFPE" src="./logo-ufpe.png"/>

				<Box sx={{textAlign: 'justify'}}>
					<Typography variant='body2'
						sx={{
							textAlign: 'center',
							textIndent: '-0.1pt',
							paddingTop: '0pt',
							paddingBottom: '0pt',
							fontWeight: 700
						}}
					>
						APÊNDICE H - TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO – Módulos 1, 2 e 3 - PROFISSIONAIS
					</Typography>

					<Typography variant='body2'
						sx={{
							textAlign: 'center',
							textIndent: '-0.1pt',
							paddingTop: '0pt',
							paddingBottom: '0pt'
						}}
					>
						(PARA MAIORES DE 18 ANOS OU EMANCIPADOS)
					</Typography>

					<br/>
					<Typography variant='body2' sx={{textIndent: '14.2pt'}}>
						Convidamos o (a) Sr. (a) para participar como voluntário (a) da
						pesquisa GestBucalSD: AVALIAÇÃO DO USO DE PLATAFORMA WEB-BASED PARA
						MELHORIA DA QUALIDADE E GOVERNANÇA DOS SERVIÇOS PÚBLICOS DE SAÚDE BUCAL,
						que está sob a responsabilidade da pesquisadora Nilcema Figueiredo,
						residente na Rua José Bonifácio, 125/1602, Madalena-Recife-PE,
						CEP:50.710-435 – Telefone (81999751015) e e-mail
						(<a href="mailto:nilcema.figueiredo@ufpe.br">nilcema.figueiredo@ufpe.br</a>) para contato
						do pesquisador responsável, inclusive ligações a
						cobrar. Também participa da pesquisa, coordenando a área de
						Tecnologia da
						Informação, a pesquisadora: Amanda Maria Chaves Telefones para contato:
						(81996555073).
					</Typography>

					<Typography variant='body2' sx={{textIndent: '14.2pt'}}>
						Todas as suas dúvidas podem ser esclarecidas com o responsável por esta
						pesquisa. Apenas quando todos os esclarecimentos forem dados e você
						concorde com a realização do estudo, pedimos que aceite
						o termo presente na primeira pergunta, ele será fornecido
						por e-mail ao final da resposta.
					</Typography>

					<Typography variant='body2' sx={{textIndent: '14.2pt'}}>
						O (a) senhor (a) estará livre para decidir participar ou recusar-se.
						Caso não aceite participar, não haverá nenhum problema, desistir é um
						direito seu, bem como será possível retirar o consentimento em qualquer
						fase da pesquisa, também sem nenhuma penalidade.
					</Typography>

					<br/>
					<Typography variant='body2'
						sx={{
							textAlign: 'center',
							textIndent: '-0.1pt',
							paddingTop: '0pt',
							paddingBottom: '0pt',
							fontWeight: 700
						}}

					>
						INFORMAÇÕES SOBRE A PESQUISA:
					</Typography>

					<Typography variant='body2' sx={{fontWeight: 700}}>
						Descrição da pesquisa e esclarecimento da participação:
					</Typography>

					<Typography variant='body2'>
						Nessa pesquisa, vamos precisar que você participe de investigação
						prévia à implantação da plataforma GestBucalSD; realize a avaliação de
						qualidade do estabelecimento de saúde que trabalha e avaliação de
						satisfação profissional, caso você seja cirurgião(ã) dentista; e,
						investigação sobre o efeito do GestBucalSD no fim do projeto. Para tal,
						você acessará o(s) módulo(s) operacional(s) através da plataforma
						web-based GestBucalSD e responderá o(s) questionário(s)
						correspondente(s) a sua vinculação (periodicamente). Toda coleta de
						dados será realizada em meio on-line, onde, os participantes farão um
						cadastro na plataforma, utilizando dados pessoais como (Nome, CPF, Data
						de Nascimento, Endereço, E-mail, Sexo e Telefone), além, da criação de
						uma senha, que será armazenada e recuperada através de criptografia e
						ponta a ponta). O tempo de cada avaliação dura em média de 8 a 10
						minutos, realizada individualmente. A coleta será feita de acordo com a
						disponibilidade e vontade do participante, visto que estará disponível
						em meio on-line para preenchimento de acordo com execução da
						pesquisa.
					</Typography>

					<br/>
					<Typography variant='body2' sx={{fontWeight: 700}}>
						RISCOS:
					</Typography>

					<Typography variant='body2'>
						Esse estudo tem riscos mínimos. Os principais riscos estão relacionados
						ao manejo e proteção de dados, especialmente, por se tratar de dados
						sensíveis. Para minimizar os possíveis riscos de vazamento de dados, os
						dados de cadastro serão armazenados em banco de dados isolados, com
						senha e criptografados. O profissional pode sentir algum constrangimento
						por ter que avaliar o seu serviço, porém todas as respostas dos
						questionários serão analisadas de maneira macro, e, em sua divulgação
						não estarão ligadas a identidade do usuário as respostas. Também pode
						ocorrer o risco do desconforto, onde o profissional pode não se sentir
						confortável em receber e-mails relacionados a plataforma. Para minimizar
						tal risco o profissional pode optar por não receber notificações da
						plataforma, ou até excluir sua conta a qualquer momento que
						desejar.
					</Typography>

					<br/>
					<Typography variant='body2'>
						<span style={{fontWeight: 700}}>BENEFÍCIOS diretos/indiretos</span> para os voluntários:
					</Typography>

					<Typography variant='body2'>
						Os benefícios diretos para o profissional estão relacionados a
						adequação das condições sociais e do trabalho, melhoria de sua
						satisfação profissional, bem como, maior empoderamento técnico e
						político à sua atuação. Como benefícios indiretos, espera-se que
						aprimoramento dos estabelecimentos de saúde e consequente rede de
						atenção em saúde bucal. Os métodos avaliativos, expressam juízo de
						valor, podem levar a tomada de decisão para mudanças locais com vistas à
						melhoria da qualidade, resultando em serviços mais efetivos, promotores
						de saúde. E, o uso de ferramenta eletrônica oportuniza decisão ágil para
						governança inteligente.
					</Typography>

					<br/>
					<Typography variant='body2'>
						Esclarecemos que os participantes dessa pesquisa têm plena liberdade de
						se recusar a participar do estudo e que esta decisão não acarretará
						penalização por parte dos pesquisadores. Todas as informações desta
						pesquisa serão confidenciais e serão divulgadas apenas em eventos ou
						publicações científicas, não havendo identificação dos voluntários, a
						não ser entre os responsáveis pelo estudo, sendo assegurado o sigilo
						sobre a sua participação. Os dados coletados nesta pesquisa (respostas
						do questionário), ficarão armazenados em banco de dados seguro em nuvem
						(Herokku), sob a responsabilidade do pesquisador, no endereço (acima
						informado), pelo período de mínimo 5 anos após o término da
						pesquisa.
					</Typography>

					<Typography variant='body2'>
						Nada lhe será pago e nem será cobrado para participar desta pesquisa,
						pois a aceitação é voluntária, mas fica também garantida a indenização
						em casos de danos, comprovadamente decorrentes da participação na
						pesquisa, conforme decisão judicial ou extra-judicial. Se houver
						necessidade, as despesas para a sua participação serão assumidas pelos
						pesquisadores (ressarcimento de transporte e alimentação).
					</Typography>

					<Typography variant='body2'>
						Em caso de dúvidas relacionadas aos aspectos éticos deste estudo, o (a)
						senhor (a) poderá consultar o Comitê de Ética em Pesquisa Envolvendo
						Seres Humanos da UFPE no endereço: <span style={{fontWeight: 700}}>(Avenida da Engenharia s/n – 1º Andar, sala 4
						- Cidade Universitária,
						Recife-PE, CEP: 50740-600, Tel.: (81) 2126.8588 – e-mail:
						cephumanos.ufpe@ufpe.br).</span>
					</Typography>

					<br/>
					<br/>
					<br/>
					<Typography variant='body2' sx={{textAlign: 'center'}}>
						___________________________________________________
					</Typography>

					<Typography variant='body2'
						sx={{
							textAlign: 'center',
							textIndent: '-0.1pt',
							paddingTop: '0pt',
							paddingBottom: '0pt'
						}}
					>
						(assinatura do pesquisador)
					</Typography>

					<br/>
					<br/>
					<Typography variant='body2'
						sx={{
							textAlign: 'center',
							textIndent: '-0.1pt',
							paddingTop: '0pt',
							paddingBottom: '0pt',
							fontWeight: 700
						}}
					>
						CONSENTIMENTO DA PARTICIPAÇÃO DA PESSOA COMO VOLUNTÁRIO (A)
					</Typography>

					<Typography variant='body2'>
						Eu, _____________________________________, CPF _________________,
						abaixo assinado, após a leitura (ou a escuta da leitura) deste documento
						e de ter tido a oportunidade de conversar e ter esclarecido as minhas
						dúvidas com o pesquisador responsável, concordo em participar do estudo
						pesquisa GestBucalSD: AVALIAÇÃO DO USO DE PLATAFORMA WEB-BASED PARA
						MELHORIA DA QUALIDADE E GOVERNANÇA DOS SERVIÇOS PÚBLICOS DE SAÚDE BUCAL,
						como voluntário (a). Fui devidamente informado (a) e esclarecido (a)
						pelo(a) pesquisador (a) sobre a pesquisa, os procedimentos nela
						envolvidos, assim como os possíveis riscos e benefícios decorrentes de
						minha participação. Foi-me garantido que posso retirar o meu
						consentimento a qualquer momento, sem que isto leve a qualquer
						penalidade (ou interrupção de meu acompanhamento/
						assistência/tratamento).
					</Typography>
				</Box>
			</Box>
			
			{/* <embed
				src='./pdfs/TCLE.pdf'
				type="application/pdf"
				// TODO: Ajustar height e width
				width="95%"
				height="85%"
			/> */}
		</Box>
	</Box>
  );
}