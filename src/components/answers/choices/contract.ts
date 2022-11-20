import { QuestionAnswer, ID } from '../../../core/types';

export type IProps = {
	formQuestionFormRegisterId: ID;
	choices: Choice[];
	onAnswerQuestion: (value: QuestionAnswer) => void;
};

export type Choice = {
	formsQuestionFormsQuestionChoicesId: ID;
	title: string;
	score: number;
};
