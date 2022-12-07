import React from 'react'
import dayjs from 'dayjs'
import useTheme from '@/hooks/useTheme'
import * as weatherIcons from '@/components/WeatherIcons'
import s from './index.module.less'

export const weekMap = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '日',
}

interface Next5DaysWeatherProps {
  next5DaysWeather: WEATHER.Next5DayWeather
}

const Next5DaysWeather: React.FC<Next5DaysWeatherProps> = ({ next5DaysWeather }) => {
  const { inDark } = useTheme()

  return (
    <section className={s.next5DayBox}>
      <h2>未来5日天气</h2>
      <div className={s.content}>
        {(next5DaysWeather.daily || []).map((item) => (
          <div key={item.date} className={s.dayItem}>
            {/* @ts-ignore */}
            <span className={s.week}>周{weekMap[dayjs(item.date).format('d')]}</span>
            <div className={s.weatherIcon}>
              白天
              <span className={s.temperature}>{item.high}</span>
              {/* @ts-ignore */}
              <img src={weatherIcons[`Icon${item.code_day}`](inDark)} alt="icon" />
            </div>
            <div className={s.weatherIcon}>
              晚上
              <span className={s.temperature}>{item.low}</span>
              {/* @ts-ignore */}
              <img src={weatherIcons[`Icon${item.code_night}`](inDark)} alt="icon" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Next5DaysWeather
