import React, { useEffect, useRef, useState } from 'react'
import { history } from 'umi'
import dayjs from 'dayjs'
import { Swiper, SwiperSlide } from 'swiper/react'
import TopInfo from '@/components/TopInfo'
import Card from '@/components/Card'
import Emoji from '@/components/Emoji'
import darkGreen from './background/darkGreen.svg'
import { Swiper as SwiperClass } from 'swiper/types'
import type { MonthData } from '@/pages/AccountBook/interface'
import { fetchMonthData, fetchTallyList } from '@/services/tally'
import 'swiper/css'
import s from './index.module.less'

const year = dayjs().year()
const month = dayjs().month() + 1

const AccountBook = () => {
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

  return (
    <div className={s.pageContainer}>
      <section className={s.cardBox} style={{ background: `url(${darkGreen})` }}>
        <div className={s.topInfoBox}>
          <TopInfo text={dayjs().format('YYYY年MM月')} />
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
                <Emoji shortcodes={item.amountTag.emojiName} size="2.5em" />
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
      <button className={s.addRecord} onClick={() => history.push('/addRecord')}>
        +
      </button>
    </div>
  )
}

export default AccountBook
