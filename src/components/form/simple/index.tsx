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
          {sortedAndFormattedQuestions.map((question, index) => (
            <QuestionCard
              key={index}
              index={index}
              question={question}
              isError={errorIds.has(question.formQuestionFormRegisterId)}
              onAnswerQuestion={(data) => {
                handleAnswerQuestion(data);
                setErrorIds((prev) => { const next = new Set(prev); next.delete(question.formQuestionFormRegisterId); return next; });
              }}
              onHideQuestion={(data) => handleHideQuestion(data)}
            />
          ))}

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
