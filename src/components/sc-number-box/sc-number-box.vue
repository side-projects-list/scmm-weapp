<script setup lang="ts" name="sc-number-box">
// 步进器组件

import { onBeforeMount } from 'vue'
import { numberBoxProps } from './props'
import type { EmitType } from './types'

const props = defineProps({
  ...numberBoxProps,
})

const emits = defineEmits<{
  (event: 'change', e: { value: number; type: EmitType; index: number | string }): void
}>()

/** 输入框绑定值 */
const inputValue = ref(0)

watch(() => props.value, newVal => inputValue.value = +newVal)

function calcScale(val: number, step: number) {
  let scale = 1
  let scaleVal = 1

  if (!Number.isInteger(step))
    scale = 10 ** String(step).split('.')[1].length

  if (!Number.isInteger(val))
    scaleVal = 10 ** String(val).split('.')[1].length

  return Math.max(scale, scaleVal)
}

function calcValue(type: EmitType) {
  if (props.disabled || (inputValue.value === props.min && type === 'reduce') || (inputValue.value === props.max && type === 'add'))
    return

  const scale = calcScale(inputValue.value, props.step)
  let value = inputValue.value * scale
  const step = props.step * scale

  if (type === 'reduce')
    value -= step
  else if (type === 'add')
    value += step

  value = Number((value / scale).toFixed(String(scale).length - 1))

  if (value < props.min)
    value = props.min
  else if (value > props.max)
    value = props.max

  handleChange(value, type)
}

function handleAdd() {
  calcValue('add')
}

function handleReduce() {
  calcValue('reduce')
}

function handleBlur(e: any) {
  // console.log(e.detail, typeof e)
  let { value } = (e as { detail: { value: string } }).detail
  let result: number
  if (value) {
    if (~value.indexOf('.') && Number.isInteger(props.step) && Number.isInteger(Number(value)))
      value = value.split('.')[0]

    result = Number(value)
    if (result > props.max)
      result = props.max
    else if (result < props.min)
      result = props.min
  }
  else {
    result = props.min
  }

  if ((result === Number(props.value) && result !== inputValue.value) || !e.detail.value)
    inputValue.value = result

  handleChange(result, 'blur')
}

function handleChange(value: number, type: EmitType) {
  if (props.disabled)
    return

  emits('change', {
    value,
    type,
    index: props.index,
  })
}

onBeforeMount(() => inputValue.value = +props.value)
</script>

<template>
  <view class="sc-number-box flex items-center">
    <view
      class="sc-number-box__icon__box" :style="{ background: iconBackground, borderRadius: radius }" :class="[disabled || min >= inputValue ? 'sc-disabled opacity-50' : '']"
      @click="handleReduce"
    >
      <slot name="minus">
        <sc-icon class="sc-number-box__icon sc-number-box__icon-reduce px-10rpx" name="minus" :size="`${iconSize}rpx`" :color="iconColor" />
      </slot>
    </view>
    <input
      v-model="inputValue" type="number" :disabled="disabled" class="sc-number-box__input text-center" :style="{ color, fontSize: `${size}rpx`, background: backgroundColor, height: `${height}rpx`, minHeight: `${height}rpx`, width: `${width}rpx` }"
      @blur="handleBlur"
    >
    <view
      class="sc-number-box__icon__box" :style="{ background: iconBackground, borderRadius: radius }" :class="[disabled || inputValue >= max ? 'sc-disabled opacity-50' : '']"
      @click="handleAdd"
    >
      <slot name="plus">
        <sc-icon class="sc-number-box__icon sc-number-box__icon--plus px-10rpx" name="add" :size="`${iconSize}rpx`" :color="iconColor" />
      </slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//.sc-number-box {}
</style>
