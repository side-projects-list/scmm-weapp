import type { PropType } from 'vue'
import type { ProductObj } from '#/product'

export const productProps = {
  itemData: {
    type: Object as PropType<ProductObj>,
    default: () => {
      return {
        id: 1,
        cover: '',
        name: '商品1',
        price: 123,
      }
    },
  },
}
