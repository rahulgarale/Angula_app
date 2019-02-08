var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt=require('jsonwebtoken');

var messages = [
    {text:'Hey! Whats up?' , owner:'Tim'}, 
    {text:'At office! Wbu?', owner:'Jane'}, 
    {text:'Hey Tim! How you doing?', owner:'Alice'}

];
var users=[{firstName:'a',lastName:'a',email:'a',pass:'a',id:0}];


app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
})

var api = express.Router();
var auth = express.Router();
api.get('/messages', (req, res) => 
{
    res.json(messages);
})

api.get('/messages/:user', (req, res) => 
{
    var user=req.params.user;
    var result=messages.filter(message=>message.owner == user)
    res.json(result);
})

api.post('/messages', (req, res) => 
{
    messages.push(req.body);
    res.json(req.body);
})
api.get('/users/me',checkAuthenticated,(req,res)=>{
   res.json(users[req.user]);
})
api.post('/users/me',checkAuthenticated,(req,res)=>{
   var user=users[req.user];
   user.firstName=req.body.firstName;
   user.lastName=req.body.lastName;
   res.json(user);

 })
 
auth.post('/register', (req, res) => 
{
    var index=users.push(req.body) -1;
    var user=users[index];
    user.id=index;
    sendToken(user,res);
    
})
auth.post('/login', (req, res) => 
{ var user=users.find(user=>user.email ==req.body.email);
   if(!user)
        sendAuthError(res);
    if(user.pass == req.body.pass)
         sendToken(user,res);
    else
        sendAuthError(res);

})
function sendToken(user,res){
    var token=jwt.sign(user.id,'123');
    res.json({firstName:user.firstName,token});
}
function sendAuthError(res){
     return res.json({sucess:false,message:'email or password incorrect'});
}
function checkAuthenticated(req,res,next){
    if(!req.header('authorization'))
        return res.status(401).send({message:'unauthorized requested.missing authentication header'});

    var token=req.header('authorization').split(' ')[1];
    var payload=jwt.decode(token,'123');
    //console.log(this.token);
    if(!payload)
        return res.status(401).send({message:'unauthoried requested.Authentication header invalid'});
        req.user=payload;
        next();
  }

app.use('/api', api);

app.use('/auth', auth);

app.listen(63145);