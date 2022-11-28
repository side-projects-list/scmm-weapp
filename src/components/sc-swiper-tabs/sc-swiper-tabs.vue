<script setup lang="ts" name="sc-swiper-tabs">
// 滑动切换标签页

import { getCurrentInstance, nextTick } from 'vue'
import { swiperTabsProps } from './props'

const props = defineProps({
  ...swiperTabsProps,
})

const emits = defineEmits<{
  (event: 'update:modelValue'): void
  (event: 'change', index: number): void
  (event: 'input'): void
}>()

defineExpose({
  setDx,
  setFinishCurrent,
})

const scrollLeft = ref(0)

let animationFinishCurrent = props.current
const componentsWidth = ref(0)
const line3AddDx = ref(0)
const line3Dx = ref(0)
const sw = ref(0)
const tabsInfo = ref<any[]>([])
const colorGradientArr = ref<any[]>([])
const preId = 'DST'

const getTabs = computed(() => props.list)

/** 获取当前活跃的current值 */
const getCurrent = computed(() => {
  const current = Number(props.current)
  // 判断是否超出边界
  if (current > getTabs.value.length - 1)
    return getTabs.value.length - 1

  if (current < 0)
    return 0

  return current
})

/** 滑块需要移动的距离 */
const scrollBarLeft = computed(() => Number(line3Dx.value) + Number(line3AddDx.value))
/** 滑块的宽度转为px单位 */
const barWidthPx = computed(() => uni.upx2px(+props.barWidth))
/** tab样式 */
const tabItemStyle = computed(() => {
  return (index: number) => {
    let style = {
      height: `${props.height}rpx`,
      lineHeight: `${props.height}rpx`,
      padding: `0 ${Number(props.gutter) / 2}rpx`,
      color: tabsInfo.value.length > 0 ? tabsInfo.value[index] ? tabsInfo.value[index].color : props.activeColor : props.inactiveColor,
      fontSize: `${props.fontSize}rpx`,
      zIndex: +props.zIndex + 2,
      fontWeight: index === getCurrent.value && props.bold ? 'bold' : 'normal',
    }

    if (index === getCurrent.value)
      style = Object.assign(style, props.activeItemStyle)

    return style
  }
})

/** 底部滑块的样式 */
const tabBarStyle = computed(() => {
  const style = {
    width: `${barWidthPx.value}px`,
    height: `${props.barHeight}rpx`,
    borderRadius: '100px',
    backgroundColor: props.activeColor,
    left: `${scrollBarLeft.value}px`,
  }
  return Object.assign(style, props.barStyle)
})

watch(() => props.current, (n: number | string) => {
  change()
  setFinishCurrent(+n)
})

watch(() => props.list, () => {
  nextTick(() => {
    init()
  })
})

onMounted(() => init())

async function init() {
  countPx()
  await getTabsInfo()
  countLine3Dx()
  getQuery(() => {
    setScrollViewToCenter()
  })
}

/** 获取各个tab的节点信息 */
function getTabsInfo() {
  return new Promise((resolve, reject) => {
    const view = uni.createSelectorQuery().in(getCurrentInstance())

    for (let i = 0; i < props.list.length; i++)
      view.select(`.${preId}${i}`).boundingClientRect()

    view.exec((res) => {
      const arr = []
      for (let i = 0; i < res.length; i++) {
        // 给每个tab添加其文字颜色属性
        res[i].color = props.inactiveColor
        // 当前tab直接赋予activeColor
        if (i === getCurrent.value)
          res[i].color = props.activeColor
        arr.push(res[i])
      }
      tabsInfo.value = arr
      resolve(true)
    })
  })
}

/** 当swiper滑动结束，计算滑块最终要停留的位置 */
function countLine3Dx() {
  const tab = tabsInfo.value[+animationFinishCurrent]
  // 让滑块中心点和当前tab中心重合
  if (tab)
    line3Dx.value = tab.left + tab.width / 2 - barWidthPx.value / 2 - tabsInfo.value[0].left
}

