/* eslint-disable no-console */
const db = require('../models');
const CircularJSON = require('circular-json');

// Defining methods for the userController
module.exports = {
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByToken: function (req, res) {
    console.log('FIND BY TOKEN IS HITTING.')
    console.log(CircularJSON.stringify(req.params));
    const { token } = req.params;
    db.User.findOne({ 'token': token })
      .then(dbRes => {
        console.log('in db.User.findOne.then routine...');
        if (dbRes) {
          console.log('User exists.');
          res.json(dbRes);
        } else {
          console.log('Creating new user');
          // res.send('CREATE NEW USER');
          // create(res, res, token);
          db.User.create({ token }).then(dbRes => res.json(dbRes))
            .catch(err => {
              console.error('Error creating new user:', err);
              res.status(422).json(err);
            });
        }
      })
      .catch(err => {
        console.error('Error:', err);
        res.status(422).json(err)
      });
  },
  create: function (req, res, token) {
    // note: a change here requires a change in seedDB.js as well:
    console.log('Creating new user...');
    db.User
      .create({ token })
      .then(dbRes => {
        res.json(dbRes);
      })
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    console.log('We\'re in the update function.');
    console.log('req.params:', req.params);
    res.json('blah');
    // db.User
    //   .findOneAndUpdate({ _id: req.params.id }, req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  logInOrSignUp: function (req, res) {
    res.json(req.query);
  },
  remove: function (req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};