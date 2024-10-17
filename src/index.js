//import express
const express = require('express');
//import router
const router = require('./route');
//import bodyParser
const bodyParser = require('body-parser');
//import cors
const cors = require('cors');

//init app
const app = express();
//define port
const port = 9000;
//usecors
app.use(cors());
//use body parser
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
//define routes
app.use('/api', router);
//start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
