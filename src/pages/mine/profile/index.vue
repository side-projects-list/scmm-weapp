<script setup lang="ts" name="profile-index">
// 个人信息编辑页

import { hideSensitive } from '@/utils'
import { DEFAULT_AVATAR, PRIMARY_COLOR } from '@/constants'
const userStore = useSetupUserStore()

// https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/userProfile.html
const canUseChooseAvatar = ref(uni.canIUse('button.open-type.chooseAvatar'))
// #ifdef H5 || APP-PLUS
canUseChooseAvatar.value = false
// #endif

const showPopup = ref(false)

/**
 * @param data.detail.avatarUrl 临时路径
 */
function handleChooseAvatar(data: { detail: { avatarUrl: string } }) {
  userStore.updateUserInfo('avatar', data.detail.avatarUrl)
}

function handleChangeAvatar() {
  // #ifdef MP-WEIXIN
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    sizeType: ['compressed'],
    success: (res) => {
      userStore.updateUserInfo('avatar', res.tempFiles[0].tempFilePath)
    },
    fail: (err) => {
      if (err && err.errMsg) {
        if (!err.errMsg.includes('cancel'))
          uni.showToast({ title: err.errMsg, icon: 'none' })
      }
    },
  })
  // #endif

  // #ifndef MP-WEIXIN
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    success: (res) => {
      userStore.updateUserInfo('avatar', res.tempFilePaths[0])
    },
    fail: (err) => {
      if (err && err.errMsg) {
        if (!err.errMsg.includes('cancel'))
          uni.showToast({ title: err.errMsg, icon: 'none' })
      }
    },
  })
  // #endif
}

function togglePopup() {
  showPopup.value = !showPopup.value
}

/**
 *
 * @param data data: {detail: {value: Record<string, any>}}
 */
function onSubmit(data: any) {
  const { nickname } = data.detail.value
  if (nickname.length === 0)
    return uni.showToast({ title: '请输入昵称！', icon: 'none' })

  userStore.updateUserInfo('nickname', nickname)
  togglePopup()
}

/** @todo */
function handleLogin() {}
</script>

<template>
  <view class="profile-index pt-32rpx">
    <view class="px-32rpx bg-white text-32rpx">
      <view class="flex items-center justify-between py-20rpx">
        <view class="text-gray-light">
          头像
        </view>
        <view class="avatar reset-button">
          <button v-if="canUseChooseAvatar" open-type="chooseAvatar" @chooseavatar="handleChooseAvatar">
            <view class="w-112rpx h-112rpx flex items-center justify-center">
              <image v-if="userStore.getUserInfo()?.avatar" class="w-full h-full rounded-112rpx" :src="userStore.getUserInfo()!.avatar" mode="aspectFill" />
              <image v-else :src="DEFAULT_AVATAR" mode="aspectFill" class="w-96rpx h-96rpx rounded-circle" />
            </view>
          </button>
          <!-- 兼容不支持 chooseAvatar 类型 -->
          <view v-else @click="handleChangeAvatar">
            <view class="w-112rpx h-112rpx flex items-center justify-center">
              <image v-if="userStore.getUserInfo()?.avatar" class="w-full h-full rounded-112rpx" :src="userStore.getUserInfo()!.avatar" mode="aspectFill" />
              <image v-else :src="DEFAULT_AVATAR" mode="aspectFill" class="w-96rpx h-96rpx rounded-circle" />
            </view>
          </view>
        </view>
      </view>

      <view class="flex items-center justify-between py-34rpx" @click="togglePopup">
        <view class="text-gray-light">
          昵称
        </view>
        <view class="flex items-center text-black">
          {{ userStore.getUserInfo()?.nickname || '' }}
          <sc-icon name="arrow-right" size="20" />
        </view>
      </view>

      <view class="flex items-center justify-between py-34rpx">
        <view class="text-gray-light">
          手机号
        </view>
        <view class="flex items-center reset-button">
          <sc-button border-color="transparent" height="50rpx" plain open-type="getPhoneNumber" @getphonenumber="handleLogin">
            <text class="text-32rpx text-black">
              {{ hideSensitive(userStore.getUserInfo()?.phone || '') }}
            </text>
          </sc-button>
        </view>
      </view>
    </view>

    <sc-popup v-model="showPopup" radius="24rpx">
      <view class="modal-content w-500rpx p-32rpx box-border rounded">
        <form @submit="onSubmit" @reset="togglePopup">
          <view class="text-38rpx font-500 text-center ">
            编辑昵称
          </view>
          <view class="py-60rpx">
            <input :value="userStore.getUserInfo()?.nickname" name="nickname" type="nickname" placeholder="请输入昵称">
          </view>
          <view class="flex items-center justify-between">
            <sc-button height="72rpx" width="208rpx" background="#c8c8c8" form-type="reset" radius="72rpx">
              <text class="font-500 text-32rpx text-white leading-72rpx">
                取消
              </text>
            </sc-button>
            <sc-button height="72rpx" width="208rpx" :background="PRIMARY_COLOR" form-type="submit" radius="72rpx">
              <text class="font-500 text-32rpx text-white leading-72rpx">
                保存
              </text>
            </sc-button>
          </view>
        </form>
      </view>
    </sc-popup>
  </view>
</template>

<style lang="scss" scoped>
.profile-index {
  .avatar.reset-button :deep(button) {
    width: 112rpx !important;
    border-radius: 50%;
    outline: none;
    padding: 0;
  }
}
</style>
