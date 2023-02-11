<template>
	<div class="login_bgcolor">
		<div class="input_div">
			<div v-if="loginError" class="error_style">
				<i class="el-icon-warning">账户名与密码不匹配，请重新输入</i>
			</div>
			<el-input
				v-model="username"
				placeholder="请输入用户名"
				class="input_style"
			></el-input>
			<el-input
				v-model="password"
				show-password
				placeholder="请输入密码"
				class="input_style"
				@keyup.enter="loginUser"
			></el-input>

			<el-button
				type="primary"
				size="small"
				style="float: right; margin-left: 10px"
				@click="loginUser"
			>
				登录
			</el-button>
			<el-button size="small" style="float: right" @click="loginUser">
				注册
			</el-button>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useStore from 'store/index'
import { login } from 'api/common'

interface Login {
	username: string
	password: string
}
const store = useStore()
const router = useRouter()

const loginError = ref(false)
const username = ref('admin')
const password = ref('123456')

const loginUser = () => {
	login<Login>({ username: username.value, password: password.value }).then(
		res => {
			const { status, data } = res
			if (status === 200) {
				const { token = '', role = [], userInfo = {} } = data ? data : {}
				store.user.setToken(token)
				store.user.setRole(role)
				store.user.setUserInfo(userInfo)
				router.push({ path: '/home' })
			}
		}
	)
}
</script>
<style scoped lang="scss">
.login_bgcolor {
	min-height: 100vh;
	background-image: url(@/assets/img/login.webp);
	/* 背景图垂直、水平均居中 */
	background-position: center center;
	/* 背景图不平铺 */
	background-repeat: no-repeat;
	/* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
	background-attachment: fixed;
	/* 让背景图基于容器大小伸缩 */
	background-size: cover;
	display: flex;
	justify-content: center;
	align-items: center;

	& .input_div {
		width: 25%;
		& .error_style {
			height: 30px;
			border-radius: 5px;
			font-size: 12px;
			background-color: #ffebeb;
			color: #e3393c;
			padding-left: 10px;
			margin-bottom: 10px;
			display: flex;
			align-items: center;
		}
		& .input_style {
			margin-bottom: 10px;
		}
	}
}
</style>
