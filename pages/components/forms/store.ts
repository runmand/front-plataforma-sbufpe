import { question } from '../Question';

export interface IForm {
  title: string;
  questions: question[];
}

export const IForm: IForm = {
  title: '',
  questions: [],
};
