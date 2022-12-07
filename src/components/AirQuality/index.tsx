import React, { useMemo } from 'react'
import s from './index.module.less'

interface AirQualityProps {
  airQuality: WEATHER.AirQuality
}

const AirQuality: React.FC<AirQualityProps> = ({ airQuality }) => {
  const qualityPosition = useMemo(() => {
    const count = parseInt(airQuality.air.city.aqi, 10)
    return count > 400 ? 400 : (count / 400) * 82.9
  }, [airQuality.air.city.aqi])

  return (
    <section className={s.currentAirBox}>
      <h2>当前空气质量</h2>
      <div className={s.airQuality}>
        <p className={s.quality}>空气质量 {airQuality.air.city.quality}</p>
        <p className={s.quality}>aqi值 {airQuality.air.city.aqi}</p>
        <p className={s.api}>
          <span className={s.bar} style={{ left: `${qualityPosition}vw` }} />
        </p>
        <p className={s.mark}>
          空气质量指数，是定量描述空气质量状况的非线性无量纲指数。其数值越大、等级和类别越高、颜色越深，代表空气污染状况越严重，对人体的健康危害也就越大。
        </p>
      </div>
    </section>
  )
}

export default AirQuality
