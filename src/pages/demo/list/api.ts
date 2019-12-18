import { request } from '@/utils';
import { getRestBaseUrl } from '@/config';

interface ILoadListApiData {
  pageNum: number;
  pageSize: number;
  status: string;
}

export const loadListApi = (params: ILoadListApiData, requestTaskName: string): Promise<any> => request(`${getRestBaseUrl()}/quark-mobile/list`, {
  method: 'GET',
  params,
  requestTaskName,
});
