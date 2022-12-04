import React, { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import TopInfo from '@/components/TopInfo'
import FormInput from '@/components/FormInput'
import Toast from '@/components/Toast'
import useTheme from '@/hooks/useTheme'
import nothingBlack from '@/assets/nothingBlack.svg'
import nothingWhite from '@/assets/nothingWhite.svg'
import expressWhite from './icons/expressWhite.svg'
import expressBlack from './icons/expressBlack.svg'
import { loadExpressRoad } from '@/services/expressage'
import s from './index.module.less'

const Expressage = () => {
  const { inDark } = useTheme()

  const nothingSvg = useMemo(() => (inDark ? nothingWhite : nothingBlack), [inDark])
  const expressIcon = useMemo(() => (inDark ? expressWhite : expressBlack), [inDark])

  const [courierNumber, setCourierNumber] = useState<string>('')
  const [info, setInfo] = useState<{ company: string; location: EXPRESS.Location[] }>()

  /**
   * 搜索列表
   */
  const searchList = () => {
    if (courierNumber) {
      loadExpressRoad(courierNumber).then((res) => {
        if (res.data) {
          setInfo(res.data)
        } else {
          Toast.show(res.message)
        }
      })
    } else {
      Toast.show('请输入快递单号 😵‍💫')
    }
  }

  return (
    <div className={s.pageContainer}>
      <TopInfo text="TaDah 快递查询" />

      <section className={s.searchBox}>
        <FormInput
          placeholder="请输入快递单号"
          icon={<img src={expressIcon} className={s.inputIcon} alt="expressIcon" />}
          value={courierNumber}
          onChange={(e) => setCourierNumber(e.target.value.trim())}
        />
        <button className={s.searchButton} onClick={searchList}>
          搜索
        </button>
      </section>

      {info ? (
        <section className={s.dataBox}>
          <h2>{info.company}</h2>

          {info.location.map((item, index) => (
            <div
              key={item.time}
              className={s.locationBox}
              style={index === 0 ? { borderColor: 'var(--primary-color)' } : undefined}
            >
              <p className={s.topMessage} style={index === 0 ? { borderColor: 'var(--primary-color)' } : undefined}>
                <span>{item.status}</span> {dayjs(item.time).format('M月DD日 HH:mm')}
              </p>
              <p className={s.content}>{item.context}</p>
            </div>
          ))}
        </section>
      ) : (
        <section className={s.emptyBox}>
          <img src={nothingSvg} alt="nothingSvg" />
        </section>
      )}
    </div>
  )
}

export default Expressage
