import React, { useMemo } from 'react'
import Sunny from '@/components/WeatherShow/components/Sunny'
import Cloudy from '@/components/WeatherShow/components/Cloudy'
import Stormy from '@/components/WeatherShow/components/Stormy'
import Snowy from '@/components/WeatherShow/components/Snowy'
import NightClean from '@/components/WeatherShow/components/NightClean'

export const weatherCodeCollection = {
  sunnyKey: [0, 2, 39],
  cloudKey: [4, 5, 6, 7, 8, 9, 26, 27, 28, 29, 39, 31, 32, 33, 34, 35, 36, 37],
  stormKey: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  snowKey: [21, 22, 23, 24, 25, 38],
  nightKey: [1, 3],
}

const WeatherShow: React.FC<{ code: string }> = ({ code }) => {
  return useMemo(() => {
    const key = parseInt(code, 10)
    if (weatherCodeCollection.sunnyKey.includes(key)) return <Sunny />
    if (weatherCodeCollection.cloudKey.includes(key)) return <Cloudy />
    if (weatherCodeCollection.stormKey.includes(key)) return <Stormy />
    if (weatherCodeCollection.snowKey.includes(key)) return <Snowy />
    if (weatherCodeCollection.nightKey.includes(key)) return <NightClean />
    return <></>
  }, [code])
}

export default WeatherShow
