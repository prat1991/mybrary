//if we are not running in the production environment
// then we want to load the env variables in the dev environment
if(process.env.NODE_ENV !== 'production')
{
  //this line gives errors
  //require('dotenv').parse()
  //according to youtube comments the next line is the fix
  require('dotenv').config()
}

//Serving files with Express (2 ways)
//1.Serving a single static file via filepath
//2.Serving static files via a public directory

//-------------------------Used Method 2 ------------------------------------

//if we ran node server.js then http://localhost:3000/home.html
// assuming that public folder includes myImage.jpg file will display
//the image on the browser. We dont need to give "/public/home.html" because
// express will automatically serve all the static files from the public folder
const express = require('express');
//creating an express app
const app = express();
const expressLayouts = require('express-ejs-layouts');

//DB connection
//saving the moongose libary files into a variable called moongose
const mongoose = require ('mongoose')
const dbURL= process.env.DATABASE_URL;

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology : true // to resolve Depricated Warning message
})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', error => console.error('Connected to MongdoDB'))


//letting the server know that the router exists
//Require will search for modules using the following rules:
//Is there a core module with the required path? Yes, return it.
//Is there a node_modules package with the name of the path? Yes, return it.
//Is there a file (or directory!) with the name of the given path? Yes, return it.
//Otherwise, throw an error.
const indexRouter=require('./routes/index')


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
//using the 2nd method where we are serving static files by setting up the public directory
//Making a directory public is as easy as using the app.use() and express.static() methods.
app.use(express.static('public'));

//telling our app to use the router
app.use('/', indexRouter)


//server will be running on port 3000
app.listen(process.env.PORT || 3000);


//run the app
// $ node server.js

//Open your browser and visit any of the static files in the public folder
// 1st make sure that home.html exists in the public folder
// 2nd type in http://localhost:3000/home.html
