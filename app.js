const express = require("express");
const https = require("node:https");
const bodyParser = require("body-parser")
const client = require("@mailchimp/mailchimp_marketing");
const port = process.env.PORT || 3000;

const app = express();




app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get('/', function(req, res){
    res.sendFile(__dirname+"/signup.html")
})





app.post("/" ,function(req,res) {

    
    const listId = "02568d9a43"

    var firstName = req.body.first
    var lastName = req.body.last
    var email = req.body.email
    



    client.setConfig({
        apiKey: "cb8defcfec43d2fd414ec8a06d80b788-us10",
        server: "us10"
        
      });
      const run = async () => {
        const response = await client.lists.batchListMembers(listId, {
            members: [{
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }],
        });
        
        if (response.error_count ==0){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
      };

      run();
});

app.post("/failure", function(req, res){
    res.redirect("/")

})





app.listen(port, function(){
    console.log("Server is runing ");
});
