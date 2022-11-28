<script setup lang="ts" name="sc-scroll-top">
// 返回顶部

import { scrollTopProps } from './props'

const props = defineProps({
  ...scrollTopProps,
})

const emits = defineEmits<{
  (event: 'custom'): void
}>()

/** 是否显示 */
const show = ref(false)
const toggle = ref(true)

watch(() => props.scrollTop, () => handleChange())

function backToTop() {
  if (props.customEvent)
    return

  toggle.value = false

  uni.pageScrollTo({
    scrollTop: 0,
    duration: props.duration,
  })

  setTimeout(() => {
    toggle.value = true
  }, 220)
}

function handleCustomEvent() {
  if (props.customEvent)
    emits('custom')
}

function handleChange() {
  const visible = props.scrollTop! > props.threshold
  if ((visible && show.value) || (!visible && !show.value))
    return

  show.value = visible
}
</script>

<template>
  <view class="sc-scroll-top fixed z-99 right-32rpx w-80rpx h-80rpx" :style="{ bottom: `${bottom}rpx`, right: `${right}rpx` }" @click="handleCustomEvent">
    <slot>
      <view v-show="show && toggle" class="w-80rpx h-80rpx rounded-circle bg-gray bg-opacity-30 flex items-center justify-center">
        <sc-icon name="arrow-up" class="pb-10rpx" color="white" @click="backToTop" />
      </view>
    </slot>
  </view>
</template>

<style lang="scss" scoped>
.sc-scroll-top {
  bottom: calc(env(safe-area-inset-bottom, 0) + 160rpx);
}
</style>
