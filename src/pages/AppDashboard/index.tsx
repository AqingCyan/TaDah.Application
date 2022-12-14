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
  { name: '????????????', status: true, route: '/updateUserInfo', iconFunc: userIcon },
  { name: '????????????', status: true, route: '/changePassword', iconFunc: changePasswordIcon },
  { name: '????????????', status: true, route: '/express', iconFunc: expressIcon },
  { name: '????????????', status: true, route: '/weatherPreview', iconFunc: weatherIcon },
  { name: '????????????', status: true, route: '/accountBook', iconFunc: accountBookIcon },
  { name: '????????????', status: false, route: '/dinner', iconFunc: dinnerIcon },
  { name: '?????????', status: false, route: '/dayOfCommemoration', iconFunc: dayOfCommemorationIcon },
  { name: '?????????', status: false, route: '/memo', iconFunc: memoIcon },
]

const AppDashboard = () => {
  const { inDark } = useTheme()

  const [currentUser, setCurrentUser] = useAtom(currentUserAtom)

  /**
   * ????????????????????????
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
      <TopInfo text={`?????? ${currentUser?.nickname}`} />
      <section className={s.applicationList}>
        {applications.map((item) => (
          <div
            key={item.name}
            className={s.applicationBox}
            onClick={() => {
              if (!item.status) {
                Toast.show('??????????????????????????????')
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
