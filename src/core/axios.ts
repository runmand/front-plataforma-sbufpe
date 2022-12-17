import axios, { AxiosRequestConfig } from 'axios';
import { RESPONSE } from 'src/core/types';

export const http = {
	get: <D>(path: string, config?: AxiosRequestConfig<any>): Promise<RESPONSE<D>> => request('get', path, config),
	post: <D>(path: string, data?: any, config?: AxiosRequestConfig<any>): Promise<RESPONSE<D>> => request('post', path, data, config),
	patch: <D>(path: string, data?: any, config?: AxiosRequestConfig<any>): Promise<RESPONSE<D>> => request('patch', path, data, config),
	delete: <D>(path: string, config?: AxiosRequestConfig<any>): Promise<RESPONSE<D>> => request('delete', path, config),
};

const request = async <D>(method: any, path: string, data?: any, config?: AxiosRequestConfig<any>): Promise<RESPONSE<D>> => {
	const result: RESPONSE<D> = {
		status: -1,
		data: null,
		msg: null,
		errors: null,
	};

	return axios({ method, baseURL: process.env.API_URL, url: path, data, ...config })
		.then(res => {
			result.status = res.data.status;
			result.data = res.data.data;
			result.errors = res.data.errors?.map((err: any) => err.message);
			return result;
		})
		.catch(e => {
			result.errors = e.response.data.errors?.map((err: any) => err.message);
			return result;
		});
};
