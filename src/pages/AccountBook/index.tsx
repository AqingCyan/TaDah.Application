import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Swiper, SwiperSlide } from 'swiper/react'
import TopInfo from '@/components/TopInfo'
import Card from '@/components/Card'
import darkGreen from './background/darkGreen.svg'
import type { MonthData } from '@/pages/AccountBook/interface'
import { fetchMonthData } from '@/services/tally'
import 'swiper/css'
import s from './index.module.less'

const year = dayjs().year()
const month = dayjs().month() + 1

const AccountBook = () => {
  const [currentMonthData, setCurrentMonthData] = useState<MonthData>()
  const [lastMonthData, setLastMonthData] = useState<MonthData>()
  const [nextMonthData, setNextMonthData] = useState<MonthData>()

  /**
   * 设置月份信息
   * @param year
   * @param month
   * @param setData
   */
  const handleFetchAndSetData = (
    year: number,
    month: number,
    setData: Dispatch<SetStateAction<MonthData | undefined>>,
  ) => {
    fetchMonthData(year, month).then((res) => {
      if (res.data) {
        const { income, target, residueTarget, currentSalary } = res.data
        setData({
          income,
          target,
          outCount: target - residueTarget,
          residueCount: residueTarget,
          currentSalary,
        })
      }
    })
  }

  useEffect(() => {
    handleFetchAndSetData(year, month, setCurrentMonthData)
    handleFetchAndSetData(month === 1 ? year - 1 : year, month === 1 ? 12 : month - 1, setLastMonthData)
    handleFetchAndSetData(month === 12 ? year + 1 : year, month === 12 ? 1 : month + 1, setNextMonthData)
  }, [])

  return (
    <div className={s.pageContainer}>
      <section className={s.cardBox} style={{ background: `url(${darkGreen})` }}>
        <div className={s.topInfoBox}>
          <TopInfo text={dayjs().format('YYYY年MM月')} />
        </div>

        <div className={s.swiper}>
          <Swiper slidesPerView={2} spaceBetween={230} onSlideChange={(val) => console.log(val)} initialSlide={1}>
            <SwiperSlide className={`${s.firstOne} ${Boolean(lastMonthData) ? '' : s.noDataOne}`}>
              <Card dataInfo={lastMonthData} hasData={Boolean(lastMonthData)} />
            </SwiperSlide>
            <SwiperSlide className={Boolean(currentMonthData) ? '' : s.noDataOne}>
              <Card dataInfo={currentMonthData} hasData={Boolean(currentMonthData)} />
            </SwiperSlide>
            <SwiperSlide className={Boolean(nextMonthData) ? '' : s.noDataOne}>
              <Card dataInfo={nextMonthData} hasData={Boolean(nextMonthData)} />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </div>
  )
}

export default AccountBook
