import { http } from 'src/core/axios';
import { ID, RESPONSE } from 'src/core/types';
import { GET_FORMATTED_FORM_SHOW } from './type';

export default class FormAnswerService {
	private path = `/form-registers`;

	getFormattedFormShow = async (id: ID): Promise<RESPONSE<GET_FORMATTED_FORM_SHOW>> => {
		return http.get(`${this.path}/formatted/${id}`);
	};
}
