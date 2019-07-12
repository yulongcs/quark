import { pxToRem } from '../utils';

export const BREAK_POINT_768 = '768px';
export const TAB_BAR_HEIGHT = pxToRem(100);
export const ROUTE_WITH_TAB_BAR_HEIGHT = `calc(100vh - ${TAB_BAR_HEIGHT})`;
export const ROUTE_BG_COLOR = '#f5f5f9';
export const ROUTE_WITH_NOT_TAB_BAR_HEIGHT = '100vh';
