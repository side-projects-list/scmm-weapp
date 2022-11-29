<script setup lang="ts" name="order-detail">
// 订单详情页

import scOrderProduct from '../components/sc-order-product/sc-order-product.vue'
import type { OrderObj } from '#/index'
import { ERROR_COLOR } from '@/constants'
import { OrderStatus } from '@/enums'
import { route, toast, tryNavigateBack } from '@/utils'

const {
  openPopup,
  showPopup,
  canvasId,
  qrCodeImageUrl,
} = usePopupQrCode()
const { handlePulldownRefresh } = useHooks()

/** 订单对象 */
const itemData = ref<OrderObj>({} as OrderObj)
/** 计算可核销剩余次数 */
const valuableCount = computed(() => {
  return itemData.value.verificationCode.filter(v => v.status === 0).length
})
/** 是否是未支付订单 */
const isUnPaid = computed(() => itemData.value.status === OrderStatus['待支付'])
/** 订单状态描述 */
const statusDescription = computed(() => {
  const { status, availableAt } = itemData.value
  let msg = '感谢您，期待您的下次光临！'
  if (status === OrderStatus['待使用'])
    msg = `请您在 ${availableAt} 前使用`

  return msg
})

/** 未支付订单倒计时完毕 */
function onCountDownEnd() {
  itemData.value.status = OrderStatus['已失效']
}

/** 复制 */
function handleCopy() {
  uni.setClipboardData({
    data: itemData.value.orderNumber,
    showToast: true,
  })
}

onLoad((options) => {
  const { id } = options!
  if (!Number(id)) {
    toast('无效单号！')
    setTimeout(() => {
      tryNavigateBack()
    }, 1501)
    return
  }
  itemData.value = getOrderById(Number(id)) || ({} as OrderObj)
})

onPullDownRefresh(handlePulldownRefresh)
</script>

