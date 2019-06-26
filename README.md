# node-static-web

**1.项目文件介绍:**

    1.gitignore文件   上传git忽略文件
    2.npmignore文件   上传npm忽略文件
    3.editorconfig    针对每个项目定义的统一的代码风格 
    4.eslintrc        编码规约
        eslint --init 初始化文件 
    5.eslintignore    编码规约忽略文件
    
**2.node实时调试：页面**

    npm i -g supervisor
    使用此模块启动node，可实时监听文件
    supervisor app.js
    以上命令太长可进行重命名
    1.查看全局的npm module:  npm root -g 
    2.复制以上路径：C:\Users\ASUS'\AppData\Roaming\npm\node_modules
    3.进入上级目录：C:\Users\ASUS'\AppData\Roaming\npm\
    4.复制粘贴 supervisor.cmd 并重命名为 debug.cmd
    5.执行命令 debug app.js 等同于 supervisor app.js
    
**3.在IntelliJ IDEA开发nodejs进行热部署免重启:**

    1.首先安装nodemon
      npm install -g nodemon
    2.Run/Debug Configures --> configures -->
        将node.exe改为C:\Users\ASUS'\AppData\Roaming\npm\nodemon.cmd
    3.修改文件后可即时生效
    4.安装完 nodemon 后，就可以用 nodemon 来代替 node 来启动应用：
      nodemon [your node app]（相当于 node [your node app]）
      如果没有在应用中指定端口，可以在命令中指定：
      nodemon ./server.js localhost 8080
      可以运行 debug 模式：
      nodemon --debug ./server.js 80
      查看帮助，帮助里面有很多选项都是一目了然：
      nodemon -h 或者 nodemon -help
    
**4.导入idea的node项目识别：**
    
    1.settings ：
        -> Javascript 修改为 ES6
        ->nodejs and NPM 修改为 Enable 并添加此项目  
        
**5.handlebars模板引擎使用：**
    
    1.安装 ：npm i handlebars
    2.使用：src/helper/route.js
    
**6.启动：**

    1.nodemon src/app.js 
        访问localhost:3000 会直接进如src目录
    2.nodemon app.js 
        访问localhost:3000 会直接该项目下，而非src目录下
        
**7.range范围请求:rang.js**

    1.range：byte =[start]-[end]
    2.Accept-Ranges:bytes
    3.Content-Range:bytes start-end/total
    
    4.curl测试：
        curl 127.0.0.1::3000/LICENCE    打开文件（含所有内容）
        curl -I 127.0.0.1::3000/LICENCE 查看请求头内容
        curl -i 127.0.0.1::3000/LICENCE 查看请求头内容 并且 打开文件（含所有内容）
        curl -r 0-10 -i 127.0.0.1::3000/LICENCE 查看请求头内容 并且 打开文件（下标为0到下标为10的内容）

**8.缓存header:浏览器缓存**

    1.Expires,Cache-Control
    2.If-Modified-Since / Last-Modified
    3.If-None_Match / ETag
    
**9.项目做成一个cli：**

    1.安装：npm i -g node-static-web
    2.执行node-static-web：把当前文件夹作为静态资源服务器根目录 
    3.node-static-web -p 8080 设置端口号为8080
    4.node-static-web -h localhost 设置主机为localhost
    5.node-static-web -d /usr 设置根目录为 /usr
    
    6.接受命令行解析工具： commander  和 yargs --》可查询官网获取使用方式
    7.安装yargs ： npm i yargs --save
        共同点
        两种方式都会安装到node_modules目录中。
        两种方式都会保存到package.json文件中。
            –save会存放到”dependencies”，而–save-dev会存放到”devDependencies”。 
            --save是对生产环境所需依赖的声明(开发应用中使用的框架，库) 
            比如：jq，react，vue都需要放到这里面 
            --save-dev是对开发环境所需依赖的声明(构建工具，测试工具) 
            比如：babel，webpack，都放到当前目录
            
    8.使用：
        app.js封装server
        package.json 添加main
        index.js调用：
            node src/index.js -p 9999
            node src/index.js --port=9999
    9.开始做成cli：
        1.package.json添加配置发到npm：
            "bin":{
                "node-static-web":"bin/node-static-web"
            }
        2.建同级文件：bin/node-static-web
        3.linux下添加权限：chmod +x bin/node-static-web
        4.启动： bin/node-static-web -p 9999
    10.version:
        x.y.z
        1.2.0
        z位：bug修复 1.2.1 1.2.9之后为1.2.10
        y位：内容新增
        x位：大版本升级，不保证兼容
        当配置为1.2.*表示bug自动升级
        当配置为2.X时表示内容自动升级