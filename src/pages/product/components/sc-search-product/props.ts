import type { PropType } from 'vue'
import type { ProductObj } from '#/index'
import { PRODUCT_LIST } from '$/index'

export const searchProductProps = {
  keyword: {
    type: String as PropType<string>,
    default: '',
  },
  itemData: {
    type: Object as PropType<ProductObj>,
    default: () => {
      return PRODUCT_LIST[0]
    },
  },
}
