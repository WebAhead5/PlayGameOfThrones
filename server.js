const http = require('http');
const path = require('path');
const PORT = process.env.PORT ||5000;
const fs = require('fs');
const filePath  = path.join(__dirname,'src','html',);


const server = http.createServer((req,res) => {
    var src = 'src';
    if(req.url.indexOf('img') != -1){
        src = '';
    }
    const filePath  = path.join(__dirname,src,req.url === '/' ? '/html/index.html': req.url);
    const extname   = path.extname(filePath);
    let  contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.json':
            contentType = 'application/json';
            break;

    }

    fs.readFile(filePath,(err,content) => {
        if(err){
            if(err.code == 'ENOENT'){
                res.writeHead(404, {'Content-Type':'text/html'});
                res.end('<h1> File Not Found </h1>')
            }else{
                res.writeHead(500, {'Content-Type':'text/html'});
                res.end(`Server Error: ${err.code}` );
            }
        }else{
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content,'utf8');
        }
    })
    console.log(filePath);
//    if(req.url === "/"){
//        fs.readFile(filePath, (err,file) => {
//            res.writeHead(200,{'Content-Type':'text/html'});
//            res.end(file)
//        })
//    }
})

server.listen(PORT,()=>
    console.log(`Server is running at Port ${PORT}, and waiting for requests`));