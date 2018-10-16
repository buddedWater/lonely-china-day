import { request, config } from '../utils';

const { api } = config
const { login } = api

export function userLogin ( params ) {
  return request({
    url: login,
    method: 'post',
    data: params,
  });
}