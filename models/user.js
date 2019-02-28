const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  passHash: String,
  date: { type: Date, default: Date.now },
  tradeHistory: { type: Array },
  // note: all transactions are in pennies, then divided by 100 to display as dollars
  portfolioValue: { type: Number },
  cash: { type: Number }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
