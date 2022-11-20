import { ID } from '../../../core/types';
import { QuestionAnswer } from '../../questions/contract';

export type IProps = {
	formQuestionFormRegisterId: ID;
	onAnswerQuestion: (value: QuestionAnswer) => void;
};
