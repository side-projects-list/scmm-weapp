import type { PropType } from 'vue'

export const swiperTabsProps = {
  /** 导航菜单是否需要滚动，如只有2或者3个的时候，就不需要滚动了，此时使用flex平分tab的宽度 */
  isScroll: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** 需循环的标签列表 */
  list: {
    type: Array as PropType<Array<Record<string, any>>>,
    default() {
      return [{ name: '标签一' }, { name: '标签二' }, { name: '标签三' }, { name: '标签四' }]
    },
  },
  /** 当前活动tab的索引 */
  current: {
    type: [Number, String] as PropType<string | number>,
    default: 0,
  },
  /** 导航栏的高度和行高，单位rpx */
  height: {
    type: [Number, String] as PropType<string | number>,
    default: 80,
  },
  /** 字体大小，单位rpx */
  fontSize: {
    type: [Number, String] as PropType<string | number>,
    default: 30,
  },
  /** line3生效, 外部swiper的宽度, 单位rpx */
  swiperWidth: {
    type: [String, Number],
    default: 750,
  },
  /** 选中项的主题颜色 */
  activeColor: {
    type: String as PropType<string>,
    default: '#385aff',
  },
  /** 未选中项的颜色 */
  inactiveColor: {
    type: String as PropType<string>,
    default: '#303133',
  },
  /** 菜单底部移动的bar的宽度，单位rpx */
  barWidth: {
    type: [Number, String] as PropType<string | number>,
    default: 40,
  },
  /** 移动bar的高度 */
  barHeight: {
    type: [Number, String] as PropType<string | number>,
    default: 6,
  },
  /** 单个tab的左或右内边距（各占一半），单位rpx */
  gutter: {
    type: [Number, String] as PropType<string | number>,
    default: 40,
  },
  /** 如果是绝对定位，添加z-index值 */
  zIndex: {
    type: [Number, String] as PropType<string | number>,
    default: 1,
  },
  /** 导航栏的背景颜色 */
  bgColor: {
    type: String as PropType<string>,
    default: '#ffffff',
  },
  /** 滚动至中心目标类型 */
  autoCenterMode: {
    type: String as PropType<string>,
    default: 'window',
  },
  /** 读取传入的数组对象的属性(tab名称) */
  name: {
    type: String as PropType<string>,
    default: 'name',
  },
  /** 读取传入的数组对象的属性(徽标数) */
  count: {
    type: String as PropType<string>,
    default: 'count',
  },
  /** 徽标数位置偏移 */
  offset: {
    type: Array as PropType<number[]>,
    default: () => {
      return [5, 20]
    },
  },
  /** 活动tab字体是否加粗 */
  bold: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** 当前活动tab item的样式 */
  activeItemStyle: {
    type: Object as PropType<Record<string, any>>,
    default() {
      return {}
    },
  },
  /** 是否显示底部的滑块 */
  showBar: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** 底部滑块的自定义样式 */
  barStyle: {
    type: Object as PropType<Record<string, any>>,
    default() {
      return {}
    },
  },
  /** 屏幕宽度 */
  windowWidth: {
    type: Number as PropType<number>,
    default: 375,
  },
}
