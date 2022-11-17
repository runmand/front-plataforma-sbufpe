import { ChangeEvent } from 'react';
import { ID } from '../../core/types';
import { Choice } from '../answers/choices/contract';

export type IProps = {
	questions: Question[];
	handleChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
};

export type Question = {
	formQuestionFormRegisterId: ID;
	title: string;
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
	//TODO: Implementar filhos
	// childrenQuestion?: Question[];
};
