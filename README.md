<h1 align='center'>@vdfor/quark</h1>

<div align='center'>

[![Build Status](https://travis-ci.org/vdfor/quark.svg?branch=master)](https://travis-ci.org/vdfor/quark)

</div>

> react 种子工程，基于 react + redux + immer + typescript + antd 构建。

@vdfor/quark 面向PC平台，移动平台请移步 [@vdfor/quark-taro](https://github.com/vdfor/quark-taro.git)

```bash
yarn # install dependencies and devDependencies
yarn start # run in development
yarn run build # build for production
```

## 按功能组织目录结构

以路由为一个单位模块，按照功能组织目录结构。即同一路由页面下的代码（actions、reducers、components等），放置在一个目录下。对于通用组件、方法，进行统一提取，放置在统一目录下。

## 基于create-react-app

quark基于[create-react-app](https://github.com/facebook/create-react-app.git)构建，通过[react-app-rewired](https://github.com/timarney/react-app-rewired.git)和[customize-cra](https://github.com/arackaf/customize-cra)实现在不eject的情况下更改配置。除了`customize-cra`提供的实用功能后，我们也实现了一些额外功能，比如svg处理为react组件等，我们也计划在将来将这些额外配置提交到`customize-cra`。

## 状态管理 · redux

我们使用[redux](https://github.com/reduxjs/redux)来进行状态管理，使用扁平化的数据结构。

## @vdfor/react-component

quark曾经内置了一些自实现的组件和[hooks](https://reactjs.org/docs/hooks-intro.html)，现在，我们将其独立到[@vdfor/react-component](https://github.com/vdfor/react-component.git)，如路由的懒加载、Spin等。

## 路由同步

quark实现了路由同步，可从`store`随时获取。

## css解决方案

我们推荐使用`css in js`作为css解决方案，示例的页面均是采用此方案(powered by [styled-components](https://github.com/styled-components/styled-components))。

## 统一配置

日志记录配置、apiBaseUrl配置等

## 主题配置

`config-theme.js`对`antd`进行主题配置

## lint

使用[eslint](https://github.com/eslint/eslint)作为`lint`工具，采用[airbnb](https://github.com/airbnb/javascript) + 自定义规则。

```bash
# auto fix
yarn run eslint:fix
```

## vscode插件

为了最佳体验，建议搭配以下vscode插件: `ESLint` `vscode-styled-components`

## 在线示例

服务器部署中...