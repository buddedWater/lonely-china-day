import { request, config } from '../../utils';

const { api } = config

export function getPhoto ( params ) {
  return request({
    url: api.photo,
    method: 'get',
    data: params,
  });
}

export function getProject ( params ) {
  return request({
    url: api.project,
    method: 'get',
    data: params,
  });
}