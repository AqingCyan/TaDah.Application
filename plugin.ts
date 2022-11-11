import { IApi } from 'umi'

export default (api: IApi) => {
  api.modifyHTML(($) => {
    return $
  })
  api.addHTMLMetas(() => [{ name: 'viewport', content: 'initial-scale=1, width=device-width' }])
  api.addHTMLLinks(() => [
    { rel: 'stylesheet', content: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' },
    { rel: 'stylesheet', content: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
  ])
}
