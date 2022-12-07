import React from 'react'
import s from './index.module.less'

const NightClean = () => {
  return (
    <div className={s.weather}>
      <div className={s.night}>
        <span className={s.moon}></span>
        <span className={s.meteor}></span>
      </div>
    </div>
  )
}

export default NightClean
