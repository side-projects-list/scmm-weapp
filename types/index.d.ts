import { LoadMoreStatus } from '@/components/sc-load-more/types'

export * from './order'
export * from './product'
export * from './user'

/**滑动切换标签项对象 */
export interface TabItemObj<T, M> {
  name: string
  triggered: boolean | 'restore'
  _freshing: boolean
  loadingStatus: LoadMoreStatus
  itemsList: T
  value: M
}