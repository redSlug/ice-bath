'use strict';

const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const express = require('express');

const yelp = require('./yelp');
const refuge = require('./refugerestrooms');

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
    let location = req.param('location');
    let categories = req.param('categories');
    let yelpData = await yelp.query(location, categories);
    console.log(yelpData)

    let bizs = yelpData.data.search.business;

    let promises = bizs.map(biz => {
      let coords = biz.coordinates;
      return refuge.query(coords.latitude, coords.longitude);
    });

    let restrooms = await Promise.all(promises);
    console.log(restrooms)

    bizs.forEach((biz, i) => {
      biz.restroom = restrooms[i];
    });

    bizs = bizs.filter(biz => biz.restroom);

    res.send(bizs);
  })
);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
