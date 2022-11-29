<script setup lang="ts" name="home-page">
import { useCategory } from '../composables/category'
import { route } from '@/utils'
import { PRODUCT_LIST } from '$/product'

const { handlePageScroll, scrollTop, opacity: navBarOpacity } = useScroll()
const { handlePulldownRefresh } = useHooks()

const appStore = useSetupAppStore()
const { catesList } = useCategory()

const navBarPaddingLeft = ref(0)
const navBarHeight = ref((appStore.getSystemInfo().statusBarHeight || 0) + 44)
// #ifdef MP
navBarPaddingLeft.value = uni.getMenuButtonBoundingClientRect().width || 0
// #endif

const tabsList = [{ name: '推荐1' }, { name: '推荐2' }, { name: '推荐3' }, { name: '推荐4' }, { name: '推荐5' }]
const currentTab = ref(0)
function onTabChange(event: { index: number }) {
  currentTab.value = event.index
}

const bannersList = computed(() => {
  return PRODUCT_LIST.slice(7)
})

onPageScroll(handlePageScroll)
onPullDownRefresh(handlePulldownRefresh)
</script>

<template>
  <view class="home-page">
    <sc-nav-bar :fixed="true" :safe-area-inset-top="true" :bg-color="`rgba(255,255,255,${navBarOpacity})`" left-icon=" " :title-style="{ width: '100vw' }" :status-bar-height="appStore.getSystemInfo().statusBarHeight">
      <view class="flex items-center w-full pl-32rpx pr-20rpx">
        <view class="mr-16rpx flex-shrink-0 text-36rpx font-600">
          汽车护养商城
        </view>
        <view class="flex items-center text-gray-light bg-white h-60rpx flex-1 border border-black-dark border-opacity-8 rounded-60rpx px-17rpx box-border" :style="{ marginRight: `${navBarPaddingLeft}px` }" @click="route('/pages/product/index/index')">
          <image class="w-32rpx h-32rpx mr-8rpx" src="@/static/images/icons/ic_search.png" />
          洗护
        </view>
      </view>
    </sc-nav-bar>

    <!-- 轮播图 -->
    <view class="banner relative">
      <view class="absolute left-0 right-0 bottom-0 h-320rpx">
        <swiper indicator-dots autoplay :interval="6000" circular indicator-active-color="#385affcc" class="h-full">
          <swiper-item v-for="item in bannersList" :key="item.id">
            <view class="w-full h-full px-32rpx rounded-24rpx overflow-hidden box-border">
              <image :src="item.cover" class="w-full h-full rounded-24rpx" mode="aspectFill" @click="route(`/pages/product/detail/index?id=${item.id}`)" />
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>

    <!-- 入口列表 -->
    <view class="flex items-center justify-between px-32rpx my-32rpx">
      <view v-for="item in catesList" :key="item.value" @click="route(item.page)">
        <view class="w-112rpx h-112rpx mb-16rpx">
          <image :src="item.icon" class="w-full h-full" />
        </view>
        <view class="text-center font-500">
          {{ item.name }}
        </view>
      </view>
    </view>

    <!-- 分类菜单 -->
    <sc-tabs slider-height="0" is-sticky :top="navBarHeight" background-color="#f8f8f8" color="#666666" selected-color="#333333" bold scroll :tabs="tabsList" :current="currentTab" @change="onTabChange" />

    <!-- 间隔 -->
    <view class="py-16rpx" />
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
  background-color: $uni-bg-color-grey;
}

.home-page {
  padding-bottom: calc(env(safe-area-inset-bottom, 0) + 140rpx);

  .banner {
    height: calc(440rpx + env(safe-area-inset-top, 0));
    background: linear-gradient(180deg, #D8E5FF 0%, rgba(217, 217, 217, 0) 100%);
  }
}
</style>
