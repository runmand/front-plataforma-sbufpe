import { ID } from '../../../core/types';
import { QUESTION_ANSWER } from '../../questions/contract';

export type TPROPS = {
	formQuestionFormRegisterId: ID;
	choices: CHOICE[];
	onSelectChoice: (value: QUESTION_ANSWER) => void;
};

export type CHOICE = {
	formsQuestionFormsQuestionChoicesId: ID;
	title: string;
	score: number;
};
