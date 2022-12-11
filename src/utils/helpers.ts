import confetti from 'canvas-confetti'

/** 访问设备 UA */
const UA = navigator.userAgent

/** 获取设备类型 */
export const getPlatformType = (): 'android' | 'ios' | 'others' => {
  if (/(Android)/i.test(UA)) return 'android'
  if (/(iPhone|iPad|iPod|iOS)/i.test(UA)) return 'ios'
  return 'others'
}

/**
 * 判断是否是移动端
 */
export const isPC = () => !/(Mobile|android)/i.test(UA)

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

/**
 * 彩带雨
 */
export const tadah = () => {
  const myCanvas = document.createElement('canvas')
  myCanvas.style.position = 'fixed'
  myCanvas.style.width = '100vw'
  myCanvas.style.height = '90vh'
  myCanvas.style.top = '0px'
  myCanvas.style.pointerEvents = 'none'
  document.body.appendChild(myCanvas)

  const myConfetti = confetti.create(myCanvas, {
    resize: true,
    useWorker: true,
  })
  myConfetti({
    particleCount: 200,
    spread: 200,
  })
}
