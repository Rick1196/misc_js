const httpInstance = require("http");
const httpStatusInstance = require("http-status-codes");
const fsInstance = require("fs");
const portNumber = 8080;

const baseFileRegex = /\/[\w\d]*[^\.]$/g

const routes = {
    '/phone':"phone/index",
    '/ticTacToe':"tic-tac-toe/index",
    '/tree':"tree/index"
}

const redirectTo = (url, extension) => 
    `src/pages/${url}${extension?extension:''}`

const readFile = (filePath, res) =>{
    if(fsInstance.existsSync(filePath)){
        fsInstance.readFile(filePath, (error, data) =>{
            if(error){
                console.error(error);
                handleError(res);
                return
            }
            res.write(data);
            res.end();

        })
    }else{
        handleError(res);
    }
}

handleError = res =>{
    res.writeHead(httpStatusInstance.StatusCodes.NOT_FOUND,{
        "Content-Type":"text/html",
        "X-Content-Type-Options":"nosniff"
    });
    res.write("<h1>Route not Found</h1>");
    res.end();
}

const httpServer = httpInstance.createServer((req, res) =>{
    console.log(req.url)
    if(baseFileRegex.test(req.url)){
        res.writeHead(httpStatusInstance.StatusCodes.OK,{
            "Content-Type":"text/html",
            
        })
        readFile(redirectTo(routes[req.url], ".html"), res)
    }else if( req.url.includes('.js')){
        res.writeHead(httpStatusInstance.StatusCodes.OK,{
            "Content-Type":"application/javascript",
            
        })
        readFile(redirectTo(req.url), res)
    }
    else if( req.url.includes(".css")){
        res.writeHead(httpStatusInstance.StatusCodes.OK,{
            "Content-Type":"text/css",
            
        })
        readFile(redirectTo(req.url), res)
    }
  
    
})

httpServer.listen(portNumber, ()=>{
    console.log(`Serve is listening on port ${portNumber}`)
})