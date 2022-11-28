import type { PropType } from 'vue'

export const numberBoxProps = {
  /** 初始值 */
  value: {
    type: [Number, String] as PropType<number | string>,
    default: 1,
  },
  /** 最小值 */
  min: {
    type: Number as PropType<number>,
    default: 1,
  },
  /** 最大值 */
  max: {
    type: Number as PropType<number>,
    default: 99,
  },
  /** 步长 */
  step: {
    type: Number as PropType<number>,
    default: 1,
  },
  /** 是否禁用操作 */
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 加减按钮背景色 */
  iconBackground: {
    type: String as PropType<string>,
    default: 'transparent',
  },
  /** 圆角 */
  radius: {
    type: String as PropType<string>,
    default: '50%',
  },
  /** 加减图标大小 rpx */
  iconSize: {
    type: Number as PropType<number>,
    default: 32,
  },
  /** 图标颜色 */
  iconColor: {
    type: String as PropType<string>,
    default: '#666666',
  },
  /** 输入框高度，单位rpx */
  height: {
    type: Number as PropType<number>,
    default: 42,
  },
  /** 输入框宽度，单位rpx */
  width: {
    type: Number as PropType<number>,
    default: 80,
  },
  /** 文字字号，单位rpx */
  size: {
    type: Number as PropType<number>,
    default: 28,
  },
  /** 输入框背景颜色 */
  backgroundColor: {
    type: String as PropType<string>,
    default: '#F5F5F5',
  },
  /** 输入框字体颜色 */
  color: {
    type: String as PropType<string>,
    default: '#333',
  },
  /** 索引值，列表中使用 */
  index: {
    type: [Number, String] as PropType<number | string>,
    default: 0,
  },
}
