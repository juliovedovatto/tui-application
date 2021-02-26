import EnvCompatible from 'vite-plugin-env-compatible'
import ViteESLint from '@ehutch79/vite-eslint'
import Vue from '@vitejs/plugin-vue'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import WindiCSS from 'vite-plugin-windicss'
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    EnvCompatible(),
    ViteESLint(),
    WindiCSS({ preflight: false }),
    Vue(),
    VueI18n({
      include: resolve(__dirname, 'src/locales/*.json')
    })
  ],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@typings', replacement: resolve(__dirname, 'typings') },
      { find: '@images', replacement: resolve(__dirname, 'src/assets/images') }
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
