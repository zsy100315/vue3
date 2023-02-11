import router from '@/router'
import useStore from '@/store'
import NProgress from 'utils/nprogress'
const whiteList = ['/login'] //白名单
let hasRoutes = true //记录路由
router.beforeEach(async (to, from, next) => {
	NProgress.start()
	const store = useStore()
	if (to.meta?.title) {
		document.title = to.meta.title as string
	}
	//判断是否已登陆
	if (store.user.token) {
		if (to.path === '/login') {
			next({ path: '/home' })
		} else {
			// 路由添加进去了没有及时更新 需要重新进去一次拦截
			if (hasRoutes) {
				await store.route.setRouters()
				store.route.routers.forEach(item => {
					router.addRoute(item)
				})
				hasRoutes = false
				next({ ...to, replace: true })
			} else {
				next()
			}
		}
	} else {
		//判断是否为白名单
		if (whiteList.includes(to.path)) {
			next()
		} else {
			next({ path: '/login' })
		}
	}
})

router.afterEach(() => {
	NProgress.done()
})
