import type { PropType } from 'vue'

export const iconProps = {
  /** 图标名称，可参照 sc-icon/icons.ts 文件 */
  name: {
    type: String as PropType<string>,
    default: '',
  },
  /** 图标大小 */
  size: {
    type: String as PropType<string>,
    default: '38rpx',
  },
  /** 图标颜色 */
  color: {
    type: String as PropType<string>,
    default: '#999',
  },
  /** 是否粗体 */
  bold: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 外边距 */
  margin: {
    type: String as PropType<string>,
    default: '0',
  },
}
