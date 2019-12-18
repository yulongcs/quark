import { request } from '@/utils';
import { getRestBaseUrl } from '@/config';

export const loadUsersApi = () => request(`${getRestBaseUrl()}/user?role=1`, {
  method: 'GET',
});
