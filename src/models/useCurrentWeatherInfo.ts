import { atom } from 'jotai'

export const currentWeatherDetailAtom = atom<WEATHER.CurrentWeatherItem | null>(null)
export const next24HoursWeatherAtom = atom<WEATHER.OneDayEveryHourWeather | null>(null)
export const nextAlarmWeatherAtom = atom<WEATHER.NextAlarmItem | null>(null)
