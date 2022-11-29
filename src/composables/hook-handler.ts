export function useHooks() {
  function handlePulldownRefresh() {
    setTimeout(() => {
      uni.stopPullDownRefresh()
    }, 300)
  }

  return {
    handlePulldownRefresh,
  }
}
