import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

interface RequestInterceptors {
	// 请求拦截
	requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
	requestInterceptorsCatch?: (err: any) => any
	// 响应拦截
	responseInterceptors?: (config: AxiosResponse) => AxiosResponse
	responseInterceptorsCatch?: (err: any) => any
}
// 自定义传入的参数
export interface RequestConfig extends AxiosRequestConfig {
	interceptors?: RequestInterceptors
}

class Request {
	instance: AxiosInstance // axios 实例
	interceptorsObj?: RequestInterceptors // 拦截器对象

	constructor(config: RequestConfig) {
		this.instance = axios.create(config)

		this.instance.interceptors.request.use(
			(res: AxiosRequestConfig) => {
				return res
			},
			(err: any) => err
		)

		// 使用实例拦截器
		this.instance.interceptors.request.use(
			this.interceptorsObj?.requestInterceptors,
			this.interceptorsObj?.requestInterceptorsCatch
		)
		this.instance.interceptors.response.use(
			this.interceptorsObj?.responseInterceptors,
			this.interceptorsObj?.responseInterceptorsCatch
		)

		this.instance.interceptors.response.use(
			(res: AxiosResponse) => {
				return res.data
			},
			(err: any) => err
		)
	}
	request<T = any>(config: RequestConfig): Promise<T> {
		return this.instance.request(config)
	}

	get<T = any>(config: RequestConfig): Promise<T> {
		config.method = 'get'
		return this.request(config)
	}

	post<T = any>(config: RequestConfig): Promise<T> {
		config.method = 'post'
		return this.request(config)
	}
}

const request = new Request({
	timeout: 1000 * 60 * 5
})

export default request
