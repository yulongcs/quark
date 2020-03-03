import { request } from '@/util';
import { API_BASE_URL } from '@/constant';

export const loadUsersApi = () =>
  request(`${API_BASE_URL}/user?role=1`, {
    method: 'GET',
  });
