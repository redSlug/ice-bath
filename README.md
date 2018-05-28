Ice Bath: Brrrr
===============

An API to find venues through Yelp that have all gender restrooms via an infusion of RefugeRestrooms data.

## Setup
`yarn install`
add `YELP_CLIENT_ID` and `YELP_API_KEY` to `.env` 

## Run
`node index.js`
`curl http://localhost:8080/api\?location\=brooklyn\&categories\=icecream`

![screenshot of API response](screenshot.png)
