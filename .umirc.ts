// @ts-ignore
import postCssPxToViewport from 'postcss-px-to-viewport'
import autoprefixer from 'autoprefixer'

export default {
  npmClient: 'pnpm',
  extraPostCSSPlugins: [
    autoprefixer,
    postCssPxToViewport({
      viewportWidth: 750,
    }),
  ],
  // publicPath: './',
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', redirect: '/addRecord' },
        { path: '/addRecord', component: '@/pages/AddRecord', title: '记一笔账' },
      ],
    },
  ],
}
