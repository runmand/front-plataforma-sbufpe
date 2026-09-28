import { http } from 'src/core/axios';
import { RESPONSE, ID } from 'src/core/types';
import { MATRIX_ROW, UPSERT_BODY } from './type';

export default class FormPermissionService {
	private path = '/admin/form-permissions';

	matrixForForm = async (formId: ID): Promise<RESPONSE<MATRIX_ROW[]>> => {
		return http.get(`${this.path}/${formId}`);
	};

	upsert = async (data: UPSERT_BODY): Promise<RESPONSE<unknown>> => {
		return http.patch(this.path, data);
	};
}
