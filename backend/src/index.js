import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js';
import helmet from 'helmet'
import cors from 'cors'
import { expressCspHeader, INLINE, NONE, SELF, UNSAFE_INLINE } from 'express-csp-header'
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cookieParse from 'cookie-parser'
import {app,server} from './lib/socket.js'
import path from 'path';


dotenv.config();

const __dirname = path.resolve();

/* app.use(cors({
  origin:"http://localhost:5173",
  credentials: true,
  
}));

*/

app.use(express.json());
app.use(cookieParse())
app.use('/auth', authRoutes);
app.use('/messages',messageRoutes)

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get(/(.*)/, (req,res) => {
  res.sendFile(path.join(__dirname, "../frontend","dist","index.html"))
})

/*app.get('/', (req, res) => {
  res.send('LOGIN Route!');
}); */

/*app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self'   http://localhost:* ");
    next();
});  */

/*app.use(expressCspHeader({
  policies: {
      'default-src': [SELF],
      'script-src': [SELF, INLINE,"http://localhost:3003" ],
      'style-src': [SELF],
      'img-src': ['data:', 'favico.ico'],
      
    
  }
}));*/


/*app.use(helmet({
 contentSecurityPolicy:false,
 
})); */
// Source - https://stackoverflow.com/a
// Posted by Lewis Muriungi, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-15, License - CC BY-SA 4.0

/*app.use(helmet({
    contentSecurityPolicy: {

        "script-src":["'self'","http://localhost:3003"],
        directives: {
          
          "connect-src":["'self'","http://localhost:3003"],
          "default-src":["'self'"],
          "image-src":["'self'"],
        },
        reportOnly:false 
      },
})) */



/*app.use(helmet.contentSecurityPolicy({
  useDefaults:false, 
  directives:{
    defaultSrc:["'self'"],
    scriptSrc:["'self'"],
    connectSrc:["'self'"] 
    connectSrc: ['connectSources'],
    reportOnly:[true],
    

  },
  
})); */

/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
  //to allow cross domain requests to send cookie information.
  res.header("Access-Control-Allow-Credentials", true);
  // list of methods that are supported by the server
  res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");

  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN"
  );

  next();
});
*/
/*app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});  */





/*app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      
      connectSrc: [ "'self'", 'http://localhost:3003' ]
    }
  }
})); */

/*app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "default-src 'self'; font-src 'self'; img-src 'self'; connect-src  'self'  http://localhost:3003; script-src 'self'; style-src 'self'; frame-src 'self'"
  );
  next(); 
}); */

const PORT = process.env.PORT;
app.use(express.json())

 

connectDB();

server.listen(PORT,() => {

    console.log("Server is running on port:"+ "", PORT)
})

 /*User.create({email:"tomas@pem.be",name:"Tomas",password:555555});*/