import * as API from './request'
/**
 * 登录
 * @param params username用户名 password 密码
 * @returns
 */
export const login = <T>(params: T) => API.get('/mock/login', params)

/**
 * 获取路由
 * @returns
 */
export const getRouters = () => API.post('/mock/getRouters')
