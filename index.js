const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const fs=require("fs");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));


const jsdom=require("jsdom");
const{ JSDOM }=jsdom;
global.document=new JSDOM("index.html").window.document;
app.get("/",function(req,res){    
res.sendFile(__dirname+"/index.html");
 });








 app.post("/",function(req,res){
     const query=req.body.cartoon;
     const url="https://www.superheroapi.com/api.php/2421558101467614/"+query+"/image";
     https.get(url,function(response){
     response.on("data",function(data){
         const cart1=JSON.parse(data);
        const tempname= cart1.name;
        const ImageRock=cart1.url;
        res.write("<h1>The Super Hero is <a href=\"localhost:3000/info\">"+tempname+"</a></h1>");
           res.write("<a href ="+ImageRock+" target=\"_blank\">Wanna See me!</a>");
    })
    const url1="https://www.superheroapi.com/api.php/2421558101467614/"+query+"/biography";
    https.get(url1,function(response){
        response.on("data",function(data){
            const cart2=JSON.parse(data);
           const bio=cart2.publisher;
           const placeofbirth=cart2["place-of-birth"];
           const fullname=cart2["full-name"];
           res.write("<h1>The Publisher is: "+bio+"</h1>");
           res.write("<h1>The Place of Birth is: "+placeofbirth+"</h1>");
        //    res.write("<h1>The Full Name "+fullname+"</h1>");
           res.send();
        })
    })      

   })
 })
app.listen(3000,function(err){
    if(err)
    {
        console.log("error");
        return;
    }
    console.log("server is running at 3000");
});
