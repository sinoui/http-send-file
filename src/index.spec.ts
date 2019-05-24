import { HttpRequestConfig } from '@sinoui/http';
import sendFile from './index';

interface MockResponseInterface {
  url: string;
  formData: FormData;
  options: HttpRequestConfig;
}

describe('sendFile', () => {
  it('200', async () => {
    const file = new File([''], 'test.txt');
    const response = await sendFile<MockResponseInterface>(
      'http://localhost/test',
      file,
    );

    expect(response.url).toBe('http://localhost/test');
    expect(response.formData.get('file')).toBe(file);
    expect(response.options.headers['Content-Type']).toBe(
      'multipart/form-data',
    );
  });

  it('指定表单域名称', async () => {
    const file = new File([''], 'test.txt');

    const response = await sendFile<MockResponseInterface>(
      'http://localhost/test',
      file,
      'file2',
    );

    expect(response.formData.get('file2')).toBe(file);
  });

  it('指定options', async () => {
    const file = new File([''], 'test.txt');

    const response = await sendFile<MockResponseInterface>(
      'http://localhost/test',
      file,
      {
        headers: {
          xId: '123',
          arrayFormat: 'indices',
        },
      },
    );

    expect(response.options.headers.xId).toBe('123');
  });
});
