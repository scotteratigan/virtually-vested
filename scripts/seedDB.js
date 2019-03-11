/* eslint-disable no-console */
const mongoose = require('mongoose');
const db = require('../models');

// This file empties the User collection and inserts 1 new user with several transactions

mongoose.connect(
  process.env.MONGODB_URI ||
  'mongodb://localhost/virtuallyvested',
  { useNewUrlParser: true }
);

const userSeed = [
  {
    name: 'First User',
    email: 'user@email.com',
    token: 'google-oauth2-112001694519846478968',
    portfolioValue: 0,
    cash: 10000000,
    // todo: generate ids automatically
    // tradeHistory: [{ type: 'buy', symbol: 'APPL', name: 'Apple Inc.', date: new Date(Date.now()), qty: 10, price: -174000, id: 2398523 },
    // { type: 'buy', symbol: 'BA', date: new Date(Date.now()), qty: 10, total: -438690, id: 2398523 },
    // { type: 'sell', symbol: 'BA', name: 'The Boeing Company', date: new Date(Date.now()), qty: 5, price: 219345, id: 2398523 }],
    date: new Date(Date.now())
  }
];

const transactionSeed = [
  {
    name: 'First User',
    date: new Date(Date.now()),
    tickerSymbol: 'TSLA',
    quantity: 5,
    centsTotal: -138120
  },
  {
    name: 'First User',
    date: new Date(Date.now()),
    tickerSymbol: 'AAPL',
    quantity: 15,
    centsTotal: -261780
  },
  {
    name: 'First User',
    date: new Date(Date.now()),
    tickerSymbol: 'AAPL',
    quantity: 1,
    centsTotal: -17452
  },
  {
    name: 'First User',
    date: new Date(Date.now()),
    tickerSymbol: 'TSLA',
    quantity: -2,
    centsTotal: 55248
  },
]

db.User
  .deleteMany({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + ' records inserted!');
    seedTransactions(); // calling this from a function so we can exit after completing
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

function seedTransactions() {
  db.Transactions
    .deleteMany({})
    .then(() => db.Transactions.collection.insertMany(transactionSeed))
    .then(data => {
      console.log(data.result.n + ' records inserted!');
      process.exit(0); // need to exit after seeding records or process hangs
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}