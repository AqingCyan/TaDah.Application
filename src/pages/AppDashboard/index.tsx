import React, { useEffect } from 'react'
import { history } from 'umi'
import { useAtom } from 'jotai'
import TopInfo from '@/components/TopInfo'
import Toast from '@/components/Toast'
import useTheme from '@/hooks/useTheme'
import accountBookBlack from './icons/accountBookBlack.svg'
import accountBookWhite from './icons/accountBookWhite.svg'
import dinnerBlack from './icons/dinnerBlack.svg'
import dinnerWhite from './icons/dinnerWhite.svg'
import dayOfCommemorationWhite from './icons/dayOfCommemorationWhite.svg'
import dayOfCommemorationBlack from './icons/dayOfCommemorationBlack.svg'
import expressBlack from './icons/expressBlack.svg'
import expressWhite from './icons/expressWhite.svg'
import memoWhite from './icons/memoWhite.svg'
import memoBlack from './icons/memoBlack.svg'
import weatherBlack from './icons/weatherBlack.svg'
import weatherWhite from './icons/weatherWhite.svg'
import userWhite from './icons/userWhite.svg'
import userBlack from './icons/userBlack.svg'
import changePasswordBlack from './icons/changePasswordBlack.svg'
import changePasswordWhite from './icons/changePasswordWhite.svg'
import { currentUserAtom } from '@/models/useCurrentUser'
import { pingCurrentUser } from '@/services/user'
import s from './index.module.less'

const accountBookIcon = (dark: boolean) => {
  return !dark ? accountBookBlack : accountBookWhite
}

const dinnerIcon = (dark: boolean) => {
  return !dark ? dinnerBlack : dinnerWhite
}

const dayOfCommemorationIcon = (dark: boolean) => {
  return !dark ? dayOfCommemorationBlack : dayOfCommemorationWhite
}

const expressIcon = (dark: boolean) => {
  return !dark ? expressBlack : expressWhite
}

const memoIcon = (dark: boolean) => {
  return !dark ? memoBlack : memoWhite
}

const weatherIcon = (dark: boolean) => {
  return !dark ? weatherBlack : weatherWhite
}

const userIcon = (dark: boolean) => {
  return !dark ? userBlack : userWhite
}

const changePasswordIcon = (dark: boolean) => {
  return !dark ? changePasswordBlack : changePasswordWhite
}

const applications = [
  { name: '修改信息', status: true, route: '/updateUserInfo', iconFunc: userIcon },
  { name: '修改密码', status: true, route: '/changePassword', iconFunc: changePasswordIcon },
  { name: '快递查询', status: true, route: '/express', iconFunc: expressIcon },
  { name: '天气查询', status: true, route: '/weatherPreview', iconFunc: weatherIcon },
  { name: '快捷记账', status: true, route: '/accountBook', iconFunc: accountBookIcon },
  { name: '今日吃啥', status: false, route: '/dinner', iconFunc: dinnerIcon },
  { name: '纪念日', status: false, route: '/dayOfCommemoration', iconFunc: dayOfCommemorationIcon },
  { name: '备忘录', status: false, route: '/memo', iconFunc: memoIcon },
]

const AppDashboard = () => {
  const { inDark } = useTheme()

  const [currentUser, setCurrentUser] = useAtom(currentUserAtom)

  /**
   * 全局用户信息加载
   */
  const handlePing = () => {
    if (!currentUser) {
      pingCurrentUser().then((res) => {
        if (res.data) setCurrentUser(res.data)
      })
    }
  }

  useEffect(handlePing, [])

  return (
    <div className={s.pageContainer}>
      <TopInfo text={`你好 ${currentUser?.nickname}`} />
      <section className={s.applicationList}>
        {applications.map((item) => (
          <div
            key={item.name}
            className={s.applicationBox}
            onClick={() => {
              if (!item.status) {
                Toast.show('正在开发中👨🏻‍💻')
                return
              }
              history.push(item.route + window.location.search)
            }}
          >
            <span className={s.icon}>
              <img src={item.iconFunc(inDark)} alt={item.route} />
            </span>
            <span className={s.appName}>{item.name}</span>
          </div>
        ))}
      </section>
    </div>
  )
}

export default AppDashboard
