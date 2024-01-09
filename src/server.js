const httpInstance = require("http");
const httpStatusInstance = require("http-status-codes");
const fsInstance = require("fs");
const portNumber = 8080;

const redirectTo = (url, extension) => 
    `src/pages/${url}.${extension}`

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
    if(req.url === "/"){
        res.writeHead(httpStatusInstance.StatusCodes.OK,{
            "Content-Type":"text/html",
            
        })
        readFile(redirectTo("index", "html"), res)
    }else if( req.url === "/index.js"){
        res.writeHead(httpStatusInstance.StatusCodes.OK,{
            "Content-Type":"application/javascript",
            
        })
        readFile(redirectTo("index", "js"), res)
    }
    else if( req.url === "/index.css"){
        res.writeHead(httpStatusInstance.StatusCodes.OK,{
            "Content-Type":"text/css",
            
        })
        readFile(redirectTo("index", "css"), res)
    }
  
    
})

httpServer.listen(portNumber, ()=>{
    console.log(`Serve is listening on port ${portNumber}`)
})