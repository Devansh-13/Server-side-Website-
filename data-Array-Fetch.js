
function createDataArray(product,productString){

   let dataArray = product.map((item,idx)=>{
    let template=productString;
    template=template.replace("{#title#}",item.title);
    template=template.replace("{#thumbnail#}",item.thumbnail);
    template=template.replace("{#discountPercentage#}",item.discountPercentage);
    template=template.replace("{#link#}",'products'+'?'+'id='+idx);
    console.log(typeof(template));
    return template;
    
})
    return dataArray;

}

module.exports=createDataArray;