import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import useTheme from '@/hooks/useTheme'
import FormInput from '@/components/FormInput'
import { useAtom } from 'jotai'
import { currentWeatherDetailAtom, next24HoursWeatherAtom, nextAlarmWeatherAtom } from '@/models/useCurrentWeatherInfo'
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
import { cityIcon, suggestionMap } from './config'
import WeatherShow from '@/components/WeatherShow'
import Next24HoursWeather from '@/components/Next24HoursWeather'
import Next5DaysWeather from '@/components/Next5DaysWeather'
import AirQuality from '@/components/AirQuality'
import s from './index.module.less'
import TopInfo from '@/components/TopInfo'

const Weather = () => {
  const { inDark } = useTheme()

  const [currentWeather, setCurrentWeather] = useAtom(currentWeatherDetailAtom)
  const [next24HoursWeather, setNext24HoursWeather] = useAtom(next24HoursWeatherAtom)
  const [nextAlarmWeather, setNextAlarmWeather] = useAtom(nextAlarmWeatherAtom)

  const [showSearchList, setShowSearchList] = useState<boolean>(false)
  const [cityKeyword, setCityKeyword] = useState<string>('')
  const [cityList, setCityList] = useState<WEATHER.CityListItem[]>([])
  const [currentCity, setCurrentCity] = useState<{ cityCode: string; cityName: string }>()
  const [next5DaysWeather, setNext5DaysWeather] = useState<WEATHER.Next5DayWeather>()
  const [airQuality, setAirQuality] = useState<WEATHER.AirQuality>()
  const [liveQuality, setLiveQuality] = useState<WEATHER.LiveQuality>()

  useEffect(() => {
    if (currentWeather) {
      setShowSearchList(false)
      initData(currentWeather.location.id)
    } else {
      setShowSearchList(true)
    }
  }, [currentWeather])

  /**
   * 初始化数据
   * TODO 服务端聚合一下数据接口
   */
  const initData = (code: string, isMoreType?: boolean) => {
    fetchNext5dayWeather(code).then((res) => {
      if (res.data && res.data.results.length) {
        setNext5DaysWeather(res.data.results[0])
      }
    })
    fetchAirQuality(code).then((res) => {
      if (res.data && res.data.results.length) {
        setAirQuality(res.data.results[0])
      }
    })
    fetchLiveQuality(code).then((res) => {
      if (res.data && res.data.results.length) {
        setLiveQuality(res.data.results[0])
      }
    })
    if (isMoreType) {
      fetchCurrentWeather(code).then((res) => {
        if (res.data && res.data.results.length) {
          setCurrentWeather(res.data.results[0])
        }
      })
      fetchNext24HoursWeather(code).then((res) => {
        if (res.data && res.data.results.length) {
          setNext24HoursWeather(res.data.results[0])
        }
      })
    }
  }

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

  /**
   * 渲染搜索框
   */
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
              let list: { cityCode: string; cityName: string }[] = []
              try {
                const storage = JSON.parse(window.localStorage.getItem('cityCollection') || '[]')
                list = Array.isArray(storage) ? storage : []
              } catch (error) {}
              list.push(currentCity)
              initData(currentCity.cityCode, true)
              window.localStorage.setItem('cityCollection', JSON.stringify(list))
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
      {showSearchList ? (
        <div className={s.showSearch}>
          <TopInfo text="Tadah 天气详情" />
          {renderSearchCity()}
        </div>
      ) : (
        <>
          {currentWeather ? (
            <section className={s.baseWeatherBox}>
              <h3>{dayjs().format('YYYY年MM月DD日-hh:mm A')}</h3>
              <div className={s.showBox}>
                <WeatherShow code={currentWeather.now.code as string} />
              </div>
              <p className={s.temperature}>
                <span className={s.count}>{currentWeather.now.temperature}</span>
                <span className={s.icon}>C</span>
              </p>
              <p className={s.location}>{currentWeather.location.path.split(',').reverse().join(' ')}</p>
              <p className={s.updateTime}>
                数据更新时间 {dayjs(currentWeather.last_update).format('hh:mm A')} 点击更新
              </p>
            </section>
          ) : null}

          <div className={s.next24Box}>
            {next24HoursWeather ? <Next24HoursWeather next24HoursWeather={next24HoursWeather} /> : null}
          </div>

          <div className={s.next5Box}>
            {next5DaysWeather ? <Next5DaysWeather next5DaysWeather={next5DaysWeather} /> : null}
          </div>

          <div className={s.currentAirBox}>{airQuality ? <AirQuality airQuality={airQuality} /> : null}</div>

          {/*<div className={s.moreInfoBox}>*/}
          {/*  <MoreWeatherInfo />*/}
          {/*</div>*/}

          <div className={s.liveSuggestionBox}>
            <h2>生活质量建议</h2>

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
          </div>
          <p className={s.dataFrom}>天气数据来源于心知天气平台</p>
        </>
      )}
    </div>
  )
}

export default Weather
