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

/**
 * 禁止 ios 可以通过点击和夹捏缩放 H5
 */
export const disableIOSTouchZoom = () => {
  window.onload = function () {
    document.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    })
    document.addEventListener('gesturestart', function (event) {
      event.preventDefault()
    })
  }
}
