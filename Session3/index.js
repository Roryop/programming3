const express = require("express");
const { request } = require("http");
const { userInfo } = require("os");
const app = express();

app.use(express.static("../projekt"));

app.get("/", function(req,res){

    res.redirect("index.html");

})

app.get("/", function(req,res){

    res.send("Hello User");

})

app.get("/name/:name", function(req,res){

    let name = req.params.name;
    res.send("<h1>Hello " + name + "</h1>");

})

app.get("/google", function(req,res){

    res.redirect('https://www.google.com/');

})

app.get("/google/search/:search", function(req,res){

    let search = req.params.search;
    res.redirect('https://www.google.com/search?q=' + search);

})

app.get("/*", function(req,res){

    res.send(404);

})

app.listen( 3000, function(){

    console.log("hat funktioniert ! Port ist 3000!");

});
