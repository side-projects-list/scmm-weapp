<script setup lang="ts">
import { onError, onHide, onLaunch, onShow, onUnhandledRejection } from '@dcloudio/uni-app'

const appStore = useSetupAppStore()
const userStore = useSetupUserStore()

onLaunch(() => {
  // eslint-disable-next-line no-console
  console.log('App Launch')

  // 缓存系统信息
  appStore.setSystemInfoCache()
  // 创建临时用户
  userStore.generateFakeUser()
})
onShow(() => {
  // eslint-disable-next-line no-console
  console.log('App Show')
})
onHide(() => {
  // eslint-disable-next-line no-console
  console.log('App Hide')
})

onError((err) => {
  console.error('onError', err)
})

onUnhandledRejection((err) => {
  console.error('onUnhandledRejection', err)
})
</script>

<style lang="scss">
page, html {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto,
    'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
  font-size: 28rpx;
  color: #333;
  box-sizing: border-box;
}
</style>
