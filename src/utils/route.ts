import { HOME_PAGE_PATH, TABS_PAGE } from '@/constants'

/** 路由跳转封装 */
export function route(options: string | { url: string; mode: 'navigateTo' | 'reLaunch' | 'redirectTo' | 'switchTab' | 'navigateBack'; params?: string; delta?: number }) {
  if (typeof options === 'string') {
    return uni.navigateTo({
      url: options,
    })
  }

  return uni[options.mode]({
    url: `${options.url}${options.params || ''}`,
    delta: options.delta,
  })
}

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

/** 登录成功后路由跳转模式 */
export function afterLoginRouteMode(url: string) {
  url = url.split('?')[0]
  if (TABS_PAGE.includes(url))
    return 'switchTab'

  return 'redirectTo'
}
