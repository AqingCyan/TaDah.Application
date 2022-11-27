import React, { useEffect, useState } from 'react'
import request from 'umi-request'
import { init } from 'emoji-mart'
import emojiData from '@emoji-mart/data'
import { Outlet, useLocation } from 'umi'
import Toast from '@/components/Toast'
import { disableIOSTouchZoom, isInWeChat } from '@/utils/helpers'
import qrcode_img from '../assets/qrcode.jpg'
import s from './index.less'

export default function Layout() {
  const location = useLocation()
  const [showOpenInWechat, setShowOpenInWechat] = useState<boolean>(false)

  const checkBrowserAndModal = () => {
    // setTimeout(() => setShowOpenInWechat(!isInWeChat()), 100)
  }

  const loadEmoji = () => {
    init({ data: emojiData }).catch(() => Toast.show('emoji加载失败，可能消费类目展示错误', { position: 'center' }))
  }

  useEffect(disableIOSTouchZoom, [])
  useEffect(checkBrowserAndModal, [isInWeChat()])
  useEffect(loadEmoji, [])
  useEffect(() => {
    const uid = location.search.split('?uid=')[1]
    if (uid) {
      request.get('http://localhost:3000/account/checkRegistration', { params: { uid } }).then((res) => {
        if (res.data) {
          console.log('显示登录')
        } else {
          console.log('显示注册')
        }
      })
    }
  }, [])

  return (
    <>
      <Outlet />
      <section
        className={s.mask}
        style={showOpenInWechat ? { background: 'var(--mask-background)' } : { pointerEvents: 'none' }}
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
