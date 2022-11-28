<script setup lang="ts" name="sc-button">
// 按钮组件
import { buttonProps } from './props'
import type { ChooseAvatarRes, GetPhoneNumberRes } from '#/index'

const props = defineProps({
  ...buttonProps,
})

const emits = defineEmits<{
  /** 一般点击事件 */
  (event: 'click'): void
  /** 设置openType=”getUserInfo”时点击按钮获取用户信息 */
  (event: 'getuserinfo', e: UniApp.GetUserInfoRes): void
  /** open-type="contact”时点击按钮 */
  (event: 'contact', e: UniApp.CallBackOptions): void
  /** open-type=”getPhoneNumber”时点击按钮获取手机号 */
  (event: 'getphonenumber', e: GetPhoneNumberRes): void
  /** 当使用开放能力时，发生错误的回调 */
  (event: 'error', e: UniApp.CallBackOptions): void
  /** open-type=”openSetting”时点击按钮打开授权设置页 */
  (event: 'opensetting', e: UniApp.CallBackOptions): void
  /** open-type=“chooseAvatar”时点击按钮获取用户头像 */
  (event: 'chooseavatar', e: ChooseAvatarRes): void
}>()

/** 点击按钮开始时间 */
const time = ref(0)
/** 是否点击足够长的时间 */
const trigger = ref(false)
/** 是否点击了按钮 */
const tap = ref(false)

/** 处理点击开始 */
function handleStart() {
  if (props.disabled)
    return

  trigger.value = false
  tap.value = true

  if (new Date().getTime() - time.value <= 150)
    return

  trigger.value = true
  time.value = new Date().getTime()
}

function handleClick() {
  if (props.disabled || !trigger.value)
    return

  time.value = 0
}

function handleTap() {
  if (props.disabled)
    return

  emits('click')
}

function handleEnd() {
  if (props.disabled)
    return

  setTimeout(() => {
    time.value = 0
  }, 150)
}

function handleGetUserInfo({ detail }: { detail: UniApp.GetUserInfoRes }) {
  emits('getuserinfo', detail)
}

function handleContact({ detail }: { detail: UniApp.CallBackOptions }) {
  emits('contact', detail)
}

function handleGetPhoneNumber({ detail }: { detail: GetPhoneNumberRes }) {
  emits('getphonenumber', detail)
}

function handleError({ detail }: { detail: UniApp.CallBackOptions }) {
  emits('error', detail)
}

function handleOpenSetting({ detail }: { detail: UniApp.CallBackOptions }) {
  emits('opensetting', detail)
}

function handleChooseAvatar(detail: ChooseAvatarRes) {
  emits('chooseavatar', detail)
}
</script>

<template>
  <view
    class="relative"
    :style="{ width, height, margin, borderRadius: radius }"
    @touchstart="handleStart"
    @touchend="handleClick"
    @touchcancel="handleEnd"
  >
    <button
      class="sc-button flex items-center justify-center relative overflow-hidden border-width-1rpx px-0 translate-z-0"
      :class="[
        bold ? 'bold' : '',
        time && (plain || link) ? 'opacity-50' : '',
        disabled && !disabledBackground ? 'opacity-50' : '',
        !width || width === '100%' || Boolean(width) ? 'flex-1' : '',
        time && !plain && !link ? 'sc-button__active overflow-hidden' : '',
      ]"
      :style="{
        width,
        height,
        lineHeight: height,
        background: disabled && disabledBackground ? disabledBackground : (plain ? 'transparent' : background),
        borderWidth,
        borderStyle: borderWidth ? 'solid' : 'none',
        borderColor: borderColor ? borderColor : disabled && disabledBackground ? disabledBackground : (link ? 'transparent' : background),
        borderRadius: radius,
        fontSize: `${size}rpx`,
        color: disabled && disabledBackground ? disabledColor : color,
      }"
      :loading="loading"
      :form-type="formType"
      :open-type="openType"
      :disabled="disabled"
      @getuserinfo="handleGetUserInfo"
      @getphonenumber="handleGetPhoneNumber"
      @contact="handleContact"
      @error="handleError"
      @opensetting="handleOpenSetting"
      @chooseavatar="handleChooseAvatar"
      @tap.stop="handleTap"
    >
      <text
        v-if="text && !$slots.default"
        class="text-center p-0 justify-center flex-row items-center"
        :class="{ bold }"
        :style="{ fontSize: `${size}rpx`, lineHeight: `${size}rpx`, color: disabled && disabledBackground ? disabledColor : color }"
      >
        {{ text }}
      </text>
      <slot />
    </button>
  </view>
</template>

<style lang="scss" scoped>
.sc-button {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  &::after {
    border: 0;
  }

  &__active::after {
    content: ' ';
    background-color: rgba($color: #000000, $alpha: 0.1);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transform: none;
    z-index: 1;
    border-radius: 0;
  }
}
</style>
