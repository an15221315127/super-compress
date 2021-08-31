const watch = require('node-watch');
const fs = require('fs');
const join = require('path').join;
const tinify = require("tinify");

const regx = new RegExp(/(\.jpg|\.png|\.jpeg)$/)
// tinify.key = "CX6j0LbSlRKt1X31DR44tNT67TmyDKCf";



class ImageCompress {
    getJsonFiles(jsonPath) {
        let jsonFiles = [];
        function findJsonFile(path) {
            let files = fs.readdirSync(path);
            files.forEach(function (item, index) {
                let fPath = join(path, item);
                let stat = fs.statSync(fPath);
                if (stat.isDirectory() === true) {
                    findJsonFile(fPath);
                }
                if (stat.isFile() === true) {
                    jsonFiles.push(fPath);
                }
            });
        }
        findJsonFile(jsonPath);
        return jsonFiles;
    }
    apply(compiler) {

        compiler.hooks.emit.tap("assets", () => {
            if (this.immediate) {
                const res = this.getJsonFiles(this.dir)
                const len = res.length;
                let index = 0;
                while (len > index) {
                    const f = res[index];
                    if (regx.test(f)) {
                        this.compress("update", f)
                    }
                    index++;
                }
                this.immediate = false
            }
        })
        compiler.hooks.compilation.tap("ImageCompress", () => {
            watch(this.dir, {
                recursive: true, filter(f) {
                    return regx.test(f);
                }
            }, this.compress)

        })
    }




    compress(evt, file) {
        let fileMap = `${file}.map`
        if (evt === "remove" && fs.existsSync(fileMap)) {
            fs.unlink(fileMap, () => {
                console.log(`${fileMap}已被删除`)
            })
            return;
        }

        if (evt !== "update" || fs.existsSync(fileMap)) return;
        let stat = fs.statSync(file)
        if (stat.size < this.min || stat.size > this.max) return;
        tinify.fromFile(file).toFile(file).then(() => {
            fs.writeFileSync(fileMap, `${file} is compressed`)
        }).catch(err => {
            fs.writeFileSync(fileMap, `${file} is ${err}`)
        })
        return true
    }
    constructor({ dir, min, max, key, immediate } = { dir: "static", min: 1024 * 50, max: 1024 * 1024 * 2, key: "", immediate: false }) {
        this.dir = dir // 需要观察的目录
        this.min = min // 小于min则不会处理压缩
        this.max = max  // 大于max则不会处理压缩
        this.immediate = immediate // 初始化时是否需要压缩已存在目录里的图片
        tinify.key = key;
    }
}

module.exports = ImageCompress;