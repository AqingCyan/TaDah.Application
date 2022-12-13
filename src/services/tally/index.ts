import request from '@/utils/request'

/**
 * 查询用户指定年月的消费数据
 */
export const fetchMonthData = (): API.FetchResponse<TALLY.MONTH_DATA[]> => request().get('/tally/targetMonthData')

/**
 * 查询指定月份的数据
 */
export const fetchTallyList = (id: number): API.FetchResponse<TALLY.TALLY_ITEM[]> =>
  request().get('/tally/targetMonthList', { params: { id } })

/**
 * 更新or设置本月数据
 * @param income
 * @param target
 */
export const setMonthData = (income: number, target: number) =>
  request().post('/tally/handleSetMonthData', {
    params: { income, target },
  })
