import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Card from '@/components/Card'
import darkGreen from './background/darkGreen.svg'
import s from './index.module.less'
import TopInfo from '@/components/TopInfo'
import dayjs from 'dayjs'

const AccountBook = () => {
  return (
    <div className={s.pageContainer}>
      <section className={s.cardBox} style={{ background: `url(${darkGreen})` }}>
        <div className={s.topInfoBox}>
          <TopInfo text={dayjs().format('YYYY年MM月')} />
        </div>

        <div className={s.swiper}>
          <Swiper slidesPerView={2} spaceBetween={230} onSlideChange={(val) => console.log(val)}>
            <SwiperSlide className={s.firstOne}>
              <Card />
            </SwiperSlide>
            <SwiperSlide>
              <Card />
            </SwiperSlide>
            <SwiperSlide>
              <Card />
            </SwiperSlide>
            <SwiperSlide>
              <Card />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </div>
  )
}

export default AccountBook
