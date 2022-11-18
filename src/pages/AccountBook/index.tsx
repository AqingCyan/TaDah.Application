import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import s from './index.module.less'
import Card from '@/components/Card'

const AccountBook = () => {
  return (
    <div className={s.pageContainer}>
      <Swiper
        // spaceBetween={50}
        // slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
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
  )
}

export default AccountBook
