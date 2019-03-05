const router = require('express').Router();
const axios = require('axios');

require('dotenv').config();
const ALPHAVANTAGE_API_KEY = process.env.ALPHAVANTAGE_API_KEY;

// global to hold search queries:
const cachedSymbolQueries = {};
// todo: add limit on number of cached queries

// Matches with '/api/stock'
// router.route('/')
//   .get((req, res) => {res.send("IT WORKED")});

// Matches with '/api/stock/return_symbols/t' where t is the user input
router.route('/return_symbols/:search_text')
  .get((req, res) => {
    console.log(req.params.search_text);
    const queryString = req.params.search_text;
    // todo: add case for no text?
    if (cachedSymbolQueries[queryString]) {
      // console.log('Serving up cached response...')
      res.send(cachedSymbolQueries[queryString]);
    } else {
      // no cached query, hit the external API:
      // console.log('New response, querying external API...');
      const searchURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${queryString}&apikey=${ALPHAVANTAGE_API_KEY}`;
      axios.get(searchURL).then((eRes) => {
        let bestMatches = eRes.data.bestMatches;
        bestMatches = bestMatches.map(elm => fixKeyNames(elm));
        res.send(bestMatches);
        cachedSymbolQueries[queryString] = bestMatches;
      });
    }
  });

// Matches with 'api/stock/quote/tsla' where tsla is the stock symbol
router.route('/quote/:symbol')
  .get((req, res) => {
    const stockSymbol = req.params.symbol;
    const externalURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${ALPHAVANTAGE_API_KEY}`;
    axios.get(externalURL).then(eRes => {
      let quote = eRes.data['Global Quote'];
      quote = fixKeyNames(quote);
      console.log('Sending data:', quote);
      res.send(quote);
    });
  });

  // Matches with 'api/stock/daily/tsla' where tsla is the stock symbol - response is large
router.route('/daily/:symbol')
  .get((req, res) => {
    const stockSymbol = req.params.symbol;
    const externalURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&apikey=${ALPHAVANTAGE_API_KEY}`;
    axios.get(externalURL).then(eRes => {
      const resObj = {}; // new obj to return to client
      resObj.metaData = fixKeyNames(eRes.data["Meta Data"]); // clean up metadata keys
      const newSeries = {}; // new obj to hold series data
      for(let key in eRes.data['Time Series (Daily)']) { // clean up keys in series data:
        newSeries[key] = fixKeyNames(eRes.data['Time Series (Daily)'][key])
      }
      resObj.series = newSeries;
      let temp = eRes.data;
      res.send(resObj);
    });
  });

function fixKeyNames(obj) {
  // strips first space and all preceeding chars from key names. Doing this b/c keys are numbered:
  // "01. symbol" -> "symbol"
  // "08. previous close" -> "previous close"
  // the key names change based on the number of keys present in the response! what?!
  const newObj = {};
  for(let key in obj) {
    const firstSpace = key.indexOf(' ');
    const newKey = key.substr(firstSpace + 1);
    newObj[newKey] = obj[key];
  }
  return newObj;
}

module.exports = router;
