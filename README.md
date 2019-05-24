# @sinoui/http-send-file

@sinoui/http-send-file 旨在提供一种便捷的方式用于文件上传。

## 安装

执行下面的命令即可款速安装：

- 使用 npm

  ```shell
  npm install --save @sinoui/http-send-file
  ```

- 使用 yarn

  ```shell
  yarn add @sinoui/http-send-file
  ```

## 快速使用

`html文件`

```html
<html>
  <body>
    <input id="file" type="file" />
    <input type="button" value="文件上传" onclick="uploadFile()" />
  </body>
</html>
```

`js文件`

```ts
import sendFile from '@sinoui/http-send-file';

function uploadFile() {
  const file = document.getElementById('file').files[0];
  	sendFile('http://localhost:3000/files', file)
    .then((response) => {
      if (response.status === 200) {
        console.log('上传成功');
      }
    })
    .catch((error) => console.error('上传失败'));
}
```

### 上传一组文件

一组文件对象添加到 FormData 时组织`key`的方式：indices | repeat。

Java 后端可以解析`repeat`格式的，`Node`、`Python`、`Ruby`后端可以解析`indices`格式的。

```ts
import sendFile from '@sinoui/http-send-file';

async function uploadFileDemo(){
    ...
      await sendFile(url, files, {
    arrayFormat: 'indices',
  });
}
```

### 添加额外数据

```ts
import sendFile from '@sinoui/http-send-file';

async function uploadFileDemo(){
    ...
    await sendFile(url, files, 'usePhotot', {
    data: {
      userId: '123',
      userName: 'zhangsan',
    },
  });
}
```

### 文件上传进度

```ts
import sendFile from '@sinoui/http-send-file';

const onUploadProgress = (progressEvent: ProgressEvent) => {
  console.log(
    `上传进度：${((progressEvent.loaded / progressEvent.total) * 100) | 0}%`,
  );
};

async function uploadFileDemo(){
    ...
  await sendFile(url, files, {
    onUploadProgress,
  });
}
```

## `sendFile()`方法参数说明

- `url` (string)

  指定文件上传的 url

- `files` (File[] | File)

  需要上传的文件，可以是单个的或者是数组

- `fileFieldName` (string)

  指定表单域的名称，默认为`file`

- `options` (object)

  请求配置，包括`arrayFormat`、`onUploadProgress`、`data`等。其中：

  - arrayFormat

    一组文件对象添加到 FormData 时组织`key`的方式。默认为`repeat`。

    > - `repeat`: file=file1&file=file2&file=file3
    >
    > - `indices`: file[0]=file1&file[1]=file2&file[2]=file3

  - data

    指定需要的额外数据

  - onUploadProgress

    文件上传进度回调函数
