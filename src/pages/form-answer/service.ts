import { http } from 'src/core/axios';
import { ID, RESPONSE } from 'src/core/types';
import { GET_FORMATTED_FORM_SHOW, GET_USER_RESULT_FROM_FORM_RES } from './type';

export default class FormAnswerService {
	private path = `/form-registers`;

	getFormattedFormShow = async (id: ID): Promise<RESPONSE<GET_FORMATTED_FORM_SHOW>> => {
		return http.get(`${this.path}/formatted/${id}`);
	};

	getUserResultFromForm = async (formId: ID): Promise<RESPONSE<GET_USER_RESULT_FROM_FORM_RES>> => {
		return http.get(`/user-answers/${formId}`);
	};
}
