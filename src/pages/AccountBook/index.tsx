import React, { useEffect, useMemo, useRef, useState } from 'react'
import { history } from 'umi'
import dayjs from 'dayjs'
import { Swiper, SwiperSlide } from 'swiper/react'
import useTheme from '@/hooks/useTheme'
import TopInfo from '@/components/TopInfo'
import Card from '@/components/Card'
import Emoji from '@/components/Emoji'
import darkGreen from './background/darkGreen.svg'
import darkPurple from './background/darkPurple.svg'
import lightGreen from './background/lightGreen.svg'
import addRecordIcon from './icon/addRecordIcon.svg'
import addCardInfoIcon from './icon/addCardInfoIcon.svg'
import { Swiper as SwiperClass } from 'swiper/types'
import type { MonthData } from '@/pages/AccountBook/interface'
import { fetchMonthData, fetchTallyList } from '@/services/tally'
import 'swiper/css'
import s from './index.module.less'

const year = dayjs().year()
const month = dayjs().month() + 1

const AccountBook = () => {
  const { inDark, theme } = useTheme()
  const swiper = useRef<SwiperClass>()
  const [monthDataList, setMonthDataList] = useState<(MonthData | undefined)[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(1)
  const [tallyList, setTallyList] = useState<TALLY.TALLY_ITEM[]>([])

  useEffect(() => {
    fetchMonthData().then((res) => {
      const list: (MonthData | undefined)[] = []
      if (res.data) {
        res.data.forEach((item) => {
          if (item) {
            const { target, residueTarget, currentSalary } = item
            list.push({ ...item, target, outCount: target - residueTarget, residueCount: residueTarget, currentSalary })
          } else {
            list.push(undefined)
          }
        })
      }
      setMonthDataList([undefined, ...list, undefined])
    })
  }, [])
  useEffect(() => {
    if (swiper.current && monthDataList.length) {
      const index = monthDataList.findIndex((item) => item?.year === year && item.month === month)
      setCurrentIndex(index)
      swiper.current?.slideTo(index)
    }
  }, [swiper, monthDataList])

  useEffect(() => {
    if (monthDataList[currentIndex] && monthDataList[currentIndex]?.id) {
      fetchTallyList(monthDataList[currentIndex]!.id).then((res) => {
        setTallyList(res.data)
      })
    }
  }, [currentIndex, monthDataList])

  const background = useMemo(() => {
    if (inDark) {
      return theme === 'green' ? `url(${darkGreen})` : `url(${darkPurple})`
    }
    return theme === 'green' ? `url(${lightGreen})` : '#ffffff'
  }, [inDark, theme])

  return (
    <div className={s.pageContainer}>
      <section className={s.cardBox} style={{ background }}>
        <div className={s.topInfoBox}>
          <TopInfo text={dayjs().format('YYYY年MM月')} mustColor={!inDark && theme !== 'green' ? undefined : 'dark'} />
        </div>

        <div className={s.swiper}>
          <Swiper
            slidesPerView={2}
            spaceBetween={230}
            onSwiper={(s) => (swiper.current = s)}
            onSlideChange={(val) => {
              const data = monthDataList[val.activeIndex]
              if (data) {
                setCurrentIndex(val.activeIndex)
              } else {
                val.slideTo(currentIndex)
              }
            }}
          >
            {monthDataList.map((item, index) => (
              <SwiperSlide
                key={index}
                className={`${index === 0 ? s.firstOne : ''} ${Boolean(item) ? '' : s.noDataOne}`}
              >
                <Card dataInfo={item} hasData={Boolean(item)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section className={s.listBox}>
        {tallyList.map((item) => (
          <div key={item.createTime} className={s.oneItemBox}>
            <p className={s.time}>{dayjs(item.createTime).format('MM月DD日 hh:mm A')}</p>
            <div className={s.itemCard}>
              <div className={s.emojiBox}>
                <Emoji shortcodes={item.amountTag.emojiName} size="2.2em" />
              </div>
              <div className={s.content}>
                <p>{item.amountTag.tagName}</p>
                <p>{item.description}</p>
              </div>
              <span className={s.price}>
                {item.amountType === 0 ? '-' : '+'}¥{(item.count / 100).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </section>
      <div className={s.addRecord} onClick={() => history.push('/addRecord')}>
        <img src={addRecordIcon} alt="addRecordIcon" />
      </div>
      <div className={s.editCardInfo} onClick={() => history.push('/addCardInfo')}>
        <img src={addCardInfoIcon} alt="addCardInfoIcon" />
      </div>
    </div>
  )
}

export default AccountBook
