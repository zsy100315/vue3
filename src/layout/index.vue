<template>
	<el-container>
		<el-aside :width="collapse ? '64px' : '160px'">
			<Aside />
		</el-aside>
		<el-container>
			<el-header>
				<Header />
			</el-header>
			<el-main>
				<Main />
			</el-main>
		</el-container>
	</el-container>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import Aside from './aside.vue'
import Header from './header.vue'
import Main from './main.vue'
import useStore from 'store/index'
const store = useStore()
const collapse = computed(() => store.collapse.collapse)
</script>
<style scoped lang="scss">
.el-aside {
	height: 100vh;
	background-color: #0f63b6;
}
.el-header {
	padding: 15px 10px 0 10px;
	height: 50px !important;
}
.el-main {
	padding: 10px;
	background-color: #ebedf0;
	display: flex;
}
</style>
