import { IApi } from 'umi'

export default (api: IApi) => {
  api.modifyHTML(($) => $)
  api.addHTMLMetas(() => [{ name: 'viewport', content: 'initial-scale=1, width=device-width' }])
  api.addHTMLStyles(() => [{ content: `#root { height: 100% }` }])
}
