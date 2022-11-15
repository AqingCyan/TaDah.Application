import React, { useEffect, useState } from 'react'
import { init } from 'emoji-mart'
import emojiData from '@emoji-mart/data'
import { Outlet } from 'umi'
import Toast from '@/components/Toast'
import { disableIOSTouchZoom, isInWeChat } from '@/utils/helpers'
import qrcode_img from '../assets/qrcode.jpg'
import s from './index.less'

export default function Layout() {
  const [showOpenInWechat, setShowOpenInWechat] = useState<boolean>(false)
  const [isDark, setIsDark] = useState<boolean>(false)

  const checkBrowserAndModal = () => {
    // setTimeout(() => setShowOpenInWechat(!isInWeChat()), 100)
  }

  const loadEmoji = () => {
    init({ data: emojiData }).catch(() => Toast.show('emoji加载失败，可能消费类目展示错误', { position: 'center' }))
    setTimeout(() => {
      setIsDark(true)
    }, 3000)
  }

  useEffect(disableIOSTouchZoom, [])
  useEffect(checkBrowserAndModal, [isInWeChat()])
  useEffect(loadEmoji, [])
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDark])

  return (
    <>
      <Outlet />
      <section
        className={s.mask}
        style={showOpenInWechat ? { background: 'rgba(31, 36, 46, 0.3)' } : { pointerEvents: 'none' }}
      >
        <div className={s.modal} style={showOpenInWechat ? { opacity: 1 } : undefined}>
          <p style={showOpenInWechat ? { opacity: 1 } : undefined}>检测到您在非微信环境打开</p>
          <p style={showOpenInWechat ? { opacity: 1 } : undefined}>请您扫描下方二维码使用该应用</p>
          <img style={showOpenInWechat ? { opacity: 1 } : undefined} src={qrcode_img} alt="qrcode_img" />
        </div>
      </section>
    </>
  )
}
