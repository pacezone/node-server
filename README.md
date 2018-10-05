# node-server
```
const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')
```
把需要引用的模块引用
```
let pathStatic = path.join(__dirname, 'sample')
```
将静态资源相对本`index.js`的路径定义为变量 `pathStatic`
```
let server = http.createServer((req, res) => {
```
新建一个http的服务器定义为server并且在端口8090监听
```
var pathObj = url.parse(req.url, true)
```
 解析req.url为一个关于urlObj,里面有query，pathname等对象属性
```
  if (pathObj.pathname === '/') {
    pathObj.pathname += 'index.html'
  }
```
当用户没有输入url指向的地址，默认用户是指向index.html
```
  let filePath = path.join(pathStatic, pathObj.pathname)
``` 
要读取的文件路径是，相对该js文件的sample文件夹和url中读取的路径名称
```
  readFile(filePath,req,res)
})
server.listen(8099)
```
读取文件，传入文件路径，用户请求和响应作为参数
```
let readFile = (filePath, req, res) => {
  fs.readFile(filePath, 'binary', (err, content) => {
```
定义`readFile`函数，传入需要读取成二进制文件的路径，用户的请求和响应对象。使用`fs`模块的`readFile`对象读取文件，读取方式是`binary`,读取路径为`filePath`    
```    
    if (err) {
      res.writeHead(404, 'not found')
      res.end('<h1>404 not found</h1>')
```
当读取失败的时候，返回404状态码和内容，为`not found`页面打印为`not found`
```
    } else {
      //res.setHeader('Content-Type','text/html; charset=utf-8')
      res.writeHead(200, 'ok')
      res.write(content)
      res.end()
    }
  })
}
```
若读取成功，将读取成功的文件，返回给用户，并返回状态码200
>该返回的东西有一个问题，就是，乱码，已经将`utf-8`加入到页面或者返回值中都不行。
