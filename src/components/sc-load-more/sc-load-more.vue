<script setup lang="ts" name="sc-load-more">
// 加载更多提示组件

import { loadMoreProps } from './props'

const props = defineProps({
  ...loadMoreProps,
})

const emits = defineEmits<{
  /** status为 load-more 点击组件触发 */
  (event: 'loadMore'): void
}>()

const displayText = computed(() => {
  return props.status === 'load-more' ? props.loadMoreText : props.status === 'loading' ? props.loadingText : props.noMoreText
})

function handleLoadMore() {
  if (props.status === 'load-more')
    emits('loadMore')
}
</script>

<template>
  <view class="sc-load-more" :style="{ marginTop: `${marginTop}rpx`, marginBottom: `${marginBottom}rpx` }" @click="handleLoadMore">
    <view class="flex items-center justify-center">
      <view class="w-60rpx h-1rpx mx-20rpx" :style="{ background: lineColor }" />

      <view v-if="status === 'loading'" class="animate-spin animate-duration-2s">
        <sc-icon name="loading" :size="iconSize" />
      </view>
      <text class="mx-6rpx" :style="{ fontSize: `${size}rpx`, color }">
        {{ displayText }}
      </text>

      <view class="w-60rpx h-1rpx mx-20rpx" :style="{ background: lineColor }" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
//.sc-load-more {}
</style>
