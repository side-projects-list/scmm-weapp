export * from './text'
export * from './route'
export * from './is'
export * from './uni-qrcode'

export function toast(title: string, icon: 'success' | 'loading' | 'error' | 'none' = 'none', duration = 1500) {
  uni.showToast({
    title,
    icon,
    duration,
  })
}

export function platformDoseNotSupportContact() {
  toast('请到小程序中使用该功能')
}
