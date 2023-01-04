import { http } from 'src/core/axios';
import { RESPONSE } from 'src/core/types';
import { HANDLE_SIGNUP, HANDLE_SIGNUP_RES } from './type';

export default class LoginService {
	private path = '/user-registers';

	handleSignup = async ({ login, pwd, typeId }: HANDLE_SIGNUP): Promise<RESPONSE<HANDLE_SIGNUP_RES>> => {
		return http.post(this.path, { login, pwd, typeId });
	};
}
