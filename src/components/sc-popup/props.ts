import type { PropType } from 'vue'

export const popupProps = {
  /** 双向绑定值，控制弹框是否显示 */
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 弹框内容显示的位置 */
  direction: {
    type: String as PropType<'top' | 'right' | 'bottom' | 'left' | 'center'>,
    default: 'center',
  },
  /** 弹框内容大小 */
  size: {
    type: [String, Number] as PropType<string | number>,
    default: 'auto',
  },
  /** 弹框内容背景色 */
  backgroundColor: {
    type: String as PropType<string>,
    default: '#fff',
  },
  /** 弹框内容圆角 */
  radius: {
    type: String as PropType<string>,
    default: '0',
  },
  /** 弹框内容内边距 */
  padding: {
    type: String as PropType<string>,
    default: '0',
  },
  /** 是否允许点击蒙层关闭弹框 */
  closeOnClickModal: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** 是否显示弹框蒙层 */
  showModal: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** 层级 */
  zIndex: {
    type: [String, Number] as PropType<string | number>,
    default: 100,
  },
  /** 蒙层背景色 */
  modalBackground: {
    type: String as PropType<string>,
    default: 'rgba(0,0,0,0.3)',
  },
}
