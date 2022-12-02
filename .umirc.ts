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
        { path: '/appDashboard', component: '@/pages/AppDashboard', title: '登录' },
        { path: '/addRecord', component: '@/pages/AddRecord', title: '记一笔账' },
        { path: '/accountBook', component: '@/pages/AccountBook', title: '记一笔账' },
      ],
    },
  ],
}
