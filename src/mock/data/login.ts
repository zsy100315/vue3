const url = /\/mock\/login/

const type = 'get'

const login = (config: any) => {
	const { username, password } = JSON.parse(config.body)
	if (username === 'admin' && password === '123456') {
		return {
			status: 200,
			data: {
				role: ['admin'],
				userInfo: {
					userName: '艺术家'
				},
				token: 'rtVrM4PhiFK8PNWuS1n02oKc3f'
			},
			msg: 'Success'
		}
	} else if (username != 'admin') {
		return {
			msg: 'Error',
			data: null,
			status: 201
		}
	} else if (password != '123456') {
		return {
			msg: 'Error',
			data: null,
			status: 201
		}
	}
}
export default {
	url,
	type,
	fun: login
}
