import { request } from '@/utils';
import { getRestBaseUrl } from '@/config';

export const loadUsersApi = () => request(`${getRestBaseUrl()}/user?role1=1`, {
  method: 'GET',
});
