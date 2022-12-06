import React, { useEffect, useMemo, useState } from 'react'
import { history } from 'umi'
import Toast from '@/components/Toast'
import { useAtom } from 'jotai'
import { currentExpressInfoAtom } from '@/models/useCurrentExpressInfo'
import { loadDetailMap } from '@/services/expressage'
import dayjs from 'dayjs'
import FormInput from '@/components/FormInput'
import expressWhite from '@/pages/Expressage/icons/expressWhite.svg'
import expressBlack from '@/pages/Expressage/icons/expressBlack.svg'
import s from './index.module.less'
import useTheme from '@/hooks/useTheme'

const ExpressMap = () => {
  const { inDark } = useTheme()

  const [currentExpressInfo, setCurrentExpressInfo] = useAtom(currentExpressInfoAtom)

  const [info, setInfo] = useState<EXPRESS.MapInfo>()
  const [currentTo, setCurrentTo] = useState<string>('')
  const [showForm, setShowForm] = useState<boolean>(false)

  const expressIcon = useMemo(() => (inDark ? expressWhite : expressBlack), [inDark])

  useEffect(() => {
    if (currentExpressInfo) {
      if (!currentExpressInfo.to) {
        setShowForm(true)
        return
      }
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
      <section className={s.mapBox} style={showForm ? { height: '30vh' } : undefined}>
        {info?.trailUrl ? <iframe src={info.trailUrl} /> : ''}
      </section>

      {showForm ? (
        <div className={s.inputBox}>
          <FormInput
            placeholder="ops! 目的地丢失，请输入寄送目的地"
            icon={<img src={expressIcon} className={s.inputIcon} alt="expressIcon" />}
            value={currentTo}
            onChange={(e) => setCurrentTo(e.target.value.trim())}
          />
          <button
            onClick={() => {
              if (currentTo.length) {
                setCurrentExpressInfo({ ...currentExpressInfo!, to: currentTo })
                setShowForm(false)
              } else {
                Toast.show('还未输入目的地信息')
              }
            }}
          >
            确认地址
          </button>
        </div>
      ) : null}

      {info ? (
        <section className={s.detailBox}>
          <h3>{info.nu}</h3>
          <div className={s.listBox}>
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
          </div>
        </section>
      ) : null}
    </div>
  )
}

export default ExpressMap
