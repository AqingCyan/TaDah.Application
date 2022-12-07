import React, { useEffect, useMemo, useState } from 'react'
import { history } from 'umi'
import dayjs from 'dayjs'
import useTheme from '@/hooks/useTheme'
import TopInfo from '@/components/TopInfo'
import NightClean from '@/pages/WeatherDetail/components/NightClean'
import Sunny from '@/pages/WeatherDetail/components/Sunny'
import Cloudy from '@/pages/WeatherDetail/components/Cloudy'
import Snowy from '@/pages/WeatherDetail/components/Snowy'
import Stormy from '@/pages/WeatherDetail/components/Stormy'
import { weatherCodeCollection } from '@/pages/WeatherDetail/config'
import { fetchCurrentWeather } from '@/services/weather'
import nothingWhite from '@/assets/nothingWhite.svg'
import nothingBlack from '@/assets/nothingBlack.svg'
import * as weatherIcons from '@/pages/WeatherDetail/components/WeatherIcons'
import s from './index.module.less'
import Toast from '@/components/Toast'

const WeatherPreview = () => {
  const { inDark } = useTheme()

  const nothingSvg = useMemo(() => (inDark ? nothingWhite : nothingBlack), [inDark])

  const [cities, setCities] = useState<string[]>(['WX4FBXXFKE4F', 'WM4WBJNRWDMF', 'WMUES7GDRJ87'])
  const [previewList, setPreviewList] = useState<WEATHER.CurrentWeatherItem[]>([])
  const [next24HoursWeather, setNext24HoursWeather] = useState<WEATHER.OneDayEveryHourWeather>({
    location: {
      id: 'WX4FBXXFKE4F',
      name: '北京',
      country: 'CN',
      path: '北京,北京,中国',
      timezone: 'Asia/Shanghai',
      timezone_offset: '+08:00',
    },
    hourly: [
      {
        time: '2022-12-03T20:00:00+08:00',
        text: '晴',
        code: '1',
        temperature: '-4',
        humidity: '25',
        wind_direction: '东北',
        wind_speed: '10',
      },
      {
        time: '2022-12-03T21:00:00+08:00',
        text: '晴',
        code: '1',
        temperature: '-4',
        humidity: '26',
        wind_direction: '东北',
        wind_speed: '10',
      },
      {
        time: '2022-12-03T22:00:00+08:00',
        text: '晴',
        code: '1',
        temperature: '-4',
        humidity: '27',
        wind_direction: '东北',
        wind_speed: '10',
      },
      {
        time: '2022-12-03T23:00:00+08:00',
        text: '晴',
        code: '1',
        temperature: '-5',
        humidity: '27',
        wind_direction: '北',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T00:00:00+08:00',
        text: '晴',
        code: '1',
        temperature: '-6',
        humidity: '27',
        wind_direction: '北',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T01:00:00+08:00',
        text: '晴',
        code: '1',
        temperature: '-6',
        humidity: '27',
        wind_direction: '北',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T02:00:00+08:00',
        text: '晴',
        code: '1',
        temperature: '-6',
        humidity: '28',
        wind_direction: '北',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T03:00:00+08:00',
        text: '晴',
        code: '1',
        temperature: '-7',
        humidity: '29',
        wind_direction: '北',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T04:00:00+08:00',
        text: '晴',
        code: '1',
        temperature: '-7',
        humidity: '29',
        wind_direction: '北',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T05:00:00+08:00',
        text: '晴',
        code: '1',
        temperature: '-8',
        humidity: '29',
        wind_direction: '北',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T06:00:00+08:00',
        text: '晴',
        code: '1',
        temperature: '-8',
        humidity: '28',
        wind_direction: '东北',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T07:00:00+08:00',
        text: '晴',
        code: '1',
        temperature: '-8',
        humidity: '28',
        wind_direction: '东北',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T08:00:00+08:00',
        text: '晴',
        code: '0',
        temperature: '-8',
        humidity: '28',
        wind_direction: '东北',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T09:00:00+08:00',
        text: '晴',
        code: '0',
        temperature: '-6',
        humidity: '26',
        wind_direction: '东',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T10:00:00+08:00',
        text: '晴',
        code: '0',
        temperature: '-4',
        humidity: '24',
        wind_direction: '南',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T11:00:00+08:00',
        text: '晴',
        code: '0',
        temperature: '-2',
        humidity: '22',
        wind_direction: '西南',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T12:00:00+08:00',
        text: '晴',
        code: '0',
        temperature: '-1',
        humidity: '22',
        wind_direction: '西南',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T13:00:00+08:00',
        text: '晴',
        code: '0',
        temperature: '0',
        humidity: '22',
        wind_direction: '西南',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T14:00:00+08:00',
        text: '晴',
        code: '0',
        temperature: '0',
        humidity: '22',
        wind_direction: '西南',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T15:00:00+08:00',
        text: '晴',
        code: '0',
        temperature: '0',
        humidity: '24',
        wind_direction: '西南',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T16:00:00+08:00',
        text: '晴',
        code: '0',
        temperature: '0',
        humidity: '26',
        wind_direction: '西南',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T17:00:00+08:00',
        text: '晴',
        code: '1',
        temperature: '0',
        humidity: '29',
        wind_direction: '西南',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T18:00:00+08:00',
        text: '晴',
        code: '1',
        temperature: '-1',
        humidity: '31',
        wind_direction: '西南',
        wind_speed: '10',
      },
      {
        time: '2022-12-04T19:00:00+08:00',
        text: '晴',
        code: '1',
        temperature: '-1',
        humidity: '33',
        wind_direction: '西南',
        wind_speed: '10',
      },
    ],
  })
  const [alarm, setAlarm] = useState<WEATHER.NextAlarmItem>({
    //当前全国或指定城市的气象灾害预警数组
    location: {
      //第一个灾害预警的城市信息
      id: 'WX4FBXXFKE4F',
      name: '北京',
      country: 'CN',
      path: '北京,北京,中国',
      timezone: 'Asia/Shanghai',
      timezone_offset: '+08:00',
    },
    alarms: [
      {
        //该城市所有的灾害预警数组
        alarm_id: '11000041600000_20210711175639', //预警唯一ID，可用于去重
        title: '北京市气象台2021年07月11日17时50分发布雷电黄色预警信号',
        type: '雷电',
        level: '黄色',
        region_id: '110000', // 国家行政区划编码
        status: '', //V3版本默认为空
        description:
          '市气象台2021年7月11日17时50分发布雷电黄色预警信号：预计，11日18时至12日20时，本市将有雷电活动，短时阵风和局地雨强较大，请注意防范。',
        pub_date: '2021-07-11T17:56:39+08:00', //各级政府发布预警时间
      },
    ],
  })

  /**
   * 初始化缓存
   */
  const initStorage = () => {
    const storage = window.localStorage.getItem('cities')
    if (storage) {
      try {
        const list = JSON.parse(storage)
        if (Array.isArray(list)) setCities(list)
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

      Promise.all(promiseList).then((res) => {
        const result = res.filter((item) => Boolean(item.data.results?.length)).map((item) => item.data.results[0])
        setPreviewList(result)
      })
    }
  }

  useEffect(initStorage, [])
  useEffect(initListData, [cities])

  const renderWeatherComp = (code: string) => {
    const key = parseInt(code, 10)
    if (weatherCodeCollection.sunnyKey.includes(key)) return <Sunny />
    if (weatherCodeCollection.cloudKey.includes(key)) return <Cloudy />
    if (weatherCodeCollection.stormKey.includes(key)) return <Stormy />
    if (weatherCodeCollection.snowKey.includes(key)) return <Snowy />
    if (weatherCodeCollection.nightKey.includes(key)) return <NightClean />
    return <Cloudy />
  }

  return (
    <div className={s.pageContainer}>
      <TopInfo text="TaDah 天气列表" />

      {previewList.length > 0 ? (
        <>
          <section className={s.topCard}>
            <p className={s.date}>
              <span>{dayjs().format('YYYY年MM月DD日')}</span>
              <span>{dayjs().format('hh:mm A')}</span>
            </p>
            <div className={s.showBox}>
              <div className={s.comp}>{renderWeatherComp(previewList[0].now.code)}</div>
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

          <section className={s.next5DayBox}>
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

          <section className={s.otherCities}>
            <h2>更多城市信息</h2>

            {alarm.alarms.length ? (
              <div
                className={s.alarmInfo}
                style={{ background: inDark ? 'rgba(231, 117, 92, 0.4)' : 'rgba(231, 117, 92, 0.3)' }}
              >
                <p className={s.title}>
                  {alarm.alarms[0].type}
                  {alarm.alarms[0].level}
                  预警
                </p>
                <p className={s.description}>{alarm.alarms[0].title}</p>
              </div>
            ) : null}

            {previewList.slice(1).map((item) => (
              <div className={s.previewBox} key={item.location.path}>
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
