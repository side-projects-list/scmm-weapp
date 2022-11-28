import { store } from '..'

export const useAppStore = defineStore(
  'appStore',
  () => {
    /** 运行系统信息 */
    const systemInfo = ref<UniApp.GetSystemInfoResult>(<UniApp.GetSystemInfoResult>{})
    const getSystemInfo = () => {
      return systemInfo.value
    }
    const setSystemInfoCache = () => {
      systemInfo.value = uni.getSystemInfoSync()
    }

    return {
      systemInfo,
      getSystemInfo,
      setSystemInfoCache,
    }
  },
  {
    persist: {
      paths: ['systemInfo'],
    },
  },
)

export function useSetupAppStore() {
  return useAppStore(store)
}
