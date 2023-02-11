/**
 * 多选操作
 * @param rowKey row-key
 * @returns
 */
export const useSelection = (rowKey: string) => {
	// 是否选中数据
	const isSelected = ref<boolean>(false)
	// 选中的数据列表
	const selectedList = ref<any>([])

	// 当前选中的所有keys(数组)，可根据项目自行配置id字段
	const selectKeys = computed((): string[] => {
		const keys: string[] = []
		selectedList.value.forEach((item: any) => {
			keys.push(item[rowKey])
		})
		return keys
	})

	//row-key
	const getRowKeys = (row: any) => {
		return row[rowKey]
	}
	//多选
	const selectionChange = (rows: any) => {
		isSelected.value = rows.length === 0 ? false : true
		selectedList.value = rows
	}
	return {
		isSelected,
		selectedList,
		getRowKeys,
		selectKeys,
		selectionChange
	}
}
