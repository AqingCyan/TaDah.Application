import React from 'react'
import s from './index.module.less'

interface CardProps {
  income: number
  target: number
  outCount: number
  residueCount: number
  hasData?: boolean
}

const Card: React.FC<CardProps> = (props) => {
  const { hasData = false } = props

  const renderContent = () => {
    return (
      <>
        <div className={s.targetCount}>
          <span className={s.title}>计划开支</span>
          <p className={s.count}>
            <span>¥</span>
            <span>5000</span>
            <span>.00</span>
          </p>
        </div>
        <div className={s.detailBox}>
          <p className={s.out}>
            <span>本月支出</span>
            <span>0.00</span>
          </p>
          <p className={s.in}>
            <span>本月剩余</span>
            <span>0.00</span>
          </p>
          <p className={s.progress}>
            <span className={s.finish} />
          </p>
          <p className={s.income}>
            <span>月工资：10000.00</span>
            <span>剩余：5000.00</span>
          </p>
        </div>
      </>
    )
  }

  return (
    <div className={s.cardBox}>
      <div className={s.contentBox}>{hasData ? renderContent() : <p className={s.noData}>暂无数据</p>}</div>
    </div>
  )
}

export default Card