<template>
  <view class="order-detail">
    <view>
      <view class="order-detail__banner fixed z-20 left-0 right-0 h-208rpx box-border px-64rpx py-60rpx leading-none " :class="[isUnPaid ? 'bg-error text-white' : OrderStatus['待使用'] === itemData.status ? 'bg-primary text-white' : 'bg-gray-placeholder']">
        <image v-if="[OrderStatus['待支付'], OrderStatus['待使用']].includes(itemData.status)" src="@/static/images/order/order_car_lighter.png" class="w-196rpx h-138rpx absolute right-0 bottom-0" />
        <image v-else src="@/static/images/order/order_car_light.png" class="w-196rpx h-138rpx absolute right-0 bottom-0" />
        <view class="box-border px-64rpx py-60rpx absolute top-0 right-0 bottom-0 left-0">
          <view class="text-44rpx font-600">
            {{ OrderStatus[itemData.status] }}
          </view>
          <view v-if="isUnPaid" class="mt-16rpx flex items-center">
            请在 <sc-countdown :time="900" :hours="false" border-color="transparent" colon-color="white" color="white" background-color="transparent" :is-colon="true" :size="28" :colon-size="28" @end="onCountDownEnd" /> 内完成支付
          </view>
          <view v-else class=" inline-flex items-center mt-16rpx">
            {{ statusDescription }}
          </view>
        </view>
      </view>
      <view class="w-full h-208rpx" />
    </view>

    <!-- 商品信息 -->
    <view class="mx-32rpx mt-32rpx rounded-24rpx bg-white py-32rpx pl-30rpx pr-36rpx box-border">
      <!-- 商品信息 -->
      <view class="flex items-start" @click="route(`/pages/product/detail/index?id=${itemData.product.id}`)">
        <sc-order-product :item-data="itemData" />
      </view>

      <view class="mt-40rpx pt-26rpx flex justify-between border-t border-gray-light">
        <view>实付金额</view>
        <view class="text-error font-600 text-32rpx">
          ¥ {{ itemData.price }}
        </view>
      </view>
    </view>

    <!-- 普通卡券信息 -->
    <view v-if="OrderStatus['待支付'] !== itemData.status" class="mx-32rpx mt-32rpx rounded-24rpx bg-white box-border p-32rpx">
      <!-- 到期时间、二维码 -->
      <view class="flex items-center justify-between border-b-gray-light border-b pb-16rpx">
        <view class="flex items-center">
          <view>
            剩余次数：<text class="text-error font-600">
              {{ valuableCount }}
            </text>
          </view>
          <view class="w-1rpx h-20rpx bg-gray-placeholder mx-24rpx" />
          <view class="text-gray-light">
            {{ itemData.availableAt }} 到期
          </view>
        </view>
        <view v-if="valuableCount > 0" class="w-44rpx h-44rpx flex-shrink-0">
          <image src="@/static/images/icons/ic_qr.png" class="w-full h-full" @click="openPopup(itemData)" />
        </view>
      </view>
      <!-- 券号、使用日期 -->
      <view v-for="item in itemData.verificationCode" :key="item.id" class="flex items-center justify-between mt-32rpx">
        <view class="text-40rpx font-600" :class="item.status === 1 ? 'line-through text-gray-light' : ''">
          {{ item.code }}
        </view>
        <view v-if="item.status === 1" class="text-gray-light">
          {{ item.updatedAt }}
        </view>
      </view>
    </view>

    <!-- 订单信息 -->
    <view class="mx-32rpx bg-white mt-32rpx rounded-24rpx py-32rpx leading-none text-gray-light">
      <view class="h-80rpx flex justify-between items-center px-32rpx">
        <view>订单编号</view>
        <view class="flex items-center">
          {{ itemData.orderNumber }}<text class="ml-15rpx">
            |
          </text>
          <view class="pl-15rpx text-primary" hover-class="opacity-80" hover-start-time="0" hover-stay-time="30" @click="handleCopy">
            复制
          </view>
        </view>
      </view>

      <view class="h-80rpx flex justify-between items-center px-32rpx">
        <view>下单时间</view>
        <view class="flex items-center">
          {{ itemData.createdAt }}
        </view>
      </view>

      <view class="h-80rpx flex justify-between items-center px-32rpx">
        <view>订单状态</view>
        <!-- 未支付时，文字黑色 -->
        <view class="flex items-center" :class="isUnPaid ? 'text-black' : ''">
          {{ OrderStatus[itemData.status] }}
        </view>
      </view>

      <!-- 待支付订单不显示 -->
      <view v-if="itemData.status !== OrderStatus['待支付']" class="h-80rpx flex justify-between items-center px-32rpx">
        <view>支付时间</view>
        <view class="flex items-center">
          {{ itemData.paidAt }}
        </view>
      </view>
    </view>

    <!-- 购买须知 -->
    <view class="bg-white mx-32rpx rounded-24rpx px-30rpx py-32rpx mt-32rpx">
      <view class=" font-600 text-32rpx">
        购买须知
      </view>

      <view class="text-gray-light leading-normal mt-32rpx">
        <view>1、购买须知1，购买须知1购买须知1</view>
        <view>2、须知2须知2须知2须知2须知2须知2须知2须知2须知2须知2</view>
      </view>
    </view>

    <sc-popup-qr-code v-model="showPopup" :qr-code-image="qrCodeImageUrl" :item-data="itemData" />
    <!-- 弹框方式无法生成二维码，画布对象需在外部定义 -->
    <canvas
      :id="canvasId"
      :style="{ width: `520px`, height: `520px`, position: 'fixed', top: '200vh', left: '200vw' }"
      :canvas-id="canvasId"
    />

    <view v-if="isUnPaid" class="submit-bar fixed bg-white left-0 right-0 bottom-0 px-32rpx pt-16rpx flex items-center justify-between">
      <view>
        合计：<text class="text-error">
          ¥
        </text><text class="text-32rpx text-error font-600">
          {{ itemData.price || 0 }}
        </text>
      </view>

      <view>
        <sc-button :background="ERROR_COLOR" width="160rpx" height="80rpx" radius="80rpx" @click="() => route({ url: `/pages/order/success/index?id=${itemData.id}`, mode: 'redirectTo' })">
          <text class="font-bold">
            支付
          </text>
        </sc-button>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: $uni-bg-color-grey;
}
.order-detail {
  padding-bottom: calc(142rpx + env(safe-area-inset-bottom, 0));
  &__banner {
    // #ifndef H5
    top: 0;
    // #endif
    // #ifdef H5
    top: calc(44px + env(safe-area-inset-top, 0))
    // #endif
  }

  .submit-bar {
    padding-bottom: calc(16rpx + env(safe-area-inset-bottom, 0));
  }
}
</style>
