import cityBlack from '@/assets/cityBlack.svg'
import cityWhite from '@/assets/cityWhite.svg'

export const weekMap = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '日',
}

export const suggestionMap = [
  { key: 'ac', name: '空调开启' },
  { key: 'air_pollution', name: '空气污染扩散条件' },
  { key: 'airing', name: '晾晒' },
  { key: 'allergy', name: '过敏' },
  { key: 'beer', name: '啤酒' },
  { key: 'boating', name: '划船' },
  { key: 'car_washing', name: '洗车' },
  { key: 'chill', name: '风寒' },
  { key: 'comfort', name: '舒适度' },
  { key: 'dating', name: '约会' },
  { key: 'dressing', name: '穿衣' },
  { key: 'fishing', name: '钓鱼' },
  { key: 'flu', name: '感冒' },
  { key: 'hair_dressing', name: '美发' },
  { key: 'kiteflying', name: '放风筝' },
  { key: 'makeup', name: '化妆' },
  { key: 'mood', name: '心情' },
  { key: 'morning_sport', name: '晨练' },
  { key: 'night_life', name: '夜生活' },
  { key: 'road_condition', name: '路况' },
  { key: 'shopping', name: '购物' },
  { key: 'sport', name: '运动' },
  { key: 'sunscreen', name: '防晒' },
  { key: 'traffic', name: '交通' },
  { key: 'travel', name: '旅游' },
  { key: 'umbrella', name: '雨伞' },
  { key: 'uv', name: '紫外线' },
]

export const cityIcon = (dark: boolean) => {
  return !dark ? cityBlack : cityWhite
}
