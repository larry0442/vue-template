import request from '@/utils/request';

export default function getAuth() {
  return request.get('/home');
}
