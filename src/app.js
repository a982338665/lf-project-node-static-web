
const http = require('http');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
//使用工具类去回调
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const conf = require('./conf/defaultConfig');
const route = require('./helper/route');

const server = http.createServer((req,res)=>{
    const url = req.url;
    const filePath = path.join(conf.root,url);
    route(req,res,filePath);

    //未优化前
    /*fs.stat(filePath,(err,stats)=>{
        if(err){
            res.statusCode = 404;
            res.setHeader('Content-Type','text/plain');
            res.end(`${filePath} is not a directory or file`);
            return;
        };
        if(stats.isFile()){
            res.statusCode = 200;
            res.setHeader('Content-Type','text/plain');
            /!* 此种方式也可以，但是会一次读取完成后 返回给客户端，响应速度慢
            fs.readFile(filePath,(err,data)=>{
                res.end(data);
            })*!/
            fs.createReadStream(filePath).pipe(res);
        }else if(stats.isDirectory()){
            fs.readdir(filePath,(err,files)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','text/plain');
                res.end(files.join(","))
            })
        }

    });*/
});

server.listen(conf.port,conf.hostname,()=>{
    const addr = `http://${conf.hostname}:${conf.port}`;
    console.log(`server started in ${chalk.green(addr)}`);
});