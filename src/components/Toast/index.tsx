import s from './index.module.less'

const { body } = document

const toast = document.createElement('div')
toast.setAttribute('class', s.toast)

let timer: NodeJS.Timeout | null = null

const Toast = {
  show: (info: string, config?: { timeout?: number; position?: 'bottom' | 'center' }) => {
    if (timer) {
      clearTimeout(timer)
      body.removeChild(toast)
    }
    if (config?.position === 'center') {
      toast.style.top = '50%'
      toast.style.transform = 'translate(-50%, -50%)'
    } else {
      toast.style.top = ''
      toast.style.transform = 'translate(-50%, 0)'
    }
    toast.innerHTML = info
    body.appendChild(toast)
    timer = setTimeout(() => {
      body.removeChild(toast)
      timer = null
    }, config?.timeout || 3000)
  },
}

export default Toast
