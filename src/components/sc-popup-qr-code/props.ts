import type { PropType } from 'vue'
import type { OrderObj } from '#/index'

export const popupQrCodeProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  /** 外部生成号的二维码图片 */
  qrCodeImage: {
    type: String as PropType<string>,
    default: '',
  },
  itemData: {
    type: Object as PropType<OrderObj>,
    default: () => {
      return {
        id: 6,
        orderNumber: 'SC358028375847603777',
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
      }
    },
  },
}
