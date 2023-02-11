<template>
	<template v-for="item in menuItem" :key="item.path">
		<el-menu-item v-if="item.redirect" :index="item.children[0].path">
			<el-icon>
				<component :is="item.meta.icon" />
			</el-icon>
			<span>{{ item.meta.title }}</span>
		</el-menu-item>
		<el-sub-menu v-else-if="item.children" :index="item.path">
			<template #title>
				<el-icon>
					<component :is="item.meta.icon" />
				</el-icon>
				<span>{{ item.meta.title }}</span>
			</template>
			<el-menu-item
				v-for="children in item.children"
				:key="children.path"
				:index="children.path"
			>
				{{ children.meta.title }}
			</el-menu-item>
		</el-sub-menu>
	</template>
</template>
<script lang="ts" setup>
import { toRef } from 'vue'
interface propState {
	menuInfo: any[]
}
const props = defineProps<propState>()
const menuItem = toRef(props, 'menuInfo')
</script>
