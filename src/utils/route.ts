import { HOME_PAGE_PATH } from '@/constants'

/** 自定义头部的返回功能 */
export function tryNavigateBack() {
  const pages = getCurrentPages()
  if (pages.length < 2) {
    return uni.switchTab({
      url: HOME_PAGE_PATH,
    })
  }

  return uni.navigateBack({})
}
