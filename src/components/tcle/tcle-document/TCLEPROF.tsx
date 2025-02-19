import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { DocumentData } from "../styled";
import {
  DocumentLi,
  DocumentParagraphyTitle,
  PD,
  PDInput,
  TaleImage,
} from "./styled";
import { useSnackbar } from "notistack";
import { DataTerm, PropsTerm } from "..";
import { generatePDF } from "../exportpdf";

const Index = forwardRef((props, ref) => {
  const [nameResearch, setNameResearch] = useState<string>("");
  const [responsibleCPF, setResponsibleCPF] = useState<string>("");
  const [nameResponsible, setNameResponsible] = useState<string>("");
  const [responsibleEmail, setResponsibleEmail] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  const isFormValid = () => {
    if (!nameResearch.trim()) {
      enqueueSnackbar("O campo Nome do pesquisador está vazio.", {
        variant: "warning",
      });
      return false;
    }
    if (!responsibleCPF.trim()) {
      enqueueSnackbar("O campo CPF do participante está vazio.", {
        variant: "warning",
      });
      return false;
    }
    if (!nameResponsible.trim()) {
      enqueueSnackbar("O campo Nome do participante está vazio.", {
        variant: "warning",
      });
      return false;
    }

    if (!responsibleEmail) {
      enqueueSnackbar("Preencha o campo Email do participante", {
        variant: "warning",
      });
      return false;
    }

    if (
      !responsibleEmail ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(responsibleEmail)
    ) {
      enqueueSnackbar("Preencha um e-mail válido para o participante", {
        variant: "warning",
      });
      return false;
    }

    return true;
  };

  async function validateForm(): Promise<DataTerm> {
    if (!isFormValid()) return;

    const node = document.getElementById("TCLE").children;

    const pdf = await generatePDF(node);

    const response: DataTerm = {
      valid: true,
      type: "TCLE",
      email: responsibleEmail,
      account: Number(localStorage.getItem("userId")),
      pdf: await pdf,
      created_at: new Date(),
    };

    return response;
  }

  useImperativeHandle(ref, () => ({
    getStates: async () => {
      const response = validateForm();
      return response;
    },
  }));

  return (
    <DocumentData id="TCLE">
      <DocumentParagraphyTitle>
        <b>UNIVERSIDADE FEDERAL DE PERNAMBUCO</b>
      </DocumentParagraphyTitle>
      <DocumentParagraphyTitle>
        <b>
          APÊNDICE H - TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO – Módulos 1, 2
          e 3 - PROFISSIONAIS
        </b>
        (PARA MAIORES DE 18 ANOS OU EMANCIPADOS)
      </DocumentParagraphyTitle>

      <PD>
        Convidamos o (a) Sr. (a) para participar como voluntário (a) da pesquisa
        GestBucalSD: AVALIAÇÃO DO USO DE PLATAFORMA WEB-BASED PARA MELHORIA DA
        QUALIDADE E GOVERNANÇA DOS SERVIÇOS PÚBLICOS DE SAÚDE BUCAL, que está
        sob a responsabilidade da pesquisadora Nilcema Figueiredo, residente na
        Rua José Bonifácio, 125/1602, Madalena-Recife-PE, CEP:50.710-435 –
        Telefone (81999751015) e e-mail (nilcema.figueiredo@ufpe.br) para
        contato do pesquisador responsável, inclusive ligações a cobrar. Também
        participa da pesquisa, coordenando a área de Tecnologia da Informação, a
        pesquisadora: Amanda Maria Chaves Telefones para contato: (81996555073).
      </PD>
      <PD>
        O (a) senhor (a) estará livre para decidir participar ou recusar-se.
        Caso não aceite participar, não haverá nenhum problema, desistir é um
        direito seu, bem como será possível retirar o consentimento em qualquer
        fase da pesquisa, também sem nenhuma penalidade.
      </PD>
      <DocumentParagraphyTitle>
        <b>INFORMAÇÕES SOBRE A PESQUISA:</b>
      </DocumentParagraphyTitle>
      <ul>
        <DocumentLi>
          <b>Descrição da pesquisa e esclarecimento da participação:</b> Nessa
          pesquisa, vamos precisar que você participe de investigação prévia à
          implantação da plataforma GestBucalSD; realize a avaliação de
          qualidade do estabelecimento de saúde que trabalha e avaliação de
          satisfação profissional, caso você seja cirurgião(ã) dentista; e,
          investigação sobre o efeito do GestBucalSD no fim do projeto. Para
          tal, você acessará o(s) módulo(s) operacional(s) através da plataforma
          web-based GestBucalSD e responderá o(s) questionário(s)
          correspondente(s) a sua vinculação (periodicamente). Toda coleta de
          dados será realizada em meio on-line, onde, os participantes farão um
          cadastro na plataforma, utilizando dados pessoais como (Nome, CPF,
          Data de Nascimento, Endereço, E-mail, Sexo e Telefone), além, da
          criação de uma senha, que será armazenada e recuperada através de
          criptografia e ponta a ponta). O tempo de cada avaliação dura em média
          de 8 a 10 minutos, realizada individualmente. A coleta será feita de
          acordo com a disponibilidade e vontade do participante, visto que
          estará disponível em meio on-line para preenchimento de acordo com
          execução da pesquisa.
        </DocumentLi>
        <DocumentLi>
          <b>RISCOS:</b> Esse estudo tem riscos mínimos. Os principais riscos
          estão relacionados ao manejo e proteção de dados, especialmente, por
          se tratar de dados sensíveis. Para minimizar os possíveis riscos de
          vazamento de dados, os dados de cadastro serão armazenados em banco de
          dados isolados, com senha e criptografados. O profissional pode sentir
          algum constrangimento por ter que avaliar o seu serviço, porém todas
          as respostas dos questionários serão analisadas de maneira macro, e,
          em sua divulgação não estarão ligadas a identidade do usuário as
          respostas. Também pode ocorrer o risco do desconforto, onde o
          profissional pode não se sentir confortável em receber e-mails
          relacionados a plataforma. Para minimizar tal risco o profissional
          pode optar por não receber notificações da plataforma, ou até excluir
          sua conta a qualquer momento que desejar.
        </DocumentLi>
        <DocumentLi>
          <b>BENEFÍCIOS diretos/indiretos para os voluntários:</b> Os benefícios
          diretos para o profissional estão relacionados a adequação das
          condições sociais e do trabalho, melhoria de sua satisfação
          profissional, bem como, maior empoderamento técnico e político à sua
          atuação. Como benefícios indiretos, espera-se que aprimoramento dos
          estabelecimentos de saúde e consequente rede de atenção em saúde
          bucal. Os métodos avaliativos, expressam juízo de valor, podem levar a
          tomada de decisão para mudanças locais com vistas à melhoria da
          qualidade, resultando em serviços mais efetivos, promotores de saúde.
          E, o uso de ferramenta eletrônica oportuniza decisão ágil para
          governança inteligente
        </DocumentLi>
      </ul>
      <PD>
        Esclarecemos que os participantes dessa pesquisa têm plena liberdade de
        se recusar a participar do estudo e que esta decisão não acarretará
        penalização por parte dos pesquisadores. Todas as informações desta
        pesquisa serão confidenciais e serão divulgadas apenas em eventos ou
        publicações científicas, não havendo identificação dos voluntários, a
        não ser entre os responsáveis pelo estudo, sendo assegurado o sigilo
        sobre a sua participação. Os dados coletados nesta pesquisa (respostas
        do questionário), ficarão armazenados em banco de dados seguro em nuvem
        (Herokku), sob a responsabilidade do pesquisador, no endereço (acima
        informado), pelo período de mínimo 5 anos após o término da pesquisa.
      </PD>
      <PD>
        Nada lhe será pago e nem será cobrado para participar desta pesquisa,
        pois a aceitação é voluntária, mas fica também garantida a indenização
        em casos de danos, comprovadamente decorrentes da participação na
        pesquisa, conforme decisão judicial ou extra-judicial. Se houver
        necessidade, as despesas para a sua participação serão assumidas pelos
        pesquisadores (ressarcimento de transporte e alimentação).
      </PD>
      <PD>
        Em caso de dúvidas relacionadas aos aspectos éticos deste estudo, o (a)
        senhor (a) poderá consultar o Comitê de Ética em Pesquisa Envolvendo
        Seres Humanos da UFPE no endereço: (Avenida da Engenharia s/n – 1º
        Andar, sala 4 - Cidade Universitária, Recife-PE, CEP: 50740-600, Tel.:
        (81) 2126.8588 – e-mail: cephumanos.ufpe@ufpe.br).
      </PD>

      <DocumentParagraphyTitle>
        <PDInput
          placeholder="Assinatura do pesquisador"
          style={{ textAlign: "center" }}
          onChange={(e) => setNameResearch(e.target.value)}
          value={nameResearch}
        />
        <br></br>
        Assinatura do pesquisador
      </DocumentParagraphyTitle>

      <DocumentParagraphyTitle>
        <b>CONSENTIMENTO DA PARTICIPAÇÃO DA PESSOA COMO VOLUNTÁRIO (A)</b>
      </DocumentParagraphyTitle>

      <PD>
        Eu,{" "}
        <PDInput
          placeholder="Nome do participante"
          value={nameResponsible}
          onChange={(e) => setNameResponsible(e.target.value)}
        />
        , CPF{" "}
        <PDInput
          placeholder="CPF do participante"
          value={responsibleCPF}
          onChange={(e) => setResponsibleCPF(e.target.value)}
        />
        , abaixo assinado, após a leitura (ou a escuta da leitura) deste
        documento e de ter tido a oportunidade de conversar e ter esclarecido as
        minhas dúvidas com o pesquisador responsável, concordo em participar do
        estudo pesquisa GestBucalSD: AVALIAÇÃO DO USO DE PLATAFORMA WEB-BASED
        PARA MELHORIA DA QUALIDADE E GOVERNANÇA DOS SERVIÇOS PÚBLICOS DE SAÚDE
        BUCAL, como voluntário (a). Fui devidamente informado (a) e esclarecido
        (a) pelo(a) pesquisador (a) sobre a pesquisa, os procedimentos nela
        envolvidos, assim como os possíveis riscos e benefícios decorrentes de
        minha participação. Foi-me garantido que posso retirar o meu
        consentimento a qualquer momento, sem que isto leve a qualquer
        penalidade (ou interrupção de meu acompanhamento/
        assistência/tratamento). Informe seu e-mail para enviarmos o termos.
        Email:{" "}
        <PDInput
          placeholder="Email"
          value={responsibleEmail}
          onChange={(e) => setResponsibleEmail(e.target.value)}
        />
      </PD>
    </DocumentData>
  );
});

Index.displayName = "TCLE";

export default Index;
