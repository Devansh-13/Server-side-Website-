const fs=require("fs");
const http=require("http");
const url = require('node:url');
const dataArrayFetch=require("./data-Array-Fetch.js")
const fetchDetailsData=require("./details.js")



let errorPageString=fs.readFileSync("./HTML/error.html","utf8");
let landingPageString=fs.readFileSync("./HTML/landing.html","utf8");
let homePageString=fs.readFileSync("./HTML/home.html","utf8");
let productString=fs.readFileSync("./HTML/products.html","utf8");
let detailString=fs.readFileSync("./HTML/details.html","utf8");
const dummydata=fs.readFileSync("data.json",'utf8');


const product=(JSON.parse(dummydata)).products;


let dataArray=dataArrayFetch(product,productString);

const finalString=dataArray.join("\n");
homePageString=homePageString.replace("{#Devansh Mart#}",finalString)


const app=http.createServer((req,res)=>{

    console.log("request generated...");
    const route=req.url;
    const parsedUrl=url.parse(route,true);

    const {pathname,query}=parsedUrl;

    fs.appendFileSync("./requests/Requests_File.txt",`Timestamp : ${(new Date()).getTime()}  Route: ${req.url}\n`);

    // console.log(req.url);

    switch(pathname){
        case('/'):{
            res.end(landingPageString);
            break;
        }
        case("/products"):{
            console.log(query.id);
            if('id' in query){
                const obj=query.id;
                // console.log(obj);
                let template1=detailString;
                let finalTemplate=fetchDetailsData(template1,product,obj);
                // console.log(typeof(finalTemplate));
                res.end(finalTemplate);
               

            }
            else{
                res.end(homePageString);
                
            }
            break;
        }
      
        case('/help'):{
            res.end("<h1>How can we help you!</h1>");
            break;
        }
        case('/about'):{
            res.end("<h1>I am devansh!</h1>");
            break;
        }
        default: {
            res.writeHead(404,{
                'Content-Type':
                    'text/html'
            })
            res.end(errorPageString);
        }
    }
    

})

app.listen(1400,()=>{console.log("****Server listening at 1400*****")});


