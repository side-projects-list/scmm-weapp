<script setup lang="ts" name="order-checkout">
// 确认订单页
import type { CheckoutObj } from '#/index'
import type { EmitType } from '@/components/sc-number-box/types'
import { ERROR_COLOR } from '@/constants'
import { route, toast, tryNavigateBack } from '@/utils'

const orderStore = useSetupOrderStore()
const userStore = useSetupUserStore()
const { handlePulldownRefresh } = useHooks()

/** 确认订单对象 */
const itemData = ref<CheckoutObj>({ quality: 0, product: {} } as CheckoutObj)
const keepData = ref(false)

function onValueChange(data: { value: number; type: EmitType; index: number }) {
  itemData.value.quality = data.value
}

/** 按钮加载状态 */
const loading = ref(false)
/** 按钮禁用状态 */
const disabled = ref(false)
/** 确认支付 */
function handlePay() {
  if (!userStore.getToken()) {
    toast('请先登录')
    const pages = getCurrentPages()
    keepData.value = true
    const currentPage = pages[pages.length - 1]
    setTimeout(() => {
      route({
        url: '/pages/auth/login/index',
        mode: 'redirectTo',
        params: `?redirect=${currentPage.route}`,
      })
    }, 1501)

    return
  }

  loading.value = true
  disabled.value = true
  setTimeout(() => {
    loading.value = false
    disabled.value = false
    uni.redirectTo({
      url: `/pages/order/success/index?id=${2}`,
    })
  }, 1000)
}

onLoad(() => {
  const data = orderStore.getCheckoutData()
  keepData.value = false
  if (!data) {
    toast('请选择下单商品！')

    setTimeout(() => {
      tryNavigateBack()
    }, 1501)
  }

  itemData.value = data!
})

onUnload(() => {
  if (!keepData.value)
    orderStore.clearCheckoutData()
})

onPullDownRefresh(handlePulldownRefresh)
</script>

<template>
  <view class="order-checkout pt-36rpx leading-none">
    <!-- 订单信息 -->
    <view class="mx-32rpx bg-white rounded-24rpx p-32rpx">
      <view class="font-600 text-32rpx">
        订单信息
      </view>
      <view class="h-120rpx flex mt-32rpx">
        <view class="w-120rpx h-full mr-32rpx flex-shrink-0">
          <image :src="itemData.product.cover" mode="aspectFill" class="w-full h-full" />
        </view>
        <view class="h-full w-full flex flex-col justify-between">
          <view class="text-32rpx w-full line-clamp-2">
            {{ itemData.product.name }}
          </view>
          <view class="w-full flex items-center justify-between">
            <view class="font-600">
              ￥{{ itemData.product.price }}
            </view>
            <view class="flex items-center">
              <view v-if="itemData.product.maxPurchaseQuantity" class="text-20rpx mr-8rpx">
                （每车限购{{ itemData.product.maxPurchaseQuantity || 0 }}件）
              </view>
              <view class="border-2rpx rounded-24rpx border-gray-200 ">
                <sc-number-box :value="itemData.quality" :min="1" :max="itemData.product.maxPurchaseQuantity || itemData.product.stock" icon-color="#333" background-color="transparent" @change="onValueChange" />
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="border-t-1rpx border-gray-light pt-32rpx flex justify-between items-center mt-32rpx">
        <view>小计</view>
        <view class="text-32rpx font-600 text-error">
          ￥{{ itemData.quality * itemData.product.price }}
        </view>
      </view>
    </view>

    <!-- 购买须知 -->
    <view class="mx-32rpx bg-white rounded-24rpx mt-32rpx p-32rpx text-gray-light leading-normal">
      <view class="text-32rpx font-600 text-black mb-28rpx leading-none">
        购买须知
      </view>
      <view>1、须知</view>
      <view>2、须知</view>
      <view>3、须知须知须知须知须知</view>
    </view>

    <!-- submit bar -->
    <view class="bg-white fixed left-0 bottom-0 right-0 z-2 pt-16rpx px-32rpx flex items-center justify-between submit-bar">
      <view>
        实付金额：<text class="text-40rpx font-500 text-error">
          ￥{{ itemData.quality * itemData.product.price }}
        </text>
      </view>
      <view>
        <sc-button width="240rpx" height="80rpx" radius="80rpx" :background="ERROR_COLOR" :loading="loading" :disabled="disabled" @click="handlePay">
          <view class="text-32rpx font-500 text-white">
            确认支付
          </view>
        </sc-button>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: $uni-bg-color-grey;
}
.order-checkout {
  padding-bottom: calc(env(safe-area-inset-bottom, 0) + 142rpx);

  & :deep(.sc-number-box__input) {
    width: 50rpx !important;
    margin: 0 !important;
    border-right: 2rpx solid #ddd;
    border-left: 2rpx solid #ddd;
  }

  .submit-bar {
    padding-bottom: calc(env(safe-area-inset-bottom, 0) + 16rpx);
  }
}
</style>
