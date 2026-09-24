import { http } from 'src/core/axios';
import { RESPONSE, ID } from 'src/core/types';
import { ADMIN_ROW, CREATE_BODY } from './type';

export default class TermRequirementService {
	private path = '/term-requirements';

	adminListForForm = async (formId: ID): Promise<RESPONSE<ADMIN_ROW[]>> => {
		return http.get(`${this.path}/admin/${formId}`);
	};

	create = async (data: CREATE_BODY): Promise<RESPONSE<ADMIN_ROW>> => {
		return http.post(`${this.path}/admin`, data);
	};

	remove = async (id: ID): Promise<RESPONSE<unknown>> => {
		return http.delete(`${this.path}/admin/${id}`);
	};
}
