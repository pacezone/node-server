const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')
let pathStatic = path.join(__dirname, 'sample')
let server = http.createServer((req,res)=>{
  var pathObj = url.parse(req.url, true)
  if (pathObj.pathname==='/') {
    pathObj.pathname += 'index.html'
  }
  let filePath = path.join(pathStatic,pathObj.pathname)
  fs.readFile(filePath,'binary',(err,content)=>{
 if (err) {
   res.writeHead(404,'not found')
   res.end('<h1>404 not found</h1>')
 } else {
  //res.setHeader('Content-Type','text/html; charset=utf-8')
   res.writeHead(200,'ok')
   res.write(content)
   res.end()
 }
    
    
  })
  
  
})
server.listen(8099)