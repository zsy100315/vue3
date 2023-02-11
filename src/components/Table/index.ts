import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

export type SearchType = 'input' | 'select'

export type SearchProps = {
	el: SearchType // 当前项搜索框的类型
	options?: { label: string; value: string }[] //下拉选项
	placeholder?: string //占位符
}

export interface ColumnProps<T = any> extends Partial<TableColumnCtx<T>> {
	slot?: string
	options?: any[]
	search?: SearchProps | undefined // 搜索项配置
}
