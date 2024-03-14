const fs=require("fs");
const http=require("http");
const url = require('node:url');



let homePageString=fs.readFileSync("./HTML/home.html","utf8");
let productString=fs.readFileSync("./HTML/products.html","utf8");
let detailString=fs.readFileSync("./HTML/details.html","utf8");


const dummydata=fs.readFileSync("data.json",'utf8');

const product=(JSON.parse(dummydata)).products;


let dataArray=product.map((item,idx)=>{
    let template=productString;
    template=template.replace("{#title#}",item.title);
    template=template.replace("{#thumbnail#}",item.thumbnail);
    template=template.replace("{#description#}",item.description);
    template=template.replace("{#link#}",'products'+'?'+"id="+idx);
    console.log(typeof(template));
   return template;
    
})

const finalString=dataArray.join("\n");
homePageString=homePageString.replace("{#Devansh Mart#}",finalString)


const app=http.createServer((req,res)=>{

    console.log("request generated...");
    const route=req.url;
    const parsedUrl=url.parse(route,true);
    console.log(parsedUrl);
    const {pathname,query}=parsedUrl;
    fs.appendFileSync("./requests/Requests_File.txt",`Timestamp : ${(new Date()).getTime()}  Route: ${req.url}\n`);

    console.log(req.url);

    switch(pathname){
        case('/'):{
            res.end("<h1>Welcome to SHOP!</h1>");
            break;
        }
        case("/products"):{
            console.log(query.id);
            if('id' in query){
                const obj=query.id;
                // console.log(obj);
                let template1=detailString;
                template1=template1.replace("{#title#}",product[obj].title);
                template1=template1.replace("{#brand#}",product[obj].brand);
                template1=template1.replace("{#price#}",product[obj].price);
                template1=template1.replace("{#discountPercentage#}",product[obj].discountPercentage);
                template1=template1.replace("{#rating#}",product[obj].rating);
                template1=template1.replace("{#thumbnail#}",product[obj].thumbnail);
                template1=template1.replace("{#description#}",product[obj].description);
                
                console.log(typeof(template1));
                res.end(template1);
               

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
            res.end("<h1>Oops! Not Found</h1>");
        }
    }
    

})

app.listen(1400,()=>{console.log("****Server listening at 1400*****")});


