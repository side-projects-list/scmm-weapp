import type { PropType } from 'vue'
import type { OrderObj } from '#/index'
import { ORDER_LIST } from '$/index'

export const OrderProps = {
  /** 订单对象 */
  itemData: {
    type: Object as PropType<OrderObj>,
    default: () => {
      return ORDER_LIST[0]
    },
  },
}
