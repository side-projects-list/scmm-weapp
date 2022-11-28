import { OrderStatus } from "@/enums/order"
import { ProductObj } from "./product"

/**订单对象 */
export interface OrderObj {
  /**订单id */
  "id": number
  /**订单编号 */
  "orderNumber": string
  /**订单状态 */
  "status": OrderStatus
  /**订单价格（单位：元） */
  "price": number
  /**订单商品 */
  "product": ProductObj
  /**下单时间 */
  "createdAt": string
  /**支付时间 */
  "paidAt": string
  /**订单完成时间 */
  "completedAt": string
  /**订单有效期时间 */
  "availableAt": string
  /**券码 */
  "code": string
  /**购买数量 */
  "quality": number
  /**下单用户id */
  "userId": number
  /**核销码 */
  "verificationCode": VerificationCodeObj[]
}

/**核销码对象 */
export interface VerificationCodeObj {
  id: number
  /**核销码 */
  code: string
  /**0未使用，1已使用 */
  status: 0 | 1
  /**status更新时间 */
  updatedAt: string
}

/**下单对象 */
export interface CheckoutObj extends Pick<OrderObj, 'quality' | 'product'> { }