import React from 'react'
import s from './index.module.less'

const Cloudy = () => {
  return (
    <div className={s.weather}>
      <div className={s.cloudy}>
        <span className={s.cloud}></span>
        <span className={s.cloud}></span>
      </div>
    </div>
  )
}

export default Cloudy
