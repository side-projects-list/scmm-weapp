/**
 * 处理页面滚动时：自定义头部导航栏背景色、返回顶部按钮等的相关数据
 * @param {Number} opacityThreshold 页面往下滚动多长 px 时自定义顶部导航栏背景色不透明
 */
export function useScroll(opacityThreshold = 280) {
  const opacity = ref(0)
  const scrollTop = ref(0)

  function handlePageScroll(options: { scrollTop: number }) {
    scrollTop.value = options.scrollTop
    const result = options.scrollTop / opacityThreshold
    opacity.value = result > 1 ? 1 : result
  }

  return {
    opacity,
    scrollTop,
    handlePageScroll,
  }
}
