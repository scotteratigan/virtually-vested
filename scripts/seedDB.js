/* eslint-disable no-console */
const mongoose = require('mongoose');
const db = require('../models');

// This file empties the Books collection and inserts the books below

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
    cash: 10000000,
    tradeHistory: [{ type: 'buy', symbol: 'APPL', date: new Date(Date.now()), Qty: 10, total: 5000 },
      { type: 'buy', symbol: 'BA', date: new Date(Date.now()), Qty: 10, total: 3000 }],
    date: new Date(Date.now())
  }
];

db.Book
  .deleteMany({})
  .then(() => db.Book.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
