<script setup lang="ts" name="order-success">
// 下单成功页
import { ERROR_COLOR, HOME_PAGE_PATH } from '@/constants'
import { route } from '@/utils'
import { PRODUCT_LIST } from '$/index'

const { handlePageScroll, scrollTop } = useScroll()
const { handlePulldownRefresh } = useHooks()

const orderId = ref(4)

onLoad((options) => {
  const { id } = options!
  if (!id) {
    uni.showToast({
      title: '无效单号',
      icon: 'none',
    })

    return uni.navigateBack({})
  }
})

onPageScroll(handlePageScroll)
onPullDownRefresh(handlePulldownRefresh)
</script>

<template>
  <view class="order-success pb-safe-40">
    <view class="bg-white pb-64rpx">
      <view class="pt-64rpx text-center">
        <image src="@/static/images/order/order_success.png" class="w-286rpx h-212rpx" />
      </view>

      <view class="text-success font-600 text-36rpx text-center mt-12rpx">
        支付成功
      </view>

      <view class="mx-32rpx mt-64rpx">
        <sc-button radius="100rpx" height="80rpx" :background="ERROR_COLOR" @click="route(`/pages/order/detail/index?id=${orderId}`)">
          查看订单
        </sc-button>
      </view>
      <view class="mx-32rpx mt-32rpx">
        <sc-button radius="100rpx" height="80rpx" plain color="#333" border-color="#333" @click="route({ url: HOME_PAGE_PATH, mode: 'switchTab' })">
          返回首页
        </sc-button>
      </view>
    </view>

    <!-- 推荐商品 -->
    <view class="m-32rpx font-500 text-36rpx">
      推荐商品
    </view>

    <!-- 商品列表(瀑布流) -->
    <sc-waterfall :items-list="PRODUCT_LIST" :page-size="10" column-gap="22rpx" left-gap="32rpx" right-gap="32rpx">
      <template #left="{ item }">
        <view class="mb-24rpx">
          <sc-product :item-data="item" @detail="route(`/pages/product/detail/index?id=${item.id}`)" />
        </view>
      </template>
      <template #right="{ item }">
        <view class="mb-24rpx">
          <sc-product :item-data="item" @detail="route(`/pages/product/detail/index?id=${item.id}`)" />
        </view>
      </template>
    </sc-waterfall>

    <sc-load-more status="no-more" />
    <sc-scroll-top :scroll-top="scrollTop" />
  </view>
</template>

<style lang="scss">
page {
  background: $uni-bg-color-grey;
}
//.order-success {}
</style>
