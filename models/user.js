const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  // email: { type: String, required: true },
  passHash: { type: String, required: true },
  date: { type: Date, default: Date.now },
  tradeHistory: { type: Array },
  // note: all transactions are in pennies, then divided by 100 to display as dollars
  portfolioValue: { type: Number, default: 0 },
  // startCash: { type: Number, default: 10000000 }, // defaults to $100,000 (listed in pennies, so * 100)
  currentCash: { type: Number, default: 10000000 }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
