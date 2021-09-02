# super-compress

## 基于 webpack plugin 的一款图片压缩插件

```bash
npm install --save-dev super-compress

```

### 参数介绍

| 参数      |    类型 |      默认值       | 描述                             |
| --------- | ------: | :---------------: | -------------------------------- |
| min       |  number |    1024 \* 50     | 最小值                           |
| max       |  number | 1024 \* 1024 \* 2 | 最大值                           |
| key       |  string |        ""         | 密钥                             |
| immediate | boolean |       false       | 启动时是否压缩当前目录未压缩图片 |

### 应用案例

#### webpack.config.js

```js
const ImageCompress = require("super-compress");
module.exports = {
  plugins: [
    new ImageCompress({
      min: 1024 * 50, // 最小阈值
      max: 1024 * 1024 * 20, // 最大阈值
      key: "CX6j0LbSlRKt1X31DR44tNT67TmyDKCf", // tinypng 密钥 tinypng.com 获取
      immediate: true, // 初始化时是否需要压缩已存在目录里的图片
    }),
  ],
};
```

#### vue.config.js

```js
  configureWebpack: {
    plugins: [
      new ImageCompress({
        min: 1024 * 50, // 最小阈值
        max: 1024 * 1024 * 20, // 最大阈值
        key: "CX6j0LbSlRKt1X31DR44tNT67TmyDKCf", // tinypng 密钥 tinypng.com 获取
        immediate: true, // 初始化时是否需要压缩已存在目录里的图片
    }),
    ]
  },
```

// 注意：如果 immediate 设置为 true，则不可将.map 结尾的文件在.gitignore 中过滤，因为考虑到项目多人开发时.map 不同步会导致图片重复压缩的问题
// 如果某张图片不需要压缩，请先在当前目录下创建一个与图片名称相同的.map 结尾的文件然后再将图片放进来即可跳过图片压缩
