import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { theme } from 'src/core/theme';
import { Paper } from '@mui/material';
import { secundaryColor } from 'src/core/colors';
import { Padding } from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Index() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', margin:'auto'}}>
      <Box sx={{ borderBottom: 1,display:'flex',justifyContent:'center'}}>
        <Tabs value={value} onChange={handleChange} aria-label="TCLE - GESTBUCAL">
          <Tab label="PROFISSIONAIS" {...a11yProps(0)} />
          <Tab label="USUÁRIOS" {...a11yProps(1)} />

        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
				<Paper 
					sx={{
						width:'100%',
						padding:'1rem'
					}}
					elevation={6}>
						<Typography
							sx={{
								textAlign:'center',
								fontSize:'1.3rem',
								paddingY:'1rem'
							}}>TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO – Módulos 1, 2 e 3 - PROFISSIONAIS</Typography>
						<Typography
							sx={{
							textAlign: 'justify',
							textIndent:'2rem'
							}}>
						Convidamos o (a) Sr. (a) para participar como voluntário (a) da pesquisa GestBucalSD: AVALIAÇÃO DO USO DE PLATAFORMA WEB-BASED PARA MELHORIA DA QUALIDADE E GOVERNANÇA DOS SERVIÇOS PÚBLICOS DE SAÚDE BUCAL, que está sob a responsabilidade da pesquisadora Nilcema Figueiredo, residente na Rua José Bonifácio, 125/1602, Madalena-Recife-PE, CEP:50.710-435 Telefone (81999751015) e e-mail (nilcema.figueiredo@ufpe.br) para contato do pesquisador responsável, inclusive ligações a cobrar. Também participa da pesquisa, coordenando a área de Tecnologia da Informação, a pesquisadora: Amanda Maria Chaves Telefones para contato: (81996555073).
						</Typography>
						<Typography
							sx={{
								textAlign: 'justify',
								textIndent:'2rem'
								}}>
						Todas as suas dúvidas podem ser esclarecidas com o responsável por esta pesquisa. Apenas quando todos os esclarecimentos forem dados e você concorde com a realização do estudo, pedimos que aceite o termo presente na primeira pergunta, ele será fornecido por e-mail ao final da resposta.
						</Typography>
						<Typography
							sx={{
								textAlign: 'justify',
								textIndent:'2rem'
								}}>
						O (a) senhor (a) estará livre para decidir participar ou recusar-se. Caso não aceite participar, não haverá nenhum problema, desistir é um direito seu, bem como será possível retirar o consentimento em qualquer fase da pesquisa, também sem nenhuma penalidade.
						</Typography>
						<Typography
						sx={{
							textAlign: 'justify',
							textIndent:'2rem'
							}}>
						Descrição da pesquisa e esclarecimento da participação:Nessa pesquisa, vamos precisar que você participe de investigação prévia à implantação da plataforma GestBucalSD; realize a avaliação de qualidade do estabelecimento de saúde que trabalha e avaliação de satisfação profissional, caso você seja cirurgião(ã) dentista; e, investigação sobre o efeito do GestBucalSD no fim do projeto. Para tal, você acessará o(s) módulo(s) operacional(s) através da plataforma web-based GestBucalSD e responderá o(s) questionário(s) correspondente(s) a sua vinculação (periodicamente). Toda coleta de dados será realizada em meio on-line, onde, os participantes farão um cadastro na plataforma, utilizando dados pessoais como (Nome, CPF, Data de Nascimento, Endereço, E-mail, Sexo e Telefone), além, da criação de uma senha, que será armazenada e recuperada através de criptografia e ponta a ponta). O tempo de cada avaliação dura em média de 8 a 10 minutos, realizada individualmente. A coleta será feita de acordo com a disponibilidade e vontade do participante, visto que estará disponível em meio on-line para preenchimento de acordo com execução da pesquisa.
						</Typography>
						<Typography
						sx={{
							textAlign: 'justify',
							textIndent:'2rem'
							}}>
						RISCOS:Esse estudo tem riscos mínimos. Os principais riscos estão relacionados ao manejo e proteção de dados, especialmente, por se tratar de dados sensíveis. Para minimizar os possíveis riscos de vazamento de dados, os dados de cadastro serão armazenados em banco de dados isolados, com senha e criptografados. O profissional pode sentir algum constrangimento por ter que avaliar o seu serviço, porém todas as respostas dos questionários serão analisadas de maneira macro, e, em sua divulgação não estarão ligadas a identidade do usuário as respostas. Também pode ocorrer o risco do desconforto, onde o profissional pode não se sentir confortável em receber e-mails relacionados a plataforma. Para minimizar tal risco o profissional pode optar por não receber notificações da plataforma, ou até excluir sua conta a qualquer momento que desejar.
						</Typography>
						<Typography
						sx={{
							textAlign: 'justify',
							textIndent:'2rem'
							}}>
						BENEFÍCIOS diretos/indiretos para os voluntários: Os benefícios diretos para o profissional estão relacionados a adequação das condições sociais e do trabalho, melhoria de sua satisfação profissional, bem como, maior empoderamento técnico e político à sua atuação. Como benefícios indiretos, espera-se que aprimoramento dos estabelecimentos de saúde e consequente rede de atenção em saúde bucal. Os métodos avaliativos, expressam juízo de valor, podem levar a tomada de decisão para mudanças locais com vistas à melhoria da qualidade, resultando em serviços mais efetivos, promotores de saúde. E, o uso de ferramenta eletrônica oportuniza decisão ágil para governança inteligente
						</Typography>
						<Typography
						sx={{
							textAlign: 'justify',
							textIndent:'2rem'
							}}>
						Esclarecemos que os participantes dessa pesquisa têm plena liberdade de se recusar a participar do estudo e que esta decisão não acarretará penalização por parte dos pesquisadores. Todas as informações desta pesquisa serão confidenciais e serão divulgadas apenas em eventos ou publicações científicas, não havendo identificação dos voluntários, a não ser entre os responsáveis pelo estudo, sendo assegurado o sigilo sobre a sua participação. Os dados coletados nesta pesquisa (respostas do questionário), ficarão armazenados em banco de dados seguro em nuvem (Herokku), sob a responsabilidade do pesquisador, no endereço (acima informado), pelo período de mínimo 5 anos após o término da pesquisa.Nada lhe será pago e nem será cobrado para participar desta pesquisa, pois a aceitação é voluntária, mas fica também garantida a indenização em casos de danos, comprovadamente decorrentes da participação na pesquisa, conforme decisão judicial ou extra-judicial. Se houver necessidade, as despesas para a sua participação serão assumidas pelos pesquisadores (ressarcimento de transporte e alimentação). Em caso de dúvidas relacionadas aos aspectos éticos deste estudo, o (a) senhor (a) poderá consultar o Comitê de Ética em Pesquisa Envolvendo Seres Humanos da UFPE no endereço: (Avenida da Engenharia s/n – 1º Andar, sala 4 - Cidade Universitária, Recife-PE, CEP: 50740-600, Tel.: (81) 2126.8588 – e-mail: cephumanos.ufpe@ufpe.br).

						</Typography>
				</Paper>
      </TabPanel>
      <TabPanel value={value} index={1}>
			<Paper 
					sx={{
						width:'100%',
						padding:'1rem'
					}}
					elevation={6}>
						<Typography
							sx={{
								textAlign:'center',
								fontSize:'1.3rem',
								paddingY:'1rem'
							}}>TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO</Typography>
						<Typography
							sx={{
							textAlign: 'justify',
							textIndent:'2rem'
							}}>
						Convidamos o (a) Sr. (a) para participar como voluntário (a) da pesquisa GestBucalSD: AVALIAÇÃO DO USO DE PLATAFORMA WEB-BASED PARA MELHORIA DA QUALIDADE E GOVERNANÇA DOS SERVIÇOS PÚBLICOS DE SAÚDE BUCAL – Módulo 3 - Usuário, que está sob a responsabilidade da pesquisadora Nilcema Figueiredo, residente na Rua José Bonifácio, 125/1602, Madalena-Recife-PE, CEP:50.710-435 – Telefone (81999751015) e e-mail (nilcema.figueiredo@ufpe.br)  para contato do pesquisador responsável, inclusive ligações a cobrar. Também participam desta pesquisa os pesquisadores:(Amanda Maria Chaves) Telefones para contato: (81996555073).
						</Typography>
						<Typography
							sx={{
								textAlign: 'justify',
								textIndent:'2rem'
								}}>
						Todas as suas dúvidas podem ser esclarecidas com o responsável por esta pesquisa. Apenas quando todos os esclarecimentos forem dados e você concorde com a realização do estudo, pedimos que rubrique as folhas e assine ao final deste documento, que está em duas vias. Uma via será entregue e a outra ficará com o pesquisador responsável
						</Typography>
						<Typography
							sx={{
								textAlign: 'justify',
								textIndent:'2rem'
								}}>
						O (a) senhor (a) estará livre para decidir participar ou recusar-se. Caso não aceite participar, não haverá nenhum problema, desistir é um direito seu, bem como será possível retirar o consentimento em qualquer fase da pesquisa, também sem nenhuma penalidade.
						</Typography>
						<Typography
						sx={{
							textAlign: 'justify',
							textIndent:'2rem'
							}}>
						Descrição da pesquisa e esclarecimento da participação:Nessa pesquisa, vamos precisar que você realize avaliação de satisfação sobre os serviços de saúde bucal a partir da sua experiência com o estabelecimento de saúde que você tem sido atendido/terminou tratamento. Para tal, você responderá formulário/questionário de avaliação de satisfação do usuário da plataforma web-based GestBucalSD (entrevista ou uso direto da plataforma). Toda coleta de dados será realizada em meio on-line, onde, os entrevistadores/usuários farão cadastro na plataforma, utilizando dados pessoais como (Nome, CPF, Data de Nascimento, Endereço, E-mail, Sexo e Telefone), além, da criação de uma senha, que será armazenada e recuperada através de criptografia e ponta a ponta). Após o cadastro do módulo 4, o participante será convidado a responder a um formulário/questionário, com duração média de 8 a 10 minutos, de maneira individual. A coleta será feita de acordo com a disponibilidade e vontade do usuário em caráter presencial ou remoto.

						</Typography>
						<Typography
						sx={{
							textAlign: 'justify',
							textIndent:'2rem'
							}}>
						RISCOS:Os principais riscos estão relacionados ao manejo e proteção de dados, especialmente, por se tratar de dados sensíveis aos usuários. Para minimizar os possíveis riscos de vazamento de dados, os dados de cadastro serão armazenados em banco de dados isolados, com senha e criptografados. Todas as respostas dos formulários serão analisadas de maneira macro, e, em sua divulgação não estarão ligadas a identidade do usuário as respostas. O usuário pode não se sentir confortável em responder algumas perguntas, para minimizar tal risco o usuário pode optar por pedir esclarecimentos ou não as responder. 
						</Typography>
						<Typography
						sx={{
							textAlign: 'justify',
							textIndent:'2rem'
							}}>
						BENEFÍCIOS diretos/indiretos para os voluntários:Os benefícios diretos aos usuários são a adequação dos serviços as suas necessidades, incremento na satisfação ao longo do tempo, melhoria da qualidade dos serviços, bem como, maior empoderamento técnico e político à sua atuação. Como benefícios indiretos, espera-se que os resultados da pesquisa tenham a potencialidade de aprimorar os estabelecimentos de saúde e consequente rede de atenção em saúde bucal, contribuindo também para estudos de satisfação do usuário, podendo determinar padrões e métricas de satisfação. O efeito dos serviços na satisfação do usuário é considerado avaliação de resultados, têm o poder de auxiliar a tomada de decisão evidenciando a ótica do usuário e com o uso de ferramenta eletrônica, ser ágil e oportuno para governança inteligente.
						</Typography>
						<Typography
						sx={{
							textAlign: 'justify',
							textIndent:'2rem'
							}}>
						Esclarecemos que os participantes dessa pesquisa têm plena liberdade de se recusar a participar do estudo e que esta decisão não acarretará penalização por parte dos pesquisadores. Todas as informações desta pesquisa serão confidenciais e serão divulgadas apenas em eventos ou publicações científicas, não havendo identificação dos voluntários, a não ser entre os responsáveis pelo estudo, sendo assegurado o sigilo sobre a sua participação. Os dados coletados nesta pesquisa (respostas do questionário), ficarão armazenados em banco de dados seguro em nuvem (Herokku), sob a responsabilidade do pesquisador, no endereço (acima informado), pelo período de mínimo 5 anos após o término da pesquisa.Nada lhe será pago e nem será cobrado para participar desta pesquisa, pois a aceitação é voluntária, mas fica também garantida a indenização em casos de danos, comprovadamente decorrentes da participação na pesquisa, conforme decisão judicial ou extra-judicial. Se houver necessidade, as despesas para a sua participação serão assumidas pelos pesquisadores (ressarcimento de transporte e alimentação). Em caso de dúvidas relacionadas aos aspectos éticos deste estudo, o (a) senhor (a) poderá consultar o Comitê de Ética em Pesquisa Envolvendo Seres Humanos da UFPE no endereço: (Avenida da Engenharia s/n – 1º Andar, sala 4 - Cidade Universitária, Recife-PE, CEP: 50740-600, Tel.: (81) 2126.8588 – e-mail: cephumanos.ufpe@ufpe.br).

						</Typography>
				</Paper>
      </TabPanel>

    </Box>
  );
}