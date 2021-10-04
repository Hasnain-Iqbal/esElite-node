const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const handlebars = require('handlebars')
const path = require('path')
const nodemailer = require('nodemailer')

const app = express()
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: false }));
app.set("view engine", "handlebars");
app.set("views", "views");

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
  res.render('index')
})

app.get('/index.handlebars',(req,res)=>{
    res.render('index')
})

app.get('/services.handlebars',(req,res)=>{
  res.render('services')
})

app.get('/book.handlebars',(req,res)=>{
  res.render('book')
})

app.get('/about.handlebars',(req,res)=>{
  res.render('about')
})

app.get('/blog.handlebars',(req,res)=>{
  res.render('blog')
})

app.get('/faqs.handlebars',(req,res)=>{
  res.render('faqs')
})

app.get('/contact.handlebars',(req,res)=>{
  res.render('contact')
})




app.post('/contact.handlebars',async (req,res) =>{


    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
    <li>Subject: ${req.body.subject}</li>
    <li>Message: ${req.body.message}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `
    console.log(req.body)


    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'c74bad612f99f1', // generated ethereal user
      pass: 'c294df8d980082', // generated ethereal password
    },

  });

  // send mail with defined transport object
  let info =  await transporter.sendMail({
    from: '"EcoStates Elite"<eselite.net>', // sender address
    to: "hasnainnode1@gmail.com", // list of receivers
    subject: "EcoStates Elite", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.render('contact.handlebars',{msg: 'Your message has been sent'})

})

app.listen(3000,()=> console.log('server started...'))