import {post} from '../utils/Request'

type LoginData = {
  username: string;
  password: string;
}

export const loginAPI = (data: LoginData) => post('http://auth-server:9000/login', data);
