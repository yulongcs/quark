import { request } from '../../../utils';

interface IFetchUserParams {
  current: number;
  pageSize: number;
  sex?: string;
  name?: string;
}

export const fetchUser = (params: IFetchUserParams) => request('/user', { params });
