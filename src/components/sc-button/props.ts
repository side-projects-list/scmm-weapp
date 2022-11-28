import type { PropType } from 'vue'

export const buttonProps = {
  /** 按钮背景色 */
  background: {
    type: String as PropType<string>,
    default: '#385aff',
  },
  /** 按钮显示文本 */
  text: {
    type: String as PropType<string>,
    default: '',
  },
  /** 按钮字体颜色 */
  color: {
    type: String as PropType<string>,
    default: '#fff',
  },
  /** 按钮禁用背景色 */
  disabledBackground: {
    type: String as PropType<string>,
    default: '',
  },
  /** 按钮禁用字体颜色 */
  disabledColor: {
    type: String as PropType<string>,
    default: '',
  },
  borderWidth: {
    type: String as PropType<string>,
    default: '1rpx',
  },
  borderColor: {
    type: String as PropType<string>,
    default: '',
  },
  /** 宽度 */
  width: {
    type: String as PropType<string>,
    default: '100%',
  },
  /** 高度 */
  height: {
    type: String as PropType<string>,
    default: '96rpx',
  },
  /** 字体大小，单位rpx */
  size: {
    type: [Number, String] as PropType<string | number>,
    default: 32,
  },
  bold: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  margin: {
    type: String as PropType<string>,
    default: '0',
  },
  /** 圆角 */
  radius: {
    type: String as PropType<string>,
    default: '6rpx',
  },
  plain: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  link: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  formType: {
    type: String as PropType<string>,
    default: '',
  },
  openType: {
    type: String as PropType<string>,
    default: '',
  },
}
