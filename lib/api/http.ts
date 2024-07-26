import axiosInstance from './axios'
import {
  RequestHttpEnum,
  ContentTypeEnum,
} from '@/enums/httpEnum'

export const get = async <T = any> (url: string, params?: string, payload?: object) => {
  try {
    url = `${url}${params || ''}`
    const { code, data, msg } = await axiosInstance<T>({
      url: url,
      method: RequestHttpEnum.GET,
      params: payload || {},
    })
    if (code === 200) {
      return data
    }
    window.enqueueSnackbar(JSON.stringify(msg), { variant: "error" });
    return {};
  } catch (error) {
    window.enqueueSnackbar(JSON.stringify(error), { variant: "error" });
    return [];
  }
}

export const post = async <T = any>(url: string, payload?: object, headersType?: string) => {
  try {
    const { code, msg, data } = await axiosInstance<T>({
      url: url,
      method: RequestHttpEnum.POST,
      data: payload,
      headers: {
        'Content-Type': headersType || ContentTypeEnum.JSON
      }
    })
    if (code === 200) {
      return data || true
    }
    window.enqueueSnackbar(JSON.stringify(msg), { variant: "error" });
    return false
  } catch (error) {
    window.enqueueSnackbar(JSON.stringify(error), { variant: "error" });
    return false
  }
}

export const put = async <T = any>(url: string, payload?: object, headersType?: ContentTypeEnum) => {
  try {
    const { code, msg } = await axiosInstance<T>({
      url: url,
      method: RequestHttpEnum.PUT,
      data: payload,
      headers: {
        'Content-Type': headersType || ContentTypeEnum.JSON
      }
    })
    if (code === 200) {
      return true
    }
    window.enqueueSnackbar(JSON.stringify(msg), { variant: "error" });
    return false
  } catch (error) {
    window.enqueueSnackbar(JSON.stringify(error), { variant: "error" });
    return false
  }
}

export const del = async <T = any>(url: string, params?: object) => {
  try {
    const { code, msg } = await axiosInstance<T>({
      url: url,
      method: RequestHttpEnum.DELETE,
      params
    })
    if (code === 200) {
      return true
    }
    window.enqueueSnackbar(JSON.stringify(msg), { variant: "error" });
    return false
  } catch (error) {
    window.enqueueSnackbar(JSON.stringify(error), { variant: "error" });
    return false
  }
}

// 获取请求函数，默认get
export const http = <T>(type?: RequestHttpEnum) => {
  switch (type) {
    case RequestHttpEnum.GET:
      return get

    case RequestHttpEnum.POST:
      return post

    case RequestHttpEnum.PUT:
      return put

    case RequestHttpEnum.DELETE:
      return del

    default:
      return get
  }
}