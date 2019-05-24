import { HttpRequestConfig } from '@sinoui/http';

const http = {
  post: (url: string, formData: FormData, options: HttpRequestConfig) =>
    Promise.resolve({
      url,
      formData,
      options,
    }),
};

export default http;
