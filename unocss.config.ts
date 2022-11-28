import type { Preset, SourceCodeTransformer } from 'unocss'
import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import {
  presetApplet,
  presetRemToRpx,
  transformerApplet,
  transformerAttributify,
} from 'unocss-applet'

const presets: Preset[] = []
const transformers: SourceCodeTransformer[] = []

if (process.env.UNI_PLATFORM === 'h5') {
  presets.push(presetUno())
  // presets.push(presetAttributify())
}
else {
  presets.push(presetApplet())
  presets.push(presetRemToRpx())

  transformers.push(transformerAttributify())
  transformers.push(transformerApplet())
}

export default defineConfig({
  theme: {
    colors: {
      primary: '#385aff',
      success: '#19C572',
      warning: '#f0ad4e',
      error: '#eb483f',
      // bg-black-dark、bg-black
      black: {
        dark: '#000000',
        DEFAULT: '#333333',
      },
      gray: {
        DEFAULT: '#666666',
        light: '#999999',
        background: '#F8F8F8',
        placeholder: '#eeeeee',
      },
    },
    borderRadius: {
      sm: '8rpx',
      DEFAULT: '24rpx',
      circle: '50%',
    },
  },
  shortcuts: {
    'bg-base': 'bg-gray-100 dark:bg-dark',
  },
  presets: [presetAttributify(), ...presets],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    ...transformers,
  ],
  rules: [
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
    ['pb-safe-40', { 'padding-bottom': 'calc(env(safe-area-inset-bottom, 0) + 40rpx)' }],
  ],
})
