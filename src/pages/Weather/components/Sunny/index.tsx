import React from 'react'
import s from './index.module.less'

const Sunny = () => {
  return (
    <div className={s.weather}>
      <div className={s.sunny}>
        <span className={s.sun} />
      </div>
    </div>
  )
}

export default Sunny
