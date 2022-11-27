import React, { useMemo, useState } from 'react'
import TopInfo from '@/components/TopInfo'
import FormInput from '@/components/FormInput'
import userIconWhite from '@/assets/userWhite.svg'
import userIconBlack from '@/assets/userBlack.svg'
import passwordWhite from '@/assets/passwordWhite.svg'
import passwordBlack from '@/assets/passworBlack.svg'
import useTheme from '@/hooks/useTheme'
import s from './index.module.less'

const Login = () => {
  const { inDark } = useTheme()

  const [nickname, setNickname] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const userIcon = useMemo(
    () => <img className={s.inputIcon} src={inDark ? userIconWhite : userIconBlack} alt="userIcon" />,
    [inDark],
  )
  const passwordIcon = useMemo(
    () => <img className={s.inputIcon} src={inDark ? passwordWhite : passwordBlack} alt="passwordIcon" />,
    [inDark],
  )

  const renderHeaderImageUpload = () => {
    return (
      <div className={s.headerImageUpload}>
        <span>+</span>
      </div>
    )
  }

  return (
    <div className={s.pageContainer}>
      <TopInfo text="TaDah" />
      {renderHeaderImageUpload()}
      <FormInput
        icon={userIcon}
        value={nickname}
        onChange={(e) => setNickname(e.target.value.trim())}
        placeholder="请输入一个昵称"
      />
      <FormInput
        icon={passwordIcon}
        value={password}
        onChange={(e) => setPassword(e.target.value.trim())}
        type="password"
        placeholder="请输入您的密码"
        errorText="两次密码内容不同"
      />
      <FormInput
        icon={passwordIcon}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value.trim())}
        type="password"
        placeholder="请确认您的密码"
        errorText="两次密码内容不同"
      />
      <section className={s.submit}>
        <button>确定记账</button>
      </section>
    </div>
  )
}

export default Login
