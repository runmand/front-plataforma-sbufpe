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

export type PROPS = {
  planAnswer: planAnswer[][];
}

export type typeData = 'pratico' | 'teorico'