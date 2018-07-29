# react-sail

`react`的种子工程, 采用`typescript`编写。基于[create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript)生成的应用而深度定制。

## 特性
+ antd作为UI库，并配置按需加载、自定义主题等
+ 整体结构按功能组织
+ mobx作为状态管理工具
+ react-loadable实现组件级别(包含路由)的按需加载
+ axios并进行封装用于前后端数据交互
+ 支持less module(文件名称限定为 [name].module.less)
+ 支持多页
+ 权限控制与路由守卫
+ ...

## 按功能组织

## 权限控制

## 主题设置
[themes]('./themes')目录下配置antd主题

## 计划
+ PWA
+ 在线主题切换
+ 支持服务端渲染
+ ...