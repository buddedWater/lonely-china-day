import { request, config } from '../../../utils';

const { api } = config

export function addProject ( params ) {
  return request({
    url: api.projectAuth,
    method: 'post',
    data: params,
  });
}

export function updateProject ( params ) {
  return request({
    url: api.projectAuth,
    method: 'put',
    data: params,
  });
}

export function deleteProject ( params ) {
  return request({
    url: api.projectAuth,
    method: 'delete',
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