const watch = require('node-watch');
const path = require("path")
const tinify = require("tinify");
const fs = require('fs');
tinify.key = "CX6j0LbSlRKt1X31DR44tNT67TmyDKCf";
const SOURCE_COMPRESS_STORE = "source-compress-store.json"
const CONTENT_TYPE = "utf-8"
var temp = null
class ImageCompress {
    dir = ""
    min = 1024 * 50
    max = 1024 * 1024 * 20
    apply(compiler) {
        compiler.hooks.compilation.tap("ImageCompress", () => {
            try {
                temp = new Map(Object.entries(JSON.parse(fs.readFileSync(SOURCE_COMPRESS_STORE, CONTENT_TYPE))));
            } catch (err) {
                temp = new Map()
                fs.writeFileSync(SOURCE_COMPRESS_STORE, JSON.stringify(Object.create(null)))
            }
            watch(this.dir, {
                recursive: true, filter(f) {
                    return /(\.jpg|\.png|\.jpeg)$/.test(f);
                }
            }, async function (evt, file) {
                let key = file?.replace(path.resolve(), "")
                if (key && (evt !== "update" || temp.has(key))) return;
                let stat = fs.statSync(file)
                if (stat.size < this.min || stat.size > this.max) return;
                temp.set(key, false)
                tinify.fromFile(file).toFile(file).then(() => {
                    temp.set(key, true)
                    console.log(`${file}已自动压缩处理`)
                    const data = JSON.stringify(Object.fromEntries(temp));
                    fs.writeFileSync(SOURCE_COMPRESS_STORE, data);
                })

            })

        })
    }

    constructor({ dir, min, max, key }) {
        this.dir = dir
        this.min = min
        this.max = max
        tinify.key = key;
    }
}

module.exports = ImageCompress;