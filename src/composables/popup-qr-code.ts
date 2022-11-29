import type { OrderObj } from '#/index'
import { generateQrCode } from '@/utils/uni-qrcode'

export function usePopupQrCode() {
  /** 普通二维码弹框控制器 */
  const showPopup = ref(false)
  const canvasId = 'canvasId'
  const qrCodeImageUrl = ref('')
  /** 绘制二维码 */
  function genQrCode(text: string) {
    generateQrCode(text, canvasId, qrCodeImageUrl)
  }

  /** 打开普通订单二维码 */
  function openPopup(order?: OrderObj) {
    const valuable = order?.verificationCode.find(v => !v.status)?.code || '欢迎使用SCMM'
    showPopup.value = true
    genQrCode(valuable)
  }

  return {
    openPopup,
    showPopup,
    canvasId,
    qrCodeImageUrl,
  }
}
