import { ChangeEvent } from 'react';
import { ID } from '../../../core/types';

export type IProps = {
	formQuestionFormRegisterId: ID;
	onAnswerQuestion: (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		value: {
			formQuestionFormRegisterId: ID;
			answer: string;
		}
	) => void;
};
