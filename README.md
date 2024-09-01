# vue3_syt

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

Blob: 一个不可变的、原始的二进制数据对象。File 继承了所有 Blob。欠缺对二进制数据的细节操作能力。
ArrayBuffer：前端的一个通用的二进制缓冲区，类似数组
项目难点?
有的医学图像的数据格式文件比较大，这块类比大文件上传。不能一次将文件都上传上去，即耗时而且一旦传送中断，又要重新开始上传文件，所以是由 vue+node 实现大文件分片上传以及断点续传。一共两种请求:分片存储和分片合并
具体操作：
[1].当选中文件时，会触发 change 事件回调，在回调中，先拿到上传文件本身(e.target.files[0])，这时候可以按照不同的大小进行分片，
(我这块是按 1M 分片的)，用一个 fileList 数组保存文件分片。
[2].要实现断点重传，就要判断当前上传的文件是否已经出现在了后端，就要根据文件生成 hash 值(文件的唯一标识)来进行判断的。
用的是 spark-md5 库，生成文件的 hash。SparkMD5.ArrayBuffer()来读取文件，再调用 end()就拿到了文件的 hash。
[3].开始分片上传，遍历 fileList，把每一个分片改装成一个 FormData 对象，通过 ajax 发送到后端。
[4].<node>:通过 multiparty 库来接受传进来的 FormData 对象，并开始解析。首先判断是否有文件和传过来的 hash 值一样的，并且 index 还是 0，
证明当前是续传操作，接下来就是找到 node 里面传进来的最大索引值，返回给前端{code:300,maxindex:最大索引值}，前端接收到 300 后，拿到 maxindex 后，
从 maxindex 开始传文件。 --------- 否则就是正常上传，要做的就是在 node 端把 chunk 字段(C://temp 临时文件存储) 保存到本地，然后删除临时存储目录。
[5].如果上传完成了，再发一次请求来将文件进行合并(请求体中传入文件 hash 值和文件后缀)。
[6].<node>:先对文件夹中的分片数据进行排序，然后创建出以 hash.文件后缀的新文件，不断从分片读取写入新文件，最后删除分片文件，保留最终文件。
