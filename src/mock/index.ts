import Mock from 'mockjs'
//table数据
const data = Mock.mock({
	'data|22-100': [
		{
			'id|+1': 1,
			name: '@cname',
			'age|1-100': 18,
			'sex|1-2': 1,
			address: '@county(true)'
		}
	]
})
//查询
Mock.mock(/\/mock\/tableList/, 'get', (config: any) => {
	const { pageNum, pageSize, name, sex } = JSON.parse(config.body)
	let list = data.data.map((item: any) => {
		return {
			id: item.id,
			name: item.name,
			age: item.age,
			sex: `${item.sex}`,
			address: item.address
		}
	})
	if (name) {
		list = list.filter((item: any) => {
			return item.name.includes(name)
		})
	}
	if (sex) {
		list = list.filter((item: any) => {
			return item.sex == sex
		})
	}
	const result = list.slice((pageNum - 1) * pageSize, pageNum * pageSize)
	return {
		status: 200,
		messagee: '查询成功',
		total: list.length,
		data: result
	}
})
//删除
Mock.mock(/\/mock\/deleteData/, 'get', (config: any) => {
	const { ids } = JSON.parse(config.body)
	return {
		status: 200,
		messagee: '删除成功',
		data: ids
	}
})

interface mockType {
	url: string
	type: string
	fun: any
}
const mockFiles = import.meta.glob('./data/**/*.ts', { eager: true })

const json: mockType[] = []
for (const key in mockFiles) {
	const value = mockFiles[key] as any
	json.push(value.default)
}
Mock.setup({ timeout: '100-200' })

json.forEach(item => {
	Mock.mock(item.url, item.type, item.fun)
})
