import type { PropType } from 'vue'
import type { LoadMoreStatus } from './types'

export const loadMoreProps = {
  /** 组件状态， 可选值：load-more, loading, no-more */
  status: {
    type: String as PropType<LoadMoreStatus>,
    default: 'load-more',
  },
  /** 文字大小，单位rpx */
  size: {
    type: Number as PropType<number>,
    default: 28,
  },
  /** 图标大小，单位rpx */
  iconSize: {
    type: Number as PropType<number>,
    default: 32,
  },

  /** 文字颜色 */
  color: {
    type: String as PropType<string>,
    default: '#999',
  },
  /** 状态 load-more 对应的文字 */
  loadMoreText: {
    type: String as PropType<string>,
    default: '加载更多',
  },
  /** 状态 loading 对应的文字 */
  loadingText: {
    type: String as PropType<string>,
    default: '正在加载...',
  },
  /** 状态 no-more 对应的文字 */
  noMoreText: {
    type: String as PropType<string>,
    default: '没有更多了～',
  },
  /** 与前一个元素的距离，单位rpx */
  marginTop: {
    type: Number as PropType<number>,
    default: 10,
  },
  /** 与后一个元素的距离，单位rpx */
  marginBottom: {
    type: Number as PropType<number>,
    default: 10,
  },
  /** 线条颜色 */
  lineColor: {
    type: String as PropType<string>,
    default: '#999',
  },
}
