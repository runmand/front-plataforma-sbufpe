import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import {
  answerData,
  answerQuestion,
  ChoiceAll,
  CourseAll,
  ErrorResponse,
  ListAllCourse,
  listChoicesById,
  ListCourse,
  listJustifyChoiceById,
  listQuestionByCourse,
  QuestionAll,
} from "./typePlaneja";

export class ApiPaneja {
  private baseURL = process.env.PLANEJA_API || "http://localhost:2000";

  public async listAllCourse(): Promise<ListAllCourse> {
    return new Promise<ListAllCourse>(async (resolve, reject) => {
      await axios
        .get(`${this.baseURL}/courses/`)
        .then((result: AxiosResponse) => {
          resolve(result.data);
        })
        .catch((error: AxiosError) => {
          reject(this.learnError(error));
        });
    });
  }

  public async listCourse(idCourse: number): Promise<ListCourse> {
    return new Promise<ListCourse>(async (resolve, reject) => {
      await axios
        .get(`${this.baseURL}/courses/${idCourse}`)
        .then((result: AxiosResponse) => {
          resolve(result.data);
        })
        .catch((error: AxiosError) => {
          reject(this.learnError(error));
        });
    });
  }

  public async listQuestionByCourse(
    idCourse: number
  ): Promise<listQuestionByCourse> {
    return new Promise<listQuestionByCourse>(async (resolve, reject) => {
      await axios
        .get(`${this.baseURL}/courses/${idCourse}/questions`)
        .then((result: AxiosResponse) => {
          resolve(result.data);
        })
        .catch((error: AxiosError) => {
          reject(this.learnError(error));
        });
    });
  }

  public async listChoicesById(
    idQuestionChoice: number
  ): Promise<listChoicesById> {
    return new Promise<listChoicesById>(async (resolve, reject) => {
      await axios
        .get(`${this.baseURL}/question/${idQuestionChoice}/choices`)
        .then((result: AxiosResponse) => {
          resolve(result.data);
        })
        .catch((error: AxiosError) => {
          reject(this.learnError(error));
        });
    });
  }

  public async listJustifyChoiceById(
    idChoiceJustifyChoice: number
  ): Promise<listJustifyChoiceById> {
    return new Promise<listJustifyChoiceById>(async (resolve, reject) => {
      await axios
        .get(`${this.baseURL}/choice/${idChoiceJustifyChoice}/justifyChoice`)
        .then((result: AxiosResponse) => {
          resolve(result.data);
        })
        .catch((error: AxiosError) => {
          reject(this.learnError(error));
        });
    });
  }

  public async answerQuestion(
    idQuestionChoice: number,
    idChoiceJustifyChoice: number,
    data: answerData,
    keyJWT: string
  ): Promise<answerQuestion> {
    return new Promise<answerQuestion>(async (resolve, reject) => {
      await axios
        .post(
          `${this.baseURL}/answer/${idQuestionChoice}/${idChoiceJustifyChoice}`,
          data,
          { headers: { Authorization: `Bearer ${keyJWT}` } }
        )
        .then((result: AxiosResponse) => {
          resolve(result.data);
        })
        .catch((error: AxiosError) => {
          reject(this.learnError(error));
        });
    });
  }

  private learnError(error: AxiosError) {
    if (error.response?.data) {
      const responseError: ErrorResponse = error.response.data as ErrorResponse;
      return responseError;
    } else {
      return error;
    }
  }

  public async getAllofCourse(idCourse: number) {
    try {
      // Fazendo as duas chamadas assíncronas em paralelo
      const [course, questions] = await Promise.all([
        this.listCourse(idCourse),
        this.listQuestionByCourse(idCourse),
      ]);

      const questionsAll: QuestionAll[] = [];

      for (const question of questions) {
        if (question.question.idchoice.length > 0) {
          const newChoice: ChoiceAll[] = [];
          for (const idchoice of question.question.idchoice) {
            if (idchoice !== null) {
              await this.listChoicesById(idchoice).then(async (choice) => {
                if (choice.choice.JustifyChoice != null) {
                  await this.listJustifyChoiceById(
                    choice.choice.JustifyChoice
                  ).then((justify) => {
                    newChoice.push({
                      choice: choice.choice,
                      JustifyChoice: justify,
                    });
                  });
                } else {
                  newChoice.push({
                    choice: choice.choice,
                    JustifyChoice: null,
                  });
                }
              });
            }
          }
          questionsAll.push({
            question: question.question,
            choices: newChoice,
          });
        }
      }

      const returnObject: CourseAll = {
        course: course.course,
        questions: questionsAll,
      };

      console.log(returnObject);
      return returnObject;
    } catch (error) {
      console.error("Ocorreu um erro ao obter os dados do curso:", error);
    }
  }
}
const api: ApiPaneja = new ApiPaneja();

export default api;
