import React, { useEffect, useMemo, useState } from 'react'
import { history } from 'umi'
import TopInfo from '@/components/TopInfo'
import FormInput from '@/components/FormInput'
import Toast from '@/components/Toast'
import useTheme from '@/hooks/useTheme'
import nothingBlack from '@/assets/nothingBlack.svg'
import nothingWhite from '@/assets/nothingWhite.svg'
import closeWhite from '@/assets/closeWhite.svg'
import closeBlack from '@/assets/closeBlack.svg'
import expressWhite from './icons/expressWhite.svg'
import expressBlack from './icons/expressBlack.svg'
import truckIcon from './icons/truck.svg'
import attainIcon from './icons/attain.svg'
import { loadExpressRoad } from '@/services/expressage'
import { stateMap } from './config'
import { useAtom } from 'jotai'
import { currentExpressInfoAtom } from '@/models/useCurrentExpressInfo'
import s from './index.module.less'

const Expressage = () => {
  const { inDark } = useTheme()

  const [, setCurrentExpressInfo] = useAtom(currentExpressInfoAtom)

  const nothingSvg = useMemo(() => (inDark ? nothingWhite : nothingBlack), [inDark])
  const expressIcon = useMemo(() => (inDark ? expressWhite : expressBlack), [inDark])
  const closeIcon = useMemo(() => (inDark ? closeWhite : closeBlack), [inDark])

  const [courierNumber, setCourierNumber] = useState<string>('')
  const [info, setInfo] = useState<EXPRESS.ExpressInfo[]>([])

  /**
   * 初始化数据
   */
  const initData = () => {
    const listCourierNumber = window.localStorage.getItem('listCourierNumber')
    let list: string[] = []
    try {
      if (listCourierNumber) {
        list = JSON.parse(listCourierNumber)
      }
    } catch (error) {}
    const promiseList: Promise<any>[] = []
    list.forEach((item) => {
      promiseList.push(loadExpressRoad(item))
    })

    Promise.all(promiseList).then((res) => {
      const result = res.map((item) => item.data)
      setInfo(result)
    })
  }

  useEffect(initData, [])

  /**
   * 搜索列表
   */
  const searchList = () => {
    const listCourierNumber = window.localStorage.getItem('listCourierNumber')
    let list: string[] = []
    try {
      if (listCourierNumber) {
        list = JSON.parse(listCourierNumber)
        if (list.length >= 3) {
          Toast.show('最多缓存三个快递信息，请删除历史信息')
          return
        }
      }
    } catch (error) {}
    if (courierNumber && !list.includes(courierNumber)) {
      loadExpressRoad(courierNumber).then((res) => {
        if (res.data) {
          setInfo([...info, res.data])
          list.push(courierNumber)
          window.localStorage.setItem('listCourierNumber', JSON.stringify(list))
        } else {
          Toast.show(res.message)
        }
      })
    } else {
      Toast.show('快递单号有误或重复 😵‍💫')
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

      {info.length ? (
        <section className={s.dataBox}>
          {info.map((item) => (
            <div
              className={s.card}
              key={item.nu}
              onClick={() => {
                const from = item?.routeInfo?.from ? item.routeInfo.from.name.split(',').join('') : ''
                const to = item?.routeInfo?.to ? item.routeInfo.to.name.split(',').join('') : ''
                if (from) {
                  setCurrentExpressInfo({
                    from,
                    to,
                    num: item.nu,
                    com: item.com,
                    mapConfigKey: inDark ? 'a64PM4p7tdung2GPsY' : 'BHDyNJhRNJTB2k1G96',
                  })
                  history.push('/expressMap')
                } else {
                  Toast.show('包裹还未开始走动')
                }
              }}
            >
              <img
                className={s.closeIcon}
                src={closeIcon}
                alt="closeIcon"
                onClick={(e) => {
                  e.stopPropagation()
                  const result = info.filter((ele) => ele.nu !== item.nu)
                  setInfo(result)
                  window.localStorage.setItem('listCourierNumber', JSON.stringify(result.map((item) => item.nu)))
                }}
              />
              <p className={s.title}>
                {item.comZh} · {item.nu}
              </p>
              <div className={s.lineBox}>
                <span className={s.start} />
                <span className={s.line} />
                <span className={s.mid}>
                  <img src={item.state.startsWith('3') ? attainIcon : truckIcon} alt="icon" />
                </span>
                <span className={s.line} style={item.state.startsWith('3') ? undefined : { background: '#e2e2e2' }} />
                <span className={s.end} style={item.state.startsWith('3') ? undefined : { background: '#e2e2e2' }} />
              </div>
              <div className={s.fromTo}>
                <div className={s.location}>
                  {item.routeInfo.from ? item.routeInfo.from.name.split(',')[0] : '未知'}
                </div>
                {/* @ts-ignore */}
                <div className={s.location}>{stateMap[item.state]}</div>
                <div className={s.location}>
                  {item.routeInfo.to ? item.routeInfo.to.name.split(',')[0] : '暂未达到'}
                </div>
              </div>
              <p className={s.baseInfo}>{item.data[0].location}</p>
              <p className={s.detail}>{item.data[0].context}</p>
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
