import type { CategoryItem } from '../types'
import xcIcon from '@/static/images/index/home_ent_xc.png'
import byIcon from '@/static/images/index/home_ent_by.png'
import pqIcon from '@/static/images/index/home_ent_pq.png'
import tmIcon from '@/static/images/index/home_ent_tm.png'

export function useCategory() {
  const catesList = ref<CategoryItem[]>([
    {
      value: 'xc',
      name: '洗车',
      page: '/pages/product/index/index?cate=xc',
      icon: xcIcon,
    },
    {
      value: 'by',
      name: '保养',
      page: '/pages/product/index/index?cate=by',
      icon: byIcon,
    },
    {
      value: 'pq',
      name: '喷漆',
      page: '/pages/product/index/index?cate=pq',
      icon: pqIcon,
    },
    {
      value: 'tm',
      name: '贴膜',
      page: '/pages/product/index/index?cate=tm',
      icon: tmIcon,
    },
  ])

  return {
    /** 分类列表 */
    catesList,
  }
}
