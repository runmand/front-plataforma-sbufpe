import { Question } from '@components/questions/contract';
import { ID } from 'src/core/types';

export type GET_FORMATTED_FORM_SHOW = {
	id: ID;
	title: string;
	completionMessage: string;
	questions: Question[];
};
