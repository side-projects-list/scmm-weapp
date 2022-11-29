import type { PropType } from 'vue'
import type { OrderObj } from '#/index'
import { ORDER_LIST } from '$/index'

export const orderProductProps = {
  enablePreview: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  itemData: {
    type: Object as PropType<OrderObj>,
    default: () => {
      return ORDER_LIST[0]
    },
  },
}
