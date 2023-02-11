import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VueAmapResolver } from '@vuemap/unplugin-resolver'
// import { viteMockServe } from 'vite-plugin-mock'

const pathSrc = resolve(__dirname, 'src')
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			imports: ['vue', 'pinia', 'vue-router'],
			resolvers: [
				ElementPlusResolver({
					exclude: /^ElAmap[A-Z]*/
				}),
				VueAmapResolver()
			],
			dts: true,
			eslintrc: {
				enabled: true, // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
				globalsPropValue: true
			}
		}),
		Components({
			// dirs 指定组件所在位置
			dirs: ['src/components/', 'src/views/'],
			// 配置需要将哪些后缀类型的文件进行自动按需引入，'vue'为默认值
			extensions: ['vue'],
			resolvers: [
				ElementPlusResolver({
					exclude: /^ElAmap[A-Z]*/
				}),
				VueAmapResolver()
			],
			// 生成components.d.ts
			dts: true,
			// 遍历子目录
			deep: true
		}),
		// viteMockServe({
		// 	supportTs: false,
		// 	logger: true
		// }),
		eslintPlugin()
	],
	base: './',
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
			api: resolve(__dirname, 'src/api'),
			comp: resolve(__dirname, 'src/components'),
			utils: resolve(__dirname, 'src/utils'),
			types: resolve(__dirname, 'src/types'),
			styles: resolve(__dirname, 'src/styles'),
			store: resolve(__dirname, 'src/store'),
			hooks: resolve(__dirname, 'src/hooks'),
			view: resolve(__dirname, 'src/views')
		}
	},
	mode: 'development',
	server: {
		host: '127.0.0.1',
		port: 3000,
		open: true,
		hmr: true,
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:3000',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '')
			}
		}
	}
})
