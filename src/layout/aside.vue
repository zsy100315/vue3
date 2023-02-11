<template>
	<div class="menu_logo">
		<img src="@/assets/img/logo.webp" class="logo_img" />
		<span v-if="!collapse">艺术家</span>
	</div>
	<el-menu
		:default-active="defaultKey"
		:collapse="collapse"
		router
		unique-opened
		:collapse-transition="false"
		background-color="#0f63b6"
		text-color="#fff"
		active-text-color="#000"
	>
		<MenuTree :menu-info="menus" />
	</el-menu>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import useStore from 'store/index'
import { useRoute } from 'vue-router'
import MenuTree from './menuTree.vue'

const store = useStore()
const route = useRoute()

const collapse = computed(() => store.collapse.collapse)
const defaultKey = ref(route.path ?? '/home')

const menus = ref(store.route.route)
</script>
<style scoped lang="scss">
.menu_logo {
	display: flex;
	align-items: center;
	padding-left: 12px;
	height: 64px;
	line-height: 64px;
	overflow: hidden;
	white-space: nowrap;
	& .logo_img {
		width: 40px;
		margin-right: 8px;
	}

	& span {
		display: inline-block;
		font-size: 20px;
		color: #fff;
	}
}
.el-menu {
	border: 0;
}
</style>
