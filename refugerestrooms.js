const rp = require('request-promise');

var URI_SEARCH = 'https://www.refugerestrooms.org/api/v1/restrooms/search.json'; //?query=Ample%20Hills';

var URI_LOCATION =
  'https://www.refugerestrooms.org/api/v1/restrooms/by_location.json'; //?lat=40.6785573557085&lng=-73.9684746674535';

function query(lat, lng) {
  return rp({
    url: URI_LOCATION,
    qs: { lat, lng },
    json: true
  }).then(data => {
    return data.find(
      r => fuzzyEqual(r.latitude, lat) && fuzzyEqual(r.longitude, lng)
    );
  });
}

//

function fuzzyEqual(x, y, epsilon) {
  // 623 Vanderbilt Ave Brooklyn, NY 11238
  //
  // yelp: latitude:   40.6785573557085
  // refg: latitude:   40.6786003
  // epsilon:           0.0001
  //
  // yelp: longitude: -73.9684746674535
  // refg: longitude: -73.9681538
  // epsilon:           0.0001
  //
  epsilon = epsilon || 0.0001;
  return Math.abs(x - y) < epsilon;
}

module.exports = { query };
