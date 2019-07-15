# config

位于 src/config 目录下

## theme.scss

`antd-mobile`主题配置，参考[antd-mobile定制主题](https://mobile.ant.design/docs/react/customize-theme-cn)

## index.ts

| 名称 | 说明 | 类型 | 可选值 |
| --- | --- | --- | --- |
| dbName | indexdb数据库名称 | string | - |
| logCollectionName | 运行日志记录表名称 | string | - |
| history | 路由模式 | string | browser \/ hash |
| apiBaseUrl | 后端接口baseUrl | string | - |
| useVconsole | 是否使用vconsole | boolean | - |
| useLogRecord | 是否使用日志记录功能 | boolean | - |