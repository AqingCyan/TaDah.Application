import request from '@/utils/request'

/**
 * 搜索城市
 * @param keyword
 */
export const searchCity = (keyword: string): API.FetchResponse<{ results: WEATHER.CityListItem[] }> =>
  request().get('/weather/city', { params: { keyword } })

/**
 * 加载当前天气
 * @param cityCode
 */
export const fetchCurrentWeather = (cityCode: string): API.FetchResponse<{ results: WEATHER.CurrentWeatherItem[] }> =>
  request().get('/weather/currentWeather', { params: { cityCode } })

/**
 * 加载未来5日天气
 * @param cityCode
 */
export const fetchNext5dayWeather = (cityCode: string): API.FetchResponse<{ results: WEATHER.Next5DayWeather[] }> =>
  request().get('/weather/next5dayWeather', { params: { cityCode } })

/**
 * 加载24小时天气
 * @param cityCode
 */
export const fetchNext24HoursWeather = (
  cityCode: string,
): API.FetchResponse<{ results: WEATHER.OneDayEveryHourWeather[] }> =>
  request().get('/weather/next24HoursWeather', { params: { cityCode } })

/**
 * 加载当前空气质量
 * @param cityCode
 */
export const fetchAirQuality = (cityCode: string): API.FetchResponse<{ results: WEATHER.AirQuality[] }> =>
  request().get('/weather/airQuality', { params: { cityCode } })

/**
 * 加载生活指数及建议
 * @param cityCode
 */
export const fetchLiveQuality = (cityCode: string): API.FetchResponse<{ results: WEATHER.LiveQuality[] }> =>
  request().get('/weather/liveQuality', { params: { cityCode } })
