import { ID } from '../../../core/types';
import { QuestionAnswer } from '../../questions/contract';

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
