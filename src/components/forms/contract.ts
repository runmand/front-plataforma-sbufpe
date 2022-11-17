import { ID } from '../../core/types';
import { Question } from '../questions/contract';

export type FormState = {
	id: ID;
	title: string;
	completionMessage: string;
	questions: Question[];
};
