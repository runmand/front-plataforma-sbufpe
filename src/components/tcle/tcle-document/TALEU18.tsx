import React, { forwardRef, useImperativeHandle, useState } from "react";
import { DocumentData } from "../styled";
import { DocumentLi, DocumentParagraphyTitle, PD, PDInput } from "./styled";
import { DataTerm } from "..";
import { generatePDF } from "../exportpdf";
import { maskRG } from "src/core/utils/rg";
import { maskDate, validateDate } from "src/core/utils/date";
import { onlyLetters } from "src/core/utils/text";

const FieldError = ({ msg }: { msg: string }) =>
  msg ? <span style={{ color: '#dc2626', fontSize: '0.75em', display: 'block', marginTop: '2px', whiteSpace: 'nowrap' }}>{msg}</span> : null;

const FieldWrap = ({ children }: { children: React.ReactNode }) => (
  <span style={{ display: 'inline-flex', flexDirection: 'column', verticalAlign: 'middle' }}>
    {children}
  </span>
);

const Index = forwardRef((props, ref) => {
  const [nameMinor, setNameMinor] = useState<string>("");
  const [nameMinorError, setNameMinorError] = useState<string>("");
  const [nameResearch, setNameResearch] = useState<string>("");
  const [nameResearchError, setNameResearchError] = useState<string>("");
  const [numberMinor, setNumberMinor] = useState<string>("");
  const [numberMinorError, setNumberMinorError] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [locationError, setLocationError] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [dateError, setDateError] = useState<string>("");
  const [nameResponsible, setNameResponsible] = useState<string>("");
  const [nameResponsibleError, setNameResponsibleError] = useState<string>("");
  const [responsibleEmail, setResponsibleEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const isFormValid = () => {
    let valid = true;

    if (!nameMinor.trim()) { setNameMinorError("Campo obrigatório."); valid = false; } else setNameMinorError("");
    if (!nameResearch.trim()) { setNameResearchError("Campo obrigatório."); valid = false; } else setNameResearchError("");
    if (!nameResponsible.trim()) { setNameResponsibleError("Campo obrigatório."); valid = false; } else setNameResponsibleError("");

    setNumberMinorError("");

    if (!location.trim()) { setLocationError("Campo obrigatório."); valid = false; } else setLocationError("");

    if (!date.trim()) { setDateError("A data é obrigatória."); valid = false; }
    else if (!validateDate(date)) { setDateError("Data inválida. Use DD/MM/AAAA."); valid = false; }
    else setDateError("");

    if (!responsibleEmail.trim()) { setEmailError("O e-mail é obrigatório."); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(responsibleEmail)) { setEmailError("E-mail inválido."); valid = false; }
    else setEmailError("");

    return valid;
  };

  async function validateForm(): Promise<DataTerm | undefined> {
    if (!isFormValid()) return;

    const node = document.getElementById("TALE")!.children;
    const pdf = await generatePDF(node);

    return {
      valid: true,
      type: "TALE",
      email: responsibleEmail,
      account: Number(localStorage.getItem("userId")),
      pdf: await pdf,
      created_at: new Date(),
    };
  }

  useImperativeHandle(ref, () => ({
    getStates: async () => validateForm(),
  }));

  return (
    <DocumentData id="TALE">
      <DocumentParagraphyTitle>
        <b>UNIVERSIDADE FEDERAL DE PERNAMBUCO</b>
      </DocumentParagraphyTitle>
      <DocumentParagraphyTitle>
        <b>TERMO DE ASSENTIMENTO LIVRE E ESCLARECIDO</b>
        (PARA MENORES DE 13 a 18 ANOS)
      </DocumentParagraphyTitle>
      <PD>
        Convidamos você{" "}
        <FieldWrap>
          <PDInput
            placeholder="Nome do menor"
            value={nameMinor}
            style={{ borderBottomColor: nameMinorError ? '#dc2626' : undefined }}
            onChange={(e) => { setNameMinor(onlyLetters(e.target.value)); if (nameMinorError) setNameMinorError(""); }}
          />
          <FieldError msg={nameMinorError} />
        </FieldWrap>
        {" "}, após autorização dos seus pais ou dos responsáveis legais, para
        participar como voluntário (a) da pesquisa: Vigilância Epidemiológica em
        Saúde Bucal a partir da plataforma web-based GestBucalSD, que tem como
        objetivo investigar a saúde bucal e a satisfação com serviços
        odontológicos com uso de ferramenta eletrônica. Esta pesquisa é da
        responsabilidade e orientação das pesquisadoras Profa. Dra. Gabriela da
        Silveira Gaspar (Telefone: 81991473749 (inclusive para ligações a
        cobrar) e e-mail: gabriela.gaspar@ufpe.br) e Profa Dra Nilcema
        Figueiredo (Telefone: 81999751015 (inclusive para ligações a cobrar) e
        e-mail: nilcema.figueiredo@ufpe.br) Endereço institucional: Av. da
        Engenharia, S/N- Bloco D – 1º andar, Cidade Universitária – Recife/PE -
        CEP 50.740-600.
      </PD>
      <PD>
        Informamos que seu pai/mãe ou responsável legal permitiu a sua
        participação na pesquisa, mas que você estará livre para decidir
        participar ou recusar-se. Caso não aceite participar, não haverá nenhum
        problema, desistir é um direito seu. Você será esclarecido (a) sobre
        qualquer dúvida a respeito da sua participação na pesquisa.
      </PD>
      <PD>
        Apenas quando todos os esclarecimentos forem dados, você pode concordar
        com a participação, podendo retirar esse consentimento ou interromper a
        sua participação em qualquer fase da pesquisa, sem nenhum prejuízo.
      </PD>
      <PD>
        Para o aceite do termo de consentimento em formato digital, basta clicar
        na caixa especificada na plataforma digital indicada pelo pesquisador
        (uma cópia do termo irá para o seu e-mail cadastrado). Quando o termo
        estiver impresso, você deve assinar no final do documento (uma via do
        termo lhe será entregue).
      </PD>
      <DocumentParagraphyTitle>
        <b>INFORMAÇÕES SOBRE A PESQUISA:</b>
      </DocumentParagraphyTitle>
      <ul>
        <DocumentLi>
          <b>Descrição da pesquisa e esclarecimento da participação:</b> Para se
          conhecer a realidade da saúde bucal dos participantes e a satisfação
          com serviços odontológicos, vamos precisar que participe de entrevista
          com questões sobre aspectos socioeconômicos, grau de escolaridade,
          história em saúde bucal, experiência com atendimento odontológico,
          etc. E depois, talvez seja preciso fazer um exame bucal parecido com o
          que o dentista faz no consultório. A entrevista e exame da boca serão
          em local apropriado, iluminado, com todo cuidado, segurança e higiene,
          conforme normas da Organização Mundial da Saúde e do Ministério da
          Saúde. A entrevista dura no máximo 10 minutos e o exame da boca,
          quando realizado, dura em média 15 minutos. A pesquisa será feita por
          estudantes de odontologia ou profissionais de saúde bucal, devidamente
          treinados, com uso de material e instrumental adequados. Os
          formulários da pesquisa estão contidos na Plataforma digital
          GestBucalSD.
        </DocumentLi>
        <DocumentLi>
          <b>RISCOS:</b> Esse estudo tem riscos mínimos. Sobre a entrevista, o
          participante pode considerar alguma pergunta estranha ou que gere
          constrangimento. Pode ainda considerar como risco o manejo e proteção
          dos seus dados. Caso haja incômodo à entrevista, você deve falar com o
          examinador, que saberá esclarecer as questões e sua importância ao
          estudo. Os dados em saúde bucal são considerados sensíveis e há o
          reconhecimento que os dados da criança/adolescente interessam somente
          a você. Por isto, o seu nome não aparecerá em nenhum relatório, quer
          dizer, não será identificado em nenhum momento neste estudo. E, para
          minimizar o risco de vazamento de dados, há garantia que todo o
          cadastro será armazenado em banco de dados isolado, com senha e
          criptografado. Todas as respostas dos formulários serão analisadas de
          maneira macro, e, em sua divulgação não estarão ligadas a identidade
          do participante. Sobre o exame de boca, você pode se sentir
          desconfortável ou ter algum incômodo, como ficar com a boca aberta por
          mais tempo. Assim, em qualquer momento você poderá falar para o
          examinador sobre o incômodo e ele dará solução.
        </DocumentLi>
        <DocumentLi>
          <b>BENEFÍCIOS diretos/indiretos para os voluntários:</b> Benefícios
          diretos: Com o conhecimento da realidade de saúde bucal e dos serviços
          odontológicos haverá organização do atendimento em função das
          necessidades e prioridade locais para a melhoria da qualidade do
          cuidado e ampliação do acesso aos serviços odontológicos, articulação
          com organizações sociais locais (creches, escolas, etc.) e interação
          para promoção da saúde. Os benefícios indiretos levam ao
          fortalecimento da rede de atenção em saúde bucal para execução de
          ações de promoção, prevenção e assistência de acordo com o perfil
          epidemiológico encontrado. E, o uso de ferramenta eletrônica
          oportuniza decisão ágil para vigilância em saúde bucal à governança
          inteligente.
        </DocumentLi>
      </ul>
      <PD>
        Esclarecemos que os participantes dessa pesquisa têm plena liberdade de
        se recusar a participar do estudo e que esta decisão não acarretará
        penalização por parte dos pesquisadores. Todas as informações desta
        pesquisa serão confidenciais e serão divulgadas apenas em eventos ou
        publicações científicas, não havendo identificação dos voluntários, a
        não ser entre os responsáveis pelo estudo, sendo assegurado o sigilo
        sobre a sua participação. Os dados coletados nesta pesquisa ficarão
        armazenados em banco de dados, sob a responsabilidade do pesquisador e
        da instituição de pesquisa, pelo período mínimo de 5 anos após o término
        da pesquisa.
      </PD>
      <PD>
        Nem você e nem seus pais ou responsáveis legais não pagarão nada e nem
        receberão nenhum pagamento para você participar desta pesquisa, pois
        deve ser de forma voluntária, mas fica também garantida a indenização em
        casos de danos, comprovadamente decorrentes da participação dele/a na
        pesquisa, conforme decisão judicial ou extra-judicial.
      </PD>
      <PD>
        Em caso de dúvidas relacionadas aos aspectos éticos deste estudo, o (a)
        senhor (a) poderá consultar o Comitê de Ética em Pesquisa Envolvendo
        Seres Humanos da UFPE no endereço: (Avenida da Engenharia s/n – Prédio
        do CCS - 1º Andar, sala 4 - Cidade Universitária, Recife-PE, CEP:
        50740-600, Tel.: (81) 2126.8588 – e-mail: cephumanos.ufpe@ufpe.br).
      </PD>

      <DocumentParagraphyTitle>
        <FieldWrap>
          <PDInput
            placeholder="Assinatura do pesquisador"
            style={{ textAlign: "center", borderBottomColor: nameResearchError ? '#dc2626' : undefined }}
            onChange={(e) => { setNameResearch(onlyLetters(e.target.value)); if (nameResearchError) setNameResearchError(""); }}
            value={nameResearch}
          />
          <FieldError msg={nameResearchError} />
        </FieldWrap>
        <br />
        Assinatura do pesquisador
      </DocumentParagraphyTitle>

      <DocumentParagraphyTitle>
        <b>ASSENTIMENTO DO(DA) MENOR DE IDADE EM PARTICIPAR COMO VOLUNTÁRIO(A)</b>
      </DocumentParagraphyTitle>

      <PD>
        Eu,{" "}
        <FieldWrap>
          <PDInput
            placeholder="Nome do menor"
            value={nameMinor}
            style={{ borderBottomColor: nameMinorError ? '#dc2626' : undefined }}
            onChange={(e) => { setNameMinor(onlyLetters(e.target.value)); if (nameMinorError) setNameMinorError(""); }}
          />
          <FieldError msg={nameMinorError} />
        </FieldWrap>
        {" "}, portador (a) do documento de Identidade{" "}
        <FieldWrap>
          <PDInput
            placeholder="00.000.000-0"
            value={numberMinor}
            maxLength={12}
            style={{ borderBottomColor: numberMinorError ? '#dc2626' : undefined }}
            onChange={(e) => {
              const masked = maskRG(e.target.value);
              setNumberMinor(masked);
              if (numberMinorError) setNumberMinorError("");
            }}
          />
          <FieldError msg={numberMinorError} />
        </FieldWrap>
        {" "}, (se já tiver documento), abaixo assinado, concordo em participar do
        estudo Vigilância Epidemiológica em Saúde Bucal a partir da plataforma
        web-based GestBucalSD, como voluntário (a). Fui informado (a) e
        esclarecido (a) pelo (a) pesquisador (a) sobre a pesquisa, o que vai ser
        feito, assim como os possíveis riscos e benefícios que podem acontecer
        com a minha participação. Foi-me garantido que posso desistir de
        participar a qualquer momento, sem que eu ou meus pais precisem pagar
        nada.
      </PD>
      <PD>
        Local:{" "}
        <FieldWrap>
          <PDInput
            placeholder="Ex: Recife/PE"
            value={location}
            style={{ borderBottomColor: locationError ? '#dc2626' : undefined }}
            onChange={(e) => { setLocation(onlyLetters(e.target.value)); if (locationError) setLocationError(""); }}
          />
          <FieldError msg={locationError} />
        </FieldWrap>
        {" "}Data:{" "}
        <FieldWrap>
          <PDInput
            placeholder="DD/MM/AAAA"
            value={date}
            maxLength={10}
            style={{ borderBottomColor: dateError ? '#dc2626' : undefined }}
            onChange={(e) => {
              const masked = maskDate(e.target.value);
              setDate(masked);
              if (dateError && validateDate(masked)) setDateError("");
            }}
            onBlur={() => {
              if (date && !validateDate(date)) setDateError("Data inválida. Use DD/MM/AAAA.");
            }}
          />
          <FieldError msg={dateError} />
        </FieldWrap>
      </PD>
      <PD>
        Assinatura do (da) responsável:{" "}
        <PDInput
          placeholder="Assinatura do responsável"
          value={nameResponsible}
          onChange={(e) => setNameResponsible(onlyLetters(e.target.value))}
        />
      </PD>
      <PD>
        E-mail:{" "}
        <FieldWrap>
          <PDInput
            placeholder="email@exemplo.com"
            value={responsibleEmail}
            style={{ borderBottomColor: emailError ? '#dc2626' : undefined }}
            onChange={(e) => { setResponsibleEmail(e.target.value); if (emailError) setEmailError(""); }}
            onBlur={() => {
              if (responsibleEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(responsibleEmail))
                setEmailError("E-mail inválido.");
            }}
          />
          <FieldError msg={emailError} />
        </FieldWrap>
      </PD>
    </DocumentData>
  );
});

Index.displayName = "TALE";

export default Index;
