import Alert from "@components/alert/index";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { ID } from "../../../core/types";
import QuestionCard from "../../question";
import { QUESTION, QUESTION_ANSWER } from "../../question/type";
import SimpleFormService from "./service";
import { TPROPS } from "./type";

const ff = {
  display: "'Lora', Georgia, serif",
  body: "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif",
};
const C = {
  primary: '#6D141A',
  secondary: '#921c22',
  bg: '#FAF7F2',
  white: '#fff',
  text: '#1c1917',
  muted: '#a8a29e',
  border: '#e7e5e4',
};

/**
 * Blocos/módulos do "Formulário Geral de Usabilidade - GestBucalSD" (form id 16),
 * conforme o documento original. Mapeado por formQuestionFormRegisterId (não por
 * título da pergunta) para evitar qualquer divergência de acentuação/pontuação
 * entre o texto do documento e o que está salvo no banco.
 *
 * Isso é puramente de exibição, restrito a este formulário — não afeta nenhum
 * outro formulário do sistema.
 */
const FORM_16_BLOCKS: { title: string; description: string; questionIds: number[] }[] = [
  {
    title: '💻 Bloco 1: Perfil do Testador e Dispositivo',
    description: 'Objetivo: Mapear o perfil de acesso dos participantes para avaliar a adaptabilidade da interface.',
    questionIds: [683, 684, 685, 686],
  },
  {
    title: '👁️ Bloco 2: Entendimento e Primeiras Impressões (Página Inicial)',
    description: 'Tarefa 1: Acesse a página inicial da plataforma GestBucalSD. Leia as informações textuais apresentadas no lado esquerdo e observe o visual geral da tela.',
    questionIds: [687, 688, 689, 690],
  },
  {
    title: '🔐 Bloco 3: Mecanismos de Acesso e Cadastro',
    description: 'Tarefa 2: Localize e acione a opção "Cadastrar" na interface. Abra a lista de opções do campo "Tipo de Participante" e analise o formulário exibido na tela.',
    questionIds: [691, 692],
  },
  {
    title: '📚 Bloco 4: Navegação de Menus e Recursos (Validação de Links)',
    description: 'Tarefa 3: Feche o formulário de cadastro. No menu principal de navegação, tente explorar sequencialmente as opções dentro de "Acervo" (Artigos e InformeSBPE) e depois as opções dentro de "Quem Somos".',
    questionIds: [693, 694, 695, 696],
  },
  {
    title: '📊 Bloco 5: Interpretação de Painéis e Indicadores',
    description: 'Tarefa 4: Acesse a seção "Nossos Dados" no menu e navegue alternadamente pelas visualizações de dados disponíveis (como APS, Usuários e CEO). Observe a estrutura dos gráficos e os filtros no topo.',
    questionIds: [697, 698, 699, 700, 701],
  },
  {
    title: '📞 Bloco 6: Canais de Comunicação, Rodapé e Avaliação Geral',
    description: 'Tarefa 5: Acesse a tela de "Contato" no topo. Em seguida, role qualquer página até o final para verificar os links disponíveis no rodapé inferior escuro da plataforma.',
    questionIds: [702, 703, 704, 705],
  },
];

const FORM_16_BLOCK_BY_QUESTION_ID = new Map<number, typeof FORM_16_BLOCKS[number]>();
FORM_16_BLOCKS.forEach((block) => {
  block.questionIds.forEach((id) => FORM_16_BLOCK_BY_QUESTION_ID.set(id, block));
});

