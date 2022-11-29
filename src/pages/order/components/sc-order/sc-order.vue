<script setup lang="ts" name="sc-order">
// 订单组件
import scOrderProduct from '../sc-order-product/sc-order-product.vue'
import { OrderProps } from './props'
import { OrderStatus } from '@/enums'
import type { OrderObj } from '#/index'

const props = defineProps({
  ...OrderProps,
})

const emits = defineEmits<{
  /** 订单详情 */
  (event: 'detail', id: number): void
  /** 支付订单 */
  (event: 'pay', order: OrderObj): void
  /** 查看券码 */
  (event: 'viewCoupon', order: OrderObj): void
}>()

const statusColor = computed(() => {
  const { status } = props.itemData
  const color: Record<number, any> = {
    /** 待付款 */
    [OrderStatus['待支付']]: 'text-error',
    /** 待使用 */
    [OrderStatus['待使用']]: 'text-primary',
    /** */
  }
  return color[status] || 'text-gray-light'
})
</script>

<template>
  <view class="sc-order box-border mb-20rpx px-32rpx pb-32rpx pt-24rpx text-28rpx bg-white" @click="emits('detail', itemData.id)">
    <view class="py-24rpx flex justify-between border-b-1rpx border-gray-200">
      <view class="text-black-dark">
        订单编号：{{ itemData.orderNumber }}
      </view>
      <view :class="statusColor">
        {{ OrderStatus[itemData.status] }}
      </view>
    </view>

    <view class="mb-28rpx mt-40rpx" @click="emits('detail', itemData.id)">
      <sc-order-product :item-data="itemData" @detail="emits('detail', itemData.product.id)" />
    </view>

    <view class="flex justify-end items-center ">
      实付金额：<view class="text-error font-600">
        ¥<text class="text-40rpx ml-6rpx">
          {{ itemData.price }}
        </text>
      </view>
    </view>

    <view class="mt-16rpx border-t-1rpx border-gray-200 pt-20rpx flex justify-end">
      <view v-if="itemData.status === OrderStatus['待使用']" class="ml-40rpx">
        <sc-button width="160rpx" height="64rpx" radius="64rpx" plain background="#ddd" @click="emits('viewCoupon', itemData)">
          <text class="text-black text-28rpx">
            查看券码
          </text>
        </sc-button>
      </view>

      <view class="ml-40rpx">
        <sc-button width="160rpx" height="64rpx" radius="64rpx" plain background="#ddd" @click="emits('detail', itemData.id)">
          <text class="text-black text-28rpx">
            查看订单
          </text>
        </sc-button>
      </view>

      <view v-if="itemData.status === OrderStatus['待支付']" class="ml-40rpx">
        <sc-button width="160rpx" height="64rpx" radius="64rpx" background="#eb483f" @click="emits('pay', itemData)">
          <text class="text-white text-28rpx">
            去支付
          </text>
        </sc-button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//.sc-order {}
</style>
