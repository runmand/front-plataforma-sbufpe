import { GET_FORMATTED_FORM_SHOW } from 'src/pages/form-answer/type';
import { ID } from 'src/core/types';

export type TPROPS = {
	formattedForm: GET_FORMATTED_FORM_SHOW;
	onFinish: () => void;
};

export type ANSWER = {
	formQuestionFormRegisterId: ID;
	answer: string;
};

export type HANDLE_SUBMIT_RES = {
	finalScore: number;
};
