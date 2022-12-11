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
    setTimeout(() => setShowOpenInWechat(isInWeChat() ? undefined : 'needWechat'), 100)
  }

  const checkBrowserAndModal = () => {
    setTimeout(() => setShowOpenInWechat(isPC() ? 'needMobile' : undefined), 100)
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
  useEffect(checkWechatAndModal, [isInWeChat()])
  useEffect(checkBrowserAndModal, [isPC()])
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
          <p style={Boolean(showOpenInWechat) ? { opacity: 1 } : undefined}>
            请您{showOpenInWechat === 'needMobile' ? '通过手机访问' : '扫描下方二维码'}使用该应用
          </p>
          <img style={Boolean(showOpenInWechat) ? { opacity: 1 } : undefined} src={qrcode_img} alt="qrcode_img" />
        </div>
      </section>
    </>
  )
}
