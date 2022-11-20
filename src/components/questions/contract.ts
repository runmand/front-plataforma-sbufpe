import { QuestionAnswer, ID } from '../../core/types';
import { Choice } from '../answers/choices/contract';

export type IProps = {
	index: number;
	isChild?: boolean;
	question: Question;
	onAnswerQuestion: (value: QuestionAnswer) => void;
	fromParentCallback?: (fromChildCallback: () => void) => void;
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
