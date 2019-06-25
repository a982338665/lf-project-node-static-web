const {cache} = require('../conf/defaultConfig');

function refreshRes(stats, res) {
    const {maxAge, expires, cacheControl, lastModified, etag} = cache;
    //Date.now()获取当前时间 毫秒数 再加过期时间10分钟，需要转换为毫秒数 转换为时间字符串
    if (expires) res.setHeader('Expires', new Date(Date.now() + maxAge * 1000).toUTCString());
    if (cacheControl) res.setHeader('Cache-Control', `public,max-age=${maxAge}`);
    if (lastModified) res.setHeader('Last-Modified', stats.mtime.toUTCString());
    if (etag) res.setHeader('ETag', `${stats.size}-${stats.mtime}`);
}

module.exports = function isFresh(stats, req, res) {
    refreshRes(stats, res);
    const lastModified = req.headers['if-modified-since'];
    const etag = req.headers['if-none-match'];
    //第一次请求可能会不有这俩值
    if (!lastModified && !etag) {
        return false;
    }
    //如果lastModified 设置与响应时不同则认为失效了
    if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
        return false;
    }
    //同上
    if (etag && etag !== res.getHeader('ETag')) {
        return false;
    }

    return true;

};