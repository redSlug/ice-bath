'use strict';

const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const rp = require('request-promise');

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API
app.get(
  '/api',
  asyncHandler(async (req, res) => {
    // get everything we need, and pass it back in mssg
    let html = await rp('http://www.google.com')
    let data = {
      message: 'Hello world, Woooooeeeee!!!!',
      html
    };
    res.send(data);
  })
);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
