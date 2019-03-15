/* eslint-disable no-console */
const db = require('../models');
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
    // userController.findByToken(submitToken).then(data => {
    //   console.log('transactionController.js attemptTrade received:', data);
    // });
    const currCash = await db.User.findOne({ 'token': submitToken }).then(dbRes => dbRes.cash); // returns the user's cash
    const tradeHistory = await db.Transactions.find({ 'token': submitToken }).then(dbRes => dbRes);
    console.log('Cash is:', currCash);
    console.log('Trade history is:', tradeHistory);
    tradeHistory.forEach(trade => {
      if (!userPortfolio[trade.tickerSymbol]) userPortfolio[trade.tickerSymbol] = 0;
      userPortfolio[trade.tickerSymbol] += trade.quantity;
    });
    console.log('userPortfolio:', userPortfolio);
    // ensure we have enough qty to sell a stock:
    tradesArr.forEach(trade => {
      if (trade.qty > userPortfolio[trade.tickerSymbol]) {
        console.error('User attempted to sell more stock than currently owned!');
        return res.status(422).json('Trade invalid - can\'t sell more stock than you own.');
      }
    })


    // if user tries to sell a stock they don't own, trade invalid
    // if user tries to spend more money than they have, trade invalid
    // otherwise, proceed with trade
    res.send('RESPONSE');
  }
};
