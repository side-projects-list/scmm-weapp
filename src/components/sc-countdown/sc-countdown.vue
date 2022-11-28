<script setup lang="ts" name="sc-countdown">
// 倒计时组件

import { onBeforeMount, onBeforeUnmount } from 'vue'
import { countdownProps } from './props'

const props = defineProps({
  ...countdownProps,
})

const emits = defineEmits<{
  (event: 'end'): void
}>()

/** 定时器 */
const timer = ref<NodeJS.Timer | undefined>(undefined)
const day = ref('0')
const hour = ref('00')
const minute = ref('00')
const second = ref('00')
const animation = ref(false)

watch(() => props.time, () => {
  clearTimer()
  doCountdown()
})

function clearTimer() {
  clearInterval(timer.value)
  timer.value = undefined
}

function handleCountdownEnd(isStop = false) {
  animation.value = false
  clearTimer()
  if (!isStop)
    emits('end')
}

function doCountdown() {
  let seconds = Number(props.time || 0)
  animation.value = true
  handleCountdown(seconds)
  timer.value = setInterval(() => {
    seconds--
    if (seconds < 0) {
      handleCountdownEnd()
      return
    }

    handleCountdown(seconds)
  }, 1000)
}

/** 处理剩余时间 */
function handleCountdown(seconds: number) {
  let [d, h, m, s] = [0, 0, 0, 0]

  if (seconds > 0) {
    d = props.days ? Math.floor(seconds / (60 * 60 * 24)) : 0
    h = props.hours ? Math.floor(seconds / (60 * 60)) - d * 24 : 0
    m = props.minutes ? (Math.floor(seconds / 60) - h * 60 - d * 24 * 60) : 0
    s = Math.floor(seconds) - d * 24 * 60 * 60 - h * 60 * 60 - m * 60
  }

  day.value = String(d)
  hour.value = h < 10 ? `0${h}` : `${h}`
  minute.value = m < 10 ? `0${m}` : `${m}`
  second.value = s < 10 ? `0${s}` : `${s}`
}

onBeforeMount(() => {
  clearTimer()

  if (Number(props.time || 0) > 0)
    doCountdown()
})

onBeforeUnmount(() => {
  clearTimer()
})
</script>

<template>
  <view class="sc-countdown flex items-center">
    <view
      v-if="days"
      class="sc-countdown__item"
      :style="{ background: backgroundColor, borderColor }"
    >
      <view
        class="sc-countdown__item-time" :class="[scale ? 'sc-countdown-scale' : '']"
        :style="{ fontSize: `${size}rpx`, color, lineHeight: `${size}rpx` }"
      >
        {{ day }}
      </view>
    </view>
    <view
      v-if="days" class="sc-countdown__colon"
      :class="{ 'sc-countdown__colon-pad p-0': borderColor === 'transparent' }" :style="{ lineHeight: `${colonSize}rpx`, fontSize: `${colonSize}rpx`, color: colonColor }"
    >
      {{ isColon ? ':' : '天' }}
    </view>

    <view
      v-if="hours"
      class="sc-countdown__item"
      :style="{ background: backgroundColor, borderColor }"
    >
      <view
        class="sc-countdown__item-time" :class="[scale ? 'sc-countdown-scale' : '']"
        :style="{ fontSize: `${size}rpx`, color, lineHeight: `${size}rpx` }"
      >
        {{ hour }}
      </view>
    </view>
    <view
      v-if="hours" class="sc-countdown__colon"
      :class="{ 'sc-countdown__colon-pad p-0': borderColor === 'transparent' }" :style="{ lineHeight: `${colonSize}rpx`, fontSize: `${colonSize}rpx`, color: colonColor }"
    >
      {{ isColon ? ':' : '时' }}
    </view>

    <view
      v-if="minutes"
      class="sc-countdown__item"
      :style="{ background: backgroundColor, borderColor }"
    >
      <view
        class="sc-countdown__item-time" :class="[scale ? 'sc-countdown-scale' : '']"
        :style="{ fontSize: `${size}rpx`, color, lineHeight: `${size}rpx` }"
      >
        {{ minute }}
      </view>
    </view>
    <view
      v-if="minutes" class="sc-countdown__colon"
      :class="{ 'sc-countdown__colon-pad p-0': borderColor === 'transparent' }" :style="{ lineHeight: `${colonSize}rpx`, fontSize: `${colonSize}rpx`, color: colonColor }"
    >
      {{ isColon ? ':' : '分' }}
    </view>

    <view
      v-if="seconds"
      class="sc-countdown__item"
      :style="{ background: backgroundColor, borderColor }"
    >
      <view
        class="sc-countdown__item-time" :class="[scale ? 'sc-countdown-scale' : '']"
        :style="{ fontSize: `${size}rpx`, color, lineHeight: `${size}rpx` }"
      >
        {{ second }}
      </view>
    </view>
    <view
      v-if="seconds && !isColon" class="sc-countdown__colon"
      :class="{ 'sc-countdown__colon-pad p-0': borderColor === 'transparent' }"
      :style="{ lineHeight: `${colonSize}rpx`, fontSize: `${colonSize}rpx`, color: colonColor }"
    >
      {{ unitEn ? 's' : '秒' }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
//.sc-countdown {}
</style>
