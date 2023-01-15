import { http } from 'src/core/axios';
import { RESPONSE } from 'src/core/types';
import { ANSWER } from './type';

export default class SimpleFormService {
	private path = `/user-answers`;

	handleSubmit = async (answerList: ANSWER[]): Promise<RESPONSE<unknown>> => {
		return http.post(this.path, answerList);
	};
}
