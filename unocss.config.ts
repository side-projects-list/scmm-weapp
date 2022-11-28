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
  shortcuts: {
    'bg-base': 'bg-gray-100 dark:bg-dark',
  },
  presets: [presetAttributify(), ...presets],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    ...transformers,
  ],
})
