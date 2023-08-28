import { get, post, put, del } from '../utils/Request';

/**
 * get list
 * @param query
 * @returns
 */
export const getAllRole = () =>{

  return get('/user/v1/roles');
}

/**
 * get current user's roles
 * @param query
 * @returnsF
 */
export const getOwnedRolesByUsername = (username : string) =>{

  return get('/user/v1/roles/' + username );
}

/**
 * Get the current user does not own the role in
 * @param query
 * @returnsF
 */
export const getLackedRolesByUsername = (username : string) =>{

  return get('/user/v1/roles/lacked/' + username );
}

/**
 * bind a new Role with the user
 * @param query
 * @returns
 */
export const bindUserWithRole = (roleId: number, username: string) =>{

  return put('/user/v1/role/bind/' + roleId + '/' + username);
}

/**
 * bind a new Role with the user
 * @param query
 * @returns
 */
export const unbindUserWithRole = (roleId: number, username: string) =>{

  return put('/user/v1/role/unbind/' + roleId + '/' + username);
}

/**
 * get by id
 * @param id
 * @returns
 */
export const getRoleByRoleCode = (roleCode: string) =>
  get('/user/v1/role/' + roleCode);

/**
 * add
 * @param data
 * @returns
 */
export const saveRole = (data: any) =>
  post('/user/v1/role', data);

/**
 * add
 * @param data
 * @returns
 */
export const getRoleByPage = (data: any) =>
  get('/user/v1/role/page', data);

/**
 * update by id
 * @param id
 * @param data
 * @returns
 */
export const updateRoleById = (data: any) =>
  put('/user/v1/role', data);

/**
 * delete by id
 * @param id
 * @returns
 */
export const deleteUserById = (id: string) =>
  del('/user/v1/user/' + id);


