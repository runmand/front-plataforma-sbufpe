import { QuestionAnswer, ID } from '../../../core/types';

export type IProps = {
	formQuestionFormRegisterId: ID;
	onAnswerQuestion: (value: QuestionAnswer) => void;
};
