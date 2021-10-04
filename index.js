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

app.use('/public',express.static(path.join(__dirname, '/public')));
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
    host: "eselite.net",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'info@eselite.net', // generated ethereal user
      pass: 'r6|%&(cFe146', // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }

  });

  // send mail with defined transport object
  let info =  await transporter.sendMail({
    from: '"EcoStates Elite"<noreply@eselite.net>', // sender address
    to: `"EcoStates Elite"<info@eselite.net>`,
    replyTo:`${req.body.name} <${req.body.email}>`, // list of receivers
    subject: "EcoStates Elite", // Subject line
    html: output, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.render('contact.handlebars',{msg: 'Your message has been sent'})

})

app.listen(3000,()=> console.log('server started...'))