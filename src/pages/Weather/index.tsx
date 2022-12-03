import React from 'react'
import dayjs from 'dayjs'
import useTheme from '@/hooks/useTheme'
import TopInfo from '@/components/TopInfo'
import Sunny from './components/Sunny'
import Cloudy from './components/Cloudy'
import Snowy from './components/Snowy'
import Stormy from './components/Stormy'
import NightClean from './components/NightClean'
import * as weatherIcons from './components/WeatherIcons'
import s from './index.module.less'

const Weather = () => {
  const { inDark } = useTheme()

  return (
    <div className={s.pageContainer}>
      <TopInfo text={dayjs().format('YYYY年MM月')} />
      <section className={s.baseWeatherBox}>
        <div className={s.weatherShow}>
          <Sunny />
        </div>
        <div className={s.weatherInfo}>
          <div className={s.baseInfo}>
            <h2>自贡市</h2>
            <p>晴天</p>
          </div>
          <div className={s.temperature}>10</div>
        </div>
      </section>

      <section className={s.oneDay}>
        <h2>24小时天气预测</h2>
        <div className={s.timeWeatherBox}>
          <div className={s.timeWeather}>
            <span className={s.time}>现在</span>
            <img src={weatherIcons[`Icon${0}`](inDark)} alt="icon" />
            <span className={s.temperature}>10</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Weather
