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
    console.log(data.length, data);
    return data.find(res_obj =>
        res_obj.latitude == lat && res_obj.longitude == lng
    );
  });
}

module.exports = { query };
