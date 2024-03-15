function fetchDetails(template1,product,obj){
    
    template1=template1.replace("{#title#}",product[obj].title);
    template1=template1.replace("{#brand#}",product[obj].brand);
    template1=template1.replace("{#price#}",product[obj].price);
    template1=template1.replace("{#discountPercentage#}",product[obj].discountPercentage);
    template1=template1.replace("{#rating#}",product[obj].rating);
    template1=template1.replace("{#thumbnail#}",product[obj].thumbnail);
    template1=template1.replace("{#description#}",product[obj].description);
    return template1;
    
}

module.exports=fetchDetails;