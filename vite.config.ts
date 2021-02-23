import { defineConfig } from 'vite'
import viteESLint from '@ehutch79/vite-eslint'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteESLint(), vue()]
})
