/* eslint-disable no-console */
const db = require('../models');

// Defining methods for the userController
module.exports = {
  // findAll: function (req, res) {
  //   db.User
  //     .find(req.query)
  //     .sort({ date: -1 })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  findByToken: function (req, res) {
    console.log('transactionController.js db.transactions.find req.params:', req.params);
    db.Transactions
      .find({ 'token': 'google-oauth2-112001694519846478968' }) // todo: actually call this properly
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  // findByUsername: function (req, res) {
};