import type { OrderStatus } from '@/enums'
import { ORDER_LIST } from '$/order'
import { toast, tryNavigateBack } from '@/utils'

const userStore = useSetupUserStore()

/** 根据状态获取订单 */
export function getOrdersByStatus(status?: OrderStatus) {
  if (!userStore.getToken())
    return []

  if (!status)
    return ORDER_LIST

  return ORDER_LIST.filter(order => order.status === status)
}

/** 根据订单id获取指定订单 */
export function getOrderById(id: number) {
  if (!userStore.getToken()) {
    toast('暂未登录')
    setTimeout(() => {
      tryNavigateBack()
    }, 1501)
    return undefined
  }
  return ORDER_LIST.find(order => order.id === id)
}
