/* eslint-disable @typescript-eslint/no-explicit-any */
import http, { HttpRequestConfig } from '@sinoui/http';

interface ExtraDataInterface {
  [x: string]: string | Blob;
}

/**
 * 文件上传接口的配置
 *
 * @interface OptionInterface
 * @extends {HttpRequestConfig}
 */
interface OptionInterface extends HttpRequestConfig {
  /**
   * 一组文件对象添加到FormData时组织`key`的方式。默认为`repeat`。
   *
   * * `repeat`: file=file1&file=file2&file=file3
   * * `indices`: file[0]=file1&file[1]=file2&file[2]=file3
   *
   * @type {('repeat' | 'indices')}
   * @memberof OptionInterface
   */
  arrayFormat?: 'repeat' | 'indices';
  /**
   * 文件上传进度回调函数
   *
   * @memberof OptionInterface
   */
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
  /**
   * 指定额外的表单数据。此表单数据会和文件数据一起传输到后端。
   *
   * @type {ExtraDataInterface}
   * @memberof OptionInterface
   */
  data?: ExtraDataInterface;
}

/**
 * 创建文件的表单数据对象
 *
 * @param files 文件列表
 * @param fileFieldName 文件表单域名称
 * @param arrayFormat 文件表单域名称添加到FormData中的规则
 */
export function createFileFormData(
  files: File[] | File,
  fileFieldName: string,
  arrayFormat: 'repeat' | 'indices',
) {
  const formData = new FormData();

  if (Array.isArray(files)) {
    if (files.length > 1) {
      if (arrayFormat === 'repeat') {
        files.forEach((file) => formData.append(fileFieldName, file));
      } else {
        files.forEach((file, index) =>
          formData.append(`${fileFieldName}[${index}]`, file),
        );
      }
    } else {
      formData.append(fileFieldName, files[0]);
    }
  } else {
    formData.append(fileFieldName, files);
  }

  return formData;
}

/**
 * 向FormData中添加数据
 *
 * @export
 * @param {FormData} formData
 * @param {ExtraDataInterface} [data]
 * @returns {FormData}
 */
export function appendDataToFormData(
  formData: FormData,
  data?: ExtraDataInterface,
): FormData {
  if (data) {
    const keys = Object.keys(data);
    keys.forEach((key: string) => formData.append(key, data[key]));
  }

  return formData;
}

/**
 * 设置文件上传请求的headers
 *
 * @export
 * @param {HttpRequestConfig} httpOptions
 * @returns {HttpRequestConfig}
 */
export function setRequestHeader(
  httpOptions: HttpRequestConfig,
): HttpRequestConfig {
  return {
    ...httpOptions,
    headers: {
      ...httpOptions.headers,
      'Content-Type': 'multipart/form-data',
    },
  };
}

const defaultOptions: OptionInterface = {};

/**
 * 上传文件
 *
 * @template T
 * @param {string} url 指定文件上传url
 * @param {(File[] | File)} files 需要上传的文件
 * @param {string} [fileFieldName] 表单域名称
 * @param {OptionInterface} [options] 请求配置
 * @returns {Promise<T>}
 */
function sendFile<T>(
  url: string,
  files: File[] | File,
  fileFieldName?: string,
  options?: OptionInterface,
): Promise<T>;

/**
 * 上传文件
 *
 * @template T
 * @param {string} url 指定文件上传的url
 * @param {(File[] | File)} files 需要上传的文件
 * @param {OptionInterface} [options] 请求配置
 * @returns {Promise<T>}
 */
function sendFile<T>(
  url: string,
  files: File[] | File,
  options?: OptionInterface,
): Promise<T>;

/**
 * 上传文件
 *
 * @template T
 * @param {string} url 指定文件上传的url
 * @param {(File[] | File)} files 需要上传的文件
 * @param {(string | OptionInterface)} [fileFieldName] 表单域名称
 * @param {OptionInterface} [options] 请求配置
 * @returns {Promise<T>}
 */
function sendFile<T>(
  url: string,
  files: File[] | File,
  fileFieldName?: string | OptionInterface,
  options?: OptionInterface,
): Promise<T> {
  const keyName = typeof fileFieldName === 'string' ? fileFieldName : 'file';
  const options$ =
    typeof fileFieldName === 'object'
      ? (fileFieldName as OptionInterface)
      : options;

  const { arrayFormat = 'repeat', data, ...httpOptions } =
    options$ || defaultOptions;

  const formData = createFileFormData(files, keyName, arrayFormat);

  appendDataToFormData(formData, data);

  return http.post(url, formData, setRequestHeader(httpOptions));
}

export default sendFile;
