import request from './axios'
import { RequestConfig } from './axios'

const baseUrl = '/api'

export const get = <T = any>(url: string, params?: T) => {
	return request.get({
		url: `${baseUrl}${url}`,
		data: params
	})
}
export const post = <T = any>(
	url: string,
	params?: T,
	config?: RequestConfig
) => {
	return request.post({
		url: `${baseUrl}${url}`,
		params,
		...config
	})
}
