const url = /\/mock\/getRouters/

const type = 'post'

const getRouters = () => {
	return {
		status: 200,
		data: [
			{
				path: '/',
				component: 'layout',
				redirect: '/home',
				meta: {
					title: '首页',
					icon: 'HomeFilled'
				},
				children: [
					{
						path: '/home',
						name: 'Home',
						meta: {
							title: '首页',
							icon: 'HomeFilled'
						},
						component: 'views/home/index'
					}
				]
			},
			{
				path: '/menu',
				component: 'layout',
				meta: {
					title: '嵌套菜单',
					icon: 'Menu'
				},
				children: [
					{
						path: '/menu/first',
						name: 'First',
						meta: {
							title: '菜单一'
						},
						component: 'views/menu/first'
					},
					{
						path: '/menu/second',
						name: 'Second',
						meta: {
							title: '菜单二'
						},
						component: 'views/menu/second'
					}
				]
			},
			{
				path: '/table',
				component: 'layout',
				redirect: '/table/index',
				meta: {
					title: '表格',
					icon: 'List'
				},
				children: [
					{
						path: '/table/index',
						meta: {
							title: '表格',
							icon: 'List'
						},
						component: 'views/table/index'
					}
				]
			},
			{
				path: '/form',
				component: 'layout',
				redirect: '/form/index',
				meta: {
					title: '表单',
					icon: 'Edit'
				},
				children: [
					{
						path: '/form/index',
						meta: {
							title: '表单',
							icon: 'Edit'
						},
						component: 'views/form/index'
					}
				]
			},
			{
				path: '/echart',
				component: 'layout',
				redirect: '/echart/index',
				meta: {
					title: '图表',
					icon: 'Histogram'
				},
				children: [
					{
						path: '/echart/index',
						meta: {
							title: '图表',
							icon: 'Histogram'
						},
						component: 'views/echarts/index'
					}
				]
			},
			{
				path: '/map',
				component: 'layout',
				redirect: '/map/index',
				meta: {
					title: 'Map',
					icon: 'MapLocation'
				},
				children: [
					{
						path: '/map/index',
						meta: {
							title: 'Map',
							icon: 'MapLocation'
						},
						component: 'views/map/index'
					}
				]
			}
		],
		msg: 'Success'
	}
}

export default {
	url,
	type,
	fun: getRouters
}
