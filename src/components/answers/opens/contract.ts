import { ID } from '../../../core/types';

export type IProps = {
	formQuestionFormRegisterId: ID;
	onAnswerQuestion: (value: { formQuestionFormRegisterId: ID; answer: string }) => void;
};
