module.exports = {
    root: process.cwd(),
    hostname: '127.0.0.1',
    port: 3000,
    compress: /\.(html|js|css|md)/,
    cache: {
        //客户端多长时间有效 10分钟 600秒有效
        maxAge: 600,
        expires: true,
        cacheControl: true,
        lastModified: true,
        etag: true
    }
}