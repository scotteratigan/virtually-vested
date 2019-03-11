const mongoose = require('mongoose');
// const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, default: 'New User', required: true },
  email: { type: String, default: '', required: true },
  token: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  // note: all transactions are in pennies, then divided by 100 to display as dollars
  portfolioValue: { type: Number, default: 0, required: true },
  cash: { type: Number, default: 10000000, required: true }
});

// userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

module.exports = User;
