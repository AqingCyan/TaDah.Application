import request from '@/utils/request'

/**
 * 查询用户指定年月的消费数据
 * @param year
 * @param month
 */
export const fetchMonthData = (year: number, month: number): API.FetchResponse<TALLY.MONTH_DATA> =>
  request().get('/tally/targetMonthData', {
    params: { year, month },
  })
