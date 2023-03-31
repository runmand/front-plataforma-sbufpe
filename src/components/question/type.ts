import { ID } from '../../core/types';
import { CHOICE } from '../answer/choice/type';

export type TPROPS = {
	index: number;
	parent?: QUESTION;
	question: QUESTION;
	onAnswerQuestion: (value: QUESTION_ANSWER) => void;
	onHideQuestion: (formQuestionFormRegisterId: ID) => void;
};

export type QUESTION = {
	formQuestionFormRegisterId: ID;
	title: string;
	completionMessage: string;
	choices: CHOICE[];
	childrenQuestion?: QUESTION[];
	type: {
		cod: string;
		name: string;
	};
	domain: {
		cod: string;
		name: string;
	};
	condition?: {
		userAnswer?: number[];
	};
};

export type QUESTION_ANSWER = {
	formQuestionFormRegisterId: 
	ID; answer: string };
