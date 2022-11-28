import type { App } from 'vue'
import { createPersistedState } from 'pinia-plugin-persistence-mp'

const store = createPinia()

store.use(createPersistedState({
  storage: {
    setStorageSync: uni.setStorageSync,
    getStorageSync: uni.getStorageSync,
  },
  debug: true,
}))

export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }
