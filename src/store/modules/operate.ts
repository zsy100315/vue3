/**
 * 记录操作
 */

import { defineStore } from 'pinia'
import { OperateState } from 'store/types'
export const useOperateStore = defineStore('operate', {
	state: (): OperateState => ({
		collapse: false
	}),
	getters: {
		isCollapse: (state: OperateState) => state.collapse
	},
	actions: {
		//collapse
		setCollapse() {
			this.collapse = !this.collapse
		}
	},
	persist: {
		enabled: true
	}
})
