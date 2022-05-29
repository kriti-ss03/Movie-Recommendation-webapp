const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
// const nodemailer = require("nodemailer");

const app = express();

app.use(express.static("public"))
app.set('view engine', 'ejs') 
// app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));


let personName=[];


app.get('/', (req, res) => {
  res.render("landing_page");
})

app.get('/home', (req, res) => {
  res.render("home",{kindaname: personName});
})

app.get('/suggest_me', (req, res) => {
  res.render("suggest_me");
})

app.get('/genre', (req, res) => {
  res.render("genre");
})

app.get('/search', (req, res) => {
  res.render("search");
})


app.get('/ask_frnd', (req, res) => {
  res.render("ask_frnd");
})

app.get('/:id', (req, res) => {
    res.render("movie");
})
  


//post request coming from landing page; i.e. is home route
app.post("/", (req,res) => {
personName=[];
personName.push(req.body.name);
res.redirect("/home");

})


app.use(function(req, res) {
    res.json("404");
})


app.listen(3000, function() {
    console.log('listening on port 3000......');
})
