<template>
	<!-- 查询表单 card -->
	<div
		class="card_style table_search"
		style="margin-bottom: 10px"
		v-if="isShowSearch"
	>
		<el-form ref="formRef" :inline="true" :model="searchParam">
			<el-row>
				<el-col :span="22">
					<el-form-item
						v-for="item in searchColumns"
						:key="item.prop"
						:label="item.label"
						:prop="item.prop"
					>
						<!-- input 添加clearable会动态改变宽度 -->
						<el-input
							v-if="item.search?.el === 'input'"
							v-model="searchParam[`${item.prop}`]"
							style="width: 200px"
							clearable
						></el-input>
						<el-select
							v-if="item.search?.el === 'select'"
							v-model="searchParam[`${item.prop}`]"
							clearable
							:placeholder="item.search.placeholder ?? '请选择'"
						>
							<el-option
								v-for="option in item.search.options"
								:key="option.value"
								:label="option.label"
								:value="option.value"
							/>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="2">
					<el-button :icon="Search" type="primary" @click="search">
						搜索
					</el-button>
				</el-col>
			</el-row>
		</el-form>
	</div>
	<div class="card_style">
		<!-- 表头操作按钮 -->
		<div class="table-header">
			<slot
				name="tableHeader"
				:isSelected="isSelected"
				:selectKeys="selectKeys"
				:selectedList="selectedList"
			></slot>
		</div>
		<!-- 表格 -->
		<el-table
			ref="tableRef"
			v-bind="$attrs"
			:data="tableData"
			:height="height"
			v-loading="loading"
			border
			:header-cell-style="{ background: '#F5F7FA', color: '#666666' }"
			style="width: 100%"
			empty-text="暂无数据"
			:row-key="getRowKeys"
			@selection-change="selectionChange"
		>
			<template v-for="item in tableColumns" :key="item.prop">
				<el-table-column
					v-bind="item"
					:align="item.align ?? 'center'"
					:reserve-selection="item.type == 'selection'"
					v-if="item.type == 'selection' || item.type == 'index'"
				></el-table-column>
				<el-table-column
					v-else-if="item.slot"
					v-bind="item"
					:align="item.align ?? 'center'"
				>
					<template #default="scope">
						<slot :name="item.slot" :row="scope.row"></slot>
					</template>
				</el-table-column>
				<el-table-column
					v-else
					v-bind="item"
					:align="item.align ?? 'center'"
				></el-table-column>
			</template>
		</el-table>
		<el-footer style="height: 45px">
			<el-pagination
				v-if="pagination"
				v-model:currentPage="pageable.pageNum"
				v-model:pageSize="pageable.pageSize"
				:page-sizes="[10, 25, 50, 100]"
				:background="true"
				layout="->,total, sizes, prev, pager, next"
				:total="pageable.total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			></el-pagination>
		</el-footer>
	</div>
</template>
<script lang="ts" setup>
import { ColumnProps } from 'comp/Table/index'
import { useTable } from 'hooks/usetable'
import { useSelection } from 'hooks/useSelection'
import { Search } from '@element-plus/icons-vue'
//pagination
interface Pageable {
	pageNum: number
	pageSize: number
	total: number
}
//table
interface TableProps {
	columns: ColumnProps[] //列配置项
	isShowSearch?: boolean //是否显示查询区
	api: (params: any) => Promise<any> //请求地址
	initParam?: any //初始查询参数
	pagination?: boolean //是否显示分页
	pageable?: Pageable
	rowKey?: string //多选 row-key
	handleSizeChange?: (size: number) => void
	handleCurrentChange?: (currentPage: number) => void
}

const props = withDefaults(defineProps<TableProps>(), {
	columns: () => [],
	pagination: true,
	isShowSearch: true,
	initParam: {},
	rowKey: 'id'
})

//table配置
const tableColumns = ref<ColumnProps[]>(props.columns)
//查询配置
const searchColumns = tableColumns.value.filter(item => {
	return item.search?.el
})
//分页
const pagination = ref<boolean>(props.pagination)

const tableRef = ref()
// table高度
const height = ref(0)
onMounted(() => {
	height.value = window.innerHeight - tableRef.value.$el.offsetTop - 60
	// 监听浏览器高度变化
	window.onresize = () => {
		height.value = window.innerHeight - tableRef.value.$el.offsetTop - 60
	}
})
//多选 Hooks
const { isSelected, selectedList, getRowKeys, selectKeys, selectionChange } =
	useSelection(props.rowKey)
// 表格操作 Hooks
const {
	tableData,
	pageable,
	loading,
	search,
	getTable,
	searchParam,
	handleSizeChange,
	handleCurrentChange
} = useTable(props.api, props.initParam)

// 监听页面 initParam 改化，重新获取表格数据
watch(() => props.initParam, getTable, { deep: true })

defineExpose({
	element: tableRef,
	tableData,
	searchParam,
	pageable,
	getTable
})
</script>
<style scoped lang="scss">
.table-header {
	float: left;
	padding: 10px;
}
.el-table {
	flex: 1;
}
.el-pagination {
	padding: 5px 10px;
}
.table_search {
	padding: 15px 18px 0px 18px;
	.el-form {
		.el-form-item__content > * {
			width: 100%;
		}
		// 去除时间选择器上下 padding
		.el-range-editor.el-input__wrapper {
			padding: 0 10px;
		}
	}
	.operation {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-bottom: 18px;
	}
}
</style>
