import { extend } from 'umi-request'
import { history } from 'umi'

const env = process.env.NODE_ENV === 'development' ? 'local' : 'prod'

const token = window.localStorage.getItem('bearer_token')

const baseURL = {
  local: 'http://localhost:3000',
  prod: 'https://cyanthing.com',
}[env]

const request = extend({
  prefix: baseURL,
  headers: { Authorization: `Bearer ${token}` },
  errorHandler: (err: { data: { statusCode: number; message: string } }) => {
    const { data } = err
    const { location } = window
    if (data.statusCode === 401) {
      history.push(`/login${location.search}`)
    }
    return data
  },
})

export default request
