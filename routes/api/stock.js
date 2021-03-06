/* eslint-disable no-console */
const router = require('express').Router();
const axios = require('axios');

require('dotenv').config();
const ALPHAVANTAGE_API_KEY = process.env.ALPHAVANTAGE_API_KEY;
const IEXAPIS_API_KEY = process.env.IEXAPIS_API_KEY;

// global to hold search queries:
const cachedSymbolQueries = {};
// todo: add limit on number of cached queries
// global to hold stock info (prices, company names):
const cachedStockQuotes = {};
// console.log('TODO: REMOVE HARD-CODING OF STOCK VALUES!')
// temporarily hard coding these values so I don't get throttled anymore:
// const cachedStockQuotes = {
//   TSLA: {
//     companyName: "Tesla, Inc.",
//     price: 27543,
//     tickerSymbol: "TSLA",
//     updateTime: Date.now()
//   },
//   AAPL: {
//     companyName: "Apple, Inc.",
//     price: 18612,
//     tickerSymbol: "AAPL",
//     updateTime: Date.now()
//   }
// }

// Matches with '/api/stock/return_symbols/t' where t is the user input
// This is the search route to look up stock symbols
router.route('/return_symbols/:search_text')
  .get((req, res) => {
    if (!req.params.search_text) res.send([]);
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
      try {
        axios.get(searchURL).then((eRes) => {
          let bestMatches = eRes.data.bestMatches;
          bestMatches = bestMatches.map(elm => fixKeyNames(elm));
          res.send(bestMatches);
          cachedSymbolQueries[queryString] = bestMatches;
        });
      } catch (err) {
        console.error('error in stock.js:', err);
      }
    }
  });

// Matches with 'api/stock/quote/tsla' where tsla is the stock symbol
// This route is now using the IEXCLOUD API
router.route('/quote/:symbol')
  .get((req, res) => {
    if (!req.params.symbol) return res.send('');
    const stockSymbol = req.params.symbol;
    if (!cachedStockQuotes[stockSymbol]) {
      cachedStockQuotes[stockSymbol] = { updateTime: 0 };
    }
    const stock = cachedStockQuotes[stockSymbol];
    const currTime = Date.now(); // remember, this is in ms
    const elapsedTime = currTime - stock.updateTime;
    if (elapsedTime < 120000 && stock.price && stock.price > 0) { // if less than two minutes has passed, send the cached result
      stock.cachedValueSent = true;
      res.send(stock);
      return;
    }
    // Otherwise, hit the external API:
    const externalURL = `https://cloud.iexapis.com/beta/stock/${stockSymbol}/quote?token=${IEXAPIS_API_KEY}`;

    // todo: implement actual throttle/queue
    const randDelay = Math.floor(Math.random() * 100); // delay of 0 - 99 ms
    setTimeout(() => {
      try {
        axios.get(externalURL).then(eRes => {
          const { data } = eRes;
          console.log('All available data is:', data);
          stock.companyName = data.companyName;
          stock.price = Math.floor(data.latestPrice * 100); // storing the price in cents
          stock.cachedValueSent = false;
          stock.updateTime = Date.now();
          stock.tickerSymbol = stockSymbol;
          res.send(stock);
          return;
        });
      } catch (err) {
        console.error('Error with stock.js axios.get request:', err);
      }

    }, randDelay);
  });

// Matches with 'api/stock/daily/tsla' where tsla is the stock symbol - response is large
// todo: add caching of result, only need to query once per hour
router.route('/daily/:symbol')
  .get((req, res) => {
    const stockSymbol = req.params.symbol;
    if (!stockSymbol) res.send('');
    const externalURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&apikey=${ALPHAVANTAGE_API_KEY}`;
    try {
      axios.get(externalURL).then(eRes => {
        // resObj.metaData = fixKeyNames(eRes.data["Meta Data"]); // clean up metadata keys
        const newSeries = []; // new arr to hold series data - need to convert to arr to display as graph later
        for (let key in eRes.data['Time Series (Daily)']) { // clean up keys in series data:
          // newSeries[key] = fixKeyNames(eRes.data['Time Series (Daily)'][key])
          newSeries.push({ name: key, ...fixKeyNames(eRes.data['Time Series (Daily)'][key]) });
        }
        newSeries.reverse(); // reverse so that order is ascending
        // resObj.series = newSeries;
        console.log('Sending newSeries:', newSeries);
        res.send(newSeries);
      });
    } catch (error) {
      console.error('Error in stock.js:', error);
    }

  });

function fixKeyNames(obj) {
  // strips first space and all preceeding chars from key names. Doing this b/c keys are numbered:
  // "01. symbol" -> "symbol"
  // "08. previous close" -> "previous close"
  // the key names change based on the number of keys present in the response! what?!
  const newObj = {};
  for (let key in obj) {
    const firstSpace = key.indexOf(' ');
    const newKey = key.substr(firstSpace + 1);
    newObj[newKey] = obj[key];
  }
  return newObj;
}

module.exports = { router, cachedStockQuotes };
