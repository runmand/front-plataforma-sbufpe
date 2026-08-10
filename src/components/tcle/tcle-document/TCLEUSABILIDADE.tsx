import React, { forwardRef, useImperativeHandle, useState } from "react";
import { DocumentData } from "../styled";
import { DocumentParagraphyTitle, PD, PDInput } from "./styled";
import { DataTerm } from "..";
import { generatePDF } from "../exportpdf";
import { onlyLetters } from "src/core/utils/text";

const FieldError = ({ msg }: { msg: string }) =>
  msg ? <span style={{ color: '#dc2626', fontSize: '0.75em', display: 'block', marginTop: '2px', whiteSpace: 'nowrap' }}>{msg}</span> : null;

const FieldWrap = ({ children }: { children: React.ReactNode }) => (
  <span style={{ display: 'inline-flex', flexDirection: 'column', verticalAlign: 'middle' }}>
    {children}
  </span>
);

const Index = forwardRef((props, ref) => {
  const [participantName, setParticipantName] = useState<string>("");
  const [participantNameError, setParticipantNameError] = useState<string>("");
  const [participantEmail, setParticipantEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const isFormValid = () => {
    let valid = true;

    if (!participantName.trim()) { setParticipantNameError("Campo obrigatório."); valid = false; } else setParticipantNameError("");

    if (!participantEmail.trim()) { setEmailError("O e-mail é obrigatório."); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(participantEmail)) { setEmailError("E-mail inválido."); valid = false; }
    else setEmailError("");

    return valid;
  };

  async function validateForm(): Promise<DataTerm | undefined> {
    if (!isFormValid()) return;

    const node = document.getElementById("TCLEUSABILIDADE")!.children;
    const pdf = await generatePDF(node);

    return {
      valid: true,
      type: "TCLE",
      email: participantEmail,
      account: Number(localStorage.getItem("userId")),
      pdf: await pdf,
      created_at: new Date(),
    };
  }

  useImperativeHandle(ref, () => ({
    getStates: async () => validateForm(),
  }));

  return (
    <DocumentData id="TCLEUSABILIDADE">
      <DocumentParagraphyTitle>
        <b>UNIVERSIDADE FEDERAL DE PERNAMBUCO</b>
      </DocumentParagraphyTitle>
      <DocumentParagraphyTitle>
        <b>TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO (TCLE) – VERSÃO DIGITAL</b>
        TESTE DE USABILIDADE DA PLATAFORMA GESTBUCALSD
      </DocumentParagraphyTitle>

      <PD>
        Você está sendo convidado(a) a participar, como voluntário(a), do teste
        de usabilidade da plataforma GestBucalSD, vinculado à pesquisa
        "GestBucalSD: Avaliação do uso de plataforma web-based para melhoria da
        qualidade e governança dos serviços públicos de saúde bucal", sob a
        responsabilidade da pesquisadora Nilcema Figueiredo (UFPE). Antes de
        começar, leia atentamente as informações abaixo.
      </PD>

      <PD>
        <b>Objetivo do teste:</b> avaliar a facilidade de uso, a clareza das
        informações e a navegação da plataforma. A atividade é realizada
        totalmente on-line e dura, em média, de 8 a 10 minutos. Não há
        respostas certas ou erradas — quem está sendo avaliado é o sistema,
        não você.
      </PD>
      <PD>
        <b>Participação voluntária:</b> sua participação é livre e voluntária.
        Você pode se recusar a participar ou desistir a qualquer momento, sem
        necessidade de justificativa e sem qualquer penalidade.
      </PD>
      <PD>
        <b>Riscos:</b> este teste apresenta riscos mínimos, relacionados
        principalmente à proteção de dados e a um eventual desconforto ao
        avaliar a plataforma. Para minimizá-los, seus dados são armazenados de
        forma segura e criptografada, e todas as respostas são analisadas de
        maneira agregada, sem qualquer identificação individual na divulgação
        dos resultados.
      </PD>
      <PD>
        <b>Benefícios:</b> ao participar, você contribui diretamente para o
        aprimoramento da plataforma e, indiretamente, para a melhoria dos
        serviços públicos de saúde bucal. Não há qualquer forma de pagamento
        ou cobrança pela participação.
      </PD>
      <PD>
        <b>Confidencialidade:</b> todas as informações são confidenciais e
        serão divulgadas apenas de forma agregada, em eventos ou publicações
        científicas, sem identificação dos participantes. Os dados ficarão
        armazenados em banco de dados seguro em nuvem, sob responsabilidade da
        pesquisadora, pelo período mínimo de 5 anos após o término da
        pesquisa.
      </PD>
      <PD>
        <b>Contato dos pesquisadores:</b> Nilcema Figueiredo — (81)
        99975-1015 — nilcema.figueiredo@ufpe.br; Amanda Maria Chaves
        (coordenação de TI) — (81) 99655-5073.
      </PD>
      <PD>
        <b>Comitê de Ética em Pesquisa (CEP/UFPE):</b> Avenida da Engenharia
        s/n, 1º andar, sala 4 — Cidade Universitária, Recife-PE, CEP
        50740-600 — (81) 2126.8588 — cephumanos.ufpe@ufpe.br.
      </PD>

      <DocumentParagraphyTitle>
        <b>CONSENTIMENTO DA PARTICIPAÇÃO DA PESSOA COMO VOLUNTÁRIO(A)</b>
      </DocumentParagraphyTitle>

      <PD>
        Eu,{" "}
        <FieldWrap>
          <PDInput
            placeholder="Nome completo"
            value={participantName}
            style={{ borderBottomColor: participantNameError ? '#dc2626' : undefined }}
            onChange={(e) => { setParticipantName(onlyLetters(e.target.value)); if (participantNameError) setParticipantNameError(""); }}
          />
          <FieldError msg={participantNameError} />
        </FieldWrap>
        {" "}, declaro que li e compreendi as informações acima, que tive
        minhas dúvidas esclarecidas e que concordo, de forma livre e
        voluntária, em participar do teste de usabilidade da plataforma
        GestBucalSD.
      </PD>
      <PD>
        E-mail (para envio de uma cópia deste termo):{" "}
        <FieldWrap>
          <PDInput
            placeholder="email@exemplo.com"
            value={participantEmail}
            style={{ borderBottomColor: emailError ? '#dc2626' : undefined }}
            onChange={(e) => { setParticipantEmail(e.target.value); if (emailError) setEmailError(""); }}
            onBlur={() => {
              if (participantEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(participantEmail))
                setEmailError("E-mail inválido.");
            }}
          />
          <FieldError msg={emailError} />
        </FieldWrap>
      </PD>
    </DocumentData>
  );
});

Index.displayName = "TCLEUSABILIDADE";

export default Index;
