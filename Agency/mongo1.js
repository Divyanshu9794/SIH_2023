const express = require('express')
var bodyParser = require("body-parser");
// const { MongoClient } = require('mongodb');
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);
const db_name = 'Bus-yatri';
const app = express()
const port = 2204
const nodemailer = require('nodemailer');
const alert = require('alert');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sdivyanshu:divyanshu352@cluster0.cp0uk3u.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



app.use(express.static("Asset"));

//static path:the entire public directory is made static
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')

})
app.get('/signup.html', (req, res) => {
    res.sendFile(__dirname + '/signup.html')

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


app.post('/login.html',async(req,res)=>{

    try{
        const login_user=req.body.email
        const password=req.body.password
        const useremail=await db.collection('Signup').findOne({email:login_user});
        // res.send(useremail);
        // console.log(useremail);
        if(useremail.password==password){
            console.log("Login Successfully");
        
 
            alert('Logged In Successfully')
            res.redirect("/");
            
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






app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
}) 