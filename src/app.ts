/**
 * 运行时配置
 * https://umijs.org/zh/guide/runtime-config.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%89%E8%BF%90%E8%A1%8C%E6%97%B6%E9%85%8D%E7%BD%AE%EF%BC%9F
 */
import React from 'react';
import store from '@/store';
import { SET_APP_META_STATE } from '@/store/constants';
import Index from './index';

export const onRouteChange = ({ location: { pathname = '/' } = {} }: any) => {
  store.dispatch({ type: SET_APP_META_STATE, payload: { route: pathname } }); // 路由信息同步到store
};

export const rootContainer = (container: any) => React.createElement(Index, null, container);
