import request from '@/utils/request'

/**
 * 获取登录用户信息
 */
export const pingCurrentUser = (): API.FetchResponse<USER.UserInfo> => request().get('/auth/ping')

/**
 * 检查用户是否注册过
 * @param uid
 */
export const checkRegistration = (uid: string): API.FetchResponse<boolean> =>
  request().get('/account/checkRegistration', { params: { uid } })

/**
 * 上传头像
 * @param formData
 */
export const uploadHeadImage = (formData: FormData): API.FetchResponse<string> =>
  request().post('/cos', {
    data: formData,
  })

/**
 * 进行用户信息注册
 * @param uid
 * @param data
 */
export const registerAccount = (
  uid: string,
  data: {
    nickname: string
    headimgurl?: string
    email: string
    password: string
  },
): API.FetchResponse<boolean> => request().post('/account/registerPassword', { params: { uid }, data })

/**
 * 登录
 * @param data
 */
export const loginAccount = (data: { uid: string; password: string }): API.FetchResponse<string> =>
  request().post('/auth/login', { data })

/**
 * 更新用户信息
 * @param data
 */
export const updateUserInfo = (data: {
  nickname: string
  headimgurl?: string
  email: string
}): API.FetchResponse<boolean> => request().put('/account/updateUserInfo', { data })

/**
 * 更新用户密码
 * @param data
 */
export const updateUserPassword = (data: { password: string; newPassword: string }): API.FetchResponse<boolean> =>
  request().put('/account/updatePassword', { data })
