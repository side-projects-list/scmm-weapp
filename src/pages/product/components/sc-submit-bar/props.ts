import type { PropType } from 'vue'
import defaultActionIcon from '@/static/images/icons/ic_kf.png'
export const submitBarProps = {
  /** 是否在主按钮显示价格/划线价 */
  showButtonPrice: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 价格（优惠价、划线价）对象 */
  priceData: {
    type: Object as PropType<{ currentPrice: number; originPrice: number }>,
    default: () => {
      return {
        currentPrice: 1900,
        originPrice: 2030,
      }
    },
  },
  /** 主按钮显示操作文字 */
  buttonText: {
    type: String as PropType<string>,
    default: '立即支付',
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 操作按钮（左侧）图标 */
  actionIcon: {
    type: String as PropType<string>,
    default: defaultActionIcon,
  },
  /** 操作按钮（左侧）文字 */
  actionText: {
    type: String as PropType<string>,
    default: '客服',
  },
}
