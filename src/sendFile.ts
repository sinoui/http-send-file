/* eslint-disable @typescript-eslint/no-explicit-any */
import http, { HttpRequestConfig } from '@sinoui/http';

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
}

/**
 * 处理表单数据
 *
 * @param {(File[] | File)} files
 * @param {string} keyName
 * @param {OptionInterface} options
 * @returns
 */
function handleFormData(
  files: File[] | File,
  keyName: string,
  options: OptionInterface,
) {
  const formData = new FormData();

  const { arrayFormat = 'repeat', data = {} } = options || {};

  if (Array.isArray(files)) {
    if (files.length > 1) {
      if (arrayFormat === 'repeat') {
        files.forEach((file) => formData.append(keyName, file));
      } else {
        files.forEach((file, index) =>
          formData.append(`${keyName}[${index}]`, file),
        );
      }
    } else {
      formData.append(keyName, files[0]);
    }
  } else {
    formData.append(keyName, files);
  }

  if (data) {
    const keys = Object.keys(data);
    keys.forEach((key: string) => formData.append(key, (data as any)[key]));
  }

  return formData;
}

/**
 * 上传文件
 *
 * @template T
 * @param {string} url
 * @param {(File[] | File)} files
 * @param {string} [fileFieldName]
 * @param {OptionInterface} [options]
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
 * @param {string} url
 * @param {(File[] | File)} files
 * @param {OptionInterface} [options]
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
 * @param {string} url
 * @param {(File[] | File)} files
 * @param {(string | OptionInterface)} [fileFieldName]
 * @param {OptionInterface} [options]
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

  const httpOptions = options$ || {};

  const formData = handleFormData(files, keyName, httpOptions);

  if (!httpOptions.headers) {
    httpOptions.headers = {};
  } else {
    httpOptions.headers['Content-Type'] = 'multipart/form-data';
  }

  return http.post(url, formData, httpOptions);
}

export default sendFile;
