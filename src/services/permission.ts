import { get, post, put, del } from '../utils/Request';

/**
 * get list
 * @param query
 * @returns
 */
export const getAllPermission = (query: any) =>{

  return get('/user/v1/users', query);
}

/**
 * get by id
 * @param id
 * @returns
 */
export const getPermissionByCode = (permissionCode: object) =>{
  const params =  {
    'permissionCode' : permissionCode
  }
  return get('/user/v1/permission', params);
}
 

/**
 * add
 * @param data
 * @returns
 */
export const savePermission = (data: any) =>
  post('/user/v1/permission', data);

/**
 * add
 * @param data
 * @returns
 */
export const getPermissionByPage = (data: any) =>
  get('/user/v1/permission/page', data);

/**
 * update by id
 * @param id
 * @param data
 * @returns
 */
export const updatePermissionById = (data: any) =>
  put('/user/v1/permission', data);

/**
 * delete by id
 * @param id
 * @returns
 */
export const deletePermissionById = (id: string) =>
  del('/user/v1/permission/' + id);


