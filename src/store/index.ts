import { useUserStore } from './modules/user'
import { useRouteStore } from './modules/route'
import { useOperateStore } from './modules/operate'
export default function useStore() {
	return {
		user: useUserStore(),
		route: useRouteStore(),
		collapse: useOperateStore()
	}
}
