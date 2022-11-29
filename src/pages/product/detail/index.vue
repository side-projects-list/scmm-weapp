<script setup lang="ts" name="product-detail">
// 商品详情页
import scSubmitBar from '../components/sc-submit-bar/sc-submit-bar.vue'
import { route, toast, tryNavigateBack } from '@/utils'
import { ERROR_COLOR } from '@/constants'

import { getProductById } from '@/apis'
import type { ProductObj } from '#/index'

const { handlePageScroll, scrollTop, opacity: navBarOpacity } = useScroll(750)
const { handlePulldownRefresh } = useHooks()

const appStore = useSetupAppStore()
const orderStore = useSetupOrderStore()

/** 商品id */
const productId = ref(0)
/** 商品对象 */
const itemData = ref<ProductObj>()
/** 当前轮播图索引 */
const current = ref(0)

/** 处理轮播图切换事件 */
function handleSwiperChange(data: { detail: { current: number; currentItemId: string; source: 'autoplay' | 'touch' } }) {
  current.value = data.detail.current
}

/** 购买商品数量 */
const quantity = ref(1)
/** 更改购买数量 */
function onValueChange(data: { value: number; type: 'plus' | 'reduce' | 'blur'; index: number; custom: number | string }) {
  quantity.value = data.value
}
/** 计算总价 */
const totalPrice = computed(() => {
  return {
    currentPrice: quantity.value * (itemData.value?.price || 0),
    originPrice: quantity.value * (itemData.value?.originPrice || 0),
  }
})

function handlePreview(index: number) {
  uni.previewImage({
    urls: itemData.value?.images || [],
    current: index,
  })
}

/** 提交订单 */
function handleSubmit() {
  orderStore.setCheckoutData({ quality: quantity.value, product: itemData.value! })
  route('/pages/order/checkout/index')
}

/**
 * 处理文字两端对齐
 *
 * iOS真机 `text-align-last`、`text-align`不生效
 */
function splitLabel(text: string) {
  const nodes = text.split('').map(i => `<span>${i}</span>`).join('')
  let result = `<p class="flex items-center justify-between">${nodes}</p>`
  result = result.replace(/uno-\w+\s/g, '')
  return result
}

/** 加载商品数据 */
function loadData() {
  itemData.value = getProductById(productId.value)
}

onLoad((options) => {
  const { id } = options!
  if (!Number(id)) {
    toast('无效商品')
    setTimeout(() => {
      tryNavigateBack()
    }, 1501)

    return
  }

  productId.value = Number(id)

  loadData()
})

onPageScroll(handlePageScroll)
onPullDownRefresh(handlePulldownRefresh)
</script>

