import React, { useEffect, useState } from 'react'
import { history } from 'umi'
import Toast from '@/components/Toast'
import { useAtom } from 'jotai'
import { currentExpressInfoAtom } from '@/models/useCurrentExpressInfo'
import { loadDetailMap } from '@/services/expressage'
import s from './index.module.less'
import dayjs from 'dayjs'

const ExpressMap = () => {
  const [currentExpressInfo] = useAtom(currentExpressInfoAtom)

  const [info, setInfo] = useState<EXPRESS.MapInfo>()

  useEffect(() => {
    if (currentExpressInfo) {
      loadDetailMap(currentExpressInfo).then((res) => {
        if (res.data) {
          setInfo(res.data)
        } else {
          Toast.show('加载信息错误')
        }
      })
    } else {
      history.push('/express')
    }
  }, [currentExpressInfo])

  return (
    <div className={s.pageContainer}>
      <section className={s.mapBox}>{info?.trailUrl ? <iframe src={info.trailUrl} /> : '地图丢掉了'}</section>

      {info ? (
        <section className={s.detailBox}>
          <h3>{info.nu}</h3>
          {info.data.map((item) => (
            <div key={item.time} className={s.itemBox}>
              <div className={s.left}>
                <span>{dayjs(item.time).format('MM-DD')}</span>
                <span>{dayjs(item.time).format('HH:mm')}</span>
              </div>
              <div className={s.mid} />
              <div className={s.right}>{item.context}</div>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  )
}

export default ExpressMap
