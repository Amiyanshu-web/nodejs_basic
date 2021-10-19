const http=require('http');
const todo=[
    {id:1,name:'Learn Node.js'},
    {id:2,name:'Learn React.js'},
    {id:3,name:'Learn Angular.js'},
]

const server=http.createServer((req,res)=>{
    // res.statusCode=404;
    // res.setHeader('Content-Type','application/json');
    // res.setHeader('X-Powered-BY','Node-js');

    //above is exact same as below code

    
    // console.log(req.headers.authorization);
    const {method,url}=req;
    let body=[];
    req.on('data',chunk=>{
        body.push(chunk);
    })
    .on('end',()=>{
        body=Buffer.concat(body).toString();
        let statusCode=404;
        const response={
            success:false,
            data:null
        }
        if(method==='GET' && url==='/todos'){
            statusCode=200;
            response.success=true;
            response.data=todo;
        }
        else if(method=='POST' && url==='/todos'){
           
            const {id,name}=JSON.parse(body);
            if(!id|| !name){
                statusCode=400;
            }
            else{
statusCode=201;
            response.success=true;
            todo.push({
                id:id,
                name:name
            });
            response.data=todo;
            }
             
        }
        res.writeHead(statusCode,{
        'Content-Type':'application/json',
        'X-Powered-BY':'Node-js'
    });
        // console.log(body);
        res.end(JSON.stringify(response));
    });
    

});

const PORT=5000;
server.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));



//get(retrieve data) post(submit data) post(update data) delete(del data)