import qs from 'qs';
import axios from 'axios';
import {catchError, from, map, Observable, of, throwError} from 'rxjs';
import {logger} from '../logger';
import {HttpError} from './http-error';
import {loadingSpinnerOverlayService} from '../loading-spinner-overlay';
// import { notificationService, NotificationType } from '../notification';

// TODO: get this from a config file or environment variable
const API_URL = 'https://api.example.com'; // Replace with your actual API URL

export class HttpService {
  constructor() {
    axios.interceptors.request.use(async (axiosConfig) => {
      const targetUrl = [axiosConfig.baseURL, axiosConfig.url]
        .filter(Boolean)
        .join('/');
      if (axiosConfig.withCredentials && targetUrl.includes(API_URL)) {
        const token = '123'; // TODO: getStore().store.getState().Common.token;
        if (token && axiosConfig.headers)
          axiosConfig.headers.Authorization = `Bearer ${token}`;
      }
      axiosConfig.withCredentials = false;
      return Promise.resolve(axiosConfig);
    });
    axios.defaults.validateStatus = (status) => `${status}`.startsWith('2');
  }

  /**
   * @param {string} baseURL
   * @param {string} path
   * @param {{ params?: { [param: string]: any } | URLSearchParams; headers?: { [header: string]: string }; body?: any; disableLoader?: boolean; noAuth?: boolean; responseType?: AxiosRequestConfig['responseType']; errorHandler?: 'notification' | 'silent' | 'unhandle'}} opts
   * @returns {Observable}
   */
  get(baseURL, path, opts = {}) {
    return this.sendRequest('GET', baseURL, path, opts);
  }

  /**
   * @param {string} baseURL
   * @param {string} path
   * @param {{ params?: { [param: string]: any } | URLSearchParams; headers?: { [header: string]: string }; body?: any; disableLoader?: boolean; noAuth?: boolean; responseType?: AxiosRequestConfig['responseType']; errorHandler?: 'notification' | 'silent' | 'unhandle'}} opts
   * @returns {Observable}
   */
  post(baseURL, path, opts = {}) {
    return this.sendRequest('POST', baseURL, path, opts);
  }

  /**
   * @param {string} baseURL
   * @param {string} path
   * @param {{ params?: { [param: string]: any } | URLSearchParams; headers?: { [header: string]: string }; body?: any; disableLoader?: boolean; noAuth?: boolean; responseType?: AxiosRequestConfig['responseType']; errorHandler?: 'notification' | 'silent' | 'unhandle'}} opts
   * @returns {Observable}
   */
  put(baseURL, path, opts = {}) {
    return this.sendRequest('PUT', baseURL, path, opts);
  }

  /**
   * @param {string} baseURL
   * @param {string} path
   * @param {{ params?: { [param: string]: any } | URLSearchParams; headers?: { [header: string]: string }; body?: any; disableLoader?: boolean; noAuth?: boolean; responseType?: AxiosRequestConfig['responseType']; errorHandler?: 'notification' | 'silent' | 'unhandle'}} opts
   * @returns {Observable}
   */
  patch(baseURL, path, opts = {}) {
    return this.sendRequest('PATCH', baseURL, path, opts);
  }

  /**
   * @param {string} baseURL
   * @param {string} path
   * @param {{ params?: { [param: string]: any } | URLSearchParams; headers?: { [header: string]: string }; body?: any; disableLoader?: boolean; noAuth?: boolean; responseType?: AxiosRequestConfig['responseType']; errorHandler?: 'notification' | 'silent' | 'unhandle'}} opts
   * @returns {Observable}
   */
  delete(baseURL, path, opts = {}) {
    return this.sendRequest('DELETE', baseURL, path, opts);
  }

  /**
   * @param {Method} method
   * @param {string} baseURL
   * @param {string} path
   * @param {{ params?: { [param: string]: any } | URLSearchParams; headers?: { [header: string]: string }; body?: any; disableLoader?: boolean; noAuth?: boolean; responseType?: AxiosRequestConfig['responseType']; errorHandler?: 'notification' | 'silent' | 'unhandle'}} opts
   * @
   */
  sendRequest(
    method,
    baseURL,
    path = '',
    {
      headers,
      params,
      body,
      disableLoader,
      noAuth = false,
      responseType,
      errorHandler = 'unhandle',
    } = {}
  ) {
    return new Observable((subscriber) => {
      !disableLoader && loadingSpinnerOverlayService.increment();
      const subscription = from(
        axios.request({
          method,
          baseURL,
          url: path,
          data: body,
          params,
          headers: {
            ...headers,
          },
          responseType,
          withCredentials: !noAuth,
          paramsSerializer: (ps) => {
            if (ps instanceof URLSearchParams) return ps.toString();
            return qs.stringify(ps);
          },
        })
      )
        .pipe(
          map((response) => response?.data),
          catchError((error) => {
            return throwError(() =>
              axios.isAxiosError(error) && error.response
                ? new HttpError(error.response?.data)
                : error
            );
          }),
          catchError((err) => {
            if (errorHandler === 'notification') {
              // notificationService.send({
              // 	type: NotificationType.ERROR,
              // 	message: err instanceof HttpError ? err.message.join('') : err.message,
              // });
              return throwError(() => err);
            } else if (errorHandler === 'silent') {
              logger.error(err);
              return of();
            } else {
              return throwError(() => err);
            }
          })
        )
        .subscribe(subscriber);

      return () => {
        !disableLoader && loadingSpinnerOverlayService.decrement();
        subscription.unsubscribe();
      };
    });
  }
}
