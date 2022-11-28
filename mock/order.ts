import type { OrderObj } from '../types'
import { OrderStatus } from '../src/enums'
import { PRODUCT_LIST } from './product'

export const ORDER_LIST: OrderObj[] = [
  {
    id: 1,
    orderNumber: 'SC358028375847603837',
    status: OrderStatus['已完成'],
    price: PRODUCT_LIST[0].price * 2,
    product: PRODUCT_LIST[0],
    createdAt: '2022-11-23 12:23:00',
    paidAt: '2022-11-23 12:23:00',
    completedAt: '2022-11-23 12:23:00',
    availableAt: '2023-11-23 12:23:00',
    code: '2345 3522 7785',
    quality: 2,
    userId: 1,
    verificationCode: [
      {
        id: 1,
        code: '2388 0002 3479',
        status: 1,
        updatedAt: '2022-11-23 12:23:00',
      },
      {
        id: 2,
        code: '2588 3002 3460',
        status: 1,
        updatedAt: '2022-11-23 12:23:00',
      },
    ],
  },
  {
    id: 2,
    orderNumber: 'SC358028375847603832',
    status: OrderStatus['已完成'],
    price: PRODUCT_LIST[2].price * 3,
    product: PRODUCT_LIST[2],
    createdAt: '2022-11-27 11:23:00',
    paidAt: '2022-11-27 11:23:00',
    completedAt: '2022-11-28 12:23:00',
    availableAt: '2023-11-23 12:23:00',
    code: '5443 3522 7785',
    quality: 3,
    userId: 1,
    verificationCode: [
      {
        id: 3,
        code: '2788 0002 3479',
        status: 1,
        updatedAt: '2022-11-28 12:23:00',
      },
      {
        id: 4,
        code: '3588 3002 3460',
        status: 1,
        updatedAt: '2022-11-28 12:23:00',
      },
      {
        id: 6,
        code: '2688 3002 3460',
        status: 1,
        updatedAt: '2022-11-28 12:23:00',
      },
    ],
  },
  {
    id: 3,
    orderNumber: 'SC358028375847603834',
    status: OrderStatus['待支付'],
    price: PRODUCT_LIST[3].price * 1,
    product: PRODUCT_LIST[3],
    createdAt: (() => {
      const now = new Date()
      return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    })(),
    paidAt: '',
    completedAt: '',
    availableAt: '',
    code: '',
    quality: 1,
    userId: 1,
    verificationCode: [],
  },
  {
    id: 4,
    orderNumber: 'SC35802837584760383a',
    status: OrderStatus['待使用'],
    price: PRODUCT_LIST[4].price * 2,
    product: PRODUCT_LIST[4],
    createdAt: '2022-11-27 11:23:00',
    paidAt: '2022-11-27 11:23:00',
    completedAt: '',
    availableAt: '2023-11-23 12:23:00',
    code: '5443 6788 7785',
    quality: 2,
    userId: 1,
    verificationCode: [
      {
        id: 7,
        code: '2388 0002 3479',
        status: 1,
        updatedAt: '2022-11-27 11:23:00',
      },
      {
        id: 8,
        code: '2588 3002 3460',
        status: 0,
        updatedAt: '2022-11-27 11:23:00',
      },
    ],
  },
  {
    id: 5,
    orderNumber: 'SC35802837584760384b',
    status: OrderStatus['待使用'],
    price: PRODUCT_LIST[5].price * 1,
    product: PRODUCT_LIST[5],
    createdAt: '2022-11-27 11:23:00',
    paidAt: '2022-11-27 11:40:00',
    completedAt: '',
    availableAt: '2023-11-23 12:23:00',
    code: '5443 6799 7485',
    quality: 1,
    userId: 1,
    verificationCode: [
      {
        id: 9,
        code: '2388 0002 3479',
        status: 0,
        updatedAt: '2022-11-27 11:23:00',
      },
    ],
  },
  {
    id: 6,
    orderNumber: 'SC358028375847603777',
    status: OrderStatus['待使用'],
    price: PRODUCT_LIST[5].price * 1,
    product: PRODUCT_LIST[5],
    createdAt: '2022-11-27 11:23:00',
    paidAt: '2022-11-27 11:40:00',
    completedAt: '',
    availableAt: '2023-11-23 12:23:00',
    code: '5443 6799 7485',
    quality: 1,
    userId: 1,
    verificationCode: [
      {
        id: 9,
        code: '2388 0002 3479',
        status: 0,
        updatedAt: '2022-11-27 11:23:00',
      },
    ],
  },
]

