const express = require('express');
const app = express();
// const server = require('http').Server(app)
const bodyParser = require('body-parser');
const ejs = require("ejs");
app.use(express.static("public"))



app.set('view engine', 'ejs') 
// app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));


const persondata=[];


app.get('/', (req, res) => {
  res.render("landing_page");
})

app.get('/home', (req, res) => {
  res.render("home");
})

app.get('/suggest_me', (req, res) => {

  // res.render("suggest_me", {kindaname: persondata[0].name });
  res.render("suggest_me");
})

app.get('/genre', (req, res) => {
  res.render("genre");
})


app.get('/:id', (req, res) => {
    res.render("movie");
  })

//post request coming from landing page; i.e. is home route
app.post("/", (req,res) => {
 
  // console.log(req.body.name);
  let data ={
  name:req.body.name,
  age: req.body.age,
  email:req.body.email
};
  persondata.push(data);

  res.redirect("/home");

})


  app.use(function(req, res) {
    res.json("404");
})





app.listen(3070, function() {
    console.log('listening on port 3070......');
})
