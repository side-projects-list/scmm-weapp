<script setup lang="ts" name="sc-popup-qr-code">
// 弹框显示核销二维码

import { popupQrCodeProps } from './props'

const props = defineProps({
  ...popupQrCodeProps,
})

const emits = defineEmits<{
  (event: 'update:modelValue', status: boolean): void
}>()

const visible = ref(false)
const valuableCode = computed(() => props.itemData.verificationCode.find(v => !v.status))

defineExpose({
  open,
  close,
})

function open() {
  emits('update:modelValue', true)
  visible.value = true
}

function close() {
  emits('update:modelValue', false)
  visible.value = false
}

watch(() => props.modelValue, (n) => {
  n ? open() : close()
}, { immediate: true })
</script>

<template>
  <view class="sc-popup-qr-code">
    <sc-popup v-model="visible" radius="24rpx" background-color="transparent" @close="close">
      <view class="bg-white rounded-24rpx w-600rpx box-border px-40rpx pt-66rpx pb-44rpx">
        <view class="text-32rpx font-600 text-black text-center">
          请向收银员出示此核销码
        </view>

        <view class="w-520rpx h-520rpx mt-32rpx">
          <image class="w-full h-full" :src="qrCodeImage" />
        </view>

        <view class="text-56rpx text-black font-600 text-center mt-20rpx" :class="valuableCode && valuableCode.status === 1 ? '!text-gray-light line-through' : ''">
          {{ valuableCode?.code || '' }}
        </view>
      </view>

      <view class="flex justify-center mt-40rpx">
        <sc-icon name="error" size="84rpx" color="white" @click="close" />
      </view>
    </sc-popup>
  </view>
</template>

<style lang="scss" scoped>
//.sc-popup-qr-code {}
</style>
