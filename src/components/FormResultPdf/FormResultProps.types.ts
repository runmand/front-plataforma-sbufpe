export type FormResultProps = {
  maxScore: number;
  score: number;
  domainList: Domain[];
  answer?: LocalStorageAnswer;
  formTitle: string;
  date: Date;
};

interface Domain {
  cod: string;
  name: string;
  questionList: QUESTION_2[];
}

type QUESTION_2 = {
  title: string;
  recommendationMessage: string;
};

type LocalStorageAnswer = {
  title: string;
};
