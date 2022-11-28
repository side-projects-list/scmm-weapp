import type { PropType } from 'vue'

export const countdownProps = {
  /** 数字框border颜色 */
  borderColor: {
    type: String as PropType<string>,
    default: '#333',
  },
  /** 数字框背景颜色 */
  backgroundColor: {
    type: String as PropType<string>,
    default: '#fff',
  },
  /** 数字框字体大小 */
  size: {
    type: Number as PropType<number>,
    default: 24,
  },
  /** 数字框字体颜色 */
  color: {
    type: String as PropType<string>,
    default: '#333',
  },
  /** 是否缩放 0.9 */
  scale: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 冒号大小 */
  colonSize: {
    type: Number as PropType<number>,
    default: 28,
  },
  /** 冒号颜色 */
  colonColor: {
    type: String as PropType<string>,
    default: '#333',
  },
  /** 剩余时间 (单位：秒) */
  time: {
    type: [Number, String],
    default: 0,
  },
  /** 是否包含天 */
  days: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 是否包含小时 */
  hours: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** 是否包含分钟 */
  minutes: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** 是否包含秒 */
  seconds: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** 单位用英文缩写表示 仅seconds秒数有效 */
  unitEn: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 是否展示为冒号,false为文字 */
  isColon: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
}
