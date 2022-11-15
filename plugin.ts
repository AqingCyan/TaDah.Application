import { IApi } from 'umi'

export default (api: IApi) => {
  api.modifyHTML(($) => $)
  api.addHTMLMetas(() => [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;' },
  ])
  api.addHTMLLinks(() => [
    { href: 'default.css', rel: 'stylesheet', type: 'text/css' },
    { href: 'green.css', rel: 'stylesheet', type: 'text/css', title: '暗绿主题', disabled: true },
  ])
  api.addHTMLStyles(() => [{ content: `#root { height: 100% }` }])
}
