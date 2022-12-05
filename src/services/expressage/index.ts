import request from '@/utils/request'

/**
 * 查询快递
 * @param courierNumber
 */
export const loadExpressRoad = (courierNumber: string): API.FetchResponse<EXPRESS.ExpressInfo> =>
  request().get('/expressage/expressRoad', { params: { courierNumber } })

/**
 * 查询快递详细物流轨迹
 * @param params
 */
export const loadDetailMap = (params: EXPRESS.FetchMapDto): API.FetchResponse<EXPRESS.MapInfo> =>
  request().get('/expressage/expressMap', { params })
