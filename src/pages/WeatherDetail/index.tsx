import React, { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import useTheme from '@/hooks/useTheme'
import TopInfo from '@/components/TopInfo'
import Sunny from './components/Sunny'
import Cloudy from './components/Cloudy'
import Snowy from './components/Snowy'
import Stormy from './components/Stormy'
import NightClean from './components/NightClean'
import FormInput from '@/components/FormInput'
import * as weatherIcons from './components/WeatherIcons'
import { useAtom } from 'jotai'
import { currentWeatherDetailAtom } from '@/models/useCurrentWeatherInfo'
import PageLoading from '@/components/PageLoading'
import {
  fetchAirQuality,
  fetchCurrentWeather,
  fetchLiveQuality,
  fetchNext24HoursWeather,
  fetchNext5dayWeather,
  searchCity,
} from '@/services/weather'
import Toast from '@/components/Toast'
import { cityIcon, suggestionMap, weekMap } from './config'
import s from './index.module.less'

// TODO 多个城市支持 / 修改城市
const Weather = () => {
  const { inDark } = useTheme()

  const [currentWeatherDetail] = useAtom(currentWeatherDetailAtom)

  const [showSearchList, setShowSearchList] = useState<boolean>(false)
  const [cityKeyword, setCityKeyword] = useState<string>('')
  const [cityList, setCityList] = useState<WEATHER.CityListItem[]>([])
  const [currentCity, setCurrentCity] = useState<{ cityCode: string; cityName: string }>()
  const [currentWeather, setCurrentWeather] = useState<WEATHER.CurrentWeatherItem>()
  const [next24HoursWeather, setNext24HoursWeather] = useState<WEATHER.OneDayEveryHourWeather>()
  const [next5DaysWeather, setNext5DaysWeather] = useState<WEATHER.Next5DayWeather>()
  const [airQuality, setAirQuality] = useState<WEATHER.AirQuality>()
  const [liveQuality, setLiveQuality] = useState<WEATHER.LiveQuality>()

  useEffect(() => {
    if (!currentWeatherDetail) setShowSearchList(true)
  }, [currentWeatherDetail])

  /**
   * 初始化数据
   * TODO 服务端聚合一下数据接口
   */
  const initData = () => {
    if (currentCity) {
      fetchCurrentWeather(currentCity.cityCode).then((res) => {
        if (res.data && res.data.results.length) {
          setCurrentWeather(res.data.results[0])
        }
      })
      fetchNext24HoursWeather(currentCity.cityCode).then((res) => {
        if (res.data && res.data.results.length) {
          setNext24HoursWeather(res.data.results[0])
        }
      })
      fetchNext5dayWeather(currentCity.cityCode).then((res) => {
        if (res.data && res.data.results.length) {
          setNext5DaysWeather(res.data.results[0])
        }
      })
      fetchAirQuality(currentCity.cityCode).then((res) => {
        if (res.data && res.data.results.length) {
          setAirQuality(res.data.results[0])
        }
      })
      fetchLiveQuality(currentCity.cityCode).then((res) => {
        if (res.data && res.data.results.length) {
          setLiveQuality(res.data.results[0])
        }
      })
    }
  }

  useEffect(initData, [currentCity])

  const weatherComp = useMemo(() => {
    const sunnyKey = [0, 2, 39]
    const cloudKey = [4, 5, 6, 7, 8, 26, 27, 28, 29, 39, 31, 32, 33, 34, 35, 36, 37]
    const stormKey = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const snowKey = [21, 22, 23, 24, 25, 38]
    const nightKey = [1, 3]
    if (currentWeather?.now.code) {
      const key = parseInt(currentWeather.now.code, 10)
      if (sunnyKey.includes(key)) return <Sunny />
      if (cloudKey.includes(key)) return <Cloudy />
      if (stormKey.includes(key)) return <Stormy />
      if (snowKey.includes(key)) return <Snowy />
      if (nightKey.includes(key)) return <NightClean />
      return <Cloudy />
    }
    return null
  }, [currentWeather?.now.code])

  /**
   * 加载城市列表
   */
  const loadCityList = () => {
    if (cityKeyword) {
      searchCity(cityKeyword).then((res) => {
        if (res.data) {
          setCityList(res.data.results.filter((ele) => !ele.timezone.includes('America')))
        } else {
          Toast.show('加载城市列表错误')
        }
      })
    } else {
      Toast.show('请输入内容搜索')
    }
  }

  const renderSearchCity = () => {
    return (
      <section className={s.searchCity}>
        <h1>请输入一个城市名</h1>
        <div className={s.searchBox}>
          <FormInput
            icon={<img className={s.inputIcon} src={cityIcon(inDark)} alt="cityIcon" />}
            placeholder="请搜索您的城市"
            value={cityKeyword}
            onChange={(e) => setCityKeyword(e.target.value.trim())}
          />
          <button className={s.searchButton} onClick={loadCityList}>
            搜索
          </button>
        </div>
        <div className={s.cityListBox} style={cityList.length ? undefined : { justifyContent: 'center' }}>
          {cityList.length ? (
            cityList.map((item) => (
              <div
                key={item.id}
                className={`${s.optionsBox} ${currentCity?.cityCode === item.id ? s.selectedOption : ''}`}
                onClick={() => setCurrentCity({ cityCode: item.id, cityName: item.name })}
              >
                {item.path.split(',').reverse().join('-')}
              </div>
            ))
          ) : (
            <PageLoading />
          )}
        </div>
        <button
          className={s.submit}
          onClick={() => {
            if (currentCity) {
              window.localStorage.setItem('cityInfo', JSON.stringify(currentCity))
              setShowSearchList(false)
            } else {
              Toast.show('您未选择城市')
            }
          }}
        >
          确定城市
        </button>
      </section>
    )
  }

  return (
    <div className={s.pageContainer}>
      <TopInfo text={dayjs().format('YYYY年MM月')} />
      {showSearchList ? (
        renderSearchCity()
      ) : (
        <>
          <section className={s.baseWeatherBox}>
            <div className={s.weatherShow}>{weatherComp}</div>
            <div className={s.weatherInfo}>
              <div className={s.baseInfo}>
                <h2>{currentWeather?.location.name}</h2>
                <p>{currentWeather?.now.text}</p>
              </div>
              <div className={s.temperature}>{currentWeather?.now.temperature}</div>
            </div>
          </section>

          <section className={s.oneDay}>
            <h2>24小时天气预报</h2>
            <div className={s.timeWeatherBox}>
              {(next24HoursWeather?.hourly || []).map((item) => (
                <div className={s.timeWeather} key={item.time}>
                  <span className={s.time}>{dayjs(item.time).format('HH:mm')}</span>
                  {/* @ts-ignore */}
                  <img src={weatherIcons[`Icon${item.code}`](inDark)} alt="icon" />
                  <span className={s.temperature}>{item.temperature}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={s.oneDay}>
            <h2>未来5日天气预报</h2>
            <div className={s.next5DayBox}>
              {(next5DaysWeather?.daily || []).map((item) => (
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

          <section className={s.oneDay}>
            <h2>当前空气质量</h2>
            <div className={s.airQuality}>
              {airQuality?.air.city.quality.length! > 1 ? null : (
                <span className={s.name}>{airQuality?.air.city.quality}</span>
              )}
              <p className={s.qualityTitle}>
                空气质量 {airQuality?.air.city.quality.length! > 1 ? airQuality?.air.city.quality.length : ''}
              </p>
              <p className={s.quality}>PM2.5平均值 {airQuality?.air.city.pm25}μg/m³</p>
              <p className={s.quality}>臭氧平均值 {airQuality?.air.city.o3}μg/m³</p>
              <p className={s.quality}>aqi值 {airQuality?.air.city.aqi}</p>
              <p className={s.api}>
                <span
                  className={s.bar}
                  style={{
                    left:
                      ((parseInt(airQuality?.air.city.aqi!, 10) > 400 ? 400 : parseInt(airQuality?.air.city.aqi!, 10)) /
                        400) *
                      622,
                  }}
                />
              </p>
            </div>
          </section>

          {liveQuality && (
            <section className={s.liveSuggestion}>
              {suggestionMap.map((item) => (
                <div className={s.box} key={item.key}>
                  <h2>{item.name}</h2>
                  {/* @ts-ignore */}
                  <h3>{liveQuality?.suggestion[item.key].brief}</h3>
                  {/* @ts-ignore */}
                  <p>{liveQuality?.suggestion[item.key].details}</p>
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </div>
  )
}

export default Weather
