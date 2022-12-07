import React from 'react'
import s from './index.module.less'

const Stormy = () => {
  return (
    <div className={s.weather}>
      <div className={s.stormy}>
        <span className={s.cloud}></span>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  )
}

export default Stormy
