<script setup lang="ts" name="mine-index">
// 我的 页面
import { platformDoseNotSupportContact, route, toast } from '@/utils'
import { DEFAULT_AVATAR } from '@/constants'
import { OrderStatus } from '@/enums'

const userStore = useSetupUserStore()
const { handlePulldownRefresh } = useHooks()

/** 订单数据 */
const itemData = ref({
  /** 未支付 */
  unpaid: 0,
  /** 未使用 */
  unused: 0,
})

/** @todo */
function handleNavigation(url: string) {
  return
  // eslint-disable-next-line no-unreachable
  if (!userStore.getToken())
    return toast('请先登录！')

  route({ url, mode: 'switchTab' })
}

function loadData() {
  if (!userStore.getToken()) {
    itemData.value.unpaid = 0
    itemData.value.unused = 0
    return
  }
  itemData.value.unpaid = getOrdersByStatus(OrderStatus['待支付']).length
  itemData.value.unused = getOrdersByStatus(OrderStatus['待使用']).length
}

onLoad(() => {
  loadData()
})

onPullDownRefresh(() => {
  loadData()
  handlePulldownRefresh()
})
</script>

<template>
  <view class="mine-index">
    <!-- 头部内容 -->
    <view class="header h-552rpx relative">
      <view class="header_bg w-full h-full">
        <image src="@/static/images/background/bg_mine.jpeg" class="w-full h-full" />
      </view>

      <view class="absolute top-0 left-0 right-0 bottom-0 box-border pt-190rpx pt-106rpx px-64rpx">
        <!-- 头像/用户名信息 -->
        <view class="header-info flex items-center">
          <view class="w-128rpx h-128rpx rounded-128rpx border border-4rpx border-white bg-gray-bg flex items-center justify-center">
            <image :src="userStore.getUserInfo()?.avatar || DEFAULT_AVATAR" mode="aspectFill" class="w-128rpx h-128rpx rounded-circle" />
          </view>
          <navigator v-if="userStore.getToken()" url="/pages/mine/profile/index" class="text-white ml-20rpx font-500 text-40rpx flex items-center">
            {{ userStore.getUserInfo()?.nickname || '登录用户' }}
            <image src="@/static/images/icons/ic_edit.png" class="w-36rpx h-36rpx ml-16rpx" />
          </navigator>
          <button v-else class="border-0 bg-transparent m-0 p-0" hover-class=" " @click="route('/pages/auth/login/index')">
            <view class="text-white ml-20rpx font-500 text-40rpx">
              请登录
            </view>
          </button>
        </view>

        <!-- 会员/订单入口 -->
        <view class="flex text-white mt-48rpx">
          <view class="mr-80rpx" hover-class="opacity-80" hover-start-time="0" hover-stay-time="30" @click="handleNavigation('/pages/order/index/index?current=1')">
            <view class="text-24rpx leading-none">
              待支付订单
            </view>
            <view class="font-600 text-40rpx mt-16rpx leading-none">
              {{ itemData.unpaid }}
            </view>
          </view>
          <view class="mr-80rpx" hover-class="opacity-80" hover-start-time="0" hover-stay-time="30" @click="handleNavigation('/pages/order/index/index?current=2')">
            <view class="text-24rpx leading-none">
              待使用订单
            </view>
            <view class="font-600 text-40rpx mt-16rpx leading-none">
              {{ itemData.unused }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 列表入口 -->
    <view class="lists-container bg-white rounded-24rpx mx-32rpx mt-30rpx px-32rpx">
      <!-- #ifdef MP-WEIXIN -->
      <button class="border-0 bg-transparent m-0 px-0 py-7rpx" open-type="contact" hover-class=" ">
        <view class="flex items-center justify-between ">
          <view class="flex items-center text-black-dark text-32rpx">
            <image src="@/static/images/icons/ic_chat.png" class="w-48rpx h-48rpx mr-16rpx" />
            联系客服
          </view>
          <image src="@/static/images/icons/ic_arrow_right_gray.png" class="w-32rpx h-32rpx" />
        </view>
      </button>
      <!-- #endif -->
      <!-- #ifndef MP-WEIXIN -->
      <view class="flex items-center justify-between py-30rpx" @click="platformDoseNotSupportContact">
        <view class="flex items-center text-black-dark text-32rpx">
          <image src="@/static/images/icons/ic_chat.png" class="w-48rpx h-48rpx mr-16rpx" />
          联系客服
        </view>
        <image src="@/static/images/icons/ic_arrow_right_gray.png" class="w-32rpx h-32rpx" />
      </view>
      <!-- #endif -->
      <navigator url="/pages/mine/about/index" class="flex items-center justify-between py-30rpx" hover-class=" ">
        <view class="flex items-center text-black-dark text-32rpx">
          <image src="@/static/images/icons/ic_text.png" class="w-48rpx h-48rpx mr-16rpx" />
          关于我们
        </view>
        <image src="@/static/images/icons/ic_arrow_right_gray.png" class="w-32rpx h-32rpx" />
      </navigator>
    </view>

    <view class="mx-32rpx mt-30rpx h-200rpx rounded-24rpx overflow-hidden">
      <image src="@/static/images/mine/mine_jjcsh.jpeg" class="w-full h-full rounded-24rpx" mode="aspectFill" />
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: $uni-bg-color-grey;
}
.mine-index {
  .lists-container :deep(uni-button),
  .header-info :deep(uni-button),
  .lists-container :deep(button),
  .header-info :deep(button) {
    &::after {
      border: 0;
    }
  }
}
</style>
