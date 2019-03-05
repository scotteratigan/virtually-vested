const router = require('express').Router();
const axios = require('axios');

require('dotenv').config();
const ALPHAVANTAGE_API_KEY = process.env.ALPHAVANTAGE_API_KEY;

// global to hold search queries:
const cachedSymbolQueries = {};
// todo: add limit on number of cached queries

// Matches with '/api/stock'
router.route('/')
  .get((req, res) => {res.send("IT WORKED")});


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

// Matches with '/api/stock/symbol/:id'
// router
//   .route('/symbol/:id')
//   .get((req, res) => {console.log('id is:', req.params.id)});

// router
//   .route('/')
//   .get((req, res) => {console.log('ROUTE WAS HIT!')});

module.exports = router;
