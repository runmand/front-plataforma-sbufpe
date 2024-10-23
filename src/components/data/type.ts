import { IFirstStep, IFourthStep, ISecondStep, IStepsValues, IThirdStep } from 'pages/planeja-pratico';

export type planAnswer = {
  id: number;
  createdAt: string;
  deletedAt: string;
  userId: number;
  questionId: number
  title: string;
  answer: string;
  titleJustify?: string;
  justify?: string;
}

export type praticalAnswer = {
  id: number;
  createdAt: string;
  deletedAt: string;
  userId: number;
  question_answer: string
}

type DataUser = {
  names: string;
  email: string;
  health_establishment: string;
}

export type praticalJSON = {
  firstStep: IFirstStep[];
  secondStep: ISecondStep;
  thirdStep: IThirdStep;
  fourthStep: IFourthStep;
  dados_para_certificado: DataUser
}

export type praticalResponse = {
  firstStep: string;
  secondStep: string;
  thirdStep: string;
  fourthStep: string;
  dados_para_certificado: DataUser
}

export type praticalCSV= {
  index: number
  firstStep: string;
  secondStep: string;
  thirdStep: string;
  fourthStep: string;
  names: string;
  email: string;
  health_establishment: string;
}

export type praticalAnswerObj = {
  id: number;
  createdAt: string;
  deletedAt: string;
  userId: number;
  dataAnwser: praticalResponse
}

export type PROPS = {
  planAnswer?: planAnswer[][];
  praticalAnswer?: praticalAnswer[];
}

export type LocalData = {
  teoric: planAnswer[][];
  pratical: praticalAnswer[];
  teoricDate: Date,
  praticalDate: Date
}

export type requestResponse = {
  data: any;
  errors: string[]
}

export type typeData = 'pratico' | 'teorico'