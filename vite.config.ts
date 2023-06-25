import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
	server: {
		host: '0.0.0.0',
		port: '8080',
		// proxy: {
		// 	// 字符串简写写法
		// 	'/foo': 'http://localhost:4567',
		// 	// 选项写法
		// 	'/api': {
		// 		target: 'http://jsonplaceholder.typicode.com',
		// 		changeOrigin: true,
		// 		rewrite: (path) => path.replace(/^\/api/, '')
		// 	},
		// 	// 正则表达式写法
		// 	'^/fallback/.*': {
		// 		target: 'http://jsonplaceholder.typicode.com',
		// 		changeOrigin: true,
		// 		rewrite: (path) => path.replace(/^\/fallback/, '')
		// 	},
		// 	// 使用 proxy 实例
		// 	'/api': {
		// 		target: 'http://jsonplaceholder.typicode.com',
		// 		changeOrigin: true,
		// 		configure: (proxy, options) => {
		// 			// proxy 是 'http-proxy' 的实例
		// 		}
		// 	},
		// 	// 代理 WebSocket 或 socket
		// 	'/socket.io': {
		// 		target: 'ws://localhost:3000',
		// 		ws: true
		// 	}
		// }
	},
	base: './',
	plugins: [
		vue(),
		VueSetupExtend(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	],
	optimizeDeps: {
		include: ['schart.js']
	}
});
