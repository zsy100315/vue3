import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登录'
		}
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes: staticRoutes
})

export default router
