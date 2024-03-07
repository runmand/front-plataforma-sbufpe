import Base from '@components/base-layout/index';
import Appbar from '@components/app-bar/index';
import HomeToolbar from '@components/toolbar/home';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { theme } from 'src/core/theme';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PlanejaText, PlanejaQuestion, PlanejaPag } from '@components/planeja';
export default function Index() {

  return (
    <Base
      appBarChild={<Appbar toolbarChild={<HomeToolbar />} />}
      mainContainerChild={
        <Box sx={{ paddingTop: '6rem', flexGrow: 1, }}>

          {/* Página 1 */}
          <PlanejaPag invisible={false}
            elemento={
              <Box>
                <PlanejaText invisible={false}
                  title={'Olá! Bem-vindo (a) ao PlanejaSD!'}
                  texto={'Para a execução deste módulo operacional da plataforma GestBucalSD, propomos uma qualificação profissional teórico-prática - autoinstrucional em planejamento sistematizado de ações em saúde bucal, inclusive com garantia de certificação, como curso de extensão (20h).\nVamos vivenciar o planejamento de ações em saúde bucal, entendendo o ato de planejar como reduzir incertezas.\nDiscutiremos aqui os principais conceitos e instrumentos relacionados ao planejamento no âmbito do Sistema Único de Saúde (SUS), compreendendo-o principalmente com de âmbito local.\nTrabalharemos as seguintes temáticas:\n ●	Conceito de planejamento;\n ●	Tipos de Planejamento;\n ●	Planejamento Estratégico Situacional (PES) e Planejamento participativo;\n ●	Processo decisório;\n ●	Definições dos instrumentos de planejamento e gestão no Sistema Único de Saúde (SUS) (Plano de Saúde – PS, Programação Anual de Saúde – PAS, Relatório Detalhado do Quadrimestre Anterior – RDQA, Relatório Anual de Gestão – RAG) e a sua importância no contexto do planejamento no SUS;\n ●	Planejamento local em saúde no contexto das Redes de Atenção à Saúde (RAS).\n\nEspera-se que após o cumprimento do componente teórico, você realize na prática baseada do PES a construção de um Plano Local de Ação com o uso do PlanejaSD e demais dados da plataforma GestBucalSD. O componente teórico deve ser feito em caráter individual, mas a prática pode (e deve) envolver outros membros da equipe e ainda outros atores sociais implicados em nível local, se possível.\n\nCertificação: a certificação será emitida para cada participante, após o cumprimento de atividades individuais formativas através do preenchimento de respostas as perguntas condutoras do componente teórico e da avaliação somativa (individual ou equipe profissional local), pela construção do Plano de Ação Local.\nA equipe do projeto estará disponível, para assessorá-los, através de agendamento prévio, numa perspectiva de ações de Telessaúde para teleconsulta e telemonitoramento ao Planejamento, gestão e avaliação em saúde.\n\nOnde incluir os créditos do material teórico??? '}
                />
                <Button color="success" variant="contained" endIcon={<ArrowForwardIcon />}
                  onClick={() => { }}>Vamos começar?!</Button>
              </Box>
            }
          />

          {/* Página 2 */}
          <PlanejaPag invisible={false}
            elemento={
              <Box>
                <PlanejaText invisible={false}
                  title={'1.	PLANEJAMENTO EM SAÚDE'}
                  texto={'Pode-se compreender o planejamento como uma prática social que é ao mesmo tempo técnica, política, econômica e ideológica. É um processo de transformação de uma situação em outra, levando em consideração uma dada finalidade e recorrendo a instrumentos (meios de trabalho tais como técnicas e saberes) e a atividades (trabalho propriamente dito), sob determinadas relações sociais, em uma dada organização (PAIM, 2002, 2006). Além de um requisito previsto em legislação, o planejamento no âmbito do Sistema Único de Saúde (SUS) se constitui como um dos mecanismos relevantes que visam assegurar a unidade e os princípios constitucionais do SUS, uma vez que expressa as responsabilidades dos gestores em cada esfera de governo no que se refere à saúde da população e à integração da organização sistêmica. Assim, o ato de planejar exige que haja conhecimento técnico, o qual se expressa em instrumentos e ferramentas que são desenvolvidas em processos de trabalho (BRASIL, 2016).Vale aqui sinalizar, entretanto, que ao longo da história diferentes noções a respeito do que é o planejamento emergiram, e a seguir estudaremos um pouco mais sobre'}
                />
                <PlanejaQuestion
                  id={1}
                  invisible={false}
                  title={'Você e sua equipe realizam algum tipo de planejamento na sua rotina de trabalho ?'}
                  yesDescr={'quais foram as ações feitas?'}
                  noDescr={'por quê?'}
                  noHasJustify={true}
                />
                <PlanejaText invisible={false}
                  texto={'Sabemos que essa questão já foi abordada como indicador avaliativo do GestBucalSD, mas aqui vocês poderão aprofundar essa reflexão para à ação. A importância da realização do planejamento pode ser vista já no senso comum, onde o ato de planejar está ligado à organização de atividades, à busca por melhores resultados. Uma ação planejada é uma ação não improvisada (WERNECK, 2012) e, no geral, pode-se afirmar que planejar é reduzir incertezas, o que leva a algum grau de intervenção na economia, orientando investimentos e estando vinculado à alocação eficiente de recursos e à busca por melhores resultados. Na saúde, as práticas de planejamento estão presentes em todo o processo de gestão do Sistema Único de Saúde (BRASIL, 2016), desde níveis mais locais e seus microterritórios até a esfera federal.'}
                />
                <Stack direction='row'>
                  <Button color="error" variant="contained" startIcon={<ArrowBackIcon />}
                    onClick={() => { }}>Voltar</Button>
                  <Button color="success" variant="contained" endIcon={<ArrowForwardIcon />}
                    onClick={() => { }}>Continuar</Button>
                </Stack>
              </Box>
            }
          />

          {/* Página 3 */}
          <PlanejaPag invisible={false}
            elemento={
              <Box>
                <PlanejaText invisible={false}
                  title={'1.1.	PLANEJAMENTO NORMATIVO'}
                  texto={'Em 1965, Mário Testa, em conjunto com a Organização Pan-Americana da Saúde (OPAS) e o Centro de Estudos para o Desenvolvimento Econômico e Saúde (CENDES) introduziu o chamado Método CENDES/OPAS, considerado o marco inicial do planejamento na América Latina. Esse se constituiu numa forma de programação sanitária onde o desenvolvimento de métodos e técnicas de programação social impunham mudanças racionalmente planejadas como alternativa para a crise social. Esse método, também denominado de planejamento normativo, representa o marco inicial do desenvolvimento do planejamento em saúde na América Latina. A lógica interna do método CENDES/OPAS tem por base ser economicista e administrativo, a partir da ideia da eficiência na utilização dos recursos disponíveis e teve por principais características:●	Uma visão ecológica (geral) do processo saúde-doença para a aplicação do diagnóstico, onde as prioridades são tratadas de acordo com a análise custo/benefício numa perspectiva economicista que tem por objetivo aumentar a eficiência na prestação de serviços, em termos de quantidade, alinhada à redução de custos (LANA; GOMES, 1996);●	Não considera as causas sociais dos problemas (LANA; GOMES, 1996), uma vez que separa o sujeito do objeto de atuação (LACERDA; BOTELHO; COLUSSI, 2013);●	A sociedade é resumida a comportamentos previsíveis e ausência de incertezas (LACERDA; BOTELHO; COLUSSI, 2013);●	A garantia de êxito do planejamento quando seguidos à risca os cálculos previstos (LACERDA; BOTELHO; COLUSSI, 2013). O modelo conduzido pela OPAS perdeu importância ao longo do tempo por fatores relacionados à dificuldade na obtenção de informações adequadas e ao foco na produtividade e eficiência econômica. Nesse sentido, as abordagens relacionadas ao planejamento estratégico e as práticas da programação em saúde se disseminaram e ganharam força (BRASIL, 2016).'}
                />
                <PlanejaQuestion
                  id={2}
                  invisible={false}
                  title={'Você e sua equipe realizam algum tipo de planejamento na sua rotina de trabalho ?'}
                  yesDescr={'quais foram as ações feitas?'}
                  noDescr={'por quê?'}
                  noHasJustify={true}
                />
                <PlanejaText invisible={false}
                  texto={'O enfoque normativo do planejamento na área da saúde caracteriza-se como um enfoque basicamente descritivo, fundamentado no levantamento de informações e sistematização de variáveis demográficas, epidemiológicas e sociais para a construção de indicadores de saúde e, consequentemente, fazer um diagnóstico. É possível verificar a influência do planejamento normativo no trabalho cotidiano dos estabelecimentos de saúde da rede de atenção em saúde bucal, a qual busca alcançar os objetivos das secretarias de saúde de acordo com as metas estabelecidas pelo Ministério da Saúde. Nesse sentido, destacam-se que, por vezes, as exigências sobre as metas a serem alcançadas com relação às instalações físicas, aos recursos humanos e financeiros, equipamentos e materiais de consumo, às políticas e aos programas (imunizações, saúde da mulher, saúde da criança, saúde adulto e idoso, saúde bucal e vigilância epidemiológica), que acabam por engessar algumas iniciativas, limitando as adaptações necessárias às características locais e aumentando a distância dos resultados desejados.'} />
                <Stack direction='row'>
                  <Button color="error" variant="contained" startIcon={<ArrowBackIcon />}
                    onClick={() => { }}>Voltar</Button>
                  <Button color="success" variant="contained" endIcon={<ArrowForwardIcon />}
                    onClick={() => { }}>Continuar</Button>
                </Stack>
              </Box>
            }
          />

          {/* Página 4 */}
          <PlanejaPag invisible={false}
            elemento={
              <Box>
                <PlanejaText invisible={false}
                  title={'1.2. PLANEJAMENTO	ESTRATÉGICO\n\n'}
                  texto={'O Planejamento Estratégico pode ser reconhecido como um modo de planejar que não se reduz à elaboração de um plano de ação, mas considera refletir sobre aspectos organizacionais e variáveis que podem exercer influência interna e externa na execução do plano. Nesse sentido, considera elementos estratégicos presentes na dinâmica organizacional, tendo por objetivo compreendê-los e aprovisionar sua concretização e melhoria (PARENTE, 2011). Esse modelo, ainda, considera as relações entre os atores políticos e instituições como arena de disputa de poder, analisando-as a partir da ótica e equilíbrios de poder (MATUS, 1993).\n\nSAIBA MAIS!\nPara saber mais detalhes sobre o Planejamento Estratégico, indicamos a leitura do seguinte artigo:\n●	GIOVANELLA. Planejamento estratégico em saúde: uma discussão da abordagem de Mário Testa. Cadernos de Saúde Pública, v. 2, n. 6, 1990.\nDisponível em: https://www.scielo.br/j/csp/a/y9Jxy9qpphd6YGnMyJRYTyq/?lang=pt'}
                />
                <Stack direction='row'>
                  <Button color="error" variant="contained" startIcon={<ArrowBackIcon />}
                    onClick={() => { }}>Voltar</Button>
                  <Button color="success" variant="contained" endIcon={<ArrowForwardIcon />}
                    onClick={() => { }}>Continuar</Button>
                </Stack>
              </Box>
            } />

          {/* Página 5 */}
          
        </Box>
      }
    />
  );
}