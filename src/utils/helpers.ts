/** 访问设备 UA */
const UA = navigator.userAgent

/** 获取设备类型 */
export const getPlatformType = (): 'android' | 'ios' | 'others' => {
  if (/(Android)/i.test(UA)) return 'android'
  if (/(iPhone|iPad|iPod|iOS)/i.test(UA)) return 'ios'
  return 'others'
}

/** 是否在微信环境中 */
export const isInWeChat = () => /MicroMessenger/i.test(UA)
