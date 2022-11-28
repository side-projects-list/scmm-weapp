import { PRODUCT_LIST } from '$/product'

/** 获取指定商品 */
export function getProductById(id?: number) {
  if (!id)
    return undefined

  return PRODUCT_LIST.find(product => product.id === id)
}

/** 根据关键词获取商品列表 */
export function getProductsByKeyword(keyword: string) {
  return PRODUCT_LIST.filter(product => product.name.includes(keyword))
}
