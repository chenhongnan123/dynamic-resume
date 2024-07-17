// 模块 Path 前缀分类
export enum ModuleTypeEnum {
  DATAAPI = '',
}

// 请求结果集
export enum ResultEnum {
  DATA_SUCCESS = 0,
  SUCCESS = 200,
  MISSPARAMS = 201,
  SERVER_ERROR = 500,
  SERVER_FORBIDDEN = 403,
  NOT_FOUND = 404,
  TOKEN_OVERDUE = 401,
  TIMEOUT = 60000,
}

// 请求结果集
export enum ResultMessageEnum {
  DATA_SUCCESS = 'Success',
  SUCCESS = 'Success',
  MISSPARAMS = 'Miss Params',
  SERVER_ERROR = 'Server Error',
  SERVER_FORBIDDEN = 'Server Forbidden',
  NOT_FOUND = 'Server Not Found',
  TOKEN_OVERDUE = 'Token Overdue',
  TIMEOUT = 'Timeout',
}

// 头部
export enum RequestHttpHeaderEnum {
  TOKEN = 'Token',
  COOKIE = 'Cookie'
}

// 请求方法
export enum RequestHttpEnum {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
  EXPORT = 'post'
}

/**
 * @description: 请求头部类型
 */
export enum RequestBodyEnum {
  NONE = 'none',
  FORM_DATA = 'form-data',
  X_WWW_FORM_URLENCODED = 'x-www-form-urlencoded',
  JSON = 'json',
  XML = 'xml'
}

/**
 * @description: 请求头部类型数组
 */
export const RequestBodyEnumList = [
  RequestBodyEnum.NONE,
  RequestBodyEnum.FORM_DATA,
  RequestBodyEnum.X_WWW_FORM_URLENCODED,
  RequestBodyEnum.JSON,
  RequestBodyEnum.XML
]

/**
 * @description: 请求参数类型
 */
export enum RequestParamsTypeEnum {
  PARAMS = 'Params',
  BODY = 'Body',
  HEADER = 'Header',
}

/**
 * @description: 请求参数主体
 */
export type RequestParamsObjType = {
  [T: string]: string
}
export type RequestParams = {
  [RequestParamsTypeEnum.PARAMS]: RequestParamsObjType
  [RequestParamsTypeEnum.HEADER]: RequestParamsObjType
  [RequestParamsTypeEnum.BODY]: {
    [RequestBodyEnum.FORM_DATA]: RequestParamsObjType
    [RequestBodyEnum.X_WWW_FORM_URLENCODED]: RequestParamsObjType
    [RequestBodyEnum.JSON]: string
    [RequestBodyEnum.XML]: string
  }
}

// 常用的contentTyp类型
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // text
  TEXT = 'text/plain;charset=UTF-8',
  // xml
  XML = 'application/xml;charset=UTF-8',
  // application/x-www-form-urlencoded 一般配合qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  上传
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}
