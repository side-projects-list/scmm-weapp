<script setup lang="ts" name="sc-tabs">
// 标签页

import type { ComponentInternalInstance } from 'vue'
import { getCurrentInstance, nextTick, onBeforeMount } from 'vue'
import { tabsProps } from './props'

const props = defineProps({
  ...tabsProps,
})

const emits = defineEmits<{
  (event: 'change', data: { index: number }): void
}>()

const currentInstance = getCurrentInstance() as ComponentInternalInstance & { ctx: any } | null
const childClass = ref(`sc_10_${Math.floor(Math.random() * 10e4).toString()}`)
const classView = ref(`sc_01_${Math.floor(Math.random() * 10e4).toString()}`)
/** 屏幕宽度 */
const windowWidth = ref(0)
/** 所有 tab 节点信息 */
const tabItems = ref<any[]>([])
/** 控制 scroll-view 滚动以在异步加载数据的时候能正确获得 dom 信息 */
const scrolling = ref(true)
/** 下划线是否需要过渡动画 */
const needTransition = ref(false)
/** 下划 line 的左边距离 */
const translateX = ref(0)
/** 下划 line 宽度 */
const lineWidth = ref(0)
/** scroll-view 左边滚动距离 */
const scrollLeft = ref(0)
const currentTab = ref(0)
const gap = ref(-1)

/** 监听数据变化, 如果改变重新初始化参数 */
watch(() => props.tabs, () => {
  scrolling.value = false
  setTimeout(() => init(), 200)
})

/** 监听 currentTab 变化, 做对应处理 */
watch(() => props.current, (newVal) => {
  scrollByIndex(newVal)
})

watch(() => props.leftGap, (newVal) => {
  gap.value = uni.upx2px(+newVal)
})

onBeforeMount(() => currentTab.value = props.current)

onMounted(() => {
  gap.value = uni.upx2px(+props.leftGap)
  nextTick(() => init())
})

/**
 * 切换菜单
 */
function handleClick(e: { currentTarget: { dataset: { index: number } } }) {
  const index = Number(e.currentTarget.dataset.index)
  emits('change', {
    index,
  })
  scrollByIndex(index)
}
/**
 * 滑动到指定位置
 * @param tabCur: 当前激活的tabItem的索引
 * @param _needTransition: 下划线是否需要过渡动画, 第一次进来应设置为false
 */
function scrollByIndex(tabCur: number, _needTransition = true) {
  const item = tabItems.value[tabCur]
  if (!item)
    return
  const itemWidth = item.width || 0
  const itemLeft = item.left || 0
  needTransition.value = _needTransition
  currentTab.value = tabCur
  // 超出滚动的情况
  if (props.scroll) {
    // 保持滚动后当前 item '尽可能' 在屏幕中间
    const _scrollLeft = itemLeft - (windowWidth.value - itemWidth) / 2
    scrollLeft.value = _scrollLeft
    translateX.value = itemLeft - gap.value
    lineWidth.value = itemWidth
  }
  else {
    // 不超出滚动的情况
    translateX.value = itemLeft - gap.value
    lineWidth.value = itemWidth
  }
}
/**
     *  初始化函数
     */
function init() {
  const {
    windowWidth: _windowWidth,
  } = uni.getSystemInfoSync()

  const query = uni.createSelectorQuery().in(currentInstance!.ctx)
  query
    .select('.sc-scroll__view')
    .boundingClientRect((res) => {
      if (res)
        windowWidth.value = (res as any).width || _windowWidth
    }).selectAll('.sc-item__child').boundingClientRect((res) => {
      scrolling.value = true
      tabItems.value = res as any[]
      scrollByIndex(currentTab.value, false)
    })
    .exec()
}
</script>

<template>
  <scroll-view
    class="sc-scroll__view w-full h-80rpx overflow-hidden"
    :class="[isFixed && !isSticky ? 'sc-tabs__fixed fixed left-0' : '', isSticky ? 'sc-tabs__sticky sticky left-0' : '', classView]"
    :style="{ height: `${height}rpx`, background: backgroundColor, top: isFixed || isSticky ? `${top}px` : 'auto', zIndex: isFixed || isSticky ? zIndex : 'auto' }"
    :scroll-x="scrolling"
    :scroll-with-animation="scrolling"
    :scroll-left="scrollLeft"
  >
    <view class="sc-tabs__wrap pb-20rpx">
      <view
        class="sc-tabs__list relative flex h-80rpx"
        :class="[scroll ? 'sc-tabs__scroll block whitespace-nowrap' : '']"
        :style="{ height: `${height}rpx` }"
      >
        <view
          v-for="(item, index) in tabs"
          :key="index"
          class="sc-tabs__item"
          :style="{ height: `${height}rpx` }"
          :data-index="index"
          @tap="handleClick"
        >
          <view
            class="sc-item__child"
            :class="[childClass, currentTab === index ? 'sc-item__child-active' : '']"
            :style="{ color: currentTab === index ? selectedColor : color, fontSize: `${size}rpx`, fontWeight: bold && currentTab === index ? 'bold' : 'normal' }"
          >
            {{ item.name }}
          </view>
        </view>
        <view
          class="sc-tabs__line"
          :class="[needTransition ? 'sc-transition' : '']"
          :style="{ background: sliderBgColor, height: sliderHeight, borderRadius: sliderRadius, bottom, width: `${lineWidth}px`, transform: `translateX(${translateX}px)` }"
        />
      </view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
//.sc-tabs {}
.sc-tabs__scroll .sc-tabs__item {
  display: inline-flex;
  padding: 0 30rpx;
}

.sc-tabs__scroll .sc-item__child {
  display: block !important;
}

.sc-tabs__item {
  position: relative;
  z-index: 2;
  display: flex;
  padding: 0 10rpx;
  text-align: center;
  box-sizing: border-box;
  transition: color 0.3s ease-in-out;
  flex: 1;
  align-items: center;
  justify-content: center;
}

.sc-item__child {
  display: inline-block;
  transition: font 0.3s;
}

.sc-tabs__line {
  position: absolute;
  left: 0;
  z-index: 1;
  display: inline-block;
  width: 0;
}

.sc-tabs__line.sc-transition {
  transition: width 0.3s, transform 0.3s;
}
</style>
