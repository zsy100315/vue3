import { RouteRecordRaw } from 'vue-router'

//用户信息
export interface UserInfo {
	userName: string
}

//user
export interface UserState {
	token: string
	role: string[]
	userInfo: UserInfo
}

//route
export interface RouteState {
	routeType: boolean
	route: RouteRecordRaw[]
}

//operate

export interface OperateState {
	collapse: boolean
}
