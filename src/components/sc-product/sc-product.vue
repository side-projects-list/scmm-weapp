<script setup lang="ts" name="sc-product">
// 首页商品组件

import { productProps } from './props'

const props = defineProps({
  ...productProps,
})

const emits = defineEmits<{
  (event: 'detail', id: number): void
}>()
</script>

<template>
  <view class="sc-product w-330rpx bg-white rounded-24rpx overflow-hidden" @click="emits('detail', itemData.id)">
    <view class="h-330rpx w-330rpx rounded-t-24rpx">
      <image :src="itemData.cover" class="w-full h-full rounded-t-24rpx" />
    </view>

    <view class="p-20rpx">
      <view class="line-clamp-3 text-black-dark mb-16rpx text-28rpx">
        {{ itemData.name }}
      </view>

      <view class="text-error font-500 text-32rpx">
        ¥ {{ itemData.price }}
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//.sc-product {}
</style>
