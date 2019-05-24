import { createFileFormData } from './sendFile';

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
