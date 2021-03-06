/* eslint-disable no-console */
const mongoose = require('mongoose');
const db = require('../models');

const TEMP_TOKEN = 'auth0-5c871e67c3f915271472147e';

// This file empties the User collection and inserts 1 new user with several transactions

mongoose.connect(
  process.env.MONGODB_URI ||
  'mongodb://localhost/virtuallyvested',
  { useNewUrlParser: true }
);

const userSeed = [
  {
    // note: a change here requires a change in userController.js as well
    name: 'First User',
    email: 'user@email.com',
    token: TEMP_TOKEN,
    portfolioValue: 0,
    cash: 10000000,
    startingCash: 10000000,
    // todo: generate ids automatically
    tradeHistory: [
      { type: 'buy', symbol: 'APPL', name: 'Apple Inc.', date: new Date(Date.now() - 86400000), qty: 10, price: -174000, id: 2398523 },
      { type: 'buy', symbol: 'BA', name: 'The Boeing Company', date: new Date(Date.now() - 86400000), qty: 10, price: -438690, id: 2398523 },
      { type: 'sell', symbol: 'BA', name: 'The Boeing Company', date: new Date(Date.now()), qty: -5, price: 229345, id: 2398524 }],
    date: new Date(Date.now())
  }
];

const transactionSeed = [
  {
    token: TEMP_TOKEN,
    date: new Date(Date.now()),
    tickerSymbol: 'TSLA',
    quantity: 5,
    centsTotal: -138120
  },
  {
    token: TEMP_TOKEN,
    date: new Date(Date.now()),
    tickerSymbol: 'AAPL',
    quantity: 15,
    centsTotal: -261780
  },
  {
    token: TEMP_TOKEN,
    date: new Date(Date.now()),
    tickerSymbol: 'AAPL',
    quantity: 1,
    centsTotal: -17452
  },
  {
    token: TEMP_TOKEN,
    date: new Date(Date.now()),
    tickerSymbol: 'TSLA',
    quantity: -2,
    centsTotal: 55248
  },
]

db.User
  .deleteMany({})
  .then(() => {
    console.log('User DB deleted.');
    return db.User.collection.insertMany(userSeed);
  })
  .then(data => {
    console.log(data.result.n + ' user records inserted!');
    seedTransactions(); // calling this from a function so we can exit after completing
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

function seedTransactions() {
  db.Transactions
    .deleteMany({})
    .then(() => {
      console.log('All transactions deleted.');
      return db.Transactions.collection.insertMany(transactionSeed);
    })
    .then(data => {
      console.log(data.result.n + ' transaction records inserted!');
      process.exit(0); // need to exit after seeding records or process hangs
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}