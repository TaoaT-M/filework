import request from '@/utils/request'

export function getStudents(params) {
  return request({
    url: 'op/getStudents',
    method: 'get',
    params
  })
}