function countPx() {
  // swiper宽度由rpx转为px单位，因为dx等，都是px单位
  sw.value = uni.upx2px(Number(props.swiperWidth))
}
function emit(index: number) {
  emits('change', index)
}
function change() {
  setScrollViewToCenter()
}

function getQuery(cb: CallableFunction) {
  try {
    const view = uni.createSelectorQuery().in(getCurrentInstance()).select('.dfc-swiper-tabs')
    view.fields({
      size: true,
    },
    (data) => {
      if (data) {
        componentsWidth.value = (data as UniApp.NodeInfo).width || 0
        if (cb && typeof cb === 'function')
          cb(data)
      }
      else {
        getQuery(cb)
      }
    },
    ).exec()
  }
  catch (e) {
    componentsWidth.value = props.windowWidth
  }
}

/** 把活动tab移动到屏幕中心点 */
function setScrollViewToCenter() {
  const tab = tabsInfo.value[+animationFinishCurrent]
  if (tab) {
    const tabCenter = tab.left + tab.width / 2
    let fatherWidth
    // 活动tab移动到中心时，以屏幕还是tab组件为宽度为基准
    if (props.autoCenterMode === 'window')
      fatherWidth = props.windowWidth
    else
      fatherWidth = componentsWidth.value

    scrollLeft.value = tabCenter - fatherWidth / 2
  }
}

/** 设置滑块x轴位置 */
function setDx(dx: number) {
  let nextTabIndex = dx > 0 ? +animationFinishCurrent + 1 : +animationFinishCurrent - 1

  nextTabIndex = nextTabIndex <= 0 ? 0 : nextTabIndex
  nextTabIndex = nextTabIndex >= props.list.length ? props.list.length - 1 : nextTabIndex

  const nowTab = tabsInfo.value[+animationFinishCurrent]
  const nowTabX = nowTab.left + nowTab.width / 2

  const nextTab = tabsInfo.value[nextTabIndex]
  const nextTabX = nextTab.left + nextTab.width / 2

  const distanceX = Math.abs(nextTabX - nowTabX)
  line3AddDx.value = (dx / sw.value) * distanceX
}

/** swiper结束滑动 */
function setFinishCurrent(current: number) {
  tabsInfo.value.map((val: any, index) => {
    if (current === index)
      val.color = props.activeColor
    else val.color = props.inactiveColor
    return val
  })
  line3AddDx.value = 0
  animationFinishCurrent = current
  countLine3Dx()
}
// credited vk-uview-ui
</script>

<template>
  <view
    class="sc-swiper-tabs w-full transition-property-all" :style="{
      zIndex: +zIndex,
      background: bgColor,
    }"
  >
    <scroll-view scroll-x class="sc-scroll-view box-border relative w-full whitespace-nowrap" :scroll-left="scrollLeft" scroll-with-animation :style="{ zIndex: +zIndex + 1 }">
      <view class="sc-scroll-box box-border relative" :class="{ 'sc-swiper-tabs-scroll-flex': !isScroll }">
        <view
          v-for="(item, index) in getTabs" :key="index"
          class="sc-swiper-tabs-item box-border relative inline-block text-center transition-property-all" :style="tabItemStyle(index)" :class="[preId + index]" @tap="emit(index)"
        >
          {{ item[name] || item.name }}
        </view>
        <view v-if="showBar" class="sc-scroll-bar box-border absolute bottom-4rpx" :style="{ ...tabBarStyle }" />
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.sc-swiper-tabs {
  &-scroll-flex {
    display: flex;
    justify-content: space-between;

    .sc-swiper-tabs-item {
      flex: 1;
    }
  }
}

/* #ifndef APP-NVUE */
::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  background: transparent;
  -webkit-appearance: none;
}
/* #endif */

/* #ifdef H5 */
// 通过样式穿透，隐藏H5下，scroll-view下的滚动条
scroll-view :deep(::-webkit-scrollbar) {
  display: none;
  width: 0 !important;
  height: 0 !important;
  background: transparent;
  -webkit-appearance: none;
}
/* #endif */
</style>
