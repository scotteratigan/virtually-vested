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
  findByUser: function (req, res) {
    db.Transactions
      .find({ 'name': 'First User' })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  // findByUsername: function (req, res) {
};
