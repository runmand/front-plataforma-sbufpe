import {
  Card,
  CardContent,
  colors,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { emitterEnum } from "../../core/enums";
import { emitter } from "../../core/events";
import ChoiceAnswer from "../answer/choice";
import OpenAnswer from "../answer/open";
import { TPROPS, QUESTION_ANSWER } from "./type";

export default function Index(props: TPROPS) {
  const [canShow, setCanShow] = React.useState(false);

  /** Criando evento de emissão em todas as questões. */
  const handleAnswerQuestion = (answer: QUESTION_ANSWER) => {
    if (canShow || !props.parent) props.onAnswerQuestion(answer);

    const emitterKey = `${props.question.formQuestionFormRegisterId}-${emitterEnum.CAN_SHOW_QUESTION}`;
    emitter.emit(emitterKey, answer);
  };

  if (props.parent) {
    const listenerKey = `${props.parent.formQuestionFormRegisterId}-${emitterEnum.CAN_SHOW_QUESTION}`;

    /** Criando evento de escuta no filho. */
    emitter.addListener(listenerKey, (parentAnswer: QUESTION_ANSWER) => {
      const isSameAnswer =
        parentAnswer.answer.replace(/[1-9]\d*/g, "1") ===
        JSON.stringify(props.question.condition?.userAnswer);
      setCanShow(isSameAnswer);

      /** Caso a questão fique oculta novamente, deleta a resposta dela do vetor de respostas do formulário. */
      if (!canShow)
        props.onHideQuestion(props.question.formQuestionFormRegisterId);
    });
  }

  if (!props.parent || canShow) {
    return (
      <Card
        style={{
          margin: !props.parent ? "0px 0px 24px 0px" : "0px 24px 24px 24px",
          backgroundColor: !props.parent ? "#6D141A" : "#5C0309",
          borderRadius: "16px",
        }}
      >
        <CardContent style={{ padding: "16px" }}>
          <Typography
            style={{
              marginBottom: "16px",
              fontSize: "24px",
              color: colors.amber[200],
            }}
          >
            {props.index + 1} - {props.question.title}
          </Typography>
          {props.question.choices.length === 0 ? (
            <OpenAnswer
              formQuestionFormRegisterId={
                props.question.formQuestionFormRegisterId
              }
              onAnswerQuestion={(data) => {
                handleAnswerQuestion(data);
              }}
            />
          ) : (
			<ChoiceAnswer
			formQuestionFormRegisterId={
			  props.question.formQuestionFormRegisterId
			}
			choices={props.question.choices}
			onSelectChoice={(data) => {
			  handleAnswerQuestion(data);
			}}
			choiceType={props.question.formQuestionFormRegisterId === 109 ? 'select' : 'radio'}
		  />
          )}
        </CardContent>
        <div>
          {props.question.childrenQuestion.reverse().map((child, index) => (
            <Index
              key={index}
              index={index}
              parent={props.question}
              question={child}
              onAnswerQuestion={(data) => {
                props.onAnswerQuestion(data);
              }}
              onHideQuestion={(data) => {
                props.onHideQuestion(data);
              }}
            />
          ))}
        </div>
      </Card>
    );
  }
}
