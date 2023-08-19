import Logo from "../assets/logo.png";
import Avatar from "../assets/avatar.png";
export const AvatarImg = Avatar;
export const LogoImg = Logo;

/**
 * server url
 */
export const serverUrl = 'http://localhost/';

/**
 * uploading file api
 */
export const uploadActionUrl = serverUrl + '/common/upload';

/**
 * set up token
 * @param token
 * @returns
 */
export const setToken = (token: string) =>
  sessionStorage.setItem('token', token);

/**
 * get token
 * @returns
 */
export const getToken = () => sessionStorage.getItem('token');

/**
 * pic processing
 * @param img
 * @returns
 */
export const dalImg = (img: string) => {
  if (img) {
    if (img.startsWith('http')) return img;
    return serverUrl + img;
  }
  return LogoImg;
};
