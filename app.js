//jshint esversion:6

const express = require("express");
const app = express();
const https= require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

const cryptoCurrency = req.body.crypto;
const currency = req.body.fiat;

const baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
const finalURL = baseURL+cryptoCurrency+currency;
const publicKey="ZGUyNTZmYTAwZTZjNDViNDg5MDY3OTVmODBkNTA1MWE";
// https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD

var options={

  "method":"GET",
  "headers":{
'x-ba-key':publicKey
  }
};
https.get(finalURL, options, function(response){
  console.log(response.statusCode);
  response.on("data",function(data){
    var TickerData = JSON.parse(data);
    console.log(TickerData);

    var parseData = TickerData.open.hour;

    res.send("<h1> The Current market Rate is  " + parseData +"&nbsp;"+ cryptoCurrency);
  });
});

});

app.listen(4000,function(){
  console.log("Server started on port 3000");
});
