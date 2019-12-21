import { request } from '@/utils';
import { API_BASE_URL } from '@/constants';

interface ILoadListApiData {
  pageNum: number;
  pageSize: number;
  status: string;
}

export const loadListApi = (params: ILoadListApiData, requestTaskName: string): Promise<any> => request(`${API_BASE_URL}/quark-mobile/list`, {
  method: 'GET',
  params,
  requestTaskName,
});
