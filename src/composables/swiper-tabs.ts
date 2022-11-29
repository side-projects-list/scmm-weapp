import type { Ref } from 'vue'
import type { TabItemObj } from '#/index'

export function useSwiperTabs<T extends Ref<TabItemObj<O, S>[]>, O, S>(options: { loadFn: CallableFunction; tabsList: T }) {
  /** tabs组件的current值，表示当前活动的tab选项 */
  const current = ref(0)
  /** swiper组件的current值，表示当前那个swiper-item是活动的 */
  const swiperCurrent = ref(0)
  /** 滑动标签的应用 */
  const uTabs = ref<any>(null)

  /** tabs通知swiper切换 */
  function tabsChange(index: number) {
    swiperCurrent.value = index
  }
  /** swiper-item左右移动，通知tabs的滑块跟随移动 */
  function transition(e: any) {
    const dx = e.detail.dx
    uTabs.value.setDx(dx)
  }

  /**
   * 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
   * swiper滑动结束，分别设置tabs和swiper的状态
   * @param e
   */
  async function animationFinish(e: any) {
    const _current = e.detail.current
    /** 是否需要加载数据 */
    const shouldLoad = _current !== current.value

    uTabs.value.setFinishCurrent(_current)
    swiperCurrent.value = _current
    current.value = _current

    if (shouldLoad)
      await loadData(Number(_current))
  }
  /**
   * @todo
   * scroll-view到底部加载更多
   */
  function onReachBottom() {

  }

  /**
   * 下拉刷新
   */
  async function onRefresh() {
    if (options.tabsList.value[current.value]._freshing)
      return

    options.tabsList.value[current.value]._freshing = true
    options.tabsList.value[current.value].triggered = true

    options.tabsList.value[current.value].itemsList = [] as unknown as O
    options.tabsList.value[current.value].loadingStatus = 'load-more'
    await loadData(current.value)
  }
  function onRestore() {
    options.tabsList.value[current.value].triggered = 'restore'
  }

  /** 加载数据 */
  function loadData(tabIndex: number) {
    if (options.tabsList.value[tabIndex].loadingStatus === 'no-more')
      return

    options.tabsList.value[tabIndex].loadingStatus = 'loading'

    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          options.tabsList.value[tabIndex].triggered = false
          options.tabsList.value[tabIndex]._freshing = false
          options.tabsList.value[tabIndex].loadingStatus = 'no-more'
          options.tabsList.value[tabIndex].itemsList = options.loadFn(options.tabsList.value[tabIndex].value)
          resolve(true)
        }, 900)
      }
      catch (err) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(false)
      }
    })
  }

  return {
    /** tabs组件的current值，表示当前活动的tab选项 */
    current,
    /** swiper组件的current值，表示当前那个swiper-item是活动的 */
    swiperCurrent,
    /** 滑动标签的应用 */
    uTabs,
    /** tabs通知swiper切换 */
    tabsChange,
    /** swiper-item左右移动，通知tabs的滑块跟随移动 */
    transition,
    /**
     * 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
     * swiper滑动结束，分别设置tabs和swiper的状态
     */
    animationFinish,
    /**
     * @todo
     * scroll-view到底部加载更多
     */
    onReachBottom,
    /**
   * 下拉刷新
   */
    onRefresh,
    onRestore,
    /** 加载数据 */
    loadData,
  }
}
