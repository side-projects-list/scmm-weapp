import { store } from '..'
import type { UserObj } from '#/index'
import { DEFAULT_AVATAR } from '@/constants'

export const useUserStore = defineStore(
  'userStore',
  () => {
    /** 鉴权token */
    const _token = ref('')
    /** 用户信息 */
    const _userInfo = ref<null | UserObj>(null)

    const setToken = (token: string) => {
      _token.value = token
    }

    const getToken = () => {
      return _token.value
    }

    /** 清除本地token缓存 */
    const clearToken = () => {
      _token.value = ''
    }

    const setUserInfo = (userInfo: UserObj | null) => {
      _userInfo.value = userInfo
    }

    const updateUserInfo = (k: keyof UserObj, v: any) => {
      if (!_userInfo.value) {
        _userInfo.value = {
          [k]: v,
        } as UserObj
      }
      (_userInfo.value as any)[k] = v
    }

    const getUserInfo = () => {
      return _userInfo.value
    }

    /** 清除本用户信息缓存 */
    const clearUserInfo = () => {
      _userInfo.value = null
    }

    /** 全部清除 userStore 相关缓存 */
    const clearAll = () => {
      clearToken()
      clearUserInfo()
    }

    const generateFakeUser = () => {
      setToken(`valid_token:10086:${new Date().getTime()}`)
      setUserInfo({ id: 1, phone: '10086', avatar: DEFAULT_AVATAR, nickname: `SC用户${Math.ceil(Math.random() * 10000)}` })
    }

    return {
      setToken,
      getToken,
      clearToken,
      setUserInfo,
      updateUserInfo,
      getUserInfo,
      clearUserInfo,
      clearAll,
      generateFakeUser,
    }
  },
  {
    persist: true,
  },
)

export function useSetupUserStore() {
  return useUserStore(store)
}
