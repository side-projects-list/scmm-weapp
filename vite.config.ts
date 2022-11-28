import path from 'path'
import { defineConfig } from 'vite'
import UnoCss from 'unocss/vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      '#/': `${path.resolve(__dirname, 'types')}/`,
      '$/': `${path.resolve(__dirname, 'mock')}/`,
    },
  },
  plugins: [
    uni(),
    UnoCss(),
    AutoImport({
      eslintrc: {
        enabled: true,
      },
      imports: [
        'pinia',
        {
          'vue': ['ref', 'computed', 'reactive', 'watch', 'onMounted', 'onBeforeMount'],
          '@dcloudio/uni-app': [
            'onError',
            'onHide',
            'onLaunch',
            'onLoad',
            'onPageNotFound',
            'onPageScroll',
            'onPullDownRefresh',
            'onReachBottom',
            'onReady',
            'onShareAppMessage',
            'onShareTimeline',
            'onShow',
            'onUnhandledRejection',
            'onUnload',
          ],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/stores/modules', 'src/apis'],
    }),
  ],
})
