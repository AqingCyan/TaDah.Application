import React from 'react'
import TopInfo from '@/components/TopInfo'
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
import s from './index.module.less'

export const accountBookIcon = (dark: boolean) => {
  return !dark ? accountBookBlack : accountBookWhite
}

export const dinnerIcon = (dark: boolean) => {
  return !dark ? dinnerBlack : dinnerWhite
}

export const dayOfCommemorationIcon = (dark: boolean) => {
  return !dark ? dayOfCommemorationBlack : dayOfCommemorationWhite
}

export const expressIcon = (dark: boolean) => {
  return !dark ? expressBlack : expressWhite
}

export const memoIcon = (dark: boolean) => {
  return !dark ? memoBlack : memoWhite
}

export const weatherIcon = (dark: boolean) => {
  return !dark ? weatherBlack : weatherWhite
}

const applications = [
  { name: '简单记账', route: 'accountBook', iconFunc: accountBookIcon },
  { name: '今天吃啥', route: 'dinner', iconFunc: dinnerIcon },
  { name: '快递查询', route: 'express', iconFunc: expressIcon },
  { name: '备忘录', route: 'memo', iconFunc: memoIcon },
  { name: '纪念日', route: 'dayOfCommemoration', iconFunc: dayOfCommemorationIcon },
  { name: '天气查询', route: 'weather', iconFunc: weatherIcon },
]

const AppDashboard = () => {
  const { inDark } = useTheme()

  return (
    <div className={s.pageContainer}>
      <TopInfo text="👋 你好" />
      <section className={s.applicationList}>
        {applications.map((item) => (
          <div key={item.name} className={s.applicationBox}>
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
