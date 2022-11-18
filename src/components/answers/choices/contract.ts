import { ChangeEvent } from 'react';
import { ID } from '../../../core/types';

export type IProps = {
	formQuestionFormRegisterId: ID;
	choices: Choice[];
	onAnswerQuestion: (
		event: ChangeEvent<HTMLInputElement>,
		value: {
			formQuestionFormRegisterId: ID;
			answer: string;
		}
	) => void;
};

export type Choice = {
	formsQuestionFormsQuestionChoicesId: ID;
	title: string;
	score: number;
};
