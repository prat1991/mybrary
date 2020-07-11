//Routing refers to how an application’s endpoints (URIs) respond to client requests


const express = require('express')
//creating the router
const router = express.Router()

//// respond with "hello world" when a GET request is made to the homepage
router.get('/', (req, res) => {
	//res.send('Hello World')
	res.render('index')
})

//-----------------------------index.js file ------------------------------------
//Once you do module.exports = router. Now you have a newly created module.

//-------------------------------server.js file ------------------------------
// In nodeJs, you need to require a module before use it.
// const indexRouter=require('./routes/index') will do that process.
// Once you require the node module into your app, you need to tell it to execute by app.use('/', indexRouter)
module.exports=router
