<script setup lang="ts" name="product-index">
// 商品搜索页

import scSearchProduct from '../components/sc-search-product/sc-search-product.vue'
import { route } from '@/utils'

import type { ProductObj } from '#/index'
import { getProductsByKeyword } from '@/apis/product'
import type { LoadMoreStatus } from '@/components/sc-load-more/types'

const { handlePageScroll, scrollTop } = useScroll()
const { handlePulldownRefresh } = useHooks()
const orderStore = useSetupOrderStore()

const search = ref('')

const itemsList = ref<ProductObj[]>([])
const pageLoadingStatus = ref<LoadMoreStatus>('no-more')

function onSearch() {
  itemsList.value = []
  pageLoadingStatus.value = 'loading'
  setTimeout(() => {
    pageLoadingStatus.value = 'no-more'
    itemsList.value = getProductsByKeyword(search.value)
  }, 801)
}

/**
 * 立即购买 */
function handleBuyNow(product: ProductObj) {
  orderStore.setCheckoutData({ product, quality: 1 })
  route('/pages/order/checkout/index')
}

onPageScroll(handlePageScroll)

onPullDownRefresh(() => {
  itemsList.value = []
  pageLoadingStatus.value = 'no-more'
  search.value = ''

  handlePulldownRefresh()
})
</script>

<template>
  <view class="product-index pb-safe-40">
    <view>
      <view class="fixed product-index__search left-0 right-0 z-2 p-32rpx flex items-center bg-white">
        <view class="mr-14rpx rounded-60rpx h-60rpx w-full border border-2rpx border-opacity-8 border-black box-border px-20rpx flex items-center">
          <view class="mr-10rpx flex-shrink-0">
            <image src="@/static/images/icons/ic_search.png" class="w-32rpx h-32rpx" />
          </view>
          <input v-model="search" placeholder="请输入搜索关键词，如：车" placeholder-class="text-gray-light text-28rpx" class="text-28rpx flex-1">
        </view>

        <view class="flex-shrink-0">
          <sc-button width="116rpx" height="60rpx" radius="60rpx" size="28" @click="onSearch">
            搜索
          </sc-button>
        </view>
      </view>

      <view class="w-full h-132rpx" />
    </view>

    <view class="bg-white mt-32rpx">
      <sc-search-product v-for="item in itemsList" :key="item.id" :item-data="item" :keyword="search" @buy-now="handleBuyNow" @detail="(product: ProductObj) => route(`/pages/product/detail/index?id=${product.id}`)" />
    </view>

    <template v-if="pageLoadingStatus === 'no-more' && itemsList.length === 0">
      <sc-empty text="空空如也～" mode="no-result" margin-top="200" />
    </template>
    <template v-else>
      <sc-load-more :status="pageLoadingStatus" />
    </template>

    <sc-scroll-top :scroll-top="scrollTop" />
  </view>
</template>

<style lang="scss" scoped>
page {
  background-color: $uni-bg-color-grey;
}
.product-index {
  &__search {
    // #ifndef H5
    top: 0;
    // #endif
    // #ifdef H5
    top: calc(44px + env(safe-area-inset-top, 0))
    // #endif
  }
}
</style>
