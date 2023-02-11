import { HandleData } from './type'
/**
 * 单条数据操作前二次确认
 * @param api 接口api
 * @param params 参数
 * @param message 提示信息
 * @param confirmType 提示类型
 * @returns
 */
export const useHandleData = <P = any, R = any>(
	api: (params: P) => Promise<R>,
	params: Parameters<typeof api>[0],
	message: string,
	confirmType: HandleData.MessageType = 'warning'
) => {
	return new Promise((resolve, reject) => {
		ElMessageBox.confirm(`是否${message}?`, '温馨提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: confirmType,
			draggable: true
		}).then(async () => {
			const data = await api(params)
			if (!data) {
				return reject(false)
			} else {
				ElMessage({
					type: 'success',
					message: `${message}成功!`
				})
				resolve(true)
			}
		})
	})
}
