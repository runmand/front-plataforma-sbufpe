import { ReactElement } from "react";
import { QuestionAll } from "src/core/typePlaneja";

export type PlanejaQuestionProps = {
  id: number;
  title: string;
  description?: string;
  yesDescr: string;
  noDescr: string;
  noHasJustify: boolean;
  campoMensagem?: ReactElement;
};

export type PlanejaQuestionNewProps = {
  id: number;
  question?: QuestionAll;
};

export type QuestionResponse = {
  idQuestion: number;
  idQuestionChoice: number;
  idJustifyChoiceByQuestion: number;
  response: string;
};
