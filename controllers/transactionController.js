/* eslint-disable no-console */
const db = require('../models');
const stockRoutes = require('../routes/api/stock');
const { cachedStockQuotes } = stockRoutes;
const CircularJSON = require('circular-json');

// Defining methods for the userController
module.exports = {
  findByToken: function (req, res) {
    console.log('transactionController.js db.transactions.find req.params:', req.params);
    const { token, email } = req.params;
    console.log('transactionController req.params.token:', req.params.token);
    db.Transactions
      .find({ 'token': token }) // todo: actually call this properly
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  attemptTrade: async function (req, res) {
    // 1. import user cash, user portfolio, current stock prices
    const tradesArr = req.body.trades;
    const submitToken = req.body.token;
    console.log('submitToken:', submitToken);
    // const tradeIsValid = true;
    let userPortfolio = {};
    console.log('transaction controller, received request:', tradesArr, submitToken);
    const currCashCents = await db.User.findOne({ 'token': submitToken }).then(dbRes => dbRes.cash); // returns the user's cash
    const tradeHistory = await db.Transactions.find({ 'token': submitToken }).then(dbRes => dbRes);
    console.log('Cash is:', currCashCents);
    console.log('Trade history is:', tradeHistory);
    tradeHistory.forEach(trade => {
      if (!userPortfolio[trade.tickerSymbol]) userPortfolio[trade.tickerSymbol] = 0;
      userPortfolio[trade.tickerSymbol] += trade.quantity;
    });
    console.log('userPortfolio:', userPortfolio);

    // 2. if user tries to sell a stock they don't own, trade invalid
    // ensure we have enough qty to sell a stock:
    tradesArr.forEach(trade => {
      if (trade.qty > userPortfolio[trade.tickerSymbol]) {
        console.error('User attempted to sell more stock than currently owned!');
        return res.status(422).json('Trade invalid - can\'t sell more stock than you own.');
      }
    });

    // 3. if user tries to spend more money than they have, trade invalid
    console.log('stock quotes:', cachedStockQuotes);
    // note: totalTradeCostCents is positive when we're buying and negative when we're selling
    const totalTradeCostCents = tradesArr.reduce((totalCost, trade) => {
      console.log('Analzing trade cost, trade is:', trade);
      const cost = trade.net * cachedStockQuotes[trade.symbol].price;
      return totalCost + cost;
    }, 0);
    console.log('totalTradeCostCents:', totalTradeCostCents);
    if (totalTradeCostCents > currCashCents) {
      console.error('User attempted to purchase stock they can\'t afford!');
      return res.status(422).json('Trade invalid - insufficient funds.');
    }

    // otherwise, proceed with trade:
    // todo: add error handling
    // todo: replace with bulkUpdate
    tradesArr.forEach(async (trade) => {
      let centsTotal = Math.abs(trade.net * cachedStockQuotes[trade.symbol].price);
      if (trade.net > 0) centsTotal *= -1; // if we're selling stock, the cost is negative
      console.log('Buying or Selling:', trade);
      await db.Transactions.create({
        'token': submitToken,
        'tickerSymbol': trade.symbol,
        'quantity': trade.net,
        'centsTotal': centsTotal
      }).then(dbRes => dbRes);
      console.log('Stock purchased.');
    });

    console.log('All stock transactions completed, now to subtract money...');
    const newCashCents = currCashCents - totalTradeCostCents;
    console.log('User\'s new cash total will be:', newCashCents);

    db.User.findOneAndUpdate(
      { token: submitToken },
      { cash: newCashCents }
    )
      .then(result => {
        console.log('User cash update result:', result);
        return res.send('SUCCESS!!!');
      })
      .catch(err => {
        console.error('Error updating user cash.');
        return res.status(422).json('Error updating cash.');
      });

  }
};
