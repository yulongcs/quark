<h1 align='center'>@vdfor/quark</h1>

<div align='center'>

[![Build Status](https://travis-ci.org/vdfor/quark.svg?branch=master)](https://travis-ci.org/vdfor/quark)

</div>

quark, 原意为构成物质的基本单元。这个项目以quark命名，我们理解为基石，使用这个名字，是希望这个脚手架工程能够帮助快速构建移动web开发。我们清楚，quark还很年轻，也有很多不足，但我们也相信，quark充满着朝气。

```bash
yarn # install dependencies and devDependencies
yarn run mock # run mock
yarn start # run in development
yarn run build # build for production
```

## 按功能组织目录结构

以路由为一个单位模块，按照功能组织目录结构。即同一路由页面下的代码（action、reducer、component等），放置在一个目录下。对于通用组件、方法，进行统一提取，放置在统一目录下。

[目录结构](docs/directory-structure.md)

## 基于[create-react-app](https://github.com/facebook/create-react-app.git)

quark基于`cra`构建，通过[https://github.com/timarney/react-app-rewired.git]和[customize-cra](https://github.com/arackaf/customize-cra)实现在不eject的情况下更改配置。除了`customize-cra`提供的实用功能后，我们也实现了一些额外功能，比如多页配置、svg处理为react组件等，我们也计划在将来将这些额外配置提交到`customize-cra`。

## [redux](https://github.com/reduxjs/redux)

我们使用`redux`来进行状态管理，使用扁平化的数据结构。通过`redux`的全局状态管理，我们亦实现类`vue`的`keep-alive`功能，并且具有更大的自主性。

## [antd-mobile](https://mobile.ant.design/index-cn)

quark面向移动而生，我们选择`antd-mobile`作为内置UI组件库。

## [@vdfor/react-component](https://github.com/vdfor/react-component.git)

quark曾经内置了一些自实现的组件和[hooks](https://reactjs.org/docs/hooks-intro.html)，现在，我们将其独立到`@vdfor/react-component`，如路由的懒加载、TabBar导航等。

## css解决方案

我们推荐使用`css in js`作为css解决方案，示例的页面均是采用此方案(powered by [styled-components](https://github.com/styled-components/styled-components))。当然，我们也支持`css-module`作为解决方案。

quark内置了`pxToRem`，以`750px`作为换算单位。针对js内的样式，通过调用`util`的`pxToRem`来实现运行时的单位换算。

## mock

通过[json-server](https://github.com/typicode/json-server)构建`mock`数据

```bash
yarn run mock
```

未来`mock`的实现方式，请查看我们的[Athens](docs/about-athens.md)计划。

## [typescript](https://www.typescriptlang.org)

quark全面拥抱`typescript`

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

## 在线示例

服务器部署中...