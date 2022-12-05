declare namespace EXPRESS {
  type FetchMapDto = {
    readonly num: string
    readonly com: string
    readonly from: string
    readonly to: string
    readonly mapConfigKey: string
  }

  type Location = {
    time: string
    context: string
    ftime: string
    areaCode: string
    areaName: string
    status: string
    location: string
    areaCenter: string
    areaPinYin: string
    statusCode: string
  }

  type ExpressInfo = {
    message: string
    nu: string
    ischeck: string
    com: string
    status: '200'
    data: Location[]
    state: string
    condition: string
    routeInfo: {
      from: {
        number: string
        name: string
      }
      cur: {
        number: string
        name: string
      }
      to: {
        number: string
        name: string
      }
    }
    isLoop: boolean
    comZh: string
  }

  type MapInfo = {
    message: string
    nu: string
    ischeck: string
    com: string
    status: string
    data: Location[]
    state: string
    condition: string
    routeInfo: {
      from: {
        number: string
        name: string
      }
      cur: {
        number: string
        name: string
      }
      to: {
        number: string
        name: string
      }
    }
    isLoop: boolean
    trailUrl: string
    arrivalTime: string
    totalTime: string
    remainTime: string
  }
}
