import { request } from '../../util';
import config from '../../config';

export const loadListApi = (params: { _page: number; _limit: number }) => request(`${config.apiBaseUrl}/list`, {
  method: 'GET',
  params,
});
