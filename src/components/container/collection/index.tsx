import { Box, Grid, Typography } from "@mui/material";
import Card from "../card/index";
import { theme } from 'src/core/theme'

const acervo = [
  {
      article: "Prestação de Serviços de Manutenção Predial em Estabelecimentos Assistenciais de Saúde. Ciênc. Saúde Col.",
      author: "Amorim, G.M.; QUINTÃO, E.C.V.; MARTELLI-JÚNIOR, H.; BONAN, P.R.F",
      link: "https://www.scielosp.org/article/ssm/content/raw/?resource_ssm_path=/media/assets/csc/v18n1/16.pdf"
  },
  {
      article: "How Has Teledentistry Been Applied in Public Dental Health Services? An Integrative Review.",
      author: "Bo C, Peralta S, Lu A.",
      link: "https://www.liebertpub.com/doi/abs/10.1089/tmj.2019.0122"
  },
  {
      // revisar
      article: "A saúde bucal no Sistema Único de Saúde",
      author: "Brasil. Ministério da Saúde.",
      link: "https://bvsms.saude.gov.br/bvs/publicacoes/saude_bucal_sistema_unico_saude.pdf"
  },
  {
      article: "Programa Nacional de Melhoria do Acesso e da Qualidade dos Centros de Especialidades Odontológicas (Pmaq-CEO): manual instrutivo 2º Ciclo (2015-2017).",
      author: "Ministério da Saúde, Secretaria de Atenção à Saúde. Departamento de Atenção Básica.",
      link: "http://189.28.128.100/dab/docs/portaldab/publicacoes/manual_pmaqceo_preliminar.pdf"
  },
  {
      article: "Documento de Referência para o Programa Nacional de Segurança do Paciente.",
      author: "Ministério da Saúde. Fundação Oswaldo Cruz; Agência Nacional de Vigilância Sanitária.",
      link: "https://bvsms.saude.gov.br/bvs/publicacoes/documento_referencia_programa_nacional_seguranca.pdf"
  },
  {
      // revisar
      article: "Institui o Programa Nacional de Segurança do Paciente (PNSP).",
      author: "Brasil. Ministério da Saúde. Gabinete do Ministro. ",
      link: "https://bvsms.saude.gov.br/bvs/saudelegis/gm/2013/prt0529_01_04_2013.html"
  },
  {
      // revisar
      article: "Define a implantação de Especialidades Odontológicas (CEOs) e de Laboratórios Regionais de Próteses Dentárias (LRPDs) e estabelecer critérios, normas e requisitos para seu credenciamento.",
      author: "Brasil. Ministério da Saúde. Gabinete do Ministro.",
      link: "https://bvsms.saude.gov.br/bvs/saudelegis/gm/2006/prt0599_23_03_2006.html"
  },
  {
      article: "PCCS - SUS : diretrizes nacionais para a instituição de planos de carreiras, cargos e salários no âmbito do Sistema Único de Saúde.",
      author: "Ministério da Saúde. Departamento de Gestão da Educação na Saúde, Secretaria de Gestão do Trabalho e da Educação na Saúde",
      link: "https://bvsms.saude.gov.br/bvs/publicacoes/pccs_diretrizes_nacionais_planos_carreiras_sus.pdf"
  },
  {
      article: "Política Nacional de Atenção Básica.",
      author: "Ministério da Saúde.",
      link: "http://189.28.128.100/dab/docs/publicacoes/geral/pnab.pdf"
  },
  {
      // revisar
      article: "Institui a Política Nacional de Educação Permanente em Saúde.",
      author: "Brasil. Ministério da Saúde.",
      link: "https://bvsms.saude.gov.br/bvs/saudelegis/gm/2017/MatrizesConsolidacao/comum/13150.html"
  },
  {
      article: "Dispõe sobre as diretrizes para a implementação da Política Nacional de Educação Permanente em Saúde.",
      author: "Brasil. Ministério da Saúde.",
      link: "https://bvsms.saude.gov.br/bvs/saudelegis/gm/2017/MatrizesConsolidacao/comum/5668.html"
  },
  {
      article: "Portaria nº 718/SAS/MS, de 20 de dezembro de 2010, republicada em 31 de dezembro de 2010. Retificação na Portaria nº 718, SAS/MS de 20 de dezembro de 2010, publicada no Diário Oficial nº 251, de 31 de dezembro de 2010, seção 1, páginas 100 a 113.",
      author: "Brasil. Ministério da Saúde. Secretaria de Atenção à Saúde",
      link: "http://189.28.128.100/dab/docs/geral/nota_tecnica_telessaude_abril2012.pdf"
  },
  {
      article: "A saúde bucal no Sistema Único de Saúde",
      author: "Brasil. Ministério da Saúde. Secretaria de Atenção à Saúde. Departamento de Atenção Básica",
      link: "http://bvsms.saude.gov.br/bvs/publicacoes/saude_bucal_sistema_unico_saude.pdf"
  },
  {
      article: "Pesquisa Nacional de Saúde Bucal: resultados principais.",
      author: "Brasil. Ministério da Saúde. Secretaria de Atenção à Saúde. Secretaria de Vigilância em Saúde.",
      link: "https://bvsms.saude.gov.br/bvs/publicacoes/pesquisa_nacional_saude_bucal.pdf"
  },
  {
      article: "Trabalho e Capital Monopolista",
      author: "Braverman H.",
      link: "https://wp.ufpel.edu.br/franciscovargas/files/2018/08/Trabalho-e-For%C3%A7a-de-Trabalho.-Harry-Braverman.pdf"
  },
  {
      article: "Avaliação: conceitos e métodos.",
      author: "Brousselle A; Champagne F; Contradriopoulos AP; Hartz Z",
      link: "https://www.scielo.br/j/csp/a/F4QnHtrTsjs3bSBj55myzpt/"
  },
  {
      article: "Appropriate and inappropriate referrals to a unit of conservative dentistry.",
      author: "Burke F. J. T.; Goodall C.; Hayes F.",
      link: "https://europepmc.org/article/med/11819890"
  },
  {
      article: "Defining quality of care. Social Science & Medicine 51",
      author: "Campbell, S.M., Roland M.O., Buetow S.A. (2000) ",
      link: "https://www.sciencedirect.com/science/article/abs/pii/S0277953600000575"
  },
  {
      // revisar
      article: "Avaliação de desempenho de sistemas de saúde e gerencialismo na gestão pública brasileira.",
      author: "Carnut L, Narvai PC.",
      link: "https://www.scielo.br/j/sausoc/a/fY4tKrkdBSJGrsV7mr3C5Xh/abstract/?lang=pt"
  },
  {
      article: "Teledentistry and the Unified Health System: an important tool for the resumption of Primary Health Care in the context of the COVID-19 pandemic.",
      author: "Carrer, F. C. de almeida, Matuck, B., Lucena , E. H. G. de, Martins, F. C., Pucca Junior , G. A., Galante , M. L., Tricoli, M. F. de M., & Macedo , M. C. S. (2020).",
      link: "http://www.cescage.com.br/revistas/index.php/JournalofHealth/article/download/1579/pdf"
  },
  {
      article: "Política Nacional de Saúde Bucal Brasileira (Brasil Sorridente): a maior política pública de saúde bucal do mundo",
      author: "Cayetano MH, Carrer FC, Gabriel M, Martins FC, Pucca Jr. GA.",
      link: "https://www.redalyc.org/journal/2312/231265797006/231265797006.pdf"
  },
  {
      // revisar
      article: "Pesquisa Brasileira em Odontopediatria e Clínica Integrada. 2020",
      author: "Carrer, Fernanda Campos de Almeida",
      link: "https://doi.org/10.1590/pboci.2020.155"
  },
  {
      article: "Cultura de segurança na percepção dos profissionais de saúde de hospitais públicos.",
      author: "Carvalho, P.A.",
      link: "https://www.scielo.br/j/rsp/a/vxrzhVhFgGTZJ7pWksphpWj/abstract/?lang=pt"
  },
  {
      article: "Plano de carreira, cargos e salários: ferramenta favorável à valorização dos recursos humanos em saúde pública",
      author: "Costa, A. C. O.",
      link: "http://revodonto.bvsalud.org/scielo.php?script=sci_arttext&pid=S1677-38882010000200006"
  },
  {
      article: "The impact of inequalities and health expenditure on mortality due to oral and oropharyngeal cancer in Brazil.",
      author: "Cunha, A. R. ; Bigoni, A. ; Antunes J. L. F. ; Hugo F. N.",
      link: "https://www.nature.com/articles/s41598-021-92207-x"
  },
  {
      article: "TELEODONTOLOGY AND ORAL HEALTH: CHALLENGES AND PERSPECTIVES.",
      author: "de Moraes, I. M., Vieira, P. A., Pedreira, J. D. B. G., & Pedreira, E. N. (2022).",
      link: "https://periodicojs.com.br/index.php/hs/article/view/673"
  },
  {
      article: "Absenteísmo em odontologia na percepção de usuários e profissionais: discutindo acesso, equidade e bucalidade.",
      author: "Dias TM.",
      link: "https://core.ac.uk/download/pdf/326801451.pdf"
  },
  {
      article: "Teleodontologia, formação profissional e assistência odontológica no sistema único de saúde brasileiro: relato de experiência.",
      author: "do Nascimento, A. D. A., de Holanda, L. A. L., Borges, B. S., Pereira, F. T., Frade, A. L., de Barros Santos, C., & de Lacerda Vidal, A. K. (2020)",
      link: "http://www.cescage.com.br/revistas/index.php/JournalofHealth/article/view/1579"
  },
  {
      article: "Serviços de Telessaúde como apoio à Educação Permanente na Atenção Básica à Saúde: uma proposta de modelo avaliativo. ",
      author: "Dolny, Luise Lüdke",
      link: "https://www.scielo.br/j/icse/a/VgGQ7ryqRpcnqQHGnX6VC5P/?lang=pt"
  },
  {
      article: "Criteria, norms and standards of quality: what do they mean?",
      author: "Donabedian A",
      link: "https://ajph.aphapublications.org/doi/abs/10.2105/AJPH.71.4.409"
  },
  {
      article: "The British Society of Periodontology Referral Policy and Parameters of Care.",
      author: "DOWELL P, CHAPPLE IL.",
      link: "https://www.magonlinelibrary.com/doi/abs/10.12968/denu.2002.29.7.352"
  },
  {
      article: "A review of research in the United Kingdom to evaluate the implementation of clinical guidelines in general practice.",
      author: "DOWIE R.",
      link: "https://academic.oup.com/fampra/article/15/5/462/536395?login=true"
  },
  {
      article: "A resource reallocation model for school dental screening : taking advantage of teledentistry in low-risk areas",
      author: "Estai M, Bunt SM, Kanagasingam Y.",
      link: "https://onlinelibrary.wiley.com/doi/abs/10.1111/idj.12379"
  },
  {
      article: "Tempo de espera e absenteísmo na atenção especializada- um desafio para os sistemas universais de saúde.",
      author: "Farias",
      link: "https://www.scielo.br/j/sdeb/a/GPfqjbXJDNnPWMZ5TnDPyKN/?lang=pt&format=html"
  },
  {
      article: "Absenteísmo de usuários - barreiras e determinantes no acesso aos serviços de saúde.",
      author: "Farias",
      link: "https://www.rbmfc.org.br/rbmfc/article/view/2239"
  },
  {
      article: "Making the best use of consultant orthodontic services.",
      author: "Ferguson JW; Langford JW; Davenport PJ.",
      link: "https://europepmc.org/article/med/9515347"
  },
  {
      article: "Gerência de serviços de saúde: competências desenvolvidas e dificuldades encontradas na atenção básica.",
      author: "Fernandes L. C. L.; Machado R. Z.; Anschau, G. O.",
      link: "https://www.scielo.br/pdf/csc/v14s1/a28v14s1.pdf"
  },
  {
      article: "Avaliação da atenção secundária em saúde bucal: Uma investigação nos centros de especialidades do Brasil.",
      author: "Goes PSA, Figueiredo N, Neves JC Das, Silveira FM da M, Costa JFR, Pucca GA, Rosales MS.",
      link: "https://www.scielo.br/j/csp/a/5LcWqg8q9dXtH9NQQ9yqFpK/abstract/?lang=pt"
  },
  {
      article: "Telemedicine—A Complement to Traditional Referrals in Oral Medicine Lena.",
      author: "Gullbrandsson L, Eklund B, Kildal M,",
      link: "https://www.liebertpub.com/doi/abs/10.1089/tmj.2011.0207"
  },
  {
      article: "Avaliação em saúde: dos modelos teóricos à prática na avaliação de programas e sistemas de saúde",
      author: "Hartz, Zulmira Maria de Araújo; Silva, Ligia Maria Vieira da.",
      link: "https://www.scielosp.org/article/csp/2006.v22n1/229-231/"
  },
  {
      article: "STUDY AND ANALYSIS OF INFORMATION TECHNOLOGY IN DENTISTRY IN LATIN AMERICAN COUNTRIES.",
      author: "Jordi CL, Figueiredo MÇ, Barone D.",
      link: "http://www.scielo.org.ar/scielo.php?pid=S1852-48342016000100003&script=sci_arttext&tlng=en"
  },
  {
      article: "Atenção primária à saúde e a organização de redes regionais de atenção à saúde no Brasil.",
      author: "Lavras C.",
      link: "https://www.scielosp.org/article/sausoc/2011.v20n4/867-874/"
  },
  {
      article: "Sociedade de risco e risco epidemiológico. Cadernos de Saúde Pública.",
      author: "Luiz O.C., Cohn A.",
      link: "https://www.scielo.br/j/csp/a/86Wndmt9FFbB4SQmCmtMVkm/abstract/?lang=pt"
  },
  {
      article: "Dimensions of quality revisited: from thought to action.",
      author: "Maxwell, R. J. (1992).",
      link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1055007/"
  },
  {
      article: "Planos de cargos, carreiras e salários: perspectivas de profissionais de saúde do Centro-Oeste do Brasil.",
      author: "Mendes, T. M. C.",
      link: "https://www.scielo.br/j/sdeb/a/FzP8rJLtwtNyCxKPr3Npq5M/?lang=pt"
  },
  {
      article: "Primary and secondary dental care: how ideal is the interface?",
      author: "Morris AJ, Burke FJ.",
      link: "https://www.nature.com/articles/4801263"
  },
  {
      article: "Primary and secondary dental care: the nature of the interface",
      author: "Morris AJ, Burke FJ.",
      link: "https://www.nature.com/articles/4801262"
  },
  {
      article: "Referral for secondary restorative dental care in rural and urban areas of Scotland: findings from the Highlands & Islands Teledentistry Project.",
      author: "NUTTALL NM, STEED MS, DONACHIE MA",
      link: "https://www.nature.com/articles/4801339"
  },
  {
      article: "The effect of orthodontic referral guidelines: a randomised controlled trial.",
      author: "O'BRIEN K, WRIGHT J, CONBOY F,",
      link: "https://www.nature.com/articles/4800492"
  },
  {
      article: "From Quality Assurance to Quality Improvement: The Joint Commission on Accreditation of Healthcare Organizations and Emergency Care.",
      author: "O'Leary, D. S., & O'Leary, M. R.",
      link: "https://www.sciencedirect.com/science/article/abs/pii/S0733862720306945"
  },
  {
      article: "Flexibilização dos vínculos de trabalho na atenção secundária: limites da Política Nacional de Saúde Bucal.",
      author: "Oliveira RS, Morais HMM.",
      link: "https://www.scielo.br/j/tes/a/BHXYHGdMRLDsqDqBsYmf53M/abstract/?lang=pt"
  },
  {
      article: "Perdas dentárias no Brasil: análise da Pesquisa Nacional de Saúde Bucal 2010. Revista de Saúde Pública",
      author: "Peres, Marco Aurélio",
      link: "https://doi.org/10.1590/S0034-8910.201304700422"
  },
  {
      article: "Trend of hospitalized cases of oral cancer in Brazil and its relationship with oral health coverage in public health system between 2009 and 2017.",
      author: "Raymundo ML, Freire AR, Gomes-Freire DE, Silva RO, Araújo EC, Ishigame RT, Sousa SA, Lucena EH, Cavalcanti YW.",
      link: "https://dialnet.unirioja.es/servlet/articulo?codigo=7884324"
  },
  {
      article: "An International Working Definition for Quality of Oral Healthcare.",
      author: "Righolt AJ, Walji MF, Feine JS, Williams DM, Kalenderian E, Listl S.",
      link: "https://journals.sagepub.com/doi/full/10.1177/2380084419875442"
  },
  {
      article: "Organização da demanda de um Centro de Especialidades Odontológicas.",
      author: "Saliba NA",
      link: "https://www.scielo.br/j/rounesp/a/6CZCvK8nLrvnCZXHDrJ4SQr/abstract/?lang=pt"
  },
  {
      article: "Perfil de gerentes da atenção primária à saúde de um município de Minas Gerais, Brasil.",
      author: "Santos AS, Silveira RE, Mendonça FTNF, Buso ALZ, Silva SGF, Silva DD.",
      link: "https://pesquisa.bvsalud.org/portal/resource/pt/bde-29084"
  },
  {
      article: "A Web-Based Tool for Monitoring and Evaluating Health Care Services: An Analysis of Centers for Dental Specialties Webpage.",
      author: "Santos LX, Almeida D, Silva J, Rizental A, Goes PSA, Figueiredo N.",
      link: "https://arquivo.revista.uepb.edu.br/index.php/pboci/article/view/3385"
  },
  {
      article: "Interface entre a Atenção Primária e a Secundária em odontologia no Sistema Único de Saúde: uma revisão sistemática integrativa.",
      author: "Silva, Helbert Eustáquio Cardoso da e Gottems, Leila Bernarda Donato.",
      link: "https://doi.org/10.1590/1413-81232017228.22432015"
  },
  {
      article: ".Avaliação em saúde: limites e perspectivas.",
      author: "Silva, Ligia Maria V. da e Formigli, Vera Lúcia A.",
      link: "https://doi.org/10.1590/S0102-311X1994000100009"
  },
  {
      article: "Acesso e qualidade: avaliação das Equipes de Saúde Bucal participantes do PMAQ-AB 2012 em Pernambuco",
      author: "Sobrinho JEL, Martelli PJL, Albuquerque MSV, Lyra TM, Farias SF.",
      link: "https://www.scielosp.org/article/sdeb/2015.v39n104/136-146/"
  },
  {
      article: "Referência e contra referência em saúde bucal: regulação do acesso aos centros de especialidades odontológicas.",
      author: "Souza G C",
      link: "http://www.scielo.org.co/scielo.php?script=sci_arttext&pid=S0124-00642015000300009&lng=en&nrm=iso"
  },
  {
      article: "Uma revisão sobre os conceitos de acesso e utilização de serviços de saúde",
      author: "Travassos, Claudia; Martins, Mônica.",
      link: "https://doi.org/10.1590/S0102-311X2004000800014"
  },
  {
      article: "Qualidade e subjetividade na avaliação de programas e serviços em saúde.",
      author: "Uchimura KY, Bosi MLM.",
      link: "https://www.scielo.br/j/csp/a/jsNy8jWBKbwmggFQM6t5DHQ/?format=html"
  },
  {
      article: "Planos de carreira, cargos e salários no âmbito do Sistema Único de Saúde: além dos limites e testando possibilidades.",
      author: "Vieira SP, Pierantoni CR, Magnago C, França T, Miranda RG",
      link: "https://www.scielo.br/j/sdeb/a/ZRFkRbrWXr8zwSfbL7vH6BF/?lang=pt&format=html"
  },
  {
      article: "Universal health coverage, oral health, equity and personal responsibility",
      author: "Wang TT, Mathur MR, Schmidt H",
      link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7652557/"
  },
  {
      article: "Quality of care : a process for making strategic choices in health systems.",
      author: "World Health Organization.",
      link: "https://apps.who.int/iris/bitstream/handle/10665/43470/?sequence=1"
  },
  {
      article: "Conceptual framework for the International Classification for Patient Safety: final technical report",
      author: "World Health Organization.",
      link: "https://www.who.int/patientsafety/taxonomy/icps_full_report.pdf"
  }
]

export default function Index(){
  return(
    <>
      <Box sx={{
        position:'justify',
        bgcolor:theme.greyLight,}}>
        <Typography 
        sx={{
          padding:3
        }}
        variant="h3"
        color={theme.primaryColor}
        textAlign='center'
        >
          Artigos
        </Typography>
        <Grid 
          container 
          gap='30px' 
          sx={{
            margin:'auto', 
            justifyContent:'center',
            //paddingTop:3,
            paddingY:3}}>
          {acervo.map((item,index)=>(
            <Card
              key={index}
              article={item.article}
              author={item.author}
            />    
        ))}
      </Grid>
    </Box>
    </>
  )
}