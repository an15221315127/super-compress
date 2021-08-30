# super-compress

## 基于 webpack 的一款图片压缩插件

### webpack.config.js

```bash
npm install super-compress
```

```js
new ImageCompress({
  dir: path.resolve("src/assets"), // 需要监听的文件目录
  min: 1024 * 50, // 最小size不作处理
  max: 1024 * 1024 * 2, // 最大size不作处理
  key: "CX6j0LbSlRKt1X31DR44tNT67TmyDKCf", // tinypng秘钥 https://tinypng.com/
});
```
