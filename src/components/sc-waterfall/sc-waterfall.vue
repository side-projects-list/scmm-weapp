<script setup lang="ts" name="sc-waterfall">
// 瀑布流组件

import { waterfallProps } from './props'

const props = defineProps({
  ...waterfallProps,
})

/** 左侧列表初始值 */
const leftListConst = ref<any[]>([])
/** 左侧数据列表 */
const leftList = ref<any[]>([])
/** 右侧数据列表 */
const rightList = ref<any[]>([])
/** 是否已初始化 */
const init = ref(true)

watch(() => props.itemsList, () => {
  if (!init.value)
    columnChange()
}, { deep: true })

onMounted(() => {
  init.value = false
  columnChange()
})

function columnChange() {
  leftList.value = [...leftListConst.value]

  initData()
}

function initData() {
  getSubGroup()
}
function getDiffList() {
  let diffList: any[] = []
  const total = props.itemsList.length
  if (total <= props.pageSize) {
    leftListConst.value = []
    leftList.value = []
    rightList.value = []
  }
  const sum = leftListConst.value.length + rightList.value.length
  const diff = total - sum
  if (diff > 0) {
    diffList = [...props.itemsList].filter((item, index) => {
      return index >= sum
    })
  }
  return diffList
}

/** 执行简单数据分组 */
function getSubGroup() {
  if (!props.itemsList || props.itemsList.length === 0)
    return
  const _leftList: any[] = []
  const _rightList: any[] = []
  const data = getDiffList()
  data.forEach((item, index) => {
    if (index % 2 === 0)
      _leftList.push(item)
    else
      _rightList.push(item)
  })
  leftList.value = leftList.value.concat(_leftList)
  leftListConst.value = leftListConst.value.concat(_leftList)
  rightList.value = rightList.value.concat(_rightList)
}

function sleep(millisecond: number) {
  let now = new Date()
  const exitTime = now.getTime() + millisecond
  while (true) {
    now = new Date()
    if (now.getTime() > exitTime)
      return
  }
}
</script>

<template>
  <view class="sc-waterfall w-full inline-flex justify-between flex-row flex-wrap box-border items-start" :style="{ paddingLeft: leftGap, paddingRight: rightGap, background: backgroundColor, borderRadius: radius }">
    <view id="sc-waterfall__left" class="sc-waterfall__list flex-1" :style="{ marginRight: columnGap }">
      <view v-for="(item, index) in leftList" :key="index">
        <slot name="left" :item="item" :index="index" :is-list="false" />
      </view>
    </view>
    <view id="sc-waterfall__right" class="sc-waterfall__list flex-1">
      <view v-for="(item, index) in rightList" :key="index">
        <slot name="right" :item="item" :index="index" :is-list="false" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//.sc-waterfall {}
</style>
