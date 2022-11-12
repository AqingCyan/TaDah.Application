import { IApi } from 'umi'

export default (api: IApi) => {
  api.modifyHTML(($) => $)
  api.addHTMLMetas(() => [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;' },
  ])
  api.addHTMLStyles(() => [{ content: `#root { height: 100% }` }])
}
