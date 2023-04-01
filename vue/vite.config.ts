import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config'

const vitestConfig: VitestUserConfigInterface = {
  test: {
    environment: 'jsdom'
  }
};

export default defineConfig({
  test: vitestConfig.test,
  plugins: [
    vue()
  ],
  resolve:{
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }
    ],
  }
})
