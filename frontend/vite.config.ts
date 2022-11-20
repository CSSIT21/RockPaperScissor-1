import react from '@vitejs/plugin-react';
import * as fs from 'fs';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:3000',
				changeOrigin: true,
			},
		},
		// https: {
		// 	key: fs.readFileSync('./res/key.pem'),
		// 	cert: fs.readFileSync('./res/cert.pem'),
		// },
	},
});