<template>
  <view class="product-detail">
    <sc-nav-bar :fixed="true" :bg-color="`rgba(255,255,255,${navBarOpacity})`" :title="itemData?.name" :title-style="{ fontSize: '32rpx', fontWeight: 500, color: `rgba(0,0,0,${navBarOpacity})` }" :status-bar-height="appStore.getSystemInfo().statusBarHeight" @left-click="tryNavigateBack">
      <template #left>
        <view class="rounded-50rpx w-40rpx h-40rpx border-1rpx flex items-center justify-center" :style="{ borderColor: `rgba(255,255,255,${1 - navBarOpacity})` }">
          <sc-icon name="arrow-left" size="40" :bold="false" />
        </view>
      </template>
    </sc-nav-bar>

    <!-- 轮播图 -->
    <view class="relative">
      <swiper autoplay :current="current" :interval="6000" circular class="w-full h-750rpx" @change="handleSwiperChange">
        <swiper-item v-for="(item, index) in itemData?.images" :key="index" class="w-full h-750rpx">
          <view class="w-full h-750rpx">
            <image :src="item" mode="aspectFill" class="w-full h-full" @click="handlePreview(index)" />
          </view>
        </swiper-item>
      </swiper>

      <view v-if="itemData!.images?.length > 0" class="absolute right-32rpx bottom-20rpx bg-opacity-50 bg-black-dark h-32rpx leading-32rpx text-white rounded-32rpx px-14rpx text-24rpx">
        {{ current + 1 }}/{{ itemData?.images.length }}
      </view>
    </view>

    <!-- 商品说明 -->
    <view class="bg-white mx-32rpx rounded-24rpx p-32rpx box-border mt-32rpx">
      <view class="flex items-end justify-between">
        <view class="text-error text-32rpx font-600">
          ¥<text class="text-56rpx ml-6rpx">
            {{ itemData?.price || 0 }}
          </text>
          <text v-if="itemData?.originPrice" class="ml-16rpx line-through text-gray-light font-400">
            ¥{{ itemData.originPrice }}
          </text>
        </view>
        <view class="text-24rpx text-gray-light">
          库存{{ itemData?.stock || 0 }}件
        </view>
      </view>

      <view class="font-500 text-36rpx mt-24rpx">
        {{ itemData?.name || '' }}
      </view>

      <view v-if="itemData?.description" class="text-gray-light mt-8rpx">
        {{ itemData.description }}
      </view>

      <view class="text-24rpx text-error mt-16rpx flex">
        距离结束还剩
        <sc-countdown :time="112259" days border-color="transparent" :colon-color="ERROR_COLOR" :color="ERROR_COLOR" background-color="transparent" :is-colon="false" :size="24" :colon-size="24" @end="() => {}" />
      </view>

      <view class="pt-30rpx border-t-2rpx border-gray-200 flex items-center justify-between mt-20rpx">
        <view class="text-black-dark">
          购买数量<text v-if="itemData?.maxPurchaseQuantity" class="text-20rpx">
            （限购{{ itemData.maxPurchaseQuantity }}件）
          </text>
        </view>
        <view class="border-2rpx rounded-24rpx border-gray-200 ">
          <sc-number-box :value="quantity" :min="1" :max="itemData?.maxPurchaseQuantity ? itemData.maxPurchaseQuantity : itemData?.stock" icon-color="#333" background-color="transparent" @change="onValueChange" />
        </view>
      </view>
    </view>

    <!-- 单品类型细节 -->
    <view class="mx-32rpx mt-32rpx bg-white rounded-24rpx p-32rpx box-border leading-none">
      <view class="flex items-start py-20rpx">
        <view class="flex-shrink-0 w-120rpx specific-label mr-60rpx">
          <rich-text :nodes="splitLabel('限购')" />
        </view>
        <view>{{ itemData?.maxPurchaseQuantity ? '限购' : '不限购' }}</view>
      </view>
      <view class="flex items-start py-20rpx">
        <view class="flex-shrink-0 w-120rpx specific-label mr-60rpx">
          <rich-text :nodes="splitLabel('有效期')" />
        </view>
        <view>购买后180天有效</view>
      </view>
      <view class="flex items-start py-20rpx">
        <view class="flex-shrink-0 w-120rpx specific-label mr-60rpx">
          <rich-text :nodes="splitLabel('适用门店')" />
        </view>
        <view>5家门店适用</view>
      </view>
    </view>

    <view class="text-center mt-48rpx">
      <text class="text-gray-light">
        —
      </text> 商品详情 <text class="text-gray-light">
        —
      </text>
    </view>
    <view class="product-content mx-32rpx mt-32rpx bg-white rounded-24rpx overflow-hidden">
      <rich-text :nodes="itemData?.content || ''" />
    </view>

    <sc-submit-bar show-button-price :price-data="totalPrice" button-text="限时抢购" action-text="咨询" @submit="handleSubmit" />
    <sc-scroll-top :scroll-top="scrollTop" :bottom="240" />
  </view>
</template>

<style lang="scss">
page {
  background-color: $uni-bg-color-grey;
}
.product-detail {
  padding-bottom: calc(env(safe-area-inset-bottom, 0) + 168rpx);

  .product-content, rich-text {
    img, image {
      width: 100%;
    }
  }
}
</style>
