# super-compress

## 基于 webpack plugin 的一款图片压缩插件

```bash
npm install super-compress
```

### 参数介绍

| 参数      |    类型 | 默认值 | 描述                             |
| --------- | ------: | :----: | -------------------------------- |
| min       |  number |   ""   | 最小值                           |
| max       |  number |   ""   | 最大值                           |
| key       |  string |   ""   | 密钥                             |
| immediate | boolean | false  | 启动时是否压缩当前目录未压缩图片 |

### 应用案例

#### webpack.config.js

```js
const ImageCompress = require("super-compress");
module.exports = {
  plugins: [
    new ImageCompress({
      min: 1024 * 50, // 最小阈值
      max: 1024 * 1024 * 20, // 最大阈值
      key: "CX6j0LbSlRKt1X31DR44tNT67TmyDKCf", // tinypng 密钥 tinypng.com获取
      immediate: true, // 初始化时是否需要压缩已存在目录里的图片
    }),
  ],
};
```
