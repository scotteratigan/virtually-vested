const router = require('express').Router();
const axios = require('axios');

require('dotenv').config();
const ALPHAVANTAGE_API_KEY = process.env.ALPHAVANTAGE_API_KEY;
// console.log('API KEY:', ALPHAVANTAGE_API_KEY);

// global to hold search queries:
const cachedSymbolQueries = {};

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
      // res.send('Todo: implement search');
      // no cached query, hit the external API:
      // console.log('New response, querying external API...');
      const searchURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${queryString}&apikey=${ALPHAVANTAGE_API_KEY}`;
      axios.get(searchURL).then((aRes) => {
        const { bestMatches } = aRes.data;
        console.log('Sending data:', bestMatches);
        res.send(bestMatches);
        cachedSymbolQueries[queryString] = bestMatches;
      });
    }
  });


// Matches with '/api/stock/symbol/:id'
// router
//   .route('/symbol/:id')
//   .get((req, res) => {console.log('id is:', req.params.id)});

// router
//   .route('/')
//   .get((req, res) => {console.log('ROUTE WAS HIT!')});

module.exports = router;
