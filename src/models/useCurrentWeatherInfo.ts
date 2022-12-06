import { atom } from 'jotai'

export const currentWeatherDetailAtom = atom<WEATHER.CurrentWeatherItem | null>(null)
