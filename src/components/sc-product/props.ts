import type { PropType } from 'vue'
import type { ProductObj } from '#/product'
import { PRODUCT_LIST } from '$/product'

export const productProps = {
  itemData: {
    type: Object as PropType<ProductObj>,
    default: () => {
      return PRODUCT_LIST[0]
    },
  },
}
