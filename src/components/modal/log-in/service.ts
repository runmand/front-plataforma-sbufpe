import { http } from 'src/core/axios';
import { RESPONSE } from 'src/core/types';
import { HANDLE_LOGIN, HANDLE_LOGIN_RES } from './type';

export default class LoginService {
	private path = '/login';

	handleLogin = async ({ login, pwd }: HANDLE_LOGIN): Promise<RESPONSE<HANDLE_LOGIN_RES>> => {
		const auth = btoa(`${login}:${pwd}`);
		const config = { headers: { authorization: `Basic ${auth}` } };

		return http.patch(this.path, undefined, config);
	};
}
