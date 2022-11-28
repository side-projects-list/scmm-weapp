<script setup lang="ts" name="sc-search-product">
// 搜索页商品列表组件

import { searchProductProps } from './props'
import type { ProductObj } from '#/product'

const props = defineProps({
  ...searchProductProps,
})

const emits = defineEmits<{
  /** 立即购买 */
  (event: 'buyNow', product: ProductObj): void
  /** 商品详情 */
  (event: 'detail', product: ProductObj): void
}>()

/** 高亮标题中搜索关键词 */
function highlightKeyword(text: string) {
  if (!props.keyword)
    return text

  const r = new RegExp(props.keyword, 'gi')
  return text.replace(r, `<span class="text-error">${props.keyword}</span>`)
}
</script>

<template>
  <view class="sc-search-product py-48rpx px-32rpx flex content-start" @click="emits('detail', itemData)">
    <view class="w-128rpx h-128rpx flex-shrink-0 rounded-8rpx overflow-hidden mr-24rpx">
      <image :src="itemData.cover" class="w-full h-full rounded-8rpx" />
    </view>

    <view class="w-full">
      <rich-text class="text-32rpx font-500 line-clamp-2" :nodes="highlightKeyword(itemData.name)" />

      <view class="mt-48rpx flex justify-between">
        <view class="text-error font-600 text-32rpx">
          ¥ {{ itemData.price }}
        </view>

        <view class="w-160rpx h-48rpx text-white text-24rpx rounded-80rpx bg-error font-500 flex justify-center content-center leading-48rpx" hover-class="opacity-80" hover-start-time="0" hover-stay-time="30" @click.stop="emits('buyNow', itemData)">
          立即购买
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//.sc-search-product {}
</style>
