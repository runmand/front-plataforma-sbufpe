import {
  forwardRef,
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
  TaleContainer,
  TaleImage,
} from "./styled";
import { generatePDF } from "../exportpdf";
import { useSnackbar } from "notistack";
import { DataTerm, PropsTerm } from "..";

const Index = forwardRef((props, ref) => {
  const [nameMinor, setNameMinor] = useState<string>("");
  const [responsibleAddres, setResponsibleAddres] = useState<string>("");
  const [responsibleNumber, setResponsibleNumber] = useState<string>("");
  const [responsibleEmail, setResponsibleEmail] = useState<string>("");
  const [nameResponsible, setNameResponsible] = useState<string>("");
  const [local, setLocal] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  const isFormValid = () => {
    if (!nameMinor) {
      enqueueSnackbar("Preencha o campo Nome do Menor", { variant: "warning" });
      return false;
    }
    if (!responsibleAddres) {
      enqueueSnackbar("Preencha o campo Endereço do Responsável", {
        variant: "warning",
      });
      return false;
    }
    if (!responsibleNumber) {
      enqueueSnackbar("Preencha o campo Número do Responsável", {
        variant: "warning",
      });
      return false;
    }
    if (!responsibleEmail) {
      enqueueSnackbar("Preencha o campo Email do Responsável", {
        variant: "warning",
      });
      return false;
    }
    if (
      !responsibleEmail ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(responsibleEmail)
    ) {
      enqueueSnackbar("Preencha um e-mail válido para o Responsável", {
        variant: "warning",
      });
      return false;
    }

    if (!nameResponsible) {
      enqueueSnackbar("Preencha o campo Nome do Responsável", {
        variant: "warning",
      });
      return false;
    }
    if (!local) {
      enqueueSnackbar("Preencha o campo Local", { variant: "warning" });
      return false;
    }
    if (!date) {
      enqueueSnackbar("Preencha o campo Data", { variant: "warning" });
      return false;
    }

    return true;
  };

  async function validateForm(): Promise<DataTerm> {
    if (!isFormValid()) return;

    const node = document.getElementById("TALEU").children;

    console.log(node);

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
          “Vigilância Epidemiológica em Saúde Bucal a partir da plataforma
          web-based GestBucalSD”. Esse estudo é coordenado pelas pesquisadoras:
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
        <PDInput
          placeholder="Local"
          onChange={(e) => setLocal(e.target.value)}
          value={local}
        />
        , Data:{" "}
        <PDInput
          placeholder="Local"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </PD>
      <DocumentParagraphyTitle>
        <PDInput
          placeholder="Assinatura da criança"
          style={{ textAlign: "center" }}
          onChange={(e) => setNameMinor(e.target.value)}
          value={nameMinor}
        />
        <br></br>
        Assinatura da criança
      </DocumentParagraphyTitle>
      <DocumentParagraphyTitle>
        <b>Dados do responsável legal:</b>
      </DocumentParagraphyTitle>
      <DocumentParagraphyTitle>
        <PD>
          Nome{" "}
          <PDInput
            value={nameResponsible}
            onChange={(e) => setNameResponsible(e.target.value)}
          />
        </PD>
        <PD>
          Endereço:
          <PDInput
            value={responsibleAddres}
            onChange={(e) => setResponsibleAddres(e.target.value)}
          />
        </PD>
        <PD>
          Email:{" "}
          <PDInput
            value={responsibleEmail}
            onChange={(e) => setResponsibleEmail(e.target.value)}
          />
        </PD>
        <PD>
          Telefone:{" "}
          <PDInput
            value={responsibleNumber}
            onChange={(e) => setResponsibleNumber(e.target.value)}
          />
        </PD>
      </DocumentParagraphyTitle>
    </DocumentData>
  );
});

Index.displayName = "TALEU";

export default Index;
