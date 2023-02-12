import { QUESTION } from '@components/question/type';
import { ID } from 'src/core/types';

export type GET_FORMATTED_FORM_SHOW = {
	id: ID;
	title: string;
	completionMessage: string;
	questions: QUESTION[];
};

export type GET_USER_RESULT_FROM_FORM_RES = {
	maxScore: number;
	score: number;
	domainList: {
		cod: string;
		name: string;
		questionList: QUESTION_2[];
	}[];
};

//TODO: Renomear de forma correta.
type QUESTION_2 = {
	title: string;
	recommendationMessage: string;
};
