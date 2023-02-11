/**
 * 路由
 */

import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { RouteState } from 'store/types'
import { getRouters } from 'api/common'
import { shallowRef } from 'vue'
import Layout from '@/layout/index.vue'

const modules = import.meta.glob('../../views/**/*.vue')

const filterAsyncRouter = (data: RouteRecordRaw[]) => {
	const result: RouteRecordRaw[] = []
	data.forEach((item: any) => {
		item.component =
			item.component === 'layout'
				? shallowRef(Layout)
				: modules[`../../${item.component}.vue`]
		if (item.children && item.children.length > 0) {
			item.children = filterAsyncRouter(item.children)
		}
		result.push(item)
	})
	return result
}

export const useRouteStore = defineStore('route', {
	state: (): RouteState => ({
		routeType: false,
		route: []
	}),
	getters: {
		routers: (state: RouteState) => state.route
	},
	actions: {
		setRouters() {
			return new Promise(resolve => {
				getRouters().then(res => {
					const data = filterAsyncRouter(res.data)
					this.route = data
					resolve(data)
				})
			})
		}
	},
	persist: {
		enabled: true // 这个配置代表存储生效,而且是整个store都存储,默认是sessionStorage存储
	}
})
