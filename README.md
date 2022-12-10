# TaDah H5 应用

> TaDah 是一个拟声词，意为对某事表示惊喜。这个项目的立意也是为了能在一些生活的细节处能产生给人惊喜的便利快捷感。

![cover](https://headimage-1259237065.cos.ap-hongkong.myqcloud.com/WechatIMG224.png)

TaDah 本身建立在微信公众号上，我们开发的服务对接至微信公众号，根据用户对微信公众号发送的消息（指令）来进行具体的操作服务。例如天气查询、物流查询、日常记账、备忘录提醒、纪念日记录、饮食记录等等，都可以使用发送消息的形式进行。

而本H5应用的开发目的，是为了在简洁的指令操作之外提供了更多更细致的交互。指令与页面交互数据互通，交互逻辑上互补，以达到不出微信，尽可能处理更多的信息的目的。

## 目前 H5 应用

- [x] 账户系统
- [x] 快递查询、物流信息展示（快递单号暂由前端缓存）
- [x] 天气查询、详情与各类指数展示（城市信息暂由前端缓存）

## Todo List

- [ ] 记账应用（即将完成）
- [ ] 今日吃什么，根据用户选择的材料随机出一个基于该材料烹饪的B站教学视频链接，点击可跳转播放（构思中）
- [ ] 备忘录与纪念日，日期与信息的基本CURD。在时间达到后（基于定时任务与队列），通过微信公众号给用户发送模板消息进行提醒or祝福（构思中）

## 补充

此应用优先完成H5部分的开发，目前TaDah功能十分薄弱，还未完成以上应用的指令部分，相关内容会在服务端代码中提到。

### 开发

安装依赖

```shell
pnpm i
```

本地启动

```shell
pnpm run start
```

### 目录结构

```text
src
├── assets
├── components
│   ├── AirQuality
│   ├── AvatarUpload
│   ├── Card
│   ├── Emoji
│   ├── FormInput
│   ├── MoreWeatherInfo
│   ├── Next24HoursWeather
│   ├── Next5DaysWeather
│   ├── NextAlarm
│   ├── PageLoading
│   ├── Toast
│   ├── TopInfo
│   ├── WeatherIcons
│   └── WeatherShow
├── hooks
│   └── useTheme.ts
├── layouts
├── models
│   ├── useCurrentExpressInfo.ts
│   ├── useCurrentUser.ts
│   └── useCurrentWeatherInfo.ts
├── pages
│   ├── AccountBook
│   ├── AddRecord
│   ├── AppDashboard
│   ├── ChangePassword
│   ├── ExpressMap
│   ├── Expressage
│   ├── Login
│   ├── UpdateUserInfo
│   ├── WeatherDetail
│   └── WeatherPreview
├── services
│   ├── expressage
│   ├── user
│   └── weather
└── utils
    ├── helpers.ts
    └── request.ts
```

### 待优化

- [ ] 基于黑白两种模式的 icon 图片过多，一是体积需要优化，二是在项目过于零散需要考虑抽出一个专门的 icon 组件来使用
- [ ] 未区分环境，目前仅生产环境与本地开发环境
- [ ] 从 vercel 迁移至服务器部署，vercel 限制并发访问
- [ ] 天气与物流的部分信息缓存在 client 本地，需要对接至服务
- [ ] 部分应用一次性同时调用过多接口，需要服务聚合

## 相关链接

[服务端应用](https://github.com/cyanthing-tadah/TaDah)

## 鸣谢

陈宇思女士提供的封面设计

