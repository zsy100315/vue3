import { Table } from './type'
import { reactive, onMounted, toRefs } from 'vue'

export const useTable = (
	api: (params: any) => Promise<any>, //请求路径
	params: object = {} //初始参数
) => {
	const state = reactive<Table.TableStateProps>({
		tableData: [], //table数据
		searchParam: {}, //查询参数
		loading: true, //加载动画
		pageable: {
			pageNum: 1,
			pageSize: 10,
			total: 0
		}
	})

	//获取table数据
	const getTable = async () => {
		state.loading = true
		//合并参数
		const { pageNum, pageSize } = state.pageable
		const totalParam = { pageNum, pageSize, ...state.searchParam }
		const { data, total } = await api(totalParam)
		state.loading = false
		state.tableData = data
		state.pageable.total = total
	}

	//查询
	const search = () => {
		state.pageable.pageNum = 1
		getTable()
	}
	onMounted(() => {
		state.pageable.pageNum = 1
		state.searchParam = { ...params }
		getTable()
	})

	/**
	 * 修改当前页
	 * @param value 当前页数
	 */
	const handleCurrentChange = (value: number) => {
		state.pageable.pageNum = value
		getTable()
	}

	/**
	 * 修改每页条数
	 * @param value 条数
	 */
	const handleSizeChange = (value: number) => {
		state.pageable.pageNum = 1
		state.pageable.pageSize = value
		getTable()
	}

	return {
		...toRefs(state),
		getTable,
		search,
		handleCurrentChange,
		handleSizeChange
	}
}
