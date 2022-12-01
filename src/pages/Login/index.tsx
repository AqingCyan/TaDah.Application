import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { history, useLocation } from 'umi'
import { parse } from 'query-string'
import confetti from 'canvas-confetti'
import TopInfo from '@/components/TopInfo'
import FormInput from '@/components/FormInput'
import PageLoading from '@/components/PageLoading'
import userIconWhite from '@/assets/userWhite.svg'
import userIconBlack from '@/assets/userBlack.svg'
import passwordWhite from '@/assets/passwordWhite.svg'
import passwordBlack from '@/assets/passworBlack.svg'
import emailBlack from '@/assets/emailBlack.svg'
import emailWhite from '@/assets/emailWhite.svg'
import useTheme from '@/hooks/useTheme'
import { checkRegistration, loginAccount, registerAccount, uploadHeadImage } from '@/services/user'
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
  const [emailErrorText, setEmailErrorText] = useState<string>('')
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState<string>('')

  const handleFirstPage = () => {
    if (query.uid) {
      checkRegistration(query.uid as string).then((res) => {
        if (res.data !== undefined && !res.error) {
          setShowType(res.data ? 'login' : 'register')
          setHeadimage(res.data ? 'https://headimage-1259237065.cos.ap-hongkong.myqcloud.com/118211681.png' : '')
        } else {
          // TODO 错误处理
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
   * 上传头像
   * @param e
   */
  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileData = e.target.files[0]
      const formData = new FormData()
      formData.append('headimage', fileData)
      uploadHeadImage(formData).then((res) => {
        if (res.data) {
          setHeadimage(res.data)
        } else {
          // TODO 造一个提示组件
        }
      })
    }
  }

  // TODO 看要不要做一个头像裁剪的功能
  const renderHeaderImageUpload = () => {
    return (
      <div className={s.headerImageUpload}>
        {showType === 'register' && <input type="file" accept="image/png,image/jpeg" onChange={uploadFile} />}
        {headimage ? <img src={headimage} alt="headimage" /> : <span>+</span>}
      </div>
    )
  }

  /**
   * 彩带雨
   */
  const tadah = () => {
    const myCanvas = document.createElement('canvas')
    myCanvas.style.position = 'fixed'
    myCanvas.style.width = '100vw'
    myCanvas.style.height = '90vh'
    myCanvas.style.top = '0px'
    myCanvas.style.pointerEvents = 'none'
    document.body.appendChild(myCanvas)

    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    })
    myConfetti({
      particleCount: 200,
      spread: 200,
    })
  }

  /**
   * 注册动作
   */
  const register = () => {
    if (nickname && email && password) {
      const data = { nickname, headimgurl: headimage, email, password }
      registerAccount(query.uid as string, data).then((res) => {
        if (res.data) {
          history.push(`/appDashboard${window.location.search}`)
        } else {
          // TODO toast 提示
        }
      })
    } else {
      // TODO toast 提示
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
        }
      })
    } else {
      // TODO toast 提示
    }
  }

  return (
    <div className={s.pageContainer}>
      <TopInfo text="TaDah" />
      {showType ? (
        <>
          {renderHeaderImageUpload()}
          {showType === 'register' && (
            <FormInput
              icon={userIcon}
              value={nickname}
              onChange={(e) => setNickname(e.target.value.trim().slice(0, 15))}
              placeholder="请输入您的昵称"
            />
          )}
          {showType === 'register' && (
            <FormInput
              icon={emailIcon}
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
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
            onChange={(e) => setPassword(e.target.value.trim())}
            type="password"
            placeholder="请输入您的密码"
            errorText={confirmPasswordErrorText}
            errorStatus={Boolean(confirmPasswordErrorText)}
          />
          {showType === 'register' && (
            <FormInput
              icon={passwordIcon}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value.trim())}
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
