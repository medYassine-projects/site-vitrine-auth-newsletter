require("dotenv").config();
//const http = require('http');
const mongoose = require('mongoose');
const hostname = 'localhost';
const port = 3030;
const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const path = require('path')


const app = express()

const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json())
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')))

const blogRouter = require('./routes/blogs')
const userRouter = require('./routes/users')
const User = require("./models/user");

app.use(async (req, res, next) => {
  try {
    if (req.headers["x-access-token"]) {
      console.log('aef'+req.headers["x-access-token"])
     const accessToken = req.headers["x-access-token"];
     const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
     // Check if token has expired
     if (exp < Date.now().valueOf() / 1000) { 
      return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
     } 
     res.locals.loggedInUser = await User.findById(userId);
     console.log('res : ',res.locals.loggedInUser)
      next(); 
    } else { 
     next(); 
    } 
  } catch (error) {
    res.status(401).json(error)
  }
  
});
app.use(express.static('uploads'))
app.use('/user',userRouter)
app.use('/', blogRouter)


const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

mongoose.connect(process.env.url, {useNewUrlParser: true})
const con = mongoose.connection
 
con.on('open', function(){
  console.log('connected...')
})

