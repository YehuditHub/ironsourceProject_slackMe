const express = require('express');
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var Slack = require('slack-node');
var currToken;
var channel;

var slack;


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.listen(3000);

app.post('/post', (req, res) => {
    message = req.body.message;
    currChannel = req.body.channel;
    console.log(JSON.stringify(req.body));
    console.log(currChannel);
    slack.api('chat.postMessage', {token:currToken, text:message, channel:currChannel},
    function(err, data){
        console.log("post!")
        console.log(data);
        res.send(JSON.stringify({data}));
    });
});



app.get('/get', (req, res) => {
    slack.api('conversations.history', { token: currToken, channel:'C01ER63SXM3'},
    function(err, data){
        console.log("get!")
        console.log(data);
        res.send(JSON.stringify({data}));
    });
 });

app.get('/getConversatins',(req, res)=>{  
    slack.api('conversations.list', { token: currToken},
    function(err, data){
        console.log("get conversatins!")
        //console.log(data);
        res.send(JSON.stringify({data}));
    });
});

app.get('/getUsers', (req, res) => {
    slack.api("users.list", function(err, data) {
        console.log(data);
        res.send(JSON.stringify({data}));
    });
});


function getUserList(){
slack.api("users.list", function(err, response) {
    console.log(response);
    return response;
  });
}

app.post('/login', function (req, res) {

    currToken = req.body.token;
    slack = new Slack(currToken);
    console.log(currToken);
    res.sendFile(__dirname+"/index.html");
});