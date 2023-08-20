import axios from "axios";
// @ts-ignore
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken, serverUrl } from "./Tool";

const instance = axios.create({
  baseURL: serverUrl, // base url for any request
  timeout: 5000,
  withCredentials: true,
});

// Add a request interceptor，execute before invoke request
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // @ts-ignore
    // config.headers.token = getToken();
    NProgress.start(); //start up loading
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor，execute after invoke a request
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();
    
    return response;
  },
  function (error) {
    NProgress.done(); //close loading
    if (error.message === 'Network Error') {
      // Redirect to the login page
      //TODO redirect to login page function need to complete
      window.location.href = "http://localhost/user/login";
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

/**
 * get request
 * @param url     url
 * @param params  params
 * @returns
 */
export const get = (url: string, params: any = {}) =>
  instance.get(url, { params }).then((res) => res.data);

/**
 * post request
 * @param url   url
 * @param data  params
 * @returns
 */
export const post = (url: string, data: any = {}) =>
  instance.post(url, data).then((res) => res.data);

/**
 * put request
 * @param url   url
 * @param data  params
 * @returns
 */
export const put = (url: string, data: any = {}) =>
  instance.put(url, data).then((res) => res.data);

/**
 * patch request
 * @param url   url
 * @param data  params
 * @returns
 */
export const patch = (url: string, data: any = {}) =>
  instance.patch(url, data).then((res) => res.data);

/**
 * delete request
 * @param url   url
 * @returns
 */
export const del = (url: string) =>
  instance.delete(url).then((res) => res.data);
