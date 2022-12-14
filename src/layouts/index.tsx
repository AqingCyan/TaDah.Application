import React, { useEffect, useState } from 'react'
import { Outlet } from 'umi'
import { useAtom } from 'jotai'
import { init } from 'emoji-mart'
import emojiData from '@emoji-mart/data'
import Toast from '@/components/Toast'
import { disableIOSTouchZoom, isInWeChat, isPC } from '@/utils/helpers'
import qrcode_img from '../assets/qrcode.jpg'
import { currentUserAtom } from '@/models/useCurrentUser'
import { pingCurrentUser } from '@/services/user'
import s from './index.less'

// TODO layout 刷新两次查清楚
export default function Layout() {
  const [, setCurrentUser] = useAtom(currentUserAtom)

  const [showOpenInWechat, setShowOpenInWechat] = useState<'needMobile' | 'needWechat'>()

  const checkWechatAndModal = () => {
    setTimeout(() => setShowOpenInWechat(isPC() ? 'needMobile' : isInWeChat() ? undefined : 'needWechat'), 100)
  }

  const loadEmoji = () => {
    init({ data: emojiData }).catch(() =>
      Toast.show('emoji加载失败，可能造成记账应用消费类目展示错误', { position: 'center' }),
    )
  }

  const initData = () => {
    loadEmoji()
    pingCurrentUser().then((res) => {
      if (res.data) setCurrentUser(res.data)
    })
  }

  useEffect(disableIOSTouchZoom, [])
  useEffect(checkWechatAndModal, [isInWeChat(), isPC()])
  useEffect(initData, [])

  return (
    <>
      <Outlet />
      <section
        className={s.mask}
        style={Boolean(showOpenInWechat) ? { background: 'var(--mask-background)' } : { pointerEvents: 'none' }}
      >
        <div className={s.modal} style={Boolean(showOpenInWechat) ? { opacity: 1 } : undefined}>
          <p style={Boolean(showOpenInWechat) ? { opacity: 1 } : undefined}>
            检测到您在{showOpenInWechat === 'needWechat' ? '非微信' : '非移动端'}环境打开
          </p>
          <p style={Boolean(showOpenInWechat) ? { opacity: 1 } : undefined}>请您扫描下方二维码使用该应用</p>
          {showOpenInWechat === 'needWechat' ? (
            <img style={Boolean(showOpenInWechat) ? { opacity: 1 } : undefined} src={qrcode_img} alt="qrcode_img" />
          ) : (
            <img
              style={Boolean(showOpenInWechat) ? { opacity: 1, width: '30vw' } : { width: '30vw' }}
              src={qrcode_img}
              alt="qrcode_img"
            />
          )}
        </div>
      </section>
    </>
  )
}
