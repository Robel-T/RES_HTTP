var Chance  = require('chance');
var chance  = new Chance();

var express = require('express');
var app     = express();

/* Exemple de test
app.get("/test", function(req,res){
    res.send("Hi, this is the test\n");
});

app.get("/", function(req,res){
    res.send("Hi, you have the access, good job!\n");
});*/

app.get("/", function(req,res){
    res.send(generateCountry());
});

app.listen(3000,function(){
    console.log("Accepting HTTP requests on port 3000");
});

function generateCountry(){
    var numberOfCountry = chance.integer({
        min:0,
        max:15
    });

    console.log(numberOfCountry);

    var tabCountry = [];

    for(var i = 0; i < numberOfCountry; i ++){
        var country = chance.country({full:true});
        var country2 = chance.country();
        var city    = chance.city();
        var street  = chance.street();
        var phone   = chance.phone();

        tabCountry.push({
            country : country,
            city    : city, 
            street  : street,
            phone   : phone
        });

    };
    console.log(tabCountry);
    return tabCountry;
}