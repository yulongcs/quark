# react-sail

## 准备工作
### 安装依赖
```bash
npm i react-router-dom antd axios mobx mobx-react react-loadable -S
npm i @types/react-loadable @types/react-router-dom cross-env ts-import-plugin less less-loader -D
```

### 设置tsconfig.json
在`tsconfig.json`的 compilerOptions 中配置 "experimentalDecorators": true 和 "noUnusedParameters": true

### 配置tslint.json
rules增加以下规则:

```json
{
  "eofline": true,
  "member-access": false,
  "no-console": [
    false,
    "log",
    "error",
    "debug",
    "info",
    "time",
    "timeEnd",
    "trace"
  ]
}
```
