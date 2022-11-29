<script setup lang="ts" name="order-index">
// 订单列表页

import scOrder from '../components/sc-order/sc-order.vue'
import { route } from '@/utils'
import { OrderStatus } from '@/enums'
import type { OrderObj, TabItemObj } from '#/index'

const {
  openPopup,
  showPopup,
  canvasId,
  qrCodeImageUrl,
} = usePopupQrCode()

/** 滚动区域高度 */
let scrollViewHeight = 'height:calc(100vh - 80rpx - env(safe-area-inset-bottom, 0));background: #F8F8F8;'
// #ifdef H5
scrollViewHeight = 'height:calc(100vh - 80rpx - 44px - 100rpx - env(safe-area-inset-bottom, 0) - env(safe-area-inset-top, 0));background: #F8F8F8;'
// #endif
/** 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值 */
const tabsList = ref<TabItemObj<OrderObj[], OrderStatus>[]>([
  {
    name: '全部',
    triggered: false,
    _freshing: false,
    loadingStatus: 'load-more',
    value: OrderStatus['全部'],
    itemsList: [],
  },
  {
    name: '待支付',
    triggered: false,
    _freshing: false,
    loadingStatus: 'load-more',
    value: OrderStatus['待支付'],
    itemsList: [],
  }, {
    name: '待使用',
    triggered: false,
    _freshing: false,
    loadingStatus: 'load-more',
    value: OrderStatus['待使用'],
    itemsList: [],
  },
  {
    name: '已完成',
    triggered: false,
    _freshing: false,
    loadingStatus: 'load-more',
    value: OrderStatus['已完成'],
    itemsList: [],
  },
  {
    name: '已取消',
    triggered: false,
    _freshing: false,
    loadingStatus: 'load-more',
    value: OrderStatus['已取消'],
    itemsList: [],
  },
])

const {
  current,
  swiperCurrent,
  uTabs,
  tabsChange,
  transition,
  animationFinish,
  onReachBottom,
  onRefresh,
  onRestore,
  loadData,
} = useSwiperTabs({ loadFn: getOrdersByStatus, tabsList })

/** 订单详情 */
function handleDetail(orderId: number) {
  route(`/pages/order/detail/index?id=${orderId}`)
}

function handlePay(orderId: number) {
  route(`/pages/order/success/index?id=${orderId}`)
}

onLoad(async () => {
  await loadData(current.value)
})
</script>

<template>
  <view class="order-index">
    <sc-swiper-tabs ref="uTabs" :border="true" :list="tabsList" :current="current" inactive-color="#333" :is-scroll="false" swiper-width="750" @change="tabsChange" />

    <swiper :current="swiperCurrent" :style="scrollViewHeight" @transition="transition" @animationfinish="animationFinish">
      <swiper-item v-for="(tab, index) in tabsList" :key="index" class="swiper-item">
        <scroll-view
          scroll-y
          enable-passive
          scroll-with-animation
          :style="scrollViewHeight"
          :refresher-enabled="true"
          :refresher-triggered="tab.triggered"
          :refresher-threshold="100"
          @scrolltolower="onReachBottom"
          @refresherrefresh="onRefresh"
          @refresherrestore="onRestore"
        >
          <sc-order v-for="item in tab.itemsList" :key="item.id" :item-data="item" @view-coupon="openPopup" @detail="handleDetail" @pay="handlePay" />

          <template v-if="tab.loadingStatus === 'no-more' && tab.itemsList.length === 0">
            <sc-empty mode="no-data" margin-top="200" text="空空如也~" />
          </template>
          <template v-else>
            <sc-load-more :status="tab.loadingStatus" />
          </template>
          <view class="pb-safe-40" />
        </scroll-view>
      </swiper-item>
    </swiper>

    <sc-popup-qr-code v-model="showPopup" :qr-code-image="qrCodeImageUrl" />
    <!-- 弹框方式无法生成二维码，画布元素需在外部定义 -->
    <canvas
      :id="canvasId"
      :style="{ width: `520px`, height: `520px`, position: 'fixed', top: '200vh', left: '200vw' }"
      :canvas-id="canvasId"
    />
  </view>
</template>

<style lang="scss">
page {
  background-color: $uni-bg-color-grey;
}
//.order-index {}
</style>
