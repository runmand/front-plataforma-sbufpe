import { http } from 'src/core/axios';
import { THandleLogin } from './type';

export default class LoginService {
	private path = '/login';
	handleLogin = async ({ login, pwd }: THandleLogin) => {
		const auth = btoa(`${login}:${pwd}`);
		const config = { headers: { authorization: `Basic ${auth}` } };

		return http.patch(this.path, undefined, config);
	};
}
