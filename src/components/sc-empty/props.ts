import type { PropType } from 'vue'

export const emptyProps = {
  /** 模式： no-data无数据，no-result无搜索结果 */
  mode: {
    type: String as PropType<'no-data' | 'no-result'>,
    default: 'no-data',
  },
  /** 上外边距，单位rpx */
  marginTop: {
    type: [Number, String] as PropType<number | string>,
    default: 0,
  },
  /** 图片尺寸，单位rpx */
  size: {
    type: [Number, String] as PropType<number | string>,
    default: 500,
  },
  /** 文字颜色 */
  color: {
    type: String as PropType<string>,
    default: '#999',
  },
  /** 提示文字 */
  text: {
    type: String as PropType<string>,
    default: '',
  },
}
