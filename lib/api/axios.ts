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

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const { code } = res.data as { code: number }

    if (code === undefined || code === null) return Promise.resolve(res.data)
    // 成功
    if (code === ResultEnum.SUCCESS) {
      return Promise.resolve(res.data)
    }

    // 登录过期
    if (code === ResultEnum.TOKEN_OVERDUE) {
      return Promise.resolve(res.data)
    }
    return Promise.resolve(res.data)
  },
  (err: AxiosError) => {
    Promise.reject(err)
  }
)

export default axiosInstance