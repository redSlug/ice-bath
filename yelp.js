const rp = require('request-promise');

const YELP_API_KEY = process.env.YELP_API_KEY;

const QUERY = `
    {
        search(categories: "icecream,gelato",
                location: "brooklyn",
                limit: 5) {
            total
            business{...basicBizInfo}
        }
    }

    fragment basicBizInfo on Business {
        name
        id
        rating
        review_count
        photos
        alias
        coordinates {
            latitude
            longitude
        }
        reviews {
            id
            text
        }
        location{ formatted_address address1 }
    }
`;

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
