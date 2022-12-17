import axios, { AxiosRequestConfig } from 'axios';
import { RESPONSE } from 'src/core/types';

export const http = {
	get: (path: string, config?: AxiosRequestConfig<any>): Promise<RESPONSE> => request('get', path, config),
	post: (path: string, data?: any, config?: AxiosRequestConfig<any>): Promise<RESPONSE> => request('post', path, data, config),
	patch: (path: string, data?: any, config?: AxiosRequestConfig<any>): Promise<RESPONSE> => request('patch', path, data, config),
	delete: (path: string, config?: AxiosRequestConfig<any>): Promise<RESPONSE> => request('delete', path, config),
};

const request = async (method: any, path: string, data?: any, config?: AxiosRequestConfig<any>): Promise<RESPONSE> => {
	const result: RESPONSE = {
		status: -1,
		data: null,
		msg: null,
		errors: null,
	};

	return axios({ method, baseURL: process.env.API_URL, url: path, data, ...config })
		.then(res => {
			result.status = res.data.status;
			result.data = res.data.data;
			result.errors = res.data.errors.map((err: any) => err.message);
			return result;
		})
		.catch(e => {
			result.errors = e.response.data.errors.map((err: any) => err.message);
			return result;
		});
};
