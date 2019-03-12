const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionsSchema = new Schema({
  token: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  tickerSymbol: { type: String, required: true },
  quantity: { type: Number, required: true }, // - for sale, + for purchase
  centsTotal: { type: Number, required: true } // positive for sales, negative for purchases
  // note: all transactions are in pennies, then divided by 100 to display as dollars
});

const Transactions = mongoose.model('Transactions', transactionsSchema);

module.exports = Transactions;
