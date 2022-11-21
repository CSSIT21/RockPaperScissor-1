import type { AxiosInstance, AxiosResponse } from 'axios';
import instance from 'axios';
import { ApiError } from './interface';
import type { InfoResponse } from './interface';

export const backend = window.location.host.split(':')[0] + ':3000';

export const useAxios = () => instance.create({
	withCredentials: true,
	baseURL: window.location.protocol + '//' + backend + '/api',
	headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
});

export const caller = function <T>(c: Promise<AxiosResponse<InfoResponse<T>>>): Promise<InfoResponse<T>> {
	return new Promise<InfoResponse<T>>((resolve, reject) => {
		c.then(({ data, statusText }) => {
			if (data.success) {
				resolve(data);
			}
			if (!data.success && data.message) {
				reject(new ApiError(data.message, data.code));
			}

			// In case of no data value
			reject(new ApiError(statusText, 'NO_DATA_ERROR'));
		}).catch((e) => {
			reject(new ApiError(e.message, 'AXIOS_ERROR'));
		});
	});
};