//TODO: Corrigir problema de F5
export default function Index(props: TPROPS) {
  const [answers, setAnswers] = useState<QUESTION_ANSWER[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpenSubmitFormDialog, setIsOpenSubmitFormDialog] = useState<boolean>(false);
  const [submitAttempted, setSubmitAttempted] = useState<boolean>(false);
  const [errorIds, setErrorIds] = useState<Set<ID>>(new Set());
  const { enqueueSnackbar } = useSnackbar();
  const simpleFormService = new SimpleFormService();

  const handleAnswerQuestion = (answer: QUESTION_ANSWER) => {
    setAnswers((prevAnswers) => {
      const indexToUpdate = prevAnswers.findIndex(
        (item) =>
          item.formQuestionFormRegisterId === answer.formQuestionFormRegisterId
      );

      if (indexToUpdate >= 0) {
        return prevAnswers.map((item, index) =>
          index === indexToUpdate ? answer : item
        );
      }

      return [...prevAnswers, answer];
    });
  };

  const handleHideQuestion = (formQuestionFormRegisterId: ID) => {
    setAnswers((prevAnswers) =>
      prevAnswers.filter(
        (item) => item.formQuestionFormRegisterId !== formQuestionFormRegisterId
      )
    );
  };

  const formatted = (array: QUESTION[]) => {
    if (props.formattedForm.id == 2) {
      if (array.length <= 4) return array;

      const firstQuestions = array.slice(0, 4);
      const lastQuestion = array.slice(-1);
      const middleQuestions = array.slice(4, -1);
      return [...firstQuestions, ...lastQuestion, ...middleQuestions];
    }

    return array;
  };

  const sortedAndFormattedQuestions = formatted(
    [...props.formattedForm.questions].sort(
      (a, b) =>
        +a.formQuestionFormRegisterId - +b.formQuestionFormRegisterId
    )
  );

  const renderQuestionCard = (question: QUESTION, index: number) => (
    <QuestionCard
      key={index}
      index={index}
      question={question}
      isError={errorIds.has(question.formQuestionFormRegisterId)}
      errorIds={errorIds}
      onAnswerQuestion={(data) => {
        handleAnswerQuestion(data);
        setErrorIds((prev) => { const next = new Set(prev); next.delete(question.formQuestionFormRegisterId); return next; });
      }}
      onHideQuestion={(data) => handleHideQuestion(data)}
    />
  );

  // Cabeçalhos de bloco só para o form 16 (Formulário Geral de Usabilidade).
  const renderQuestionsWithBlocks = () => {
    let lastBlockTitle: string | null = null;

    return sortedAndFormattedQuestions.flatMap((question, index) => {
      const block = FORM_16_BLOCK_BY_QUESTION_ID.get(Number(question.formQuestionFormRegisterId));
      const items: JSX.Element[] = [];

      if (block && block.title !== lastBlockTitle) {
        lastBlockTitle = block.title;
        items.push(
          <div key={`block-${block.title}`} style={{
            margin: index === 0 ? '0 0 20px' : '44px 0 20px',
            paddingBottom: '14px',
            borderBottom: `2px solid ${C.primary}`,
          }}>
            <h2 style={{
              fontFamily: ff.body,
              fontSize: '20px',
              fontWeight: 700,
              color: C.primary,
              margin: '0 0 6px',
              letterSpacing: '-0.01em',
            }}>
              {block.title}
            </h2>
            <p style={{
              fontFamily: ff.body,
              fontSize: '14px',
              color: C.muted,
              margin: 0,
              lineHeight: 1.5,
            }}>
              {block.description}
            </p>
          </div>
        );
      }

      items.push(renderQuestionCard(question, index));
      return items;
    });
  };

  const questionElements = props.formattedForm.id === 16
    ? renderQuestionsWithBlocks()
    : sortedAndFormattedQuestions.map((question, index) => renderQuestionCard(question, index));

  const isAnswerFilled = (answer?: string) => {
    if (!answer || !answer.trim()) return false;

    try {
      const parsedAnswer = JSON.parse(answer);
      if (Array.isArray(parsedAnswer)) {
        return parsedAnswer.some((item) => Number(item) > 0);
      }
    } catch {
      return answer.trim().length > 0;
    }

    return answer.trim().length > 0;
  };

  const canShowChildQuestion = (
    parentAnswer: string | undefined,
    childQuestion: QUESTION
  ) => {
    if (!childQuestion?.condition?.userAnswer) return false;
    if (!parentAnswer) return false;

    try {
      const normalizedParentAnswer = JSON.parse(
        parentAnswer.replace(/[1-9]\d*/g, "1")
      );

      if (!Array.isArray(normalizedParentAnswer)) return false;

      const selectedAnswerIndex = normalizedParentAnswer.indexOf(1);
      if (selectedAnswerIndex < 0) return false;

      return (
        childQuestion.condition.userAnswer[selectedAnswerIndex] ==
        normalizedParentAnswer[selectedAnswerIndex]
      );
    } catch {
      return false;
    }
  };

  const getVisibleQuestions = (questionList: QUESTION[]) => {
    const answersMap = new Map(
      answers.map((item) => [item.formQuestionFormRegisterId, item.answer])
    );
    const visibleQuestions: QUESTION[] = [];

    const walkQuestions = (question: QUESTION) => {
      visibleQuestions.push(question);
      const parentAnswer = answersMap.get(question.formQuestionFormRegisterId);

      (question.childrenQuestion ?? []).forEach((childQuestion) => {
        if (canShowChildQuestion(parentAnswer, childQuestion)) {
          walkQuestions(childQuestion);
        }
      });
    };

    questionList.forEach((question) => walkQuestions(question));
    return visibleQuestions;
  };

  const getFormValidation = () => {
    const visibleQuestions = getVisibleQuestions(sortedAndFormattedQuestions);
    const answersMap = new Map(
      answers.map((item) => [item.formQuestionFormRegisterId, item.answer])
    );

    const unansweredQuestions = visibleQuestions.filter(
      (question) => !isAnswerFilled(answersMap.get(question.formQuestionFormRegisterId))
    );

    return {
      isValid: unansweredQuestions.length === 0,
      missingAnswers: unansweredQuestions.length,
      unansweredQuestions,
      visibleQuestions,
    };
  };

  const handleOpenSubmitFormDialog = () => {
    const validation = getFormValidation();
    setSubmitAttempted(true);

    if (validation.isValid) {
      setErrorIds(new Set());
      setIsOpenSubmitFormDialog(true);
      return;
    }

    const ids = new Set<ID>(validation.unansweredQuestions.map((q) => q.formQuestionFormRegisterId));
    setErrorIds(ids);

    enqueueSnackbar(
      `${validation.missingAnswers} ${validation.missingAnswers === 1 ? 'questão precisa' : 'questões precisam'} ser respondida${validation.missingAnswers === 1 ? '' : 's'}.`,
      { variant: 'warning' }
    );

    const firstId = validation.unansweredQuestions[0]?.formQuestionFormRegisterId;
    if (firstId) {
      const el = document.getElementById(`question-${firstId}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  const handleCloseSubmitFormDialog = () => setIsOpenSubmitFormDialog(false);

  const handleSubmit = () => {
    const validation = getFormValidation();
    if (!validation.isValid) {
      handleCloseSubmitFormDialog();
      const ids = new Set<ID>(validation.unansweredQuestions.map((q) => q.formQuestionFormRegisterId));
      setErrorIds(ids);
      const firstId = validation.unansweredQuestions[0]?.formQuestionFormRegisterId;
      if (firstId) {
        const el = document.getElementById(`question-${firstId}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const visibleQuestionIds = new Set(
      validation.visibleQuestions.map(
        (item) => item.formQuestionFormRegisterId
      )
    );
    const answersToSubmit = answers.filter(
      (item) =>
        visibleQuestionIds.has(item.formQuestionFormRegisterId) &&
        isAnswerFilled(item.answer)
    );

    setLoading(true);

    simpleFormService
      .handleSubmit(answersToSubmit)
      .then((res) => {
        if (!res.errors) {
          //TODO: Implementar travas do questionario.
          enqueueSnackbar("Formulário enviado com sucesso!", {
            variant: "success",
          });
          handleCloseSubmitFormDialog();
          props.onFinish();
        } else {
          res.errors.forEach((error) =>
            enqueueSnackbar(error, { variant: "error" })
          );
        }
      })
      .catch((e) => {
        console.error(e);
        enqueueSnackbar("Ops! Algo deu errado...", { variant: "error" }); //TODO: Tratar essa exception
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div style={{ minHeight: '60vh', backgroundColor: C.bg, padding: '0 0 80px' }}>
        {/* ── Header ── */}
        <div style={{
          backgroundColor: C.white,
          borderBottom: `1px solid ${C.border}`,
          padding: '56px 24px 44px',
          marginBottom: '40px',
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-block',
              width: '48px',
              height: '3px',
              background: `linear-gradient(90deg, ${C.primary}, ${C.secondary})`,
              borderRadius: '2px',
              marginBottom: '20px',
            }} />
            <h1 style={{
              fontFamily: ff.display,
              fontSize: 'clamp(26px, 3.5vw, 40px)',
              fontWeight: 700,
              color: C.text,
              margin: '0 0 12px',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}>
              {props.formattedForm.title}
            </h1>
            <p style={{
              fontFamily: ff.body,
              fontSize: '15px',
              color: C.muted,
              margin: 0,
              lineHeight: 1.6,
            }}>
              Preencha todas as questões para enviar o formulário.
            </p>
          </div>
        </div>

        {/* ── Questions ── */}
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          {questionElements}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
            <button
              onClick={() => handleOpenSubmitFormDialog()}
              style={{
                padding: '14px 36px',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
                color: C.white,
                fontFamily: ff.body,
                fontSize: '15px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.06em',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(109,20,26,0.25)',
              }}
            >
              ENVIAR →
            </button>
          </div>
        </div>
      </div>

      <Alert
        title="Confirmar envio do formulário?"
        msg="Atenção! Ao enviar o formulário suas respostas não poderão ser alteradas!"
        isOpen={isOpenSubmitFormDialog}
        isLoading={loading}
        canSkip={true}
        onClose={() => handleCloseSubmitFormDialog()}
        onCancel={() => handleCloseSubmitFormDialog()}
        onConfirm={() => handleSubmit()}
      />
      {
        // TODO: Usar <Alert/> ao invés de alert()
        /* <Alert
				title='Formulário não foi preenchido por inteiro.'
				msg='Atenção! Para enviar o formulário é necessário responder todas as perguntas apresentadas. Feche esse diálogo para voltar e responder o que falta.'
				isOpen={failedToAnswer}
				isLoading={loading}
				canSkip={true}
				onClose={() => handleCloseFailDialog()}
				// onConfirm={() => true}
			/> */
      }
    </>
  );
}
