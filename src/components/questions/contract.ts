import { ID } from '../../core/types';
import { Choice } from '../answers/choices/contract';

export type IProps = {
	index: number;
	parent?: Question;
	question: Question;
	onAnswerQuestion: (value: QuestionAnswer) => void;
};

export type Question = {
	formQuestionFormRegisterId: ID;
	title: string;
	completionMessage: string;
	choices: Choice[];
	childrenQuestion?: Question[];
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
	//TODO: Implementar respostas
	// answers: string[] | null;
};

export type QuestionAnswer = { formQuestionFormRegisterId: ID; answer: string };
