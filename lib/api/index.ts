import { get, post, put, del, postExport } from './http'
import { ModuleTypeEnum, ContentTypeEnum } from '@/enums/httpEnum'

export const httpGet = async <T>(url: string, params?: string, data?: object) => {
  try {
    const res = await <T>get(`${ModuleTypeEnum.DATAAPI}${url}`, params, data)
    return res
  } catch (err) {
    console.log(err, 'Http error');
  }
}

export const httpPost = async <T>(url: string, data?: object, headersType?: string) => {
  try {
    const res = await <T>post(`${ModuleTypeEnum.DATAAPI}${url}`, data, headersType);
    return res;
  } catch (error) {
    console.log(error, 'Http error')
  }
}

export const httpPut = async <T>(url: string, data?: object, headersType?: ContentTypeEnum) => {
  try {
    const res = await <T>put(`${ModuleTypeEnum.DATAAPI}${url}`, data, headersType);
    return res;
  } catch (error) {
    console.log(error, 'Http error')
  }
}

export const httpDelete = async <T>(url: string, params: object) => {
  try {
    const res = await <T>del(`/${ModuleTypeEnum.DATAAPI}${url}`, params)
    return res
  } catch (err) {
    console.log(err, 'Http error');
  }
}


export const dataPostExport = async <T>(url: string, data?: object, headersType?: string) => {
  try {
    const res = await <T>postExport(`${ModuleTypeEnum.DATAAPI}${url}`, data, headersType);
    return res;
  } catch (error) {
    console.log(error, 'Http error')
  }
}