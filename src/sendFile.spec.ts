import {
  createFileFormData,
  appendDataToFormData,
  setRequestHeader,
} from './sendFile';

describe('createFileFormData', () => {
  it('创建一个文件的FormData', () => {
    const file = new File([''], 'test.txt');
    const formData = createFileFormData(file, 'file', 'repeat');

    expect(formData.get('file')).toBe(file);
  });

  it('创建多个文件的FormData', () => {
    const file1 = new File([''], 'test1.txt');
    const file2 = new File([''], 'test2.txt');

    const formData = createFileFormData([file1, file2], 'file', 'repeat');

    const files = formData.getAll('file');
    expect(files.length).toBe(2);
    expect((files[0] as File).name).toBe(file1.name);
    expect((files[1] as File).name).toBe(file2.name);
  });

  it('数组传递单个文件', () => {
    const file = new File([''], 'test.txt');
    const formData = createFileFormData([file], 'file', 'repeat');

    expect(formData.get('file')).toBe(file);
  });

  it('指定文件表单域名称', () => {
    const file = new File([''], 'test.txt');
    const formData = createFileFormData([file], 'userPhoto', 'repeat');

    expect(formData.get('userPhoto')).toBe(file);
    expect(formData.get('file')).toBeNull();
  });

  it('indices编排表单域名称', () => {
    const file1 = new File([''], 'test1.txt');
    const file2 = new File([''], 'test2.txt');

    const formData = createFileFormData([file1, file2], 'file', 'indices');

    expect(formData.getAll('file').length).toBe(0);
    expect(formData.get('file[0]')).toBe(file1);
    expect(formData.get('file[1]')).toBe(file2);
  });
});

describe('appendDataToFormData', () => {
  it('不需要额外数据', () => {
    const formData = new FormData();

    appendDataToFormData(formData);

    expect(formData.get('userId')).toBeNull();
  });

  it('需要额外数据', () => {
    const formData = new FormData();

    appendDataToFormData(formData, {
      userId: '123',
      userName: '张三',
    });

    expect(formData.get('userId')).toBe('123');
    expect(formData.get('userName')).toBe('张三');
  });
});

describe('setRequestHeader', () => {
  it('无headers配置', () => {
    const options = setRequestHeader({});

    expect(options.headers['Content-Type']).toBe('multipart/form-data');
  });

  it('配置headers', () => {
    const headers = {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json;charset=utf-8',
    };

    const options = setRequestHeader({ headers });
    expect(options.headers['Content-Type']).toBe('multipart/form-data');
  });
});
