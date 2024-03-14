import { ID } from '../../../core/types';
import { QUESTION_ANSWER } from '../../question/type';

export type TPROPS = {
	formQuestionFormRegisterId: ID;
	choices: CHOICE[];
	onSelectChoice: (value: QUESTION_ANSWER) => void;
	choiceType?:'radio' | 'autoComplete'
};

export type CHOICE = {
	formsQuestionFormsQuestionChoicesId: ID;
	title: string;
	score: number;
};
