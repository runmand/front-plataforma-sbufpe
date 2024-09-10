import { http } from 'src/core/axios';
import { RESPONSE } from 'src/core/types';
import { GET_USER_TYPES_RES, HANDLE_SIGNUP, HANDLE_SIGNUP_RES } from './type';

export default class LoginService {
	private path = '/user-registers';

	handleSignup = async ({ login, email, pwd, typeId }: HANDLE_SIGNUP): Promise<RESPONSE<HANDLE_SIGNUP_RES>> => {
		return http.post(this.path, { login, email,pwd, typeId });
	};

getUserTypes = async (): Promise<RESPONSE<GET_USER_TYPES_RES[]>> => {
		return http.get('/user-types');
	};
}
