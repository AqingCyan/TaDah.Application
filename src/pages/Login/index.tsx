import React, { useEffect, useMemo, useState } from 'react'
import { history, useLocation } from 'umi'
import { parse } from 'query-string'
import TopInfo from '@/components/TopInfo'
import FormInput from '@/components/FormInput'
import PageLoading from '@/components/PageLoading'
import AvatarUpload from '@/components/AvatarUpload'
import Toast from '@/components/Toast'
import useTheme from '@/hooks/useTheme'
import { checkRegistration, loginAccount, registerAccount } from '@/services/user'
import { tadah } from '@/utils/helpers'
import userIconWhite from '@/assets/userWhite.svg'
import userIconBlack from '@/assets/userBlack.svg'
import passwordWhite from '@/assets/passwordWhite.svg'
import passwordBlack from '@/assets/passworBlack.svg'
import emailBlack from '@/assets/emailBlack.svg'
import emailWhite from '@/assets/emailWhite.svg'
import s from './index.module.less'

const Login = () => {
  const { inDark } = useTheme()
  const location = useLocation()
  const query = parse(location.search)

  const [showType, setShowType] = useState<'login' | 'register' | undefined>(undefined)
  const [nickname, setNickname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [headimage, setHeadimage] = useState<string>('')
  const [nicknameErrorText, setNicknameErrorText] = useState<string>('')
  const [emailErrorText, setEmailErrorText] = useState<string>('')
  const [passwordErrorText, setPasswordErrorText] = useState<string>('')
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState<string>('')

  const handleFirstPage = () => {
    if (query.uid) {
      checkRegistration(query.uid as string).then((res) => {
        if (res.data !== undefined && !res.error) {
          setShowType(res.data ? 'login' : 'register')
          setHeadimage(res.data ? 'https://headimage-1259237065.cos.ap-hongkong.myqcloud.com/118211681.png' : '')
        } else {
          Toast.show('加载信息错误')
        }
      })
    }
  }

  useEffect(handleFirstPage, [])

  const userIcon = useMemo(
    () => <img className={s.inputIcon} src={inDark ? userIconWhite : userIconBlack} alt="userIcon" />,
    [inDark],
  )

  const emailIcon = useMemo(
    () => <img className={s.inputIcon} src={inDark ? emailWhite : emailBlack} alt="userIcon" />,
    [inDark],
  )

  const passwordIcon = useMemo(
    () => <img className={s.inputIcon} src={inDark ? passwordWhite : passwordBlack} alt="passwordIcon" />,
    [inDark],
  )

  /**
   * 注册动作
   */
  const register = () => {
    if (nickname && email && password) {
      const data = { nickname, headimgurl: headimage, email, password }
      registerAccount(query.uid as string, data).then((res) => {
        if (res.data) {
          setShowType('login')
          setPassword('')
        } else {
          Toast.show(res.message)
        }
      })
    } else {
      if (!nickname) setNicknameErrorText('昵称未填写')
      if (!email) setEmailErrorText('邮箱未填写')
      if (!password) setPasswordErrorText('密码未填写')
      if (!confirmPassword) setConfirmPasswordErrorText('确认密码未填写')
    }
  }

  /**
   * 登录动作
   */
  const login = () => {
    if (password) {
      loginAccount({ uid: query.uid as string, password }).then((res) => {
        if (res.data) {
          window.localStorage.setItem('bearer_token', res.data)
          history.push(`/appDashboard${window.location.search}`)
          tadah()
        } else {
          Toast.show(res.message)
        }
      })
    } else {
      setPasswordErrorText('密码未填写')
    }
  }

  return (
    <div className={s.pageContainer}>
      <TopInfo text="TaDah" />
      {showType ? (
        <>
          <AvatarUpload avatarSrc={headimage} setAvatarSrc={setHeadimage} disabled={showType === 'login'} />
          {showType === 'register' && (
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
          )}
          {showType === 'register' && (
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
          )}
          <FormInput
            icon={passwordIcon}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value.trim())
              setPasswordErrorText('')
            }}
            type="password"
            placeholder="请输入您的密码"
            errorText={passwordErrorText}
            errorStatus={Boolean(passwordErrorText)}
          />
          {showType === 'register' && (
            <FormInput
              icon={passwordIcon}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value.trim())
                setConfirmPasswordErrorText('')
              }}
              type="password"
              placeholder="请确认您的密码"
              errorText={confirmPasswordErrorText}
              errorStatus={Boolean(confirmPasswordErrorText)}
              onBlur={() => {
                const pass = password === confirmPassword
                setConfirmPasswordErrorText(pass ? '' : '两次密码内容不同')
              }}
            />
          )}
          <section className={s.submit}>
            <button onClick={showType === 'register' ? register : login}>
              {showType === 'login' ? '登录' : '注册'} TaDah
            </button>
          </section>
        </>
      ) : (
        <div className={s.loading}>
          <PageLoading />
        </div>
      )}
    </div>
  )
}

export default Login
