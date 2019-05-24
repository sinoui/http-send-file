# @sinoui/http-send-file

@sinoui/http-send-file旨在提供一种便捷的方式用于文件上传。

## 安装

执行下面的命令即可款速安装：

* 使用npm

  ```shell
  npm install --save @sinoui/http-send-file
  ```

* 使用yarn

  ```shell
  yarn add @sinoui/http-send-file
  ```

## 快速使用

* 单个文件上传，不指定`fileFiledName`

  ```ts
  import sendFile from '@sinoui/http-send-file';
  
  async function uploadFileDemo(){
      ...
      await sendFile(url, file);
  }
  ```

* 单个文件上传，指定`fileFieldName`

  ```ts
  import sendFile from '@sinoui/http-send-file';
  
  async function uploadFileDemo(){
      ...
      await sendFile(url, file,'myFile');
  }
  ```

* 多个文件上传

  ```ts
  import sendFile from '@sinoui/http-send-file';
  
  async function uploadFileDemo(){
      ...
    // 上传多个文件
    await sendFile(url, files);
  
    // 指定文件表单域名称，默认为file
    await sendFile(url, files, 'userPhoto');
  }
  ```

* 上传文件至`node`服务器

  ```ts
  import sendFile from '@sinoui/http-send-file';
  
  async function uploadFileDemo(){
      ...
       await sendFile(url, files, {
      arrayFormat: 'indices',
    });
  }
  ```

* 配置表单域并指定服务器类型

  ```ts
  import sendFile from '@sinoui/http-send-file';
  
  async function uploadFileDemo(){
      ...
       await sendFile(url, files,'myFile', {
      arrayFormat: 'indices',
    });
  }
  ```

* 添加额外数据

  ```ts
  import sendFile from '@sinoui/http-send-file';
  
  async function uploadFileDemo(){
      ...
      await sendFile(url, files, {
      data: {
        userId: '123',
        userName: 'zhangsan',
      },
    });
  }
  
  ```

* 文件上传进度

  ```ts
  import sendFile from '@sinoui/http-send-file';
  
  async function uploadFileDemo(){
      ...
      const onUploadProgress = (progressEvent: ProgressEvent) => {
      console.log(
        `上传进度：${((progressEvent.loaded / progressEvent.total) * 100) | 0}%`,
      );
    };
    await sendFile(url, files, {
      onUploadProgress,
    });
  }
  
  ```

## 参数说明

* url (string)

  指定文件上传的url

* files (File[] | File)

  需要上传的文件

* fileFieldName (string)

  指定表单域的名称，默认为`file`

* options (object)

  请求配置，包括`arrayFormat`、`onUploadProgress`、`data`等。其中：

  * arrayFormat

    一组文件对象添加到FormData时组织`key`的方式。默认为`repeat`。

    > * `repeat`: file=file1&file=file2&file=file3
    >
    > * `indices`: file[0]=file1&file[1]=file2&file[2]=file3

  * data

    指定需要的额外数据

  * onUploadProgress

    文件上传进度回调函数