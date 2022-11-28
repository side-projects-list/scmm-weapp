import { store } from '..'
import type { CheckoutObj } from '#/order'

export const useOrderStore = defineStore('orderStore', () => {
  const checkoutData = ref<CheckoutObj>()

  function getCheckoutData() {
    return checkoutData.value
  }

  function setCheckoutData(data: CheckoutObj) {
    checkoutData.value = data
  }

  function clearCheckoutData() {
    checkoutData.value = undefined
  }

  return {
    checkoutData,
    getCheckoutData,
    setCheckoutData,
    clearCheckoutData,
  }
}, {
  persist: {
    paths: ['checkoutData'],
  },
})

export function useSetupOrderStore() {
  return useOrderStore(store)
}
