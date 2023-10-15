const express = require('express')
var bodyParser = require("body-parser");
const mongoose = require('mongoose');

const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const db_name = 'BusYatri';
const app = express()
const port = 2204
const nodemailer = require('nodemailer');
const alert = require('alert');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://sdivyanshu:divyanshu352@cluster0.cp0uk3u.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });



app.use(express.static("Asset"));

//static path:the entire public directory is made static
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html')

})
app.get('/signup.html', (req, res) => {
    res.sendFile(__dirname + '/signup.html')

})
app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html')

})
app.get('/map.html', (req, res) => {
    res.sendFile(__dirname + '/map.html')

})
app.get('/pass.html', (req, res) => {
    res.sendFile(__dirname + '/pass.html')

})
app.get('/ticket.html', (req, res) => {
    res.sendFile(__dirname + '/ticket.html')

})
app.get('/bus_running.html', (req, res) => {
    res.sendFile(__dirname + '/bus_running.html')

})
app.get('/prediction.html', (req, res) => {
    res.sendFile(__dirname + '/prediction.html')

})
app.get('/route.html', (req, res) => {
    res.sendFile(__dirname + '/route.html')

})


app.use(bodyParser.urlencoded({
    extended: true
}));
const db = client.db(db_name)
app.post('/signup.html', function (req, res) {
   
    const email = req.body.email
    const phone = req.body.phone
    // const city = req.body.subject.option
    
    const fname = req.body.first_name
    const lname = req.body.last_name
    const pass = req.body.password
    const eid = req.body.EmployeeID
    const confrm_pass = req.body.confrm_passwd
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sdivyanshu5561@gmail.com',
            pass: 'rllqpkstuoejbugo'
        }
    })

    var mailoptions = {
        from: 'sdivyanshu5561@gmail.com',
        to: req.body.email,
        subject: 'Welcome to BusYatri ' ,
        html: "Welcome to BusYatri Admin Dashboard Panel.."


    };

    transporter.sendMail(mailoptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            // res.send("Thanks for registering you will recieve confirmation mail Shortly..");
            // res.alert("Confirmation mail will be sent to you Shortly!! Thankyou.")
            // res.redirect('/');
            console.log("success")
            res.redirect("/");
        }

    })

    var data = {
        
        "Name":fname + lname,
        "Employee_ID":eid,


        "Email": email,
        "Phone Number": phone,
        "Password": pass,
        "Confirm Password": confrm_pass,
        // "City": city
        
    }
    db.collection('Signup').insertOne(data, function (err, collection) {
        if (err) console.log(err)
        const empid=req.body.EmployeeID
        const userid= db.collection('Signup').findOne({eid:empid});
        if(userid==empid){
            console.log("User Already Exist");
        
 
            alert('User Already Exists!!')
            res.redirect("/");
            
        }
        else{
            console.log("USer Logged IN")
            alert('Welcome')
        }
       
    })

})
app.post('/payment.html', (req, res) => {
    // Extract the form data
    const name = req.body.name
    const email = req.body.email
    
  
    // Generate a random room number
    const roomNumber = Math.floor(Math.random() * 100) + 1;
  
    // Create the email message
    const message = `Dear ${name},\n\nYour ticket has been booked for the event .
      Your room number is ${roomNumber}.`;
  
    // Set up the nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Enter the email service you are using (e.g., Gmail)
      auth: {
          user: 'sdivyanshu5561@gmail.com',
          pass: 'rllqpkstuoejbugo'
      }
    });
  
    // Set up the email options
    const mailOptions = {
      from: 'sdivyanshu5561@gmail.com',
      to: email,
      subject: 'Ticket Booking Confirmation',
      text: message
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log("booking Successfully");
        
 
            alert('booked Successfully');
            res.redirect("/");
      }
    });
  });


app.post('/',async(req,res)=>{

    try{
        const login_user=req.body.EmployeeID
        const password=req.body.password
        const empid=await db.collection('Signup').findOne({Employee_ID:login_user});
        // res.send(useremail);
        // console.log(useremail);
        if(empid.password==password){
            console.log("Login Successfully");
        
 
            alert('Logged In Successfully')
            res.redirect("/index.html");
            
        }
        else{
            console.log("Invalid Login Details")
            alert('Invalid Login Details')
        }
        
    
    }
    
    catch(error){
             console.log("Invalid login details");
              alert('Invalid Login Details')
             
    }
})


const mongoURI = 'mongodb://localhost/BusYatri';

const Schema = mongoose.Schema;
const revenueSchema = new Schema({
  Date_time: String,
  Source: String,
  Destination: String,
  Cost: Number
});
const RevenueModel = mongoose.model('Revenue', revenueSchema, 'Revenue');

app.set('view engine', 'ejs');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/ticket.html', (req, res) => {
  RevenueModel.find({}, (err, data) => {
    if (err) {
      console.error('Error retrieving data: ' + err);
      return res.status(500).send('Error retrieving data.');
    }
    res.render('ticket', { data: data });
  });
});





app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
}) 