<template>
	<div class="table-box">
		<Table
			ref="proTable"
			:columns="columns"
			:api="getTable"
			v-model:initParam="initParam"
			:row-key="rowKey"
		>
			<template #tableHeader="scope">
				<el-button type="primary">新增</el-button>
				<el-button
					type="danger"
					@click="batchDelete(scope.selectKeys, scope.isSelected)"
				>
					批量删除
				</el-button>
			</template>
			<template #operation="scope">
				<el-button type="primary" link :icon="Edit">修改</el-button>
				<el-button
					type="danger"
					link
					:icon="Delete"
					@click="handleDelete(scope.row.id)"
				>
					删除
				</el-button>
			</template>
		</Table>
	</div>
</template>

<script lang="ts" setup>
import { ColumnProps } from 'comp/Table/index'
import { getTable, deleteData } from 'api/table'
import { useHandleData } from 'hooks/useHandleData'
import { Edit, Delete } from '@element-plus/icons-vue'

const ageOptions = [
	{ label: '男', value: '1' },
	{ label: '女', value: '2' }
]
//配置项
const columns: ColumnProps[] = [
	{ type: 'selection', width: 80 },
	{ type: 'index', label: '序号', width: 80 },
	{ prop: 'name', label: '姓名', search: { el: 'input' }, width: 200 },
	{ prop: 'age', label: '年龄', width: 120 },
	{
		prop: 'sex',
		label: '性别',
		width: 120,
		formatter: row => {
			return ageOptions.find(item => {
				return item.value == row.sex
			})?.label as string
		},
		search: {
			el: 'select',
			options: ageOptions
		}
	},
	{ prop: 'address', label: '地址' },
	{ slot: 'operation', label: '操作', width: 200, fixed: 'right' }
]
// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref()
//row-key
const rowKey = ref('id')
//初始参数
const initParam = reactive({
	name: '',
	sex: ''
})

//批量删除
const batchDelete = async (keys: any, isSelected: boolean) => {
	if (isSelected) {
		//TODO 删除
		await useHandleData(
			deleteData,
			{ ids: keys },
			'删除所选中的数据',
			'warning'
		)
		proTable.value.getTable()
	} else {
		ElMessage({
			type: 'info',
			message: '请先勾选要删除的数据'
		})
	}
}
//删除单条
const handleDelete = async (key: string) => {
	await useHandleData(deleteData, { ids: key }, '删除此数据', 'warning')
	proTable.value.getTable()
}
</script>
