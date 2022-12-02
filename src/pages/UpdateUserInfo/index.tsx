import React, { useEffect, useMemo, useState } from 'react'
import { history } from 'umi'
import TopInfo from '@/components/TopInfo'
import FormInput from '@/components/FormInput'
import userIconWhite from '@/assets/userWhite.svg'
import userIconBlack from '@/assets/userBlack.svg'
import emailBlack from '@/assets/emailBlack.svg'
import emailWhite from '@/assets/emailWhite.svg'
import useTheme from '@/hooks/useTheme'
import AvatarUpload from '@/components/AvatarUpload'
import { useAtom } from 'jotai'
import Toast from '@/components/Toast'
import { currentUserAtom } from '@/models/useCurrentUser'
import { pingCurrentUser, updateUserInfo } from '@/services/user'
import { tadah } from '@/utils/helpers'
import s from './index.module.less'

const UpdateUserInfo = () => {
  const { inDark } = useTheme()

  const [currentUserInfo, setCurrentUserInfo] = useAtom(currentUserAtom)

  const [nickname, setNickname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [headimage, setHeadimage] = useState<string>(
    'https://headimage-1259237065.cos.ap-hongkong.myqcloud.com/118211681.png',
  )
  const [nicknameErrorText, setNicknameErrorText] = useState<string>('')
  const [emailErrorText, setEmailErrorText] = useState<string>('')

  useEffect(() => {
    if (currentUserInfo) {
      setHeadimage(currentUserInfo.headimgurl)
      setNickname(currentUserInfo.nickname)
      setEmail(currentUserInfo.email)
    }
  }, [currentUserInfo])

  const userIcon = useMemo(
    () => <img className={s.inputIcon} src={inDark ? userIconWhite : userIconBlack} alt="userIcon" />,
    [inDark],
  )

  const emailIcon = useMemo(
    () => <img className={s.inputIcon} src={inDark ? emailWhite : emailBlack} alt="userIcon" />,
    [inDark],
  )

  /**
   * 更新用户信息
   */
  const handleUpdateUserInfo = () => {
    if (nickname && email) {
      updateUserInfo({ email, nickname, headimgurl: headimage }).then((res) => {
        if (res.data) {
          tadah()
          history.push(`/appDashboard${window.location.search}`)
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
      if (!email) setEmailErrorText('请输入邮箱')
      if (!nickname) setNicknameErrorText('请输入昵称')
    }
  }

  return (
    <div className={s.pageContainer}>
      <TopInfo text="TaDah" />
      <AvatarUpload avatarSrc={headimage} setAvatarSrc={setHeadimage} />
      <FormInput
        icon={userIcon}
        value={nickname}
        onChange={(e) => {
          setNickname(e.target.value.trim().slice(0, 10))
          setNicknameErrorText('')
        }}
        placeholder="请输入您的昵称"
        errorStatus={Boolean(nicknameErrorText)}
        errorText={nicknameErrorText}
      />
      <FormInput
        icon={emailIcon}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value.trim())
          setEmailErrorText('')
        }}
        onBlur={() => {
          const pass = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)
          setEmailErrorText(pass ? '' : '邮箱格式有误')
        }}
        errorText={emailErrorText}
        errorStatus={Boolean(emailErrorText)}
        placeholder="请输入您的邮箱"
      />
      <section className={s.submit}>
        <button onClick={handleUpdateUserInfo}>确认修改</button>
      </section>
    </div>
  )
}

export default UpdateUserInfo
