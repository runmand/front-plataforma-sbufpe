import { ID } from '../../../core/types';
import { QUESTION_ANSWER } from '../../question/type';

export type TPROPS = {
	formQuestionFormRegisterId: ID;
	placeholder?: string;
	onAnswerQuestion: (value: QUESTION_ANSWER) => void;
};
