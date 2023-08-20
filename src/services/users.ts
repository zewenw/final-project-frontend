import { get, post, put, del } from '../utils/Request';

/**
 * get list
 * @param query
 * @returns
 */
export const getAllUser = (query: any) =>{

  return get('/user/v1/users', query);
}

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
export const saveUser = (data: any) =>
  post('/user/v1/user', data);

/**
 * add
 * @param data
 * @returns
 */
export const getUserByPage = (data: any) =>
  get('/user/v1/users/page', data);

/**
 * update by id
 * @param id
 * @param data
 * @returns
 */
export const updateUserByUsername = (data: any) =>
  put('/user/v1/user', data);

/**
 * delete by id
 * @param id
 * @returns
 */
export const deleteUserById = (id: string) =>
  del('/user/v1/user/' + id);


