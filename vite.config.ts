import { defineConfig } from 'vite'
import path from 'path'
import viteESLint from '@ehutch79/vite-eslint'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteESLint(), vue()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ]
  }
})
