import * as API from './request'
/**
 * 查询
 * @param params page页数 size条数
 * @returns
 */
export const getTable = <T>(params: T) => {
	return API.get('/mock/tableList', params)
}
/**
 * 删除
 * @param params id/ids
 * @returns
 */
export const deleteData = <T>(params: T) => {
	return API.get('/mock/deleteData', params)
}
