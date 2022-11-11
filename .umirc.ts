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
}
