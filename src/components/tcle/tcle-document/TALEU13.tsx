import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { DocumentData } from "../styled";
import {
  DocumentParagraphyTitle,
  PD,
  PDInput,
  TaleContainer,
  TaleImage,
} from "./styled";
import { generatePDF } from "../exportpdf";
import { DataTerm } from "..";
import { maskDate, validateDate } from "src/core/utils/date";
import { maskPhone, validatePhone } from "src/core/utils/phone";
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
  const [responsibleAddres, setResponsibleAddres] = useState<string>("");
  const [responsibleAddresError, setResponsibleAddresError] = useState<string>("");
  const [responsibleNumber, setResponsibleNumber] = useState<string>("");
  const [responsibleNumberError, setResponsibleNumberError] = useState<string>("");
  const [responsibleEmail, setResponsibleEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [nameResponsible, setNameResponsible] = useState<string>("");
  const [nameResponsibleError, setNameResponsibleError] = useState<string>("");
  const [local, setLocal] = useState<string>("");
  const [localError, setLocalError] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [dateError, setDateError] = useState<string>("");

  const isFormValid = () => {
    let valid = true;

    if (!nameMinor.trim()) { setNameMinorError("Campo obrigatório."); valid = false; } else setNameMinorError("");
    if (!nameResponsible.trim()) { setNameResponsibleError("Campo obrigatório."); valid = false; } else setNameResponsibleError("");
    if (!responsibleAddres.trim()) { setResponsibleAddresError("Campo obrigatório."); valid = false; } else setResponsibleAddresError("");
    if (!responsibleNumber.trim()) { setResponsibleNumberError("O telefone é obrigatório."); valid = false; }
    else if (!validatePhone(responsibleNumber)) { setResponsibleNumberError("Telefone inválido. Use (XX) XXXXX-XXXX."); valid = false; }
    else setResponsibleNumberError("");

    if (!responsibleEmail.trim()) { setEmailError("O e-mail é obrigatório."); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(responsibleEmail)) { setEmailError("E-mail inválido."); valid = false; }
    else setEmailError("");

    if (!local.trim()) { setLocalError("Campo obrigatório."); valid = false; } else setLocalError("");

    if (!date.trim()) { setDateError("A data é obrigatória."); valid = false; }
    else if (!validateDate(date)) { setDateError("Data inválida. Use DD/MM/AAAA."); valid = false; }
    else setDateError("");

    return valid;
  };

  async function validateForm(): Promise<DataTerm | undefined> {
    if (!isFormValid()) return;

    const node = document.getElementById("TALEU")!.children;
    const pdf = await generatePDF(node);

    const response: DataTerm = {
      valid: true,
      type: "TALE-13",
      email: responsibleEmail,
      account: Number(localStorage.getItem("userId")),
      pdf: await pdf,
      created_at: new Date(),
    };

    return response;
  }

  useImperativeHandle(ref, () => ({
    getStatesNew: async () => {
      const response = validateForm();
      return response;
    },
  }));

  return (
    <DocumentData id="TALEU">
      <DocumentParagraphyTitle>
        <b>UNIVERSIDADE FEDERAL DE PERNAMBUCO</b>
      </DocumentParagraphyTitle>
      <DocumentParagraphyTitle>
        <b>
          Termo de Assentimento Livre e Esclarecido | TALE Lúdico (5 a 12 anos)
        </b>
      </DocumentParagraphyTitle>
      <TaleContainer>
        <TaleImage src="/tale1.png" />
        <PD>
          Olá, quero te convidar para participar de um estudo chamado:
          &ldquo;Vigilância Epidemiológica em Saúde Bucal a partir da plataforma
          web-based GestBucalSD&rdquo;. Esse estudo é coordenado pelas pesquisadoras:
          Gabriela da Silveira Gaspar e Nilcema Figueiredo.
        </PD>
      </TaleContainer>
      <TaleContainer>
        <TaleImage src="/tale2.png" />
        <PD>
          Posso te contar um pouco mais sobre isso? Vamos conversar com quem
          cuida de você para entender como estão os seus dentes e como é a sua
          experiência com o dentista. Também queremos saber algumas informações
          sobre você, como: onde mora, sua série na escola e como você cuida da
          sua saúde bucal.
        </PD>
      </TaleContainer>
      <TaleContainer>
        <p></p>
        <PD>
          Depois, se for necessário, vamos dar uma olhadinha na sua boca e nos
          seus dentes, do mesmo jeitinho que o dentista faz. Tudo será feito em
          um local limpo, iluminado e seguro. As perguntas levarão cerca de 10
          minutos, e olhar a sua boca e dentinhos vai durar aproximadamente 15
          minutos.
        </PD>
      </TaleContainer>
      <TaleContainer>
        <TaleImage src="/tale3.png" />
        <PD>
          Quem fará isso são profissionais e estudantes da área de saúde bucal
          que vão usar os materiais certos para garantir que tudo ocorra de
          forma segura. As informações serão registradas em uma Plataforma
          chamada GestBucalSD.
        </PD>
      </TaleContainer>
      <TaleContainer>
        <p></p>
        <PD>
          Possa ser que algumas coisas não sejam tão legais, como: algumas
          perguntas que você pode achar estranhas ou que te deixem um pouco
          envergonhado(a).{" "}
        </PD>
      </TaleContainer>
      <TaleContainer>
        <TaleImage src="/tale4.png" />
        <PD>
          Quando estivermos olhando sua boca e seus dentinhos, você pode sentir
          um pequeno desconforto ao precisar manter a boca aberta por um
          tempinho. Mas não se preocupe, estaremos sempre ao seu lado para te
          ajudar e faremos tudo no seu ritmo.
        </PD>
      </TaleContainer>
      <TaleContainer>
        <p></p>
        <PD>
          E tem muita coisa boa também! Com as informações que descobrirmos,
          poderemos ajudar mais crianças a irem ao dentista e cuidarem melhor da
          sua boca e dentes. Também vamos ensinar crianças em creches e escolas
          como manter os dentes saudáveis!
        </PD>
      </TaleContainer>
      <TaleContainer>
        <TaleImage src="/tale5.png" />
        <PD>
          Ah, e se em qualquer momento você não quiser mais participar, é só
          dizer: &quot;chega, não quero mais!&quot; E tudo bem, nós paramos na
          hora e você pode ir brincar ou fazer outra coisa, sem problema algum!
        </PD>
      </TaleContainer>
      <PD style={{ textAlign: "center" }}>
        ⚠️ Se você ou quem cuida de você quiser falar com as pesquisadoras, pode
        entrar em contato pelos seguintes meios:
      </PD>
      <PD style={{ textAlign: "center" }}>
        📞 Telefone: (81) 99147-3749 / (81) 99975-1015
      </PD>
      <PD style={{ textAlign: "center" }}>
        📩 E-mail: gabriela.gaspar@ufpe.br nilcema.figueiredo@ufpe.br{" "}
      </PD>
      <PD style={{ textAlign: "center" }}>
        🏠Endereço institucional: Av. da Engenharia, S/N- Bloco D – 1º andar,{" "}
        <br />
        Cidade Universitária – Recife/PE - CEP 50.740-600.
      </PD>
      <TaleContainer>
        <TaleImage src="/tale6.png" />
        <PD>
          Nós já explicamos tudo direitinho para quem cuida de você, mas também
          queremos saber a sua opinião. Você quer participar deste estudo? Se
          você entendeu tudo e quer participar, é só dizer &quot;sim!&quot; e
          clicar no local indicado da plataforma. Se você aceitar, você vai
          receber uma cópia deste documento por email.
        </PD>
      </TaleContainer>

      <PD>
        Local:{" "}
        <FieldWrap>
          <PDInput
            placeholder="Ex: Recife/PE"
            value={local}
            style={{ borderBottomColor: localError ? '#dc2626' : undefined }}
            onChange={(e) => { setLocal(onlyLetters(e.target.value)); if (localError) setLocalError(""); }}
          />
          <FieldError msg={localError} />
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

      <DocumentParagraphyTitle>
        <FieldWrap>
          <PDInput
            placeholder="Assinatura da criança"
            style={{ textAlign: "center", borderBottomColor: nameMinorError ? '#dc2626' : undefined }}
            onChange={(e) => { setNameMinor(onlyLetters(e.target.value)); if (nameMinorError) setNameMinorError(""); }}
            value={nameMinor}
          />
          <FieldError msg={nameMinorError} />
        </FieldWrap>
        <br />
        Assinatura da criança
      </DocumentParagraphyTitle>

      <DocumentParagraphyTitle>
        <b>Dados do responsável legal:</b>
      </DocumentParagraphyTitle>

      <DocumentParagraphyTitle>
        <PD>
          Nome:{" "}
          <FieldWrap>
            <PDInput
              value={nameResponsible}
              style={{ borderBottomColor: nameResponsibleError ? '#dc2626' : undefined }}
              onChange={(e) => { setNameResponsible(onlyLetters(e.target.value)); if (nameResponsibleError) setNameResponsibleError(""); }}
            />
            <FieldError msg={nameResponsibleError} />
          </FieldWrap>
        </PD>
        <PD>
          Endereço:{" "}
          <FieldWrap>
            <PDInput
              value={responsibleAddres}
              style={{ borderBottomColor: responsibleAddresError ? '#dc2626' : undefined }}
              onChange={(e) => { setResponsibleAddres(e.target.value); if (responsibleAddresError) setResponsibleAddresError(""); }}
            />
            <FieldError msg={responsibleAddresError} />
          </FieldWrap>
        </PD>
        <PD>
          E-mail:{" "}
          <FieldWrap>
            <PDInput
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
        <PD>
          Telefone:{" "}
          <FieldWrap>
            <PDInput
              value={responsibleNumber}
              style={{ borderBottomColor: responsibleNumberError ? '#dc2626' : undefined }}
              onChange={(e) => { setResponsibleNumber(maskPhone(e.target.value)); if (responsibleNumberError) setResponsibleNumberError(""); }}
            />
            <FieldError msg={responsibleNumberError} />
          </FieldWrap>
        </PD>
      </DocumentParagraphyTitle>
    </DocumentData>
  );
});

Index.displayName = "TALEU";

export default Index;
