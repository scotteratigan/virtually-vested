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
    passHash: 'todo: implement this',
    portfolioValue: 0,
    startCash: 10000000,
    // todo: generate ids automatically
    tradeHistory: [{ type: 'buy', symbol: 'APPL', name: 'Apple Inc.', date: new Date(Date.now()-86400000), qty: 10, price: -174000, id: 2398523 },
     
    { type: 'buy', symbol: 'BA', name: 'The Boeing Company',date: new Date(Date.now()-86400000), qty: 10, price: -438690, id: 2398523 }, 
     
     { type: 'sell', symbol: 'BA', name: 'The Boeing Company', date: new Date(Date.now()), qty: -5, price: 229345, id: 2398524 }],
    date: new Date(Date.now())
  }
];

db.User
  .deleteMany({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });