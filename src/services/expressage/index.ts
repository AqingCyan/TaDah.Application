import request from '@/utils/request'

/**
 * 查询快递
 * @param courierNumber
 */
export const loadExpressRoad = (
  courierNumber: string,
): API.FetchResponse<{ location: EXPRESS.Location[]; company: string }> =>
  request().get('/expressage/expressRoad', { params: { courierNumber } })
