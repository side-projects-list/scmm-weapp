import type { PropType } from 'vue'

export const waterfallProps = {
  itemsList: {
    type: Array as PropType<Array<any>>,
    default: () => [],
  },
  /** 每次请求接口返回列表数量 */
  pageSize: {
    type: Number as PropType<number>,
    default: 10,
  },
  /** 列与列间的间隔，非0数值须带单位 */
  columnGap: {
    type: String as PropType<string>,
    default: '10rpx',
  },
  /** 左侧和列表容器间的间隔，非0数值须带单位 */
  leftGap: {
    type: String as PropType<string>,
    default: '0',
  },
  /** 右侧和列表容器间的间隔，非0数值须带单位 */
  rightGap: {
    type: String as PropType<string>,
    default: '0',
  },
  /** 列表背景色，可使用渐变色 */
  backgroundColor: {
    type: String as PropType<string>,
    default: 'transparent',
  },
  /** 列表外层容器圆角值，非0数值须带单位 */
  radius: {
    type: String as PropType<string>,
    default: '0',
  },
}
