import { ChangeEvent } from 'react';
import { ID } from '../../core/types';
import { Choice } from '../answers/choices/contract';

export type IProps = {
	isChild?: boolean;
	questions: Question[];
	onAnswerQuestion: (
		event: ChangeEvent<HTMLInputElement>,
		value: {
			formQuestionFormRegisterId: ID;
			answer: string;
		}
	) => void;
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
	completionMessage: string;
	choices: Choice[];
	//TODO: Implementar respostas
	// answers: string[] | null;
};
