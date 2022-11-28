import type { PropType } from 'vue'

export const navBarProps = {
  /** 是否开启顶部安全区适配 */
  safeAreaInsetTop: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** 固定在顶部时，是否生成一个等高元素，以防止塌陷 */
  placeholder: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 是否固定在顶部 */
  fixed: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** 是否显示下边框 */
  border: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 左边的图标 */
  leftIcon: {
    type: String as PropType<string>,
    default: 'arrow-left',
  },
  /** 左边的提示文字 */
  leftText: {
    type: String as PropType<string>,
    default: '',
  },
  /** 右边的提示文字 */
  rightText: {
    type: String as PropType<string>,
    default: '',
  },
  /** 右边的图标 */
  rightIcon: {
    type: String as PropType<string>,
    default: '',
  },
  /** 标题 */
  title: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  /** 背景颜色 */
  bgColor: {
    type: String as PropType<string>,
    default: '#ffffff',
  },
  /** 标题的宽度 */
  titleWidth: {
    type: [String, Number] as PropType<string | number>,
    default: '400',
  },
  /** 导航栏高度，单位 px，默认 44 */
  height: {
    type: Number as PropType<number>,
    default: 44,
  },
  /** 状态栏高度，由外部传入避免每次实例化都调用 uni.getSystemInfo 接口 */
  statusBarHeight: {
    type: Number as PropType<number>,
    default: 0,
  },
  /** 左侧返回图标的大小 */
  leftIconSize: {
    type: [String, Number] as PropType<string | number>,
    default: 20,
  },
  /** 左侧返回图标的颜色 */
  leftIconColor: {
    type: String as PropType<string>,
    default: '#999',
  },
  /** 点击左侧区域(返回图标)，是否自动返回上一页 */
  autoBack: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 标题的样式，对象或字符串 */
  titleStyle: {
    type: Object as PropType<Record<string, any>>,
    default: () => {
      return {}
    },
  },
}
