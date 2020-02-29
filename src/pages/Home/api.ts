import { request } from '@/utils';
import { API_BASE_URL } from '@/constants';

export const loadUsersApi = () =>
  request(`${API_BASE_URL}/user?role=1`, {
    method: 'GET'
  });
