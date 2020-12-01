import request from '@/utils/request';

export function uploadFile(params) {
  return request.post('/upload', params);
}
export function getFileList(params) {
  return request.get('/api/files/list', { params });
}
export function fetchUploadToken() {
  return request.post('/api/upload/token');
}
