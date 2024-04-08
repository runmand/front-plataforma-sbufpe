export type CourseResponse = {
  course: CourseObject;
  questions: string;
  link: string;
};
export type CourseObject = {
  id: number;
  name: string;
  image: string;
};

export type ChoiceObject = {
  id: number;
  idQuestionChoice: number;
  title: string;
  score: number;
  JustifyChoice: number | null;
};

export type JustifyChoiceObject = {
  id: number;
  idJustifyChoiceByQuestion: number;
  title: string;
  score: number;
};

export type QuestionResponse = {
  question: QuestionObject;
  choices: string[];
};

export type QuestionObject = {
  id: number;
  title: string;
  position: number;
  text: string;
  idchoice: number[];
};

export type ErrorResponse = {
  message: string;
  internalCode: string;
};

export type ListAllCourse = {
  CourseAllResponse: CourseResponse[];
};

export type ListCourse = {
  course: CourseObject;
  questions: string;
};

export type listQuestionByCourse = QuestionResponse[];

export type listChoicesById = {
  choice: ChoiceObject;
  justifyChoice?: string;
};

export type listJustifyChoiceById = JustifyChoiceObject;

export type answerQuestion = string;

export type answerData = {
  response: string;
};

export type QuestionAll = {
  question: QuestionObject;
  choices: ChoiceAll[];
};
export type ChoiceAll = {
  choice: ChoiceObject;
  JustifyChoice: JustifyChoiceObject;
};

export type CourseAll = {
  course: CourseObject;
  questions: QuestionAll[];
};
