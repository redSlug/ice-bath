'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API
app.get('/api', (req, res) => {
  // get everything we need, and pass it back in mssg
  
  let data = {
    message: 'Hello world, Woooooeeeee!!!!'
  };
  res.send(data);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);