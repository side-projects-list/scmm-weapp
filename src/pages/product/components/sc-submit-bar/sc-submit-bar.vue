<script setup lang="ts" name="sc-submit-bar">
// 底部提交栏

import { submitBarProps } from './props'
import { platformDoseNotSupportContact } from '@/utils'

const props = defineProps({
  ...submitBarProps,
})

const emits = defineEmits<{
  /** 主按钮点击事件 */
  (event: 'submit'): void
}>()
</script>

<template>
  <view class="sc-submit-bar bg-white fixed inset-x-0 bottom-0 z-99 pt-24rpx px-32rpx flex items-center">
    <view class="mr-10rpx flex-shrink-0">
      <slot name="action">
        <!-- #ifdef MP-WEIXIN -->
        <button openType="contact" class="m-none p-none bg-transparent border-0 outline-0 action-button reset-button">
          <view class="flex flex-col items-center px-22rpx">
            <image :src="actionIcon" class="w-48rpx h-48rpx" />
            <view class="mt-8rpx text-28rpx text-black leading-none">
              {{ actionText }}
            </view>
          </view>
        </button>
        <!-- #endif -->
        <!-- #ifndef MP-WEIXIN -->
        <view class="flex flex-col items-center px-22rpx" @click="platformDoseNotSupportContact">
          <image :src="actionIcon" class="w-48rpx h-48rpx" />
          <view class="mt-8rpx text-28rpx text-black leading-none">
            {{ actionText }}
          </view>
        </view>
        <!-- #endif -->
      </slot>
    </view>

    <view class="w-full">
      <slot>
        <sc-button background="#eb483f" type="danger" radius="80rpx" shape="circle" height="88rpx" :disabled="disabled" :loading="loading" @click="emits('submit')">
          <view v-if="!showButtonPrice" class="font-500 text-36rpx">
            {{ buttonText }}
          </view>

          <view v-else class="flex items-center justify-between pl-32rpx w-full">
            <view class="flex items-baseline">
              <view class="text-32rpx font-600">
                ¥<text class="text-48rpx">
                  {{ priceData.currentPrice }}
                </text>
              </view>
              <view class="text-24rpx font-500 ml-6rpx line-through">
                ¥{{ priceData.originPrice }}
              </view>
            </view>
            <view class="flex">
              <view class="w-2rpx h-40rpx bg-white mt-24rpx" />
              <view class="font-500 text-36rpx px-48rpx">
                {{ buttonText }}
              </view>
            </view>
          </view>
        </sc-button>
      </slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.sc-submit-bar {
  padding-bottom: calc(env(safe-area-inset-bottom, 0) + 24rpx);

  .action-button {
    &::after {
      border: 0,
    }
  }
}
</style>
