const fs = require('fs');
const path = require('path');
const mime = require('../helper/mime');
//1.引用
const Handlebars = require('handlebars');
const config = require('../conf/defaultConfig');
//使用工具类去掉回调
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
//由于是模板，所以可在项目启动时执行一次后加入缓存
const source = fs.readFileSync(path.join(__dirname, '../template/dir.tpl'), 'utf-8');
const template = Handlebars.compile(source);
const compress = require('./compress');

module.exports = async function (req, res, filePath) {
//代码优化
    try {
        const stats = await stat(filePath);
        if (stats.isFile()) {
            res.statusCode = 200;
            const contentType = mime(filePath);
            //如果是文本文件 需要加charset= utf8
            res.setHeader('Content-Type', contentType);
            let rs = fs.createReadStream(filePath);
            /*if (filePath.match(config.compress)) {
                //对某些文件进行压缩
                rs = compress(rs, req, res);
            }*/
            rs.pipe(res);
        } else if (stats.isDirectory()) {
            //使用await进行异步回调
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            //返回html模板标签 当files：files 前后相同的时候，可省略为 files
            const rootPath = path.relative(config.root, filePath);
            //文件夹可以加图标
            const data = {
                title: path.basename(filePath),
                dir: rootPath ? `/${rootPath}` : '',
                files: files.map(file => {
                    return {
                        file,
                        icon: mime(file)
                    }
                })
            };
            res.end(template(data))
        }
    } catch (ex) {
        console.log(ex.toString());
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a directory or file`);
        return;
    }

};