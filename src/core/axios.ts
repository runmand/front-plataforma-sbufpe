import axios from 'axios';
import { localStorageKeyEnum } from './enums';
// import jwt from 'jsonwebtoken';

export const http = axios.create({ baseURL: process.env.API_URL });

http.interceptors.request.use(
	config => {
		const openRoutes: string[] = ['/','/login','/user-registers', 'user-types'];

		/** Se a rota for protegida, segue a lógica. */
		if (!openRoutes.includes(config.url)) {
			const token = localStorage.getItem(localStorageKeyEnum.TOKEN);

			//TODO: Verificar expiração do token.
			/** Se não existir JWT token, redireciona para a pagina inicial. */
			if (!token) return (window.location.href = '/');

			/** Se existir JWT token, injeta os dados no header da requisição. */
			//TODO: Usar token para permissão de rotas.
			// jwt.verify(token, process.env.JWT_SECRET);
			config.headers.token = token;
		}

		return config;
	},
	e => {
		console.error('axios-request-interceptor', e);
		return { errors: typeof e === 'string' ? e : e.response.data.errors?.map((err: any) => err.message) };
	}
);

http.interceptors.response.use(
	res => ({
		status: res.data.status,
		data: res.data.data,
		msg: res.data.msg,
		errors: res.data.errors?.map((err: any) => err.message),
	}),
	e => {
		console.error('LOGGER::axios-response-interceptor', e);
		return { errors: typeof e === 'string' ? e : e.response.data.errors?.map((err: any) => err.message) };
	}
);
