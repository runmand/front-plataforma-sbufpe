import axios from 'axios';
import { THandleLogin } from './type';

export default class LoginService {
	handleLogin = async ({ login, pwd }: THandleLogin) => {
		const auth = btoa(`${login}:${pwd}`);
		return axios.patch(`${process.env.API_URL}/login`, {}, { headers: { authorization: `Basic ${auth}` } });
	};
}
