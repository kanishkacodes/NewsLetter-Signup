const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){
   var firstName = req.body.fname;
   var lastName = req.body.lname;
   var email = req.body.email;
   const https = require("https")


   var data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
               FNAME: firstName,
               LNAME: lastName
            }


        }
    ]

   };

   const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/cd432cd38e"

  const options={
    method: "POST",
    auth: "kanishka21:efe54c262268a1a3e9f6ce3dcc32f0e2-us21"
  }

  const request =  https.request(url, options, function(response){

  if (response.statusCode === 200){
    res.sendFile(__dirname+"/success.html")
  }else{
    res.sendFile(__dirname+"/failure.html")
  }


    response.on("data", function(data){
        console.log(JSON.parse(data));
    })

   })

   
request.write(jsonData);
request.end();



});

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(3000, function(){
    console.log("server is running on port 3000");
});

//api key d3057bacf3300ac16c97682197fce3e1-us21    Audience ID      cd432cd38e