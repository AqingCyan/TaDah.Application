import dayjs from 'dayjs'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import * as weatherIcons from '../WeatherIcons'
import s from './index.module.less'

interface Next24HoursWeatherProps {
  next24HoursWeather: WEATHER.OneDayEveryHourWeather
}

const Next24HoursWeather: React.FC<Next24HoursWeatherProps> = ({ next24HoursWeather }) => {
  const { inDark } = useTheme()

  return (
    <section className={s.next24HoursBox}>
      <h2>未来24小时</h2>
      <div className={s.next24HoursList}>
        {next24HoursWeather.hourly.map((item) => (
          <div className={s.weatherBox}>
            {/* @ts-ignore */}
            <img src={weatherIcons[`Icon${item.code}`](inDark)} alt="icon" />
            <span className={s.temperature}>{item.temperature}</span>
            <span className={s.time}>{dayjs(item.time).format('h:mm A')}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Next24HoursWeather
