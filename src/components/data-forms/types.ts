export type AnswersForm = {userId: number, date: Date, answers: AnswersFormData[]}

export type AnswersFormData = {id: number, answer: string, createdAt: Date, questionId: number, answerText: string}

export type FormsRegisters = {
    id: number,
    created_at: string,
    deleted_at: string,
    title: string,
    completionMessage: string,
    formsQuestionsFormsRegisters: formsQuestionsFormsRegisters[]
}

export type formsQuestionsFormsRegisters = {
    id: number, 
    createdAt: string,
    deletedAt: string,
    questionId: Question
}

export interface Question {
  id: number;
  createdAt: string;
  deletedAt: string | null;
  title: string;
  recommendationMessage: string | null;
  typeId?: TypeInfo;
  domainId?: DomainInfo;
  formsQuestionsFormsQuestionChoices?: FormsQuestionsFormsQuestionChoice[];
}

export interface TypeInfo {
  id: number;
  createdAt: string;
  deletedAt: string | null;
  cod: string;
  name: string;
}

export interface DomainInfo {
  id: number;
  createdAt: string;
  deletedAt: string | null;
  cod: string;
  name: string;
}

export interface FormsQuestionsFormsQuestionChoice {
  id: number;
  createdAt: string;
  deletedAt: string | null;
  choiceId: Choice;
}

export interface Choice {
  id: number;
  createdAt: string;
  deletedAt: string | null;
  title: string;
  score: number;
}


export type requestResponse = {data: {answer: AnswersForm[], data: FormsRegisters}}
