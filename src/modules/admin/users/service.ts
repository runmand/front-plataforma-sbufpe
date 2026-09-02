import { http } from 'src/core/axios';
import { RESPONSE, ID } from 'src/core/types';
import { ADMIN_USER, CREATE_BODY, INDEX_QUERY, USER_TYPE } from './type';

export default class AdminUserService {
	private path = '/admin/users';

	index = async (query: INDEX_QUERY): Promise<RESPONSE<ADMIN_USER[]>> => {
		return http.get(this.path, { params: query });
	};

	create = async (data: CREATE_BODY): Promise<RESPONSE<ADMIN_USER>> => {
		return http.post(this.path, data);
	};

	updateType = async (id: ID, typeId: ID): Promise<RESPONSE<ADMIN_USER>> => {
		return http.patch(`${this.path}/${id}/type`, { typeId });
	};

	getUserTypes = async (): Promise<RESPONSE<USER_TYPE[]>> => {
		return http.get('/user-types');
	};
}
