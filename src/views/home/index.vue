<template>
	<div>
		<el-checkbox-group v-model="checkedType" true-label="0" false-label="1">
			<el-checkbox
				v-for="item in typeData"
				:key="item.subsidCode"
				:label="item.subsidName"
			>
				{{ item.subsidName }}
			</el-checkbox>
		</el-checkbox-group>
	</div>
</template>
<script lang="ts" setup>
import {} from 'vue'
const checkedType = ref<string[]>(['1'])
const typeData = [
	{ subsidName: '1', subsidCode: '1' },
	{ subsidName: '2', subsidCode: '2' },
	{ subsidName: '3', subsidCode: '3' }
]
</script>
<style scoped lang="scss"></style>
