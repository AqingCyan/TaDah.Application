import React, { useMemo, useState } from 'react'
import { useAtom } from 'jotai'
import TopInfo from '@/components/TopInfo'
import FormInput from '@/components/FormInput'
import AvatarUpload from '@/components/AvatarUpload'
import useTheme from '@/hooks/useTheme'
import passwordWhite from '@/assets/passwordWhite.svg'
import passwordBlack from '@/assets/passworBlack.svg'
import { currentUserAtom } from '@/models/useCurrentUser'
import { pingCurrentUser, updateUserPassword } from '@/services/user'
import { tadah } from '@/utils/helpers'
import { history } from '@@/core/history'
import Toast from '@/components/Toast'
import s from './index.module.less'

const ChangePassword = () => {
  const { inDark } = useTheme()

  const [currentUserInfo, setCurrentUserInfo] = useAtom(currentUserAtom)

  const [password, setPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [passwordErrorText, setPasswordErrorText] = useState<string>('')
  const [newPasswordErrorText, setNewPasswordErrorText] = useState<string>('')

  const passwordIcon = useMemo(
    () => <img className={s.inputIcon} src={inDark ? passwordWhite : passwordBlack} alt="passwordIcon" />,
    [inDark],
  )

  /**
   * 更新用户密码
   */
  const handleUpdatePassword = () => {
    if (newPassword && password) {
      if (newPassword === password) {
        Toast.show('新旧密码不能一致')
        return
      }
      updateUserPassword({ password, newPassword }).then((res) => {
        if (res.data) {
          tadah()
          Toast.show('修改成功 🎉')
          history.push(`/appDashboard${window.location.search}`)
          window.localStorage.setItem('bearer_token', '')
          pingCurrentUser().then((res) => {
            if (res.data) {
              setCurrentUserInfo(res.data)
            }
          })
        } else {
          Toast.show(res.message)
        }
      })
    } else {
      if (!newPassword) setNewPasswordErrorText('请输入新密码')
      if (!password) setPasswordErrorText('请输入密码')
    }
  }

  return (
    <div className={s.pageContainer}>
      <TopInfo text="TaDah 修改密码" />
      <AvatarUpload avatarSrc={currentUserInfo?.headimgurl} />
      <FormInput
        icon={passwordIcon}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value.trim())
          setPasswordErrorText('')
        }}
        errorText={passwordErrorText}
        errorStatus={Boolean(passwordErrorText)}
        type="password"
        placeholder="请输入您的密码"
      />
      <FormInput
        icon={passwordIcon}
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value.trim())
          setNewPasswordErrorText('')
        }}
        errorText={newPasswordErrorText}
        errorStatus={Boolean(newPasswordErrorText)}
        type="password"
        placeholder="请输入你的新密码"
      />
      <section className={s.submit}>
        <button onClick={handleUpdatePassword}>修改密码</button>
      </section>
    </div>
  )
}

export default ChangePassword
