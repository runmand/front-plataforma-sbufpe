import { ID } from '../../../core/types';

export type IProps = {
	formQuestionFormRegisterId: ID;
	choices: Choice[];
	onAnswerQuestion: (value: { formQuestionFormRegisterId: ID; answer: string }) => void;
};

export type Choice = {
	formsQuestionFormsQuestionChoicesId: ID;
	title: string;
	score: number;
};
