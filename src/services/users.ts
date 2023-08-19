import { get, post, patch, del } from '../utils/Request';

/**
 * get list
 * @param query
 * @returns
 */
export const getAllUser = (query: any = {}) =>
  get('/user/v1/users', query);

/**
 * get by id
 * @param id
 * @returns
 */
export const getUserByUsername = (username: string) =>
  get('/user/v1/user/' + username);

/**
 * add
 * @param data
 * @returns
 */
export const insertAPI = (data: any) =>
  post('/admin/medicine_categories', data);

/**
 * update by id
 * @param id
 * @param data
 * @returns
 */
export const updateByIdAPI = (id: string, data: any) =>
  patch('/admin/medicine_categories/' + id, data);

/**
 * delete by id
 * @param id
 * @returns
 */
export const delByIdAPI = (id: string) =>
  del('/admin/medicine_categories/' + id);

/**
 * 删除多个
 * @param ids 多个id使用,分割
 * @returns
 */
export const delManyByIds = (ids: string) =>
  del('/admin/medicine_categories/remove_many?ids=' + ids);
