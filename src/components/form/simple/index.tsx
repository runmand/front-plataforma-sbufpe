import Alert from "@components/alert/index";
import SendIcon from "@mui/icons-material/Send";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { theme } from "src/core/theme";
import { ID } from "../../../core/types";
import QuestionCard from "../../question";
import { QUESTION, QUESTION_ANSWER } from "../../question/type";
import SimpleFormService from "./service";
import { TPROPS } from "./type";

//TODO: Corrigir problema de F5
export default function Index(props: TPROPS) {
  const [answers, setAnswers] = useState<QUESTION_ANSWER[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpenSubmitFormDialog, setIsOpenSubmitFormDialog] =
    useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const simpleFormService = new SimpleFormService();
  const smQuery = useMediaQuery("(max-width:520px)");

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
    if (!childQuestion?.condition?.userAnswer) return true;
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
      visibleQuestions,
    };
  };

  const handleOpenSubmitFormDialog = () => {
    const validation = getFormValidation();

    if (validation.isValid) {
      setIsOpenSubmitFormDialog(true);
      return;
    }

    scrollTo(0, 0);
    alert(
      `Formulário não foi preenchido por inteiro.\n\nPara enviar o formulário é necessário responder todas as perguntas apresentadas. Ainda faltam ${validation.missingAnswers} resposta(s).`
    );
  };
  const handleCloseSubmitFormDialog = () => setIsOpenSubmitFormDialog(false);

  const handleSubmit = () => {
    const validation = getFormValidation();
    if (!validation.isValid) {
      handleCloseSubmitFormDialog();
      scrollTo(0, 0);
      alert(
        `Formulário não foi preenchido por inteiro.\n\nAinda faltam ${validation.missingAnswers} resposta(s).`
      );
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
      <Card
        sx={{
          backgroundColor: theme.greyLight,
          padding: "0% 5% 3% 5%",
        }}
      >
        <CardContent>
          <Typography
            sx={{
              borderRadius: "16px",
              textAlign: "center",
              color: theme.blur,
              fontSize: !smQuery ? "4vw" : "4vw",
              fontWeight: "bold",
              marginBottom: "16px",
              padding: "16px",
            }}
          >
            {props.formattedForm.title}
          </Typography>
          <>
            {sortedAndFormattedQuestions.map((question, index) => (
              <QuestionCard
                key={index}
                index={index}
                question={question}
                onAnswerQuestion={(data) => {
                  handleAnswerQuestion(data);
                }}
                onHideQuestion={(data) => {
                  handleHideQuestion(data);
                }}
              />
            ))}
          </>
        </CardContent>

        <CardActions
          sx={{
            justifyContent: "end",
            padding: "16px",
          }}
        >
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={() => handleOpenSubmitFormDialog()}
          >
            ENVIAR
          </Button>
        </CardActions>
      </Card>

      <Alert
        title="Confirmar envio do formulário?"
        msg="Atenção! Ao enviar o formulário suas respostas não poderão ser alteradas!"
        isOpen={isOpenSubmitFormDialog}
        isLoading={loading}
        canSkip={false}
        onClose={() => handleCloseSubmitFormDialog()}
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
