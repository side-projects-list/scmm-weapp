<script setup lang="ts" name="sc-nav-bar">
// 导航栏
// 如果设置 safeAreaInsetTop 为 true，则须显式传入 statusBarHeight 属性(通过 uni.getSystemInfoSync 获取)
// @example: <sc-nav-bar fixed placeholder title="标题标题标题标题标题标题标题标题" :status-bar-height="0" />

import { navBarProps } from './props'
import { tryNavigateBack } from '@/utils/route'

const props = defineProps({
  ...navBarProps,
})

const emits = defineEmits<{
  (event: 'leftClick'): void
  (event: 'rightClick'): void
}>()

const navBarHeight = `${Number(props.height) + props.statusBarHeight}px`

function leftClick() {
  emits('leftClick')

  if (props.autoBack)
    tryNavigateBack()
}

function rightClick() {
  emits('rightClick')
}
</script>

<template>
  <view class="sc-nav-bar">
    <!-- 占位元素 -->
    <view v-if="fixed && placeholder" class="sc-nav-bar__placeholder w-100vw" :style="{ height: navBarHeight }" />

    <!-- 导航栏内容 -->
    <view :class="[fixed ? 'fixed top-0 right-0 left-0 z-10' : '']">
      <!-- 状态栏 -->
      <view v-if="safeAreaInsetTop" :style="{ background: bgColor, height: `${statusBarHeight}px` }" />

      <!-- height -->
      <view class="sc-nav-bar__content relative flex h-44px flex-row items-center justify-center" :class="[border ? 'border-b-1rpx border-opacity-10 border-black' : '']" :style="{ height: `${height}px`, background: bgColor }">
        <!-- 左侧区域 -->
        <view class="sc-nav-bar__content__left absolute top-0 bottom-0 left-0 flex py-26rpx flex-row items-center px-10rpx" hover-class="opacity-70" hover-start-time="150" @click="leftClick">
          <slot name="left">
            <sc-icon v-if="leftIcon" :name="leftIcon" :size="leftIconSize" :color="leftIconColor" />
            <text v-if="leftText" :style="{ color: leftIconColor }" class="ml-6rpx text-30rpx">
              {{ leftText }}
            </text>
          </slot>
        </view>

        <!-- 中间区域（标题） -->
        <slot>
          <text class="sc-nav-bar__content__title line-clamp-1 text-32rpx text-center text-black" :style="{ width: `${titleWidth}rpx`, ...titleStyle }">
            {{ title }}
          </text>
        </slot>

        <!-- 右侧区域 -->
        <view v-if="$slots.right || rightIcon || rightText" class="sc-nav-bar__content__right absolute top-0 bottom-0 flex py-26rpx flex-row items-center right-0 px-10rpx" @click="rightClick">
          <slot name="right">
            <sc-icon v-if="rightIcon" :name="rightIcon" size="40" />
            <text v-if="rightText" class="sc-nav-bar__content__right ml-6rpx text-30rpx">
              {{ rightText }}
            </text>
          </slot>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//.sc-nav-bar {}
</style>
