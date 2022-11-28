import React from 'react'
import TopInfo from '@/components/TopInfo'
import s from './index.module.less'

const AppDashboard = () => {
  return (
    <div className={s.pageContainer}>
      <TopInfo text="👋 你好" />
    </div>
  )
}

export default AppDashboard
