<template>
	<div class="header">
		<div class="header_left">
			<el-icon style="cursor: pointer" @click="toggleSide">
				<Fold v-if="collapse" />
				<Expand v-else />
			</el-icon>
			<el-breadcrumb :separator-icon="ArrowRight" style="padding-left: 10px">
				<el-breadcrumb-item v-for="item in breadList" :key="item.path">
					<span style="font-size: 16px; weight: 700">{{ item.title }}</span>
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="header_right">
			<el-icon style="cursor: pointer; margin-right: 10px">
				<FullScreen />
			</el-icon>
			<el-badge :value="3" is-dot class="badge">
				<el-icon style="cursor: pointer; margin-right: 5px"><Bell /></el-icon>
			</el-badge>
			<el-dropdown>
				<span class="el-dropdown-link">
					<div class="user">
						<el-avatar :size="30">
							<img src="@/assets/img/logo.webp" />
						</el-avatar>
						<span class="username">{{ userInfo.userName }}</span>
					</div>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item :icon="UserFilled">个人信息</el-dropdown-item>
						<el-dropdown-item :icon="SwitchButton">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { computed, watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight, UserFilled, SwitchButton } from '@element-plus/icons-vue'
import useStore from 'store/index'
const store = useStore()
const route = useRoute()
const collapse = computed(() => store.collapse.collapse)
const userInfo = computed(() => store.user.userInfo)
//展开收起侧边栏
const toggleSide = () => {
	store.collapse.setCollapse()
}

//面包屑
const breadList = ref<any>([])
watchEffect(() => {
	breadList.value = route.matched
		.filter(item => {
			return !item.redirect
		})
		.map(item => {
			return {
				path: item.path,
				title: item.meta.title
			}
		})
})
</script>
<style scoped lang="scss">
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	& .header_left {
		font-size: 25px;
		display: flex;
		align-items: center;
		& .breadcrumb {
			margin-left: 10px;
		}
	}
	& .header_right {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 20px;
		& .badge {
			margin-top: 5px;
			margin-right: 15px;
		}
		& .user {
			display: flex;
			align-items: center;
			cursor: pointer;
			& .username {
				margin-left: 5px;
			}
		}
	}
}
</style>
