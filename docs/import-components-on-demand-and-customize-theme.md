# import components on demand and customize theme 「antd」

## Use ts-import-plugin
```js
// tsloader.options 增加如下配置
// const tsImportPluginFactory = require('ts-import-plugin');
getCustomTransformers: () => ({
  before: [tsImportPluginFactory({
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  })]
})
```