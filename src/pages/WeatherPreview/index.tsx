import React, { useEffect, useMemo, useState } from 'react'
import { history } from 'umi'
import { useAtom } from 'jotai'
import dayjs from 'dayjs'
import Toast from '@/components/Toast'
import useTheme from '@/hooks/useTheme'
import TopInfo from '@/components/TopInfo'
import WeatherShow from '@/components/WeatherShow'
import { fetchCurrentWeather, fetchNext24HoursWeather, fetchNextAlarm } from '@/services/weather'
import nothingWhite from '@/assets/nothingWhite.svg'
import nothingBlack from '@/assets/nothingBlack.svg'
import * as weatherIcons from '@/components/WeatherIcons'
import Next24HoursWeather from '@/components/Next24HoursWeather'
import { currentWeatherDetailAtom } from '@/models/useCurrentWeatherInfo'
import s from './index.module.less'

const WeatherPreview = () => {
  const { inDark } = useTheme()

  const [, setCurrentWeather] = useAtom(currentWeatherDetailAtom)

  const nothingSvg = useMemo(() => (inDark ? nothingWhite : nothingBlack), [inDark])

  const [cities, setCities] = useState<string[]>([])
  const [previewList, setPreviewList] = useState<WEATHER.CurrentWeatherItem[]>([])
  const [topCityNext24, setTopCityNext24] = useState<WEATHER.OneDayEveryHourWeather>()
  const [topCityNextAlarm, setTopCityNextAlarm] = useState<WEATHER.NextAlarmItem>()

  /**
   * 初始化缓存
   */
  const initStorage = () => {
    let storage = window.localStorage.getItem('cityCollection')
    setCurrentWeather(null)
    if (storage) {
      try {
        const list: { cityCode: string; cityName: string }[] = JSON.parse(storage)
        if (Array.isArray(list)) setCities(list.map((item) => item.cityCode))
      } catch (error) {}
    }
  }

  /**
   * 初始化数据
   */
  const initListData = () => {
    if (cities.length) {
      const promiseList: API.FetchResponse<{ results: WEATHER.CurrentWeatherItem[] }>[] = []
      cities.forEach((item) => {
        promiseList.push(fetchCurrentWeather(item))
      })

      Promise.all(promiseList)
        .then((res) => {
          const result = res.filter((item) => Boolean(item.data.results?.length)).map((item) => item.data.results[0])
          setPreviewList(result)
        })
        .then(() => {
          fetchNext24HoursWeather(cities[0])
            .then((res) => {
              if (res.data) setTopCityNext24(res.data.results[0])
            })
            .then(() => {
              fetchNextAlarm(cities[0]).then((res) => {
                if (res.data) setTopCityNextAlarm(res.data.results[0])
              })
            })
        })
    }
  }

  useEffect(initStorage, [])
  useEffect(initListData, [cities])

  return (
    <div className={s.pageContainer}>
      <TopInfo text="TaDah 天气列表" />

      {previewList.length > 0 ? (
        <>
          <section
            className={s.topCard}
            onClick={() => {
              setCurrentWeather(previewList[0])
              history.push('/weatherDetail')
            }}
          >
            <p className={s.date}>
              <span>{dayjs().format('YYYY年MM月DD日')}</span>
              <span>{dayjs().format('hh:mm A')}</span>
            </p>
            <div className={s.showBox}>
              <div className={s.comp}>
                <WeatherShow code={previewList[0].now.code} />
              </div>
              <div className={s.cityInfo}>
                <span className={s.temperature}>{previewList[0].now.temperature}</span>
                <span className={s.text}>天气 {previewList[0].now.text}</span>
                <p className={s.city}>{previewList[0].location.path.split(',').reverse().join(' ')}</p>
              </div>
            </div>
            <p className={s.updateTime}>
              数据更新时间: {dayjs(previewList[0].last_update).format('YYYY-MM-DD hh:mm A')}
            </p>
          </section>

          {topCityNext24 ? <Next24HoursWeather next24HoursWeather={topCityNext24} /> : null}

          <section className={s.otherCities}>
            <h2>更多城市信息</h2>

            {topCityNextAlarm?.alarms.length ? (
              <div
                className={s.alarmInfo}
                style={{ background: inDark ? 'rgba(231, 117, 92, 0.4)' : 'rgba(231, 117, 92, 0.3)' }}
              >
                <p className={s.title}>
                  {topCityNextAlarm.alarms[0].type}
                  {topCityNextAlarm.alarms[0].level}
                  预警
                </p>
                <p className={s.description}>{topCityNextAlarm.alarms[0].title}</p>
              </div>
            ) : null}

            {previewList.slice(1).map((item) => (
              <div
                className={s.previewBox}
                key={item.location.path}
                onClick={() => {
                  setCurrentWeather(item)
                  history.push('/weatherDetail')
                }}
              >
                <div className={s.iconBox}>
                  {/* @ts-ignore */}
                  <img src={weatherIcons[`Icon${item.now.code}`](inDark)} alt="icon" />
                </div>
                <div className={s.infoText}>
                  <div className={s.leftInfo}>
                    <span>{item.now.text}</span>
                    <span>{item.location.path.split(',').slice(0, 3).reverse().join(' ')}</span>
                  </div>
                  <span className={s.temperature}>{item.now.temperature}</span>
                </div>
              </div>
            ))}

            <button
              className={s.addButton}
              onClick={() => {
                if (cities.length < 4) {
                  history.push('/weatherDetail')
                } else {
                  Toast.show('最多缓存四个天气', { position: 'center' })
                }
              }}
            >
              添加地区
            </button>
          </section>

          <p className={s.dataFrom}>天气数据来源于心知天气平台</p>
        </>
      ) : null}

      {previewList.length === 0 ? (
        <div className={s.emptyBox}>
          <img className={s.empty} src={nothingSvg} alt="nothingSvg" />
          <button onClick={() => history.push('/weatherDetail')}>添加天气</button>
        </div>
      ) : null}
    </div>
  )
}

export default WeatherPreview
