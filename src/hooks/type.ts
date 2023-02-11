//Table
export namespace Table {
	export interface Pageable {
		pageNum: number
		pageSize: number
		total: number
	}
	export interface TableStateProps {
		tableData: any[]
		searchParam: any
		loading: boolean
		pageable: Pageable
	}
}

//二次确认useHandleData
export namespace HandleData {
	export type MessageType = '' | 'success' | 'warning' | 'info' | 'error'
}
