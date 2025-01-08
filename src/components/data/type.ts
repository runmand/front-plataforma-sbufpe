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

export type DataUser = {
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
  firstStep: string[];
  secondStep: string[];
  thirdStep: string;
  fourthStep: string[];
  dataUser: string
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
  createdAt: string;
  deletedAt: string;
  userId: number;
  dataAnwser: praticalResponse
}

export type PROPS = {
  planAnswer?: planAnswer[][];
  praticalAnswer?: praticalAnswer[];
  filterTeoric?: filterTeoric;
  filterPratical?: filterPratical;
  setFilterPratical?: React.Dispatch<React.SetStateAction<filterPratical>>
  setFilterTeoric?: React.Dispatch<React.SetStateAction<filterTeoric>>
  filterApply: filterApply
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

export type filterTeoric = {
  establishment: string[],
  city: string[]
}

export type filterPratical = {
  establishment: string[],
}


export type filterApply = {
  establishment: string,
  city?: string,
  myData: boolean,
  type: typeData,
}

export type typeData = 'pratico' | 'teorico'