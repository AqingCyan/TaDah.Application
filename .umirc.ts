// @ts-ignore
import postCssPxToViewport from 'postcss-px-to-viewport'
import autoprefixer from 'autoprefixer'

const { REACT_APP_ENV = 'prod' } = process.env

export default {
  npmClient: 'pnpm',
  extraPostCSSPlugins: [
    autoprefixer,
    postCssPxToViewport({
      viewportWidth: 750,
    }),
  ],
  define: { REACT_APP_ENV },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', redirect: '/appDashboard' },
        { path: '/login', component: '@/pages/Login', title: '登录' },
        { path: '/updateUserInfo', component: '@/pages/UpdateUserInfo', title: '修改信息' },
        { path: '/changePassword', component: '@/pages/ChangePassword', title: '修改密码' },
        { path: '/appDashboard', component: '@/pages/AppDashboard', title: 'TaDah应用' },
        { path: '/express', component: '@/pages/Expressage', title: '物流查询' },
        { path: '/expressMap', component: '@/pages/ExpressMap', title: '物流查询' },
        { path: '/addRecord', component: '@/pages/AddRecord', title: '记一笔账' },
        { path: '/accountBook', component: '@/pages/AccountBook', title: '记一笔账' },
        { path: '/addCardInfo', component: '@/pages/AddAccountCard', title: '记一笔账' },
        { path: '/weatherDetail', component: '@/pages/WeatherDetail', title: '天气查询' },
        { path: '/weatherPreview', component: '@/pages/WeatherPreview', title: '天气查询' },
      ],
    },
  ],
}
