const request = require('request');
const rp = require('request-promise');

const YELP_API_KEY = process.env.YELP_API_KEY;

const QUERY = `{
  business(id: "garaje-san-francisco") {
    name
    id
    rating
    url
  }
}`;

function query() {
  var options = {
    method: 'POST',
    uri: 'https://api.yelp.com/v3/graphql',
    body: QUERY,
    json: false,
    headers: {
      'Content-Type': 'application/graphql',
      Authorization: `Bearer ${YELP_API_KEY}`
    }
  };
  return rp(options).then(html => JSON.parse(html));
}

module.exports = { query };
