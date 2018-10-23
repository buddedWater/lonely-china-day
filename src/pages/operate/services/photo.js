import { request, config } from '../../../utils';

const { api } = config

export function addPhoto ( params ) {
  return request({
    url: api.photoAuth,
    method: 'post',
    data: params,
  });
}

export function updatePhoto( params ) {
  return request({
    url: api.photoAuth,
    method: 'put',
    data: params,
  });
}

export function deletePhoto ( params ) {
  return request({
    url: api.photoAuth,
    method: 'delete',
    data: params,
  });
}

export function getPhoto ( params ) {
  return request({
    url: api.photo,
    method: 'get',
    data: params,
  });
}