import React from 'react'
import useTheme from '@/hooks/useTheme'
import s from './index.module.less'

interface NextAlarmProps {
  nextAlarmWeather: WEATHER.NextAlarmItem
}

const NextAlarm: React.FC<NextAlarmProps> = ({ nextAlarmWeather }) => {
  const { inDark } = useTheme()

  return (
    <div className={s.alarmInfo} style={{ background: inDark ? 'rgba(231, 117, 92, 0.4)' : 'rgba(231, 117, 92, 0.3)' }}>
      <p className={s.title}>
        {nextAlarmWeather.alarms[0].type}
        {nextAlarmWeather.alarms[0].level}
        预警
      </p>
      <p className={s.description}>{nextAlarmWeather.alarms[0].title}</p>
    </div>
  )
}

export default NextAlarm
