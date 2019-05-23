import nock from 'nock';
import sendFile from './index';

describe('sendFile', () => {
  const blob = new Blob();
  beforeEach(() => {
    nock('http://localhost')
      .post('/test', {
        file: {
          id: '001',
          name: '文件1',
          lastModified: 12,
          size: 12356,
          type: '.docx',
          slice: () => blob,
        },
      })
      .reply(200, '上传成功');
  });

  it('200', async () => {
    const file = [
      {
        id: '001',
        name: '文件1',
        lastModified: 12,
        size: 12356,
        type: '.docx',
        slice: () => blob,
      },
    ];
    const response = await sendFile('http://localhost/test', file);
  });
});
