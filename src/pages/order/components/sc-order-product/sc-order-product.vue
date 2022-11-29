<script setup lang="ts" name="sc-order-product">
// 订单商品组件，主要在订单详情页中的订单组件、订单详情页显示商品信息：商品封面图、名称、购买数量、价格
// 监听点击事件可跳转对应商品详情

import { orderProductProps } from './props'

const props = defineProps({
  ...orderProductProps,
})

const emits = defineEmits<{
  /** 商品详情 */
  (event: 'detail', id: number): void
}>()

function handleImageClick() {
  if (props.enablePreview) {
    return uni.previewImage({
      urls: props.itemData.product.images,
      current: 0,
    })
  }

  emits('detail', props.itemData.product.id)
}
</script>

<template>
  <view class="sc-order-product flex items-start text-28rpx" @click="emits('detail', itemData.id)">
    <view class="mr-24rpx">
      <image :src="itemData.product.cover" class="w-120rpx h-120rpx rounded-8rpx flex-shrink-0" @click.stop="handleImageClick" />
    </view>

    <view class="flex justify-between w-full">
      <view class="line-clamp-3  text-black">
        {{ itemData.product.name }}
      </view>
      <view class="ml-26rpx text-right flex-shrink-0">
        <view class="font-600">
          ¥{{ itemData.product.price }}
        </view>
        <view class="text-gray-light mt-18rpx">
          x{{ itemData.quality || 0 }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//.sc-order-product {}
</style>
