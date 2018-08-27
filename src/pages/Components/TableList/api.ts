import { request } from '../../../utils';

interface IFetchUserParams {
  current: number;
  pageSize: number;
  sex?: string;
  name?: string;
}

export const fetchUsers = (params: IFetchUserParams) => request('/user', { params });

export const fetchUser = (id: number) => request(`/user/${id}`);
