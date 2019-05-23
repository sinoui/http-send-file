/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '@sinoui/http';

interface OptionInterface {
  arrayFormat?: string | 'repeat' | 'indices';
  data?: object;
  onUploadProgress: (progressEvent: any) => void;
}

function sendFile(
  url: string,
  files: File[] = [],
  fileFieldName?: string,
  options?: OptionInterface,
) {
  const keyName = fileFieldName || 'file';
  const { arrayFormat = 'repeat', data = {}, onUploadProgress } = options || {
    onUploadProgress: undefined,
  };

  const formData = new FormData();

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

  if (data) {
    const keys = Object.keys(data);
    keys.forEach((key: string) => formData.append(key, (data as any)[key]));
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  http
    .post(url, formData, { ...config, onUploadProgress })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}

export default sendFile;
