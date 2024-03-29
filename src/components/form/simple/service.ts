import { http } from 'src/core/axios';
import { RESPONSE } from 'src/core/types';
import { ANSWER, HANDLE_SUBMIT_RES } from './type';

export default class SimpleFormService {
	private path = `/form-answers`;

	handleSubmit = async (answerList: ANSWER[]): Promise<RESPONSE<HANDLE_SUBMIT_RES>> => {
		return http.post(this.path, answerList);
	};
}
