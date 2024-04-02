/* eslint-disable react/no-unescaped-entities */
import Base from '@components/base-layout/index';
import Appbar from '@components/app-bar/index';
import HomeToolbar from '@components/toolbar/home';
import { Box, Button, FormLabel, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { theme } from 'src/core/theme';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PlanejaQuestion } from '@components/planeja';
import { planejaTable01, planejaTable02, planejaTable03, planejaTable04, planejaTable05, planejaTable06 } from 'src/shared/dataBase';
// import apiPaneja from 'src/core/apiPlaneja';

export default function Index() {
  const [justify07, setJustify07] = useState('');
  // const questionQTY = document.getElementsByTagName('PlanejaQuestion');
  // const data = new apiPaneja();
  const [page, setPage] = useState(0);


  function pageable(numPage: number, page: number) {
    if (numPage == page) {
      return false;
    } else {
      return true;
    }
  }

  // function submitPlaneja() {
  //   for(let i = 1; i <= questionQTY.length;  i++) {
  //     const questionIndex = document.getElementById(`question${i}`);
  //     data.answerQuestion(questionIndex, , res.data);
  //   }
  // }

  return (
    <Base
      appBarChild={<Appbar toolbarChild={<HomeToolbar />} />}
      mainContainerChild={
        <Box sx={{
          width: '85%',
          marginY:'6rem',
          display: 'flex',
          marginX:'auto',
          flexDirection: 'column',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          paddingY: '20px'
        }}>

          {/* Página 1 */}
          <Box hidden={pageable(0, page)}>
            <Typography
              sx={{
                textAlign:'center',
                margin:'auto',
                paddingBottom:'2rem',
                fontWeight:'bold'
              }}
              >
                Olá! Bem-vindo (a) ao PlanejaSD!
            </Typography>
            <Typography
              sx={{
                textAlign:'justify'
              }}
            >
              Para a execução deste módulo operacional da plataforma GestBucalSD, propomos uma qualificação profissional teórico-prática - autoinstrucional em planejamento sistematizado de ações em saúde bucal, inclusive com garantia de certificação, como curso de extensão (30h). Portanto, você terá disponível o PlanejaSD-componente teórico e PlanejaSD-componente prático. <br />Vamos vivenciar o planejamento de ações em saúde bucal, entendendo o ato de planejar como reduzir incertezas.<br />Discutiremos aqui os principais conceitos e instrumentos relacionados ao planejamento no âmbito do Sistema Único de Saúde (SUS), compreendendo-o principalmente com de âmbito local.<br />Trabalharemos as seguintes temáticas:<br /> ●	Conceito de planejamento;<br /> ●	Tipos de Planejamento;<br /> ●	Planejamento Estratégico Situacional (PES) e Planejamento participativo;<br /> ●	Processo decisório;<br /> ●	Definições dos instrumentos de planejamento e gestão no Sistema Único de Saúde (SUS) (Plano de Saúde – PS, Programação Anual de Saúde – PAS, Relatório Detalhado do Quadrimestre Anterior – RDQA, Relatório Anual de Gestão – RAG) e a sua importância no contexto do planejamento no SUS;<br /> ●	Planejamento local em saúde no contexto das Redes de Atenção à Saúde (RAS).<br /><br />Espera-se que após o cumprimento do PlanejaSD-componente teórico, você realize na prática baseada do PES a construção de um Plano de Ação em Saúde Bucal (PA-SB). com o uso do PlanejaSD e demais dados da plataforma GestBucalSD. O componente teórico deve ser feito em caráter individual, mas a prática pode (e deve) envolver outros membros da equipe e ainda outros atores sociais implicados em nível local, se possível.<br /><br />Certificação: a certificação será emitida para cada participante, após o cumprimento de atividades individuais formativas através do preenchimento de respostas as perguntas condutoras do componente teórico e da avaliação somativa (individual ou equipe profissional local), pela construção do Plano de Ação em Saúde Bucal (PA-SB).<br />A equipe do projeto estará disponível, para assessorá-los, através de agendamento prévio, numa perspectiva de ações de Telessaúde: telemonitoramento ao Planejamento, gestão e avaliação em saúde.
            </Typography>
            <Button color="success" variant="contained" endIcon={<ArrowForwardIcon />}
              onClick={() => {setPage(1)}}>Vamos começar!</Button>
          </Box>

          {/* Página 2 */}
          <Box hidden={pageable(1, page)}>
            <Typography
              sx={{
                margin:'auto',
                paddingBottom:'2rem',
                fontWeight:'bold'
              }}
            >
              1.	PLANEJAMENTO EM SAÚDE
            </Typography>
            <Typography
              sx={{
                textAlign:'justify'
              }}
            >
              Pode-se compreender o planejamento como uma prática social que é ao mesmo tempo técnica, política, econômica e ideológica. É um processo de transformação de uma situação em outra, levando em consideração uma dada finalidade e recorrendo a instrumentos (meios de trabalho tais como técnicas e saberes) e a atividades (trabalho propriamente dito), sob determinadas relações sociais, em uma dada organização (PAIM, 2002, 2006). Além de um requisito previsto em legislação, o planejamento no âmbito do Sistema Único de Saúde (SUS) se constitui como um dos mecanismos relevantes que visam assegurar a unidade e os princípios constitucionais do SUS, uma vez que expressa as responsabilidades dos gestores em cada esfera de governo no que se refere à saúde da população e à integração da organização sistêmica. Assim, o ato de planejar exige que haja conhecimento técnico, o qual se expressa em instrumentos e ferramentas que são desenvolvidas em processos de trabalho (BRASIL, 2016).Vale aqui sinalizar, entretanto, que ao longo da história diferentes noções a respeito do que é o planejamento emergiram, e a seguir estudaremos um pouco mais sobre
            </Typography>
            <PlanejaQuestion
              id={1}
              title={'Você e sua equipe realizam algum tipo de planejamento na sua rotina de trabalho ?'}
              yesDescr={'Quais foram as ações feitas?'}
              noDescr={'Por quê?'}
              noHasJustify={true}
            />
            <Typography
              sx={{
                textAlign:'justify',
                paddingBottom:'1rem'
              }}
            >
              Sabemos que essa questão já foi abordada como indicador avaliativo do GestBucalSD, mas aqui vocês poderão aprofundar essa reflexão para à ação. A importância da realização do planejamento pode ser vista já no senso comum, onde o ato de planejar está ligado à organização de atividades, à busca por melhores resultados. Uma ação planejada é uma ação não improvisada (WERNECK, 2012) e, no geral, pode-se afirmar que planejar é reduzir incertezas, o que leva a algum grau de intervenção na economia, orientando investimentos e estando vinculado à alocação eficiente de recursos e à busca por melhores resultados. Na saúde, as práticas de planejamento estão presentes em todo o processo de gestão do Sistema Único de Saúde (BRASIL, 2016), desde níveis mais locais e seus microterritórios até a esfera federal.
            </Typography>
            <Stack direction='row'>
              <Button color="error" variant="contained" startIcon={<ArrowBackIcon />}
                onClick={() => {setPage(0)}}>Voltar</Button>
              <Button color="success" variant="contained" endIcon={<ArrowForwardIcon />}
                onClick={() => {setPage(2)}}>Continuar</Button>
            </Stack>
          </Box>

          {/* Página 3 */}
          <Box hidden={pageable(2, page)}>
            <Typography
              sx={{fontWeight:'bold',paddingBottom:'1rem'}}
            >
              1.1.	PLANEJAMENTO NORMATIVO
            </Typography>
            <Typography
              sx={{textAlign:'justify'}}
            >
              Em 1965, Mário Testa, em conjunto com a Organização Pan-Americana da Saúde (OPAS) e o Centro de Estudos para o Desenvolvimento Econômico e Saúde (CENDES) introduziu o chamado Método CENDES/OPAS, considerado o marco inicial do planejamento na América Latina. Esse se constituiu numa forma de programação sanitária onde o desenvolvimento de métodos e técnicas de programação social impunham mudanças racionalmente planejadas como alternativa para a crise social. Esse método, também denominado de planejamento normativo, representa o marco inicial do desenvolvimento do planejamento em saúde na América Latina. A lógica interna do método CENDES/OPAS tem por base ser economicista e administrativo, a partir da ideia da eficiência na utilização dos recursos disponíveis e teve por principais características:<br/>●	Uma visão ecológica (geral) do processo saúde-doença para a aplicação do diagnóstico, onde as prioridades são tratadas de acordo com a análise custo/benefício numa perspectiva economicista que tem por objetivo aumentar a eficiência na prestação de serviços, em termos de quantidade, alinhada à redução de custos (LANA; GOMES, 1996);<br/>●	Não considera as causas sociais dos problemas (LANA; GOMES, 1996), uma vez que separa o sujeito do objeto de atuação (LACERDA; BOTELHO; COLUSSI, 2013);<br/>●	A sociedade é resumida a comportamentos previsíveis e ausência de incertezas (LACERDA; BOTELHO; COLUSSI, 2013);<br/>●	A garantia de êxito do planejamento quando seguidos à risca os cálculos previstos (LACERDA; BOTELHO; COLUSSI, 2013). O modelo conduzido pela OPAS perdeu importância ao longo do tempo por fatores relacionados à dificuldade na obtenção de informações adequadas e ao foco na produtividade e eficiência econômica. Nesse sentido, as abordagens relacionadas ao planejamento estratégico e as práticas da programação em saúde se disseminaram e ganharam força (BRASIL, 2016).
            </Typography>
            <PlanejaQuestion
              id={2}
              title={'Agora que estudamos um pouco sobre o Planejamento Normativo, você consegue observar se algumas dessas características estão presentes na sua rotina de trabalho da Unidade de Saúde à qual você está vinculado?'}
              yesDescr={'Quais?'}
              noDescr={'Por quê?'}
              noHasJustify={true}
            />
            <Typography
              sx={{
                textAlign:'justify',
                paddingBottom:'1rem'}}
            >
              O enfoque normativo do planejamento na área da saúde caracteriza-se como um enfoque basicamente descritivo, fundamentado no levantamento de informações e sistematização de variáveis demográficas, epidemiológicas e sociais para a construção de indicadores de saúde e, consequentemente, fazer um diagnóstico. É possível verificar a influência do planejamento normativo no trabalho cotidiano dos estabelecimentos de saúde da rede de atenção em saúde bucal, a qual busca alcançar os objetivos das secretarias de saúde de acordo com as metas estabelecidas pelo Ministério da Saúde. Nesse sentido, destacam-se que, por vezes, as exigências sobre as metas a serem alcançadas com relação às instalações físicas, aos recursos humanos e financeiros, equipamentos e materiais de consumo, às políticas e aos programas (imunizações, saúde da mulher, saúde da criança, saúde adulto e idoso, saúde bucal e vigilância epidemiológica), que acabam por engessar algumas iniciativas, limitando as adaptações necessárias às características locais e aumentando a distância dos resultados desejados.
            </Typography>
            <Stack direction='row'>
              <Button color="error" variant="contained" startIcon={<ArrowBackIcon />}
                onClick={() => {setPage(1)}}>Voltar</Button>
              <Button color="success" variant="contained" endIcon={<ArrowForwardIcon />}
                onClick={() => {setPage(3)}}>Continuar</Button>
            </Stack>
          </Box>

          {/* Página 4 */}
          <Box hidden={pageable(3, page)}>
            <Typography
              sx={{fontWeight:'bold'}}
            >
              1.2. PLANEJAMENTO	ESTRATÉGICO
            </Typography>
            <Typography sx={{paddingY:'1rem',textAlign:'justify'}}>O Planejamento Estratégico pode ser reconhecido como um modo de planejar que não se reduz à elaboração de um plano de ação, mas considera refletir sobre aspectos organizacionais e variáveis que podem exercer influência interna e externa na execução do plano. Nesse sentido, considera elementos estratégicos presentes na dinâmica organizacional, tendo por objetivo compreendê-los e aprovisionar sua concretização e melhoria (PARENTE, 2011). Esse modelo, ainda, considera as relações entre os atores políticos e instituições como arena de disputa de poder, analisando-as a partir da ótica e equilíbrios de poder (MATUS, 1993).<br /><br />
            <Typography sx={{fontWeight:'bold'}}>
            SAIBA MAIS!
            </Typography>Para saber mais detalhes sobre o Planejamento Estratégico, indicamos a leitura do seguinte artigo:<br />●GIOVANELLA. Planejamento estratégico em saúde: uma discussão da abordagem de Mário Testa. Cadernos de Saúde Pública, v. 2, n. 6, 1990.
            <a style={{color:theme.primaryColor}} href='https://www.scielo.br/j/csp/a/y9Jxy9qpphd6YGnMyJRYTyq/?lang=pt' target='blank'>
            Disponível em: https://www.scielo.br/j/csp/a/y9Jxy9qpphd6YGnMyJRYTyq/?lang=pt
            </a></Typography>
            <Stack direction='row'>
              <Button color="error" variant="contained" startIcon={<ArrowBackIcon />}
                onClick={() => {setPage(2)}}>Voltar</Button>
              <Button color="success" variant="contained" endIcon={<ArrowForwardIcon />}
                onClick={() => {setPage(4)}}>Continuar</Button>
            </Stack>
          </Box>

          {/* Página 5 */}
          <Box hidden={pageable(4, page)}>
            <Typography 
              sx={{
                fontWeight:'bold',
                paddingBottom:'1rem'
              }}
            >
              1.3. PLANEJAMENTO ESTRATÉGICO SITUACIONAL (PES)
            </Typography>
            <Typography
              sx={{
                textAlign:'justify'
              }}
            >
              O Planejamento Estratégico Situacional (PES) se configura como uma das soluções de planejamento em saúde que emergiu enquanto o Método CENDES/OPAS perdia a relevância (BRASIL, 2016).<br />Mario Testa e Carlos Matus foram fundamentais na introdução do PES com suas discussões. A partir do fracasso de movimentos populares e da ideologia de governos autoritários, ambos enfatizaram a necessidade de discutir questões relacionadas ao poder e à ideologia e Testa, avançando ao propor que o planejamento em saúde deve estar atento às relações de poder existentes na organização das práticas em saúde, sendo o poder constituído como uma categoria explicativa da realidade (WERNECK, 2012).<br />Demonstrando preocupação com a elaboração de instrumentos de condução que confiram maior governabilidade a um sistema político, Matus propôs o PES enquanto um método de planejamento que considera a "situação" como o lugar em que estão os atores e suas ações. Esse método de processamento de problemas é estruturado em quatro momentos: explicativo, normativo, estratégico e tático-operacional (WERNECK, 2012) (Quadro 01). Na figura 1, você pode observar os principais passos para execução desses momentos.<br />Quadro 1 - Momentos do Planejamento Estratégico Situacional.
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>MOMENTO</TableCell>
                  <TableCell>DESCRIÇÃO</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {planejaTable01.map((row) => (
                  <TableRow key={row.title}>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography 
              sx={{paddingY:'1rem'}}
            >
              Fonte: Adaptado de Camargo et al. (2020), Kleba, Krauser e Vendruscolo (2011) e Werneck (2012).
            </Typography>
            <Typography>Figura 1 - 10 Passos do PES</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>PASSOS</TableCell>
                  <TableCell>MOMENTOS DO PES</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {planejaTable02.map((row) => (
                  <TableRow key={row.moment}>
                    <TableCell>{row.steps}</TableCell>
                    <TableCell>{row.moment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography 
              sx={{
                textAlign:'justify',
                paddingTop:'1rem'
              }}
            >
              O método PES é particularmente potente para o nível de direção central, onde se enfrentam problemas de alta complexidade. Ele admite que a explicação da realidade depende da inserção de cada ator que participa do problema, sendo, assim, parcial e múltiplo. É um método que responde fundamentalmente às questões de ordem política, com envolvimento de outros atores, além daqueles diretamente relacionados com as ações de assistência à saúde, como, por exemplo, representantes da sociedade civil, empresários, políticos, secretários da Saúde e prefeitos de outros municípios (TANCREDI; BARRIOS; FERREIRA, 1998; AGUIAR et al., 2006).<br />Nesse sentido, esse método de planejamento assume uma postura de maior complexidade. Esse tipo de gestão é, portanto, caracterizado pela incerteza, onde (LACERDA; BOTELHO; COLUSSI, 2013):<br />●	O sujeito, que é parte de um todo social, e o objeto de atuação se confundem;<br />●	Há inexistência de um único diagnóstico situacional, uma vez que considera as diferentes visões, valores, interesses e posições de cada grupo social envolvido no contexto;<br />●	Considera que o comportamento dos sujeitos não pode ser reduzido meramente às respostas prévias.
            </Typography>
            <PlanejaQuestion
              id={3}
              title={'Você consegue perceber ações e/ou componentes do Planejamento Estratégico Situacional (PES) realizados no contexto da sua Unidade de Saúde e/ou município ?'}
              yesDescr={'Quais?'}
              noDescr={'Por quê?'}
              noHasJustify={true}
            />
            <Typography
              sx={{textAlign:'justify'}}
            >
              O PES tem como uma de suas características a adoção de práticas, que efetivam a participação popular e promovem a cooperação, o compartilhamento, transparência e protagonismo social como formas de promover o exercício democrático e a cidadania. A gestão participativa, nas Unidades e demais serviços de saúde, pressupõe a ampliação de arranjos organizacionais que estimulem a participação de sujeitos e de coletivos no gerenciamento de ações e práticas políticas do controle social.<br />No entanto, a participação da população no processo de planejamento em saúde ainda é incipiente. Deste modo, ampliar os espaços de participação social e reivindicar que usuários e trabalhadores atuem em associação com os gestores, no processo de planejamento social, tem sido um desafio para o planejamento participativo na Atenção Primária à Saúde. <br />Vale destacar que o SUS preconiza o modelo do PES desde o final da década de 1980 (BRASIL, 2016; FERREIRA; SILVA; MIYASHIRO, 2017), e, dessa forma, o ideal é que sejam observados elementos desse tipo de planejamento no âmbito da sua Unidade de Saúde e/ou município.
            </Typography>
            <Typography>Veja a seguir um quadro comparativo que distingue as características do planejamento normativo e planejamento estratégico.</Typography>
            <Typography
              sx={{paddingY:'1rem'}}
            >Quadro 02 - Planejamento normativo X Planejamento Estratégico.</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>PLANEJAMENTO NORMATIVO</TableCell>
                  <TableCell>PLANEJAMENTO ESTRATÉGICO</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {planejaTable03.map((row) => (
                  <TableRow key={row.normative}>
                    <TableCell>{row.normative}</TableCell>
                    <TableCell>{row.strategic}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography
              sx={{
                textAlign:'justify',
                paddingTop:'1rem'
              }}
            >
              Fonte: Adaptado de Lacerda, Botelho e Colussi (2013) e Santana e Tahana (2008).
            </Typography>
            <Typography 
              sx={{
                textAlign:'justify',
                paddingY:'1rem'
              }}
            >
              SAIBA MAIS!<br />Para saber mais detalhes sobre o Planejamento Estratégico Situacional sugerimos a leitura do seguinte texto:<br />●<a style={{
                color:theme.primaryColor
              }} href='https://www.arca.fiocruz.br/handle/icict/39910' target='blank'>FERREIRA; SILVA; MIYASHIRO. Planejamento em Saúde. In: GONDIM; CHRISTÓFARO; MIYASHIRO. Técnico de Vigilância em Saúde. Fundamentos. Rio de Janeiro: FIOCRUZ, 2017. p.137-164.<br />Disponível em: https://www.arca.fiocruz.br/handle/icict/39910
                </a></Typography>
            <Stack direction='row'>
              <Button color="error" variant="contained" startIcon={<ArrowBackIcon />}
                onClick={() => {setPage(3)}}>Voltar</Button>
              <Button color="success" variant="contained" endIcon={<ArrowForwardIcon />}
                onClick={() => {setPage(5)}}>Continuar</Button>
            </Stack>
          </Box>

          {/* Página 6*/}
          <Box hidden={pageable(5, page)}>
            <Typography 
              sx={{
                fontWeight:'bold',
                paddingBottom:'1rem'
              }}
            >
              1.4 Planejamento participativo
            </Typography>
            <Typography 
              sx={{textAlign:'justify'}}
            >
              No coletivo vemos multiplicadas nossas forças e possibilidades. Por isso há o entendimento de que o trabalho que contemple a contribuição do maior número de pessoas tende a ser qualitativamente melhor do que os daqueles que se restringem a uma aristocracia organizacional (PARENTE, 2011).<br />Alguns marcos teórico-metodológicos no processo do planejamento participativo devem ser considerados como uma espécie de passo-a-passo que deve nortear a condução desse processo (Quadro 03) (GANDIN, 2002).
            </Typography>
            <Typography>Quadro 03 - Marcos teórico-metodológicos a serem considerados no processo de planejamento participativo.</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>MARCO</TableCell>
                  <TableCell>DESCRIPTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {planejaTable04.map((row) => (
                  <TableRow key={row.goal}>
                    <TableCell>{row.goal}</TableCell>
                    <TableCell>{row.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography sx={{paddingY:'1rem'}}>Fonte: GANDIN, 2002.</Typography>
            <Typography
              sx={{textAlign:'justify'}}
            >
              Logo após a discussão desses marcos há o momento do diagnóstico – etapa de geração e análise de dados que irão subsidiar o processo de construção do plano propriamente dito. Com a realização do diagnóstico, passa-se para a discussão e construção participativa do plano ou programação, que deve levar em consideração: os objetivos, as ações a serem desenvolvidas, os recursos necessários, o cronograma, o processo de acompanhamento e a avaliação. E por fim, constrói-se uma agenda com a contribuição de todos os atores sociais envolvidos no processo de promoção da saúde (PARENTE, 2011).
            </Typography>
            <Typography
              sx={{
                textAlign:'justify',
                paddingY:'1rem'
              }}
            >
              SAIBA MAIS!<br />Para conhecer melhor o Planejamento Participativo indicamos a leitura do seguinte artigo:<br />
              <a style={{color:theme.primaryColor}} href='https://sanare.emnuvens.com.br/sanare/article/view/144' target='blank'>●	PARENTE. Planejamento participativo em saúde. SANARE, v. 10, n. 1, 2011.<br />Disponível em: https://sanare.emnuvens.com.br/sanare/article/view/144
                </a></Typography>
            <Stack direction='row'>
              <Button color="error" variant="contained" startIcon={<ArrowBackIcon />}
                onClick={() => {setPage(4)}}>Voltar</Button>
              <Button color="success" variant="contained" endIcon={<ArrowForwardIcon />}
                onClick={() => {setPage(6)}}>Continuar</Button>
            </Stack>
          </Box>

          {/* Página 7*/}
          <Box hidden={pageable(6, page)}>
            <Typography 
              sx={{
                fontWeight:'bold',
                paddingBottom:'1rem'
              }}
            >
              2.	PROCESSO DECISÓRIO
            </Typography>
            <Typography
              sx={{
                textAlign:'justify',
                paddingBottom:'1rem'}}
            >
              A tomada de decisão está intimamente ligada ao planejamento em saúde e deve ser considerada independentemente do método de planejamento escolhido. Entendendo o contexto desse planejamento, cabe aqui pontuar a importância do processo de tomada de decisão, ao qual está intrinsecamente ligado.
              <br />O processo de tomada de decisão em sistemas de saúde deve ser compreendido como um conjunto de passos estruturados que incluem desde a busca pelo consenso entre as partes envolvidas, de uma forma democrática, até a incorporação e o uso de informações coletadas nos níveis locais para tratar situações complexas, levando em consideração as especificidades do contexto e chegando ao desenvolvimento e à avaliação de soluções inovadoras (WICKREMASIGHE et al., 2016).<br />O processo de tomada de decisão envolve a definição de critérios e valores, além do uso de evidências e do julgamento de alternativas na formulação de políticas públicas em saúde. A complexidade do processo decisório em sistemas de saúde é ampliada dado o envolvimento de um grande número de atores, de diversas naturezas (técnicos, gestores, políticos, agentes sociais), em diferentes níveis de atuação (local, municipal, estadual e federal), com diferentes objetivos ou entendimentos sobre qual a melhor solução para um problema estabelecido (TANIOS et al., 2013). <br />Os elementos presentes da tomada de decisão são (BERTONCINI et al., 2013):<br />1 -	O tomador de decisão: é a pessoa que faz uma escolha ou opção entre várias alternativas futuras de ação;<br />2 -	Os objetivos: são o que o tomador de decisão pretende alcançar com suas ações;<br />3 -	As preferências: são os critérios que o tomador de decisão usa para fazer sua escolha;<br />4 -	A estratégia: é o curso de ação que o tomador de decisão escolhe para atingir seus objetivos dependendo dos recursos que pode dispor;<br />5 -	A situação: são os aspectos do ambiente que envolve o tomador de decisão, alguns deles fora do seu controle, conhecimento ou compreensão e que afetam sua escolha;<br />6 -	O resultado: é a consequência ou resultado de uma estratégia.<br /><br />Como o processo de tomada de decisão é uma atividade passível de erros, pois ela será afetada pelas características pessoais e percepção do tomador de decisões, visando minimizá-los e chegar a um melhor resultado, deve-se efetuar um processo organizado e sistemático. Para isso, sugere-se que seja identificado o problema existente, em seguida, deve-se enumerar as alternativas possíveis para a solução do problema e a partir disso, selecionar a mais benéfica das alternativas, para então, implementar a alternativa escolhida e por fim reunir feedback para descobrir se a alternativa implementada está solucionando o problema identificado (BERTONCINI et al., 2013).
            </Typography>
            <Stack direction='row'>
              <Button color="error" variant="contained" startIcon={<ArrowBackIcon />}
                onClick={() => {setPage(5)}}>Voltar</Button>
              <Button color="success" variant="contained" endIcon={<ArrowForwardIcon />}
                onClick={() => {setPage(7)}}>Continuar</Button>
            </Stack>
          </Box>

          {/* Página 8*/}
          <Box hidden={pageable(7, page)}>
            <Typography 
              sx={{
                fontWeight:'bold',
                paddingBottom:'1rem'
              }}
            >
              3. MARCOS LEGAIS E NORMATIVOS E INSTRUMENTOS DE PLANEJAMENTO EM SAÚDE
            </Typography>
            <Typography
              sx={{textAlign:'justify'}}
            >
              No âmbito do Sistema Único de Saúde, diversos marcos legais e normativos abordam aspectos relacionados ao planejamento e seus instrumentos (Quadro 05). Nesse cenário, proporcionar o adequado planejamento das diretrizes, objetivos, metas e ações de saúde nas diferentes esferas de gestão do SUS leva à necessidade de constituir alguns instrumentos de planejamento que devem, por sua vez, se interligar sequencialmente e ciclicamente (CONASEMS, 2021).
            </Typography>
            <Typography
              sx={{paddingY:'1rem'}}
            >
              Quadro 05 - Marcos legais e normativos que abordam aspectos relacionados ao planejamento no SUS.
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>MARCO LEGAL / NORMATIVO</TableCell>
                  <TableCell>EMENDA</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {planejaTable05.map((row) => (
                  <TableRow key={row.legalGoal}>
                    <TableCell>{row.legalGoal}</TableCell>
                    <TableCell>{row.synopsis}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography
              sx={{
                textAlign:'justify',
                paddingY:'1rem'
              }}
            >
              No Quadro 06 você poderá visualizar os principais instrumentos e suas características, a saber: Plano de Saúde; Programação Anual de Saúde; e Relatórios de Gestão.
            </Typography>
            <Typography>Quadro 06 - Instrumentos de planejamento em saúde no âmbito do SUS.</Typography>
            {planejaTable06.map((row) => (
              <Table key={row.title}>
                <TableHead>
                  <TableRow>
                  <TableCell>{row.title}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                  <TableCell>{row.instruments}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ))}
            <PlanejaQuestion
              id={4}
              title={'Você conhece os instrumentos de planejamento em saúde do seu município?'}
              yesDescr={'Quais instrumentos você já utilizou?'}
              noDescr={'Pesquise sobre eles e responda: Quais você identificou no seu município?'}
              noHasJustify={true} />
            <PlanejaQuestion
              id={5}
              title={'Existem aspectos relacionados à Saúde Bucal nos instrumentos? '}
              yesDescr={'Quais?'}
              noDescr={'O que poderia estar incluído?'}
              noHasJustify={true} />
            <PlanejaQuestion
              id={6}
              title={'Você participou/participa da construção e do monitoramento das diretrizes, objetivos, metas, indicadores e respectivos resultados?'}
              yesDescr={'Quais?'}
              noDescr={'Por quê?'}
              noHasJustify={true} />
            <Typography 
              sx={{textAlign:'justify'}}
            >
              Considerando a importância de o planejamento envolver todos os atores ligados direta e indiretamente ao contexto sanitário do território, seja micro ou macro, a Equipe deve estar familiarizada com os instrumentos de planejamento e esses devem contemplar aspectos referentes à Saúde Bucal, além de participarem ativamente do processo de elaboração, monitoramento, condução e avaliação.
            </Typography>
            <Typography 
              sx={{
                textAlign:'justify',
                paddingY:'1rem'
                }}
              >
                SAIBA MAIS!<br/>Para obter mais informações sobre os instrumentos de planejamento em saúde no SUS, as Conferências de Saúde e os Conselhos de Saúde indicamos a leitura do seguinte texto:<br />
                <a style={{color:theme.primaryColor, textAlign:'justify'}} href='https://portal.conasems.org.br/publicacoes?rows=16&start=48' target='blank'>●	CONASEMS. Manual do(a) gestor(a) municipal no SUS. Diálogos no cotidiano. 2a edição digital - revisada e ampliada. 2021. Disponível em: https://portal.conasems.org.br/publicacoes?rows=16&start=48
              </a>
            </Typography>
            <Box
              sx={{
                padding: '1rem',
                width: '100%',
                borderRadius: theme.borderRadiusSmooth,
              }}
            >
              <FormLabel component='legend' sx={{ fontSize: '1.3rem', color: 'black' }}>
                Compreendendo a importância do planejamento em saúde no âmbito do SUS, que tal relembrarmos quais são os instrumentos utilizados nesse planejamento?</FormLabel>
              <TextField required label="Insira quais são os instrumentos utilizados aqui" fullWidth
                multiline rows={4} onChange={(e) => setJustify07(e.target.value)} value={justify07}
                sx={{ backgroundColor: theme.white }} />
            </Box>
            <Typography
              sx={{textAlign:'justify'}}
            >
              O processo de planejamento no âmbito do SUS deve ser realizado com base no contexto local da situação de saúde, ou seja, a partir da análise situacional e das proposições oriundas da Conferência de Saúde local. É dessa forma que se dá o planejamento denominado ascendente.<br />Nesse cenário, alguns instrumentos propostos devem ser utilizados, a saber: Plano de Saúde, Programação Anual da Saúde e os Relatórios de Gestão (Relatório Anual de Gestão e Relatórios Detalhados do Quadrimestre Anterior). Esses devem guardar relação entre si e expressar as diretrizes, objetivos, metas e os respectivos indicadores referentes à condução da política de saúde, além de terem relação com instrumentos gerais de planejamento do governo (Plano Plurianual e Lei de Diretrizes Orçamentárias).
            </Typography>
            <PlanejaQuestion
              id={8}
              title={'Você conhece os espaços de governança do SUS, nos quais a sociedade tem possibilidade de atuar nas políticas de saúde'}
              yesDescr={'Quais são?'}
              noDescr={'Pesquise a respeito!'}
              noHasJustify={false} />
            <PlanejaQuestion
              id={9}
              title={'Você já participou de alguma reunião ou foi membro de algum Conselho de Saúde (municipal, estadual ou nacional)?'}
              yesDescr={'Quais?'}
              noDescr={'Por quê?'}
              noHasJustify={true} />
            <PlanejaQuestion
              id={10}
              title={'Você já teve a experiência de participar da Conferência Municipal ou das etapas estadual (Conferência Estadual de Saúde) e nacional (Conferência Nacional de Saúde)?'}
              yesDescr={'Quais?'}
              noDescr={'Por quê?'}
              noHasJustify={true} />
            <Typography 
              sx={{
                textAlign:'justify',
                paddingBottom:'1rem'
              }}
            >
              A governança do SUS é composta por espaços em que a sociedade atua na política de saúde nas três esferas de governo. Dentre esses espaços estão os Conselhos de Saúde e as Conferências de Saúde.<br />Os conselhos de saúde que são espaços institucionais presentes em cada esfera de governo, cujo papel é consultivo e deliberativo. Esses devem, por sua vez, formular estratégias e controlar a execução da política de saúde em todos os aspectos. Para isso, sua composição deve ser paritária por representantes do governo (25%), dos usuários (50%), dos profissionais de saúde e dos prestadores de serviços (25%) e as decisões do conselho deverão ser homologadas pelo chefe do Poder Executivo correspondente.<br />Outro espaço importante são as Conferências de Saúde, realizadas minimamente a cada quatro anos, que têm por objetivo avaliar a situação de saúde da população e definir diretrizes que irão orientar a formulação e condução das políticas e programas dentro da respectiva esfera de governo.<br />Considerando a importância desses espaços no processo de decisão e do envolvimento de todos os atores ligados ao contexto, entende-se a necessidade de participação dos profissionais nesses espaços.
            </Typography>
            <Stack direction='row'>
              <Button color="error" variant="contained" startIcon={<ArrowBackIcon />}
                onClick={() => {setPage(6)}}>Voltar</Button>
              <Button color="success" variant="contained" endIcon={<ArrowForwardIcon />}
                onClick={() => {setPage(8)}}>Continuar</Button>
            </Stack>
          </Box>

          {/* Página 9 */}
          <Box hidden={pageable(8, page)}>
            <Typography
              sx={{
                fontWeight:'bold',
                paddingBottom:'1rem'
              }}
            >
              4. PLANEJAMENTO LOCAL EM SAÚDE NO CONTEXTO DAS REDES DE ATENÇÃO À SAÚDE (RAS)
            </Typography>
            <Typography
              sx={{textAlign:'justify'}}
            >
              Todo planejamento tem por ponto de partida o diagnóstico (CHORNY; KUSCHNIR; TAVEIRA, 2008). Diante disso, emergiu-se a proposta estratégica metodológica de planejamento aplicado ao nível local do SUS com ênfase na execução de ações de educação em saúde em relação aos problemas identificados e priorizados pela comunidade, denominada Planejamento Programação Local em Saúde (PPLS), envolvendo, especificamente, a vigilância à saúde (VILAS-BÔAS, 2004). <br/>Nesse sentido, verifica-se que, na perspectiva do olhar estratégico-situacional, a atuação planejada sobre uma determinada realidade requer um entendimento entre os diversos atores sociais inseridos nesta, permitindo uma explicação abrangente sobre uma dada situação, assim como a análise de possíveis intervenções sobre os problemas que devem ser resolvidos e controlados
            </Typography>
            <Typography
              sx={{
                paddingY:'1rem',
                fontWeight:'bold'
                }}
            >
              AGORA É COM VOCÊ!
            </Typography>
            <Typography
              sx={{
                textAlign:'justify',
                paddingBottom:'1rem'
              }}
            >
              Propomos agora, a partir do uso do PlanejaSD-componente prático, a construção de um Plano de Ação em Saúde Bucal (PA-SB), sendo metodologicamente uma adaptação do Planejamento Estratégico Situacional (PES).<br/>O uso do PlanejaSD irá auxiliá-lo na construção passo a passo, através do artifício dinâmico de pergunta-resposta para a vivência dos momentos operacionais do PES. E, no término você terá seu Plano de Ação em Saúde Bucal (PA-SB) elaborado pronto para à intervenção.<br/>Salienta-se que cada situação/contexto é única, emergindo muitos problemas à intervenção, porém o PlanejaSD irá direcioná-lo (a) à construção de um plano para a tomada de decisão baseada nos resultados dos outros módulos operativos da plataforma GestBucalSD, sumarizado no dashboards.
            </Typography>
            <Stack direction='row'>
              <Button color="error" variant="contained" startIcon={<ArrowBackIcon />}
                onClick={() => {setPage(7)}}>Voltar</Button>
              <Button color="success" variant="contained" endIcon={<ArrowForwardIcon />}
                onClick={() => { }}>Continuar</Button>
            </Stack>
          </Box>
        </Box>
      }
    />
  );
}