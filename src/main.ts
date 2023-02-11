import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { initAMapApiLoader } from '@vuemap/vue-amap'
import '@vuemap/vue-amap/dist/style.css'
initAMapApiLoader({
	key: '2cd2c66b743f424be05d57ba19220aa8'
})

import './mock'
import axios from 'api/axios'
const pinia = createPinia()
pinia.use(piniaPersist)

import './permission'
const app = createApp(App)
app.config.globalProperties.$axios = axios
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
