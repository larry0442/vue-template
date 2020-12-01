import request from '@/utils/request';

export function uploadFile(params) {
  return request.post('/upload', params);
}
export function getFileList(params) {
  return request.get('/api/files/list?bucket=xinchi-qiniu-img-bucket', params);
}
