import React, { useEffect, useState } from 'react'
import { Outlet } from 'umi'
import { isInWeChat } from '@/utils/helpers'
import QRCODE from '../assets/qrcode.jpg'
import s from './index.less'

export default function Layout() {
  const [showOpenInWechat, setShowOpenInWechat] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => setShowOpenInWechat(isInWeChat()), 100)
  }, [isInWeChat()])

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
          <img style={showOpenInWechat ? { opacity: 1 } : undefined} src={QRCODE} alt="QRCODE" />
        </div>
      </section>
    </>
  )
}
