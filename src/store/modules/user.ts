/**
 * 用户信息
 */
import { defineStore } from 'pinia'
import { UserState, UserInfo } from 'store/types'
export const useUserStore = defineStore('user', {
	state: (): UserState => ({
		token: '',
		role: [],
		userInfo: {
			userName: ''
		}
	}),
	getters: {
		userToken: (state: UserState) => state.token,
		userRole: (state: UserState) => state.role,
		info: (state: UserState) => state.userInfo
	},
	actions: {
		//token
		setToken(token: string) {
			this.token = token
		},
		//角色
		setRole(role: string[]) {
			this.role = role
		},
		//用户信息
		setUserInfo(userInfo: UserInfo) {
			this.userInfo = userInfo
		}
	},
	persist: {
		enabled: true // 这个配置代表存储生效,而且是整个store都存储,默认是sessionStorage存储
	}
})
