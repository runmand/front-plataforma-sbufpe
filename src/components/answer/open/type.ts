import { ID } from '../../../core/types';
import { QUESTION_ANSWER } from '../../questions/contract';

export type TPROPS = {
	formQuestionFormRegisterId: ID;
	onAnswerQuestion: (value: QUESTION_ANSWER) => void;
};
