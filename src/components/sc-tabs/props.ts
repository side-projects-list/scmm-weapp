import type { PropType } from 'vue'
import type { TabsItem } from './types'

export const tabsProps = {
  /** 标签页数据源 */
  tabs: {
    type: Array as PropType<Array<TabsItem>>,
    default(): TabsItem[] {
      return []
    },
  },
  /** 当前选项卡 */
  current: {
    type: Number as PropType<number>,
    default: 0,
  },
  /** 是否可以滚动 */
  scroll: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** tab高度 rpx */
  height: {
    type: [Number, String] as PropType<number | string>,
    default: 80,
  },
  /** 组件左侧距离屏幕的间隙 单位rpx */
  leftGap: {
    type: [Number, String] as PropType<number | string>,
    default: 0,
  },
  backgroundColor: {
    type: String as PropType<string>,
    default: '#fff',
  },
  /** 字体大小 */
  size: {
    type: Number as PropType<number>,
    default: 28,
  },
  /** 字体颜色 */
  color: {
    type: String as PropType<string>,
    default: '#666',
  },
  /** 选中后字体颜色 */
  selectedColor: {
    type: String as PropType<string>,
    default: '#385aff',
  },
  /** 选中后 是否加粗 ，未选中则无效 */
  bold: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 滑块高度 */
  sliderHeight: {
    type: String as PropType<string>,
    default: '2px',
  },
  /** 滑块背景颜色 */
  sliderBgColor: {
    type: String as PropType<string>,
    default: '#385aff',
  },
  /** 滑块 radius */
  sliderRadius: {
    type: String as PropType<string>,
    default: '2px',
  },
  /** 滑块bottom */
  bottom: {
    type: String as PropType<string>,
    default: '0',
  },
  /** 是否固定 */
  isFixed: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 吸顶效果，为true时isFixed失效 */
  isSticky: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** isFixed=true时，tab top值 px */
  top: {
    type: Number as PropType<number>,
    // #ifndef H5
    default: 0,
    // #endif
    // #ifdef H5
    // @ts-expect-error no-dupe-keys
    default: 44,
    // #endif
  },
  zIndex: {
    type: [Number, String] as PropType<number | string>,
    default: 996,
  },
}
