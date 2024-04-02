import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { answerData, answerQuestion, ErrorResponse, ListAllCourse, ListCourse, listJustifyChoiceById, listQuestionByCourse } from './typePlaneja';

export default class apiPaneja{
  private baseURL = process.env.PLANEJA_API || "http://localhost:2000"

  public async listAllCourse():Promise<ListAllCourse>{
    return new Promise<ListAllCourse>(async (resolve, reject) => {
      await axios.get(`${this.baseURL}/courses/`).then((result:AxiosResponse) =>{
        resolve(result.data)
      }).catch((error: AxiosError )=>{
        reject(this.learnError(error));
      })
    })
  }

  public async listCourse(idCourse: number):Promise<ListCourse>{
    return new Promise<ListCourse>(async (resolve, reject) => {
      await axios.get(`${this.baseURL}/courses/${idCourse}`).then((result:AxiosResponse) =>{
        resolve(result.data)
      }).catch((error: AxiosError )=>{
        reject(this.learnError(error));
      })
    })
  }

  public async listQuestionByCourse(idCourse: number):Promise<listQuestionByCourse>{
    return new Promise<listQuestionByCourse>(async (resolve, reject) => {
      await axios.get(`${this.baseURL}/courses/${idCourse}/questions`).then((result:AxiosResponse) =>{
        resolve(result.data)
      }).catch((error: AxiosError )=>{
        reject(this.learnError(error));
      })
    })
  }

  public async listChoicesById(idQuestionChoice: number):Promise<listQuestionByCourse>{
    return new Promise<listQuestionByCourse>(async (resolve, reject) => {
      await axios.get(`${this.baseURL}/question/${idQuestionChoice}/choices`).then((result:AxiosResponse) =>{
        resolve(result.data)
      }).catch((error: AxiosError )=>{
        reject(this.learnError(error));
      })
    })
  }

  public async listJustifyChoiceById(idChoiceJustifyChoice: number):Promise<listJustifyChoiceById>{
    return new Promise<listJustifyChoiceById>(async (resolve, reject) => {
      await axios.get(`${this.baseURL}/choice/${idChoiceJustifyChoice}/justifyChoice`).then((result:AxiosResponse) =>{
        resolve(result.data)
      }).catch((error: AxiosError )=>{
        reject(this.learnError(error));
      })
    })
  }

  public async answerQuestion( idQuestionChoice: number, idChoiceJustifyChoice: number, data: answerData ):Promise<answerQuestion>{
    return new Promise<answerQuestion>(async (resolve, reject) => {
      const keyJWT = localStorage.getItem('key'); 
      await axios.post(`${this.baseURL}/answer/${idQuestionChoice}/${idChoiceJustifyChoice}`, data, {headers:{Authorization: `Bearer ${keyJWT}`}}).then((result:AxiosResponse) =>{
        resolve(result.data)
      }).catch((error: AxiosError )=>{
        reject(this.learnError(error));
      })
    })
  }

  private learnError(error: AxiosError){
    if (error.response?.data) {
      const responseError: ErrorResponse = error.response.data as ErrorResponse;
      return responseError;
  } else {
      return error;
  }
  }
}
