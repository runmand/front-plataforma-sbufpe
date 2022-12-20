import { http } from 'src/core/axios';
import { RESPONSE } from 'src/core/types';
import { INDEX_RES } from './type';

export default class FormService {
	private path = `/form-registers`;

	index = async (): Promise<RESPONSE<INDEX_RES[]>> => {
		return http.get(this.path);
	};
}
