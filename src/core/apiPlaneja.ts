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

  public async listAllCourse(keyJWT: string): Promise<ListAllCourse> {
    return new Promise<ListAllCourse>(async (resolve, reject) => {
      await axios
        .get(`${this.baseURL}/courses/`, {
          headers: {
            Authorization: `Bearer ${keyJWT}`,
          },
        })
        .then((result: AxiosResponse) => {
          resolve(result.data);
        })
        .catch((error: AxiosError) => {
          reject(this.learnError(error));
        });
    });
  }

  public async listCourse(
    idCourse: number,
    keyJWT: string
  ): Promise<ListCourse> {
    return new Promise<ListCourse>(async (resolve, reject) => {
      await axios
        .get(`${this.baseURL}/courses/${idCourse}`, {
          headers: {
            Authorization: `Bearer ${keyJWT}`,
          },
        })
        .then((result: AxiosResponse) => {
          resolve(result.data);
        })
        .catch((error: AxiosError) => {
          reject(this.learnError(error));
        });
    });
  }

  public async listQuestionByCourse(
    idCourse: number,
    keyJWT: string
  ): Promise<listQuestionByCourse> {
    return new Promise<listQuestionByCourse>(async (resolve, reject) => {
      await axios
        .get(`${this.baseURL}/courses/${idCourse}/questions`, {
          headers: {
            Authorization: `Bearer ${keyJWT}`,
          },
        })
        .then((result: AxiosResponse) => {
          resolve(result.data);
        })
        .catch((error: AxiosError) => {
          reject(this.learnError(error));
        });
    });
  }

  public async listChoicesById(
    idQuestionChoice: number,
    keyJWT: string
  ): Promise<listChoicesById> {
    return new Promise<listChoicesById>(async (resolve, reject) => {
      await axios
        .get(`${this.baseURL}/question/${idQuestionChoice}/choices`, {
          headers: {
            Authorization: `Bearer ${keyJWT}`,
          },
        })
        .then((result: AxiosResponse) => {
          resolve(result.data);
        })
        .catch((error: AxiosError) => {
          reject(this.learnError(error));
        });
    });
  }

  public async listJustifyChoiceById(
    idChoiceJustifyChoice: number,
    keyJWT: string
  ): Promise<listJustifyChoiceById> {
    return new Promise<listJustifyChoiceById>(async (resolve, reject) => {
      await axios
        .get(`${this.baseURL}/choice/${idChoiceJustifyChoice}/justifyChoice`, {
          headers: {
            Authorization: `Bearer ${keyJWT}`,
          },
        })
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
    data: answerData
  ): Promise<answerQuestion> {
    const keyJWT: string = this.getKeyJWT();

    if (keyJWT == null) return null;

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
    const keyJWT = this.getKeyJWT();

    if (keyJWT == null) return null;

    try {
      const [course, questions] = await Promise.all([
        this.listCourse(idCourse, keyJWT),
        this.listQuestionByCourse(idCourse, keyJWT),
      ]);

      const questionsAll: QuestionAll[] = [];

      for (const question of questions) {
        if (question.question.idchoice.length > 0) {
          const newChoice: ChoiceAll[] = [];
          for (const idchoice of question.question.idchoice) {
            if (idchoice !== null) {
              await this.listChoicesById(idchoice, keyJWT).then(
                async (choice) => {
                  if (choice.choice.JustifyChoice != null) {
                    await this.listJustifyChoiceById(
                      choice.choice.JustifyChoice,
                      keyJWT
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
                }
              );
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

      return returnObject;
    } catch (error) {
      console.error("Ocorreu um erro ao obter os dados do curso:", error);
    }
  }

  public getKeyJWT(): string {
    const key = localStorage.getItem("token");

    // Verifica se o token existe e não está vazio
    if (key && key.trim() !== "") {
      return "" + key;
    } else {
      return null;
    }
  }
}
const api: ApiPaneja = new ApiPaneja();

export default api;
