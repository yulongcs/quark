import { request } from '@/util';
import { API_BASE_URL } from '@/constant';

interface ILoadListApiData {
  pageNum: number;
  pageSize: number;
  status: string;
}

export const loadListApi = (params: ILoadListApiData, requestTaskName: string): Promise<any> =>
  request(`${API_BASE_URL}/quark-mobile/list`, {
    method: 'GET',
    params: {
      ...params,
      delay: 5000,
    },
    requestTaskName,
  });
