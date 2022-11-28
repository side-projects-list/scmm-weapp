import type { PropType } from 'vue'

export const scrollTopProps = {
  /** 回顶部按钮距离底部距离，单位：rpx */
  bottom: {
    type: Number as PropType<number>,
    default: 180,
  },
  /** 回顶部按钮距离右侧距离，单位 rpx */
  right: {
    type: Number as PropType<number>,
    default: 25,
  },
  /** 页面滚动距离顶部多少显示该组件，单位 px */
  threshold: {
    type: Number as PropType<number>,
    default: 200,
  },
  /** 页面滚动的实际距离 */
  scrollTop: {
    type: Number as PropType<number>,
  },
  /** 回顶部滚动时间 */
  duration: {
    type: Number as PropType<number>,
    default: 220,
  },
  /** 是否自定义返回顶部事件，用于 scroll-view 组件 */
  customEvent: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
}
