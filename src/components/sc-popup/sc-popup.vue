<script setup lang="ts" name="sc-popup">
// 弹出层
import { popupProps } from './props'

const props = defineProps({
  ...popupProps,
})

const emits = defineEmits<{
  (event: 'update:modelValue', status: boolean): void
  (event: 'open',): void
  (event: 'opened',): void
  (event: 'close',): void
  (event: 'closed',): void
}>()

/** 控制是否显示 */
const visible = ref(false)
const status = ref(false)
let timer: NodeJS.Timeout | null = null
/** 内容高度 */
const height = computed(() => {
  switch (props.direction) {
    case 'top':
    case 'bottom':
      return props.size
    case 'left':
    case 'right':
      return '100%'
  }
})

/** 内容宽度 */
const width = computed(() => {
  switch (props.direction) {
    case 'top':
    case 'bottom':
      return '100%'
    case 'left':
    case 'right':
      return props.size
  }
})

watch(() => props.modelValue, (n) => {
  n ? handleOpen() : handleClose()
}, { immediate: true })

function handleOpen() {
  if (!visible.value) {
    visible.value = true

    emits('update:modelValue', true)
    emits('open')

    typeof timer === 'number' && clearTimeout(timer)

    timer = setTimeout(() => {
      status.value = true

      timer = setTimeout(() => {
        emits('opened')
      }, 350)
    }, 50)
  }
}

function handleClose() {
  if (status.value) {
    const done = () => {
      status.value = false
      emits('close')
      typeof timer === 'number' && clearTimeout(timer)

      timer = setTimeout(() => {
        visible.value = false
        emits('update:modelValue', false)
        emits('closed')
      }, 300)
    }

    done()
  }
}

function modalClose() {
  if (!props.closeOnClickModal)
    return

  handleClose()
}
</script>

<template>
  <view v-if="visible" class="sc-popup__wrapper fixed top-0 right-0 bottom-0 left-0 opacity-0 pointer-events-none" :class="[`sc-popup__wrapper--${direction}`, `is-${status ? 'open' : 'close'}`]" :style="{ zIndex: +zIndex }" @touchmove.stop.prevent>
    <!-- 蒙层 -->
    <view v-if="showModal" class="w-full h-full absolute top-0 left-0 right-0 bottom-0" :style="{ background: modalBackground }" @tap="modalClose" />

    <!-- 内容 -->
    <view class="sc-popup flex flex-col bg-white absolute box-border" :style="{ height, width, backgroundColor, borderRadius: radius }">
      <view class="sc-popup__container h-full" :style="{ padding }">
        <slot />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.sc-popup__wrapper {
  transition: all 0.3s;
  &.is-open {
    opacity: 1;
    pointer-events: auto;

    .sc-popup {
      transition: all 0.4s;
      transform: translate(0, 0);
    }
  }

  &::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }

  .sc-popup {
    transition: all 0.3s;
  }

  &--left {
    .sc-popup {
      transform: translateX(-100%);
      left: 0;
      top: 0;
    }
  }

  &--right {
    .sc-popup {
      transform: translateX(100%);
      right: 0;
      top: 0;
    }
  }

  &--top {
    .sc-popup {
      transform: translateY(-100%);
      left: 0;
      top: 0;
    }
  }

  &--bottom {
    .sc-popup {
      transform: translateY(100%);
      left: 0;
      bottom: 0;
    }
  }

  &--center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .sc-popup {
      transform: scale(1.3);
    }
  }

  &--top,
  &--left,
  &--right {
    .sc-popup {
      /* #ifdef H5 */
      padding-top: 44px;
      /* #endif */

      /* #ifndef H5 */
      padding-top: env(safe-area-inset-top);
      /* #endif */
    }
  }

  &--left,
  &--right,
  &--bottom {
    .sc-popup {
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
}
</style>
