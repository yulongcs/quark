<h1 align='center'>@vdfor/quark</h1>

<div align='center'>

[![Build Status](https://travis-ci.org/vdfor/quark.svg?branch=master)](https://travis-ci.org/vdfor/quark)

</div>

quark, 原意为构成物质的基本单元。在这里，我们理解为基石，本项目以此命名，是希望能够帮助快速构建移动web开发。我们清楚，quark还很年轻，也有很多不足，但我们也相信，quark充满着朝气。

```bash
yarn # install dependencies and devDependencies
yarn run mock # run mock
yarn start # run in development
yarn run build # build for production
```

## 按功能组织目录结构

以路由为一个单位模块，按照功能组织目录结构。即同一路由页面下的代码（action、reducer、component等），放置在一个目录下。对于通用组件、方法，进行统一提取，放置在统一目录下。

[目录结构](docs/directory-structure.md)

## 基于create-react-app

quark基于[create-react-app](https://github.com/facebook/create-react-app.git)构建，通过[https://github.com/timarney/react-app-rewired.git]和[customize-cra](https://github.com/arackaf/customize-cra)实现在不eject的情况下更改配置。除了`customize-cra`提供的实用功能后，我们也实现了一些额外功能，比如多页配置、svg处理为react组件等，我们也计划在将来将这些额外配置提交到`customize-cra`。

## redux

我们使用[redux](https://github.com/reduxjs/redux)来进行状态管理，使用扁平化的数据结构。通过`redux`的全局状态管理，我们亦实现类`vue`的`keep-alive`功能，并且具有更大的自主性。

## antd-mobile

quark面向移动而生，我们选择[antd-mobile](https://mobile.ant.design/index-cn)作为内置UI组件库。

## @vdfor/react-component

quark曾经内置了一些自实现的组件和[hooks](https://reactjs.org/docs/hooks-intro.html)，现在，我们将其独立到[@vdfor/react-component](https://github.com/vdfor/react-component.git)，如路由的懒加载、TabBar导航等。

## css解决方案

我们推荐使用`css in js`作为css解决方案，示例的页面均是采用此方案(powered by [styled-components](https://github.com/styled-components/styled-components))。当然，我们也支持`css-module`作为解决方案。

quark内置了`pxToRem`，以`750px`作为换算单位。针对js内的样式，通过调用`util`的`pxToRem`来实现运行时的单位换算。

## mock

通过[json-server](https://github.com/typicode/json-server)构建`mock`数据

```bash
yarn run mock
```

未来`mock`的实现方式，请查看我们的[Athens](docs/about-athens.md)计划。

## typescript

quark全面拥抱[typescript](https://www.typescriptlang.org)

## 日志记录

我们将错误日志通过`indexdb`记录在本地，通过内置的运行日志页面，可以展示错误日志。

日志记录目前还是初步功能，我们正在讨论如何更加完善。 [issues#3](https://github.com/vdfor/quark/issues/3)

## qux

[Read Me · QUX](docs/about-qux.md)

## request

基于原生的`fetch`实现`request`封装，未来，我们也许会将其独立为一个单独的库。

## 统一配置

`antd-mobile`主题配置、日志记录配置、apiBaseUrl配置等

[配置](docs/about-config.md)

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