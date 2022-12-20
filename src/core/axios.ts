import axios from 'axios';

export const http = axios.create({ baseURL: process.env.API_URL });

// http.interceptors.request.use(
// 	config => {
// 		//TODO: Inserir verificação de auth aqui.
// 		return config;
// 	},
// 	error => {
// 		console.error('error', error);
// 		return Promise.reject(error);
// 	}
// );

http.interceptors.response.use(
	res => ({
		status: res.data.status,
		data: res.data.data,
		msg: res.data.msg,
		errors: res.data.errors?.map((err: any) => err.message),
	}),
	e => ({
		errors: e.response.data.errors?.map((err: any) => err.message),
	})
);
