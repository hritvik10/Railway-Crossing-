const express = require("express");
const https = require("https");
const { query } = require("express");
const bodyParser =require("body-parser")
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.sendFile(__dirname + "/test.html");
    
});

 app.post("/",function(req,res){
     console.log(req.body.cityname);
     console.log(req.body.distance)
     const dis=req.body.distance;
    const time=parseFloat(dis)*60/30; 
     const query=req.body.cityname;
    const apikey="c3489811c73fcf4ff27c00ac0876c6c1";
    const url = "https://indianrailapi.com/api/v2/LiveStation/apikey/"+apikey +"/StationCode/"+ query+"/hours/3/";
    https.get(url,function(response){
        console.log(response.statusCode);
            response.on("data",function(data){
              const train = JSON.parse(data);
              console.log(train);
              console.log(train.Trains[0].Name)
               var yo=train.Trains[0].ExpectedDeparture;
            //    res.write("success!");
    //  res.write("<h1>next train arriving at "+yo+" + "+time +" min approximately.</h1>");
      res.sendFile(__dirname+"/success.html")
 });
});
 });   
    //we can use multiple res.write but only single res.send in a given app methods
    
   



//https://api.geoapify.com/v1/routing?waypoints=32.261712774007066,75.98564147949219|30.20911695037711,76.334800720214844&mode=drive&apiKey=867170cad339434ebe485e00ef1f68ea#"





app.listen(process.env.PORT|| '8080',function(){
    console.log("running...");
});
