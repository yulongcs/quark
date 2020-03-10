import { SectionStateEnum } from '@vdfor/util';
import { Dispatch } from 'redux';
import { IAppRouteState } from './type';
import { SET_APP_ROUTE_STATE, SET_APP_UI_STATUS, ID } from './constant';
import { GetStateFunc } from '..';

// 设置全局页面状态
const setAppUIStatus = ({ status, routeId }: { status: SectionStateEnum; routeId?: string }) => (dispatch: Dispatch<any>, getState: GetStateFunc) => {
  const {
    [ID]: {
      routeState: { id: currentRouteId },
    },
  } = getState();
  // 确保当前路由页面ID与传入的路由页面id一致
  if (routeId !== currentRouteId) {
    return;
  }
  dispatch({
    type: SET_APP_UI_STATUS,
    payload: status,
  });
};

export const showLoading = (routeId?: string) => setAppUIStatus({ routeId, status: SectionStateEnum.LOADING });

export const showContent = (routeId?: string) => setAppUIStatus({ routeId, status: SectionStateEnum.CONTENT });

export const showError = (routeId?: string) => setAppUIStatus({ routeId, status: SectionStateEnum.ERROR });

export const setAppRouteState = (state: Partial<IAppRouteState>) => ({
  type: SET_APP_ROUTE_STATE,
  payload: state,
});
