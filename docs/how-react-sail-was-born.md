# How react-sail was born

## 准备工作

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

### 添加 typing.d.ts
```ts
// typing.d.ts
declare module '*.less' {
  const content: any;
  export default content;
}

declare module 'enquire-js' {
  function enquireScreen(cb: Function, str?: string): void
}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
```