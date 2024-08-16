import axios, { Axios, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ResultEnum } from '@/enums/httpEnum'

export interface MyResponseType<T> {
  code: ResultEnum
  data?: T
  msg: string,
  total: number,
}

export interface MyRequestInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): Promise<MyResponseType<T>>
}

const axiosInstance: MyRequestInstance = axios.create({
  baseURL: '',
  timeout: ResultEnum.TIMEOUT
});

axiosInstance.interceptors.request.use((req: any) => {
  window.showLoading();
  return req;
}, (error: AxiosError) => {
  window.hideLoading();
  return Promise.reject(error);
})

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const { code } = res.data as { code: number }
    window.hideLoading();
    if (code === undefined || code === null) return Promise.resolve(res.data)
    // 成功
    if (code === ResultEnum.SUCCESS) {
      return Promise.resolve(res.data)
    }
    return Promise.resolve(res.data)
  },
  (err: AxiosError) => {
    window.hideLoading();
    Promise.reject(err)
  }
)

export default axiosInstance