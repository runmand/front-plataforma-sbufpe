export type CourseResponse = {
    course: CourseObject,
    questions: string,
    link: string
  }
  export type CourseObject = {
    id: number;
    name: string;
    image: string;
  }
  
  export type ChoiceObject = {
    id: number;
    idQuestionChoice: number;
    title: string;
    score: number;
    JustifyChoice: string | null;
  };
  
  export type JustifyChoiceObject = {
    id: number;
    idJustifyChoiceByQuestion: number;
    title: string;
    score: number;
  };
  
  
  export type QuestionResponse = {
    question: QuestionObject;
    choices: string[]
  }
  
  export type QuestionObject = {
    id: number;
    title: string;
    position: number;
    text: string;
    idChoice: number[]
  }
  
  export type ErrorResponse = {
    message: string;
    internalCode: string;
  }
  
  export type ListAllCourse = {
    CourseAllResponse: CourseResponse[]
  }
  
  export type ListCourse = {
    course: CourseResponse
    questions: string
  }
  
  export type listQuestionByCourse = QuestionResponse[]
  
  export type listChoicesById = {
    choice: ChoiceObject;
    justifyChoice?: string;
  }
  
  export type listJustifyChoiceById = JustifyChoiceObject;
  
  export type answerQuestion = string;
  
  export type answerData = {
    response: String
  }
  
  
  