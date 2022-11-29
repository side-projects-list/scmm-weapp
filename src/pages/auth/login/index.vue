<script setup lang="ts" name="login-index">
// 登录页

import { LOGIN_CAPTCHA_CODE, PRIMARY_COLOR } from '@/constants'
import { afterLoginRouteMode, isPhone, route } from '@/utils'

const appStore = useSetupAppStore()
const userStore = useSetupUserStore()

const navBarHeight = (appStore.getSystemInfo().statusBarHeight || 0) + uni.upx2px(88)
const itemData = ref({
  phone: '',
  captcha: '',
})

/** 重定向 */
const redirect = ref('')

const loading = ref(false)
const disabled = ref(false)

/** 禁用发送验证码按钮 */
const disabledCaptcha = computed(() => String(itemData.value.phone).length === 0)
/** 是否处于验证码倒计时中 */
const isCountDown = ref(false)
/** 已发送验证码次数 */
const sentCaptchaTimes = ref(0)
/** 错误信息 */
const errMsg = ref('')

/** 处于输入状态时，清空错误信息 */
function handleInputChange() {
  errMsg.value = ''
}

/** 发送验证码 */
function handleSendCaptcha() {
  if (!isPhone(itemData.value.phone)) {
    errMsg.value = '请输入有效手机号！'
    return
  }
  isCountDown.value = true
  sentCaptchaTimes.value++
}
/** 倒计时结束 */
function handleCountDownEnd() {
  isCountDown.value = false
}
/** 提交表单 */
function handleSubmit() {
  const { captcha, phone } = itemData.value
  if (!captcha || !phone) {
    errMsg.value = '请输入完表单！'
    return
  }

  if (!isPhone(phone)) {
    errMsg.value = '请输入有效手机号！'
    return
  }

  loading.value = true
  disabled.value = true

  setTimeout(() => {
    loading.value = false
    disabled.value = false

    if (captcha !== LOGIN_CAPTCHA_CODE) {
      errMsg.value = '无效验证码'
      return
    }

    userStore.setToken(`valid_token:${phone}:${new Date().getTime()}`)
    userStore.setUserInfo({ id: 1, phone })

    const url = redirect.value || '/pages/mine/index/index'
    route({
      url,
      mode: afterLoginRouteMode(url),
    })
  }, 1100)
}

onLoad((options) => {
  redirect.value = options?.redirect ? decodeURIComponent(options.redirect) : ''

  redirect.value = redirect.value && !redirect.value.startsWith('/') ? `/${redirect.value}` : redirect.value
})
</script>

<template>
  <view class="login-index">
    <view class="flex items-center" :style="{ paddingTop: `${navBarHeight}px` }">
      <view class="relative w-340rpx h-440rpx">
        <image src="@/static/scmm-logo.png" class="w-full h-full absolute -z-1 -left-42rpx -rotate-0 scale-110" mode="center" />
      </view>

      <view class="leading-none text-black-dark -ml-114rpx text-center">
        <view class="font-500 text-56rpx ">
          欢迎来到SCMM
        </view>
        <view class="text-32rpx mt-16rpx">
          汽车养护商城
        </view>
      </view>
    </view>

    <view class="mx-40rpx rounded-24rpx bg-gray-background h-752rpx box-border -mt-96rpx px-48rpx py-60rpx">
      <view class="text-36rpx font-600">
        账号
      </view>

      <view class="py-32rpx border-b-1rpx border-gray-light border-opacity-30">
        <input v-model="itemData.phone" placeholder-class="text-gray-light" :maxlength="11" type="number" placeholder="请输入手机号" border-bottom background-color="transparent" padding="30rpx 0" :line-left="false" @input="handleInputChange">
      </view>

      <view class="text-36rpx font-600 mt-48rpx">
        验证码
      </view>

      <view class="py-32rpx border-b-1rpx border-gray-light border-opacity-30 flex justify-between">
        <input v-model="itemData.captcha" placeholder-class="text-gray-light" :maxlength="6" type="number" :placeholder="`输入：${LOGIN_CAPTCHA_CODE}`" border-bottom background-color="transparent" padding="30rpx 0" :line-left="false" @input="handleInputChange">

        <sc-button :link="true" plain :disabled="disabledCaptcha || isCountDown" :color="PRIMARY_COLOR" width="200rpx" height="40rpx" @click="handleSendCaptcha">
          <view class="text-right text-32rpx">
            <template v-if="isCountDown">
              <view class="flex items-center text-32rpx">
                <sc-countdown :time="59" :hours="false" :minutes="false" border-color="transparent" :color="PRIMARY_COLOR" background-color="transparent" :size="32" @end="handleCountDownEnd" />s后重发
              </view>
            </template>
            <template v-else>
              {{ sentCaptchaTimes ? '重新发送' : '获取验证码' }}
            </template>
          </view>
        </sc-button>
      </view>

      <view class="mt-64rpx">
        <sc-button radius="60rpx" :background="PRIMARY_COLOR" :loading="loading" :disabled="disabled" @click="handleSubmit">
          <view class="text-36rpx font-600">
            登录
          </view>
        </sc-button>
      </view>

      <view v-if="errMsg" class="text-error text-32rpx text-center px-32rpx line-clamp-2 mt-64rpx">
        {{ errMsg }}
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login-index {
  input {
    outline: none;
    background: transparent;
  }
}
</style>
