import React from 'react'
import s from './index.module.less'

interface CardProps {
  dataInfo:
    | { income: number; target: number; outCount: number; residueCount: number; currentSalary: number }
    | undefined
  hasData?: boolean
}

const Card: React.FC<CardProps> = (props) => {
  const { hasData = false, dataInfo } = props

  const handleShowFenAmount = (count: number) => (count / 100).toFixed(2)

  const renderContent = () => {
    return dataInfo ? (
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
            <span>{handleShowFenAmount(dataInfo.outCount)}</span>
          </p>
          <p className={s.in}>
            <span>本月剩余</span>
            <span>{handleShowFenAmount(dataInfo.residueCount)}</span>
          </p>
          <p className={s.progress}>
            <span className={s.finish} style={{ width: `${(dataInfo.outCount / dataInfo.target) * 100}%` }} />
          </p>
          <p className={s.income}>
            <span>月工资：{handleShowFenAmount(dataInfo.income)}</span>
            <span>剩余：{handleShowFenAmount(dataInfo.currentSalary)}</span>
          </p>
        </div>
      </>
    ) : null
  }

  return (
    <div className={s.cardBox}>
      <div className={s.contentBox}>{hasData ? renderContent() : <p className={s.noData}>暂无数据</p>}</div>
    </div>
  )
}

export default Card
