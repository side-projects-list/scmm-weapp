<script setup lang="ts" name="sc-empty">
// 空内容组件

import { emptyProps } from './props'
import noDataImage from './images/no-data.png'
import noResultImage from './images/no-result.png'

const props = defineProps({
  ...emptyProps,
})

const modeData = {
  'no-data': {
    text: '暂无内容~',
    image: noDataImage,
  },
  'no-result': {
    text: '空空如也~',
    image: noResultImage,
  },
}
</script>

<template>
  <view class="sc-empty flex flex-col justify-center items-center" :style="{ marginTop: `${marginTop}rpx` }">
    <image :src="modeData[mode].image" :style="{ width: `${size}rpx`, height: `${size}rpx` }" />
    <view class="mt-32rpx" :style="{ color }">
      {{ text || modeData[mode].text }}
    </view>
    <view class="mt-32rpx">
      <slot />
    </view>
  </view>
</template>

<style lang="scss" scoped>
//.sc-empty {}
</style>
