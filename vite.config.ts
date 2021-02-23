import ViteESLint from '@ehutch79/vite-eslint'
import Vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import { defineConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ViteESLint(), WindiCSS(),Vue()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '@/assets/scss/abstracts/variables' as *;
          @use '@/assets/scss/abstracts/mixins' as *;
          @use '@/assets/scss/abstracts/functions' as *;
        `
      }
    }
  }
})
