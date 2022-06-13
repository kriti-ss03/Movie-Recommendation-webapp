// //environment variables
require('dotenv').config();


const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const nodeMailer  = require("nodemailer");
const { google } = require('googleapis');

const app = express();

app.use(express.static("public"))
app.set('view engine', 'ejs') 
// app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));


let personName = [];



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

// FOR EMAIL SENDING -ASK FRND-Using Googleapis and nodemailer
var to_email = "";
var sender_mail= "";
var newitems = [];
var status = "";

const CLIENT_ID = process.env.CLIENTID;
const CLEINT_SECRET = process.env.CLIENTS;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.RT;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

app.get('/ask_frnd', function (req, res) {
      res.render('ask_frnd',{ kindaitems :newitems, kindastatus:status});
});



app.post("/add", function(req,res){
   var item=req.body.newitem;
  newitems.push(item);
  res.redirect("/ask_frnd");
  
 

});

app.post("/delete", function(req,res){
  const checkedItemIndex = req.body.checkbox;
  //console.log(checkedItemIndex);
  newitems.splice(checkedItemIndex, 1);
  res.redirect("/ask_frnd")
});

app.post("/clear", function(req,res){
  newitems = [];
  status = " ";
  res.redirect("/ask_frnd")
});

app.post('/ask_frnd', function (req, res) {
      var showAsString = newitems.join(', ');
      sender_mail = req.body.myEmail;
      to_email = req.body.to;
      // console.log(newitems);


  const output = `
       <div>
  <p>Ahoy there, your friend is bit confused and wants you to select a movie to watch from the list shared!</p>
  <h3>Friend's Name:</h3>
  <p> ${sender_mail.split('@')[0]}</p>
  <h3>Movie Names:</h3>
  <p> ${showAsString}</p>
  <p>Drop suggestion in your Friend's inbox! <a class="footer-link" href="mailto:${sender_mail}">Send Mail.</a></p>
  <hr>
  <h4>This email is sent via Movix.</h4>
  </div>`;
      

    //since want to use await
  async function sendMail() {
    try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transport = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL,
          clientId: CLIENT_ID,
          clientSecret: CLEINT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });


      let mailOptions = {
          from: 'Movix <process.env.EMAIL>', // sender address
          to: to_email, // list of receivers
        subject: 'Movie-List from your friend || Movix', // Subject line
          text: "html format not supported || movix",  //simple text incase html body is not supported
          html: output// html body
      };

      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }

  sendMail()
    .then((result) => {
      console.log('Email sent...', result)
       status = "Mail Sent";
      res.redirect("/ask_frnd")
    })
    .catch((error) => console.log(error.message));
  

      });
 

// PAGE WITH DETAILS OF RESPECTIVE MOVIE
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


app.listen(process.env.PORT || 3000, function() {
    console.log('listening on port 3000......');
})
