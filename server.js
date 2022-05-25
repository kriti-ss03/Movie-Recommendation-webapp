const express = require('express');
const app = express();
// const server = require('http').Server(app)
const bodyParser = require('body-parser');
const ejs = require("ejs");
app.use(express.static("public"))



app.set('view engine', 'ejs') 
// app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));




app.get('/', (req, res) => {
  res.render("home");
})

app.get('/:id', (req, res) => {
    res.render("movie");
  })
app.use(function(req, res) {
    res.json("404");
})




app.listen(3070, function() {
    console.log('listening on port 3070......');
})
