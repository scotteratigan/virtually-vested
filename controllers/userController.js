/* eslint-disable no-console */
const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const jwt = require('jsonwebtoken');

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
    const { token } = req.params;
    db.User.findOne({ token })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log('ATHENTICATION REQUEST RECEIVED');
    const { username, password } = req.body;
    console.log('username:', username, 'password:', password);
    bcrypt.hash(password, saltRounds, (err, hash) => {
      db.User
        .create({ username: username, passHash: hash })
        .then(dbModel => {
          // const token = generateWebToken(username);
          res.json(dbModel);
        })
        .catch(err => res.status(422).json(err));
    });
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

/*function generateWebToken(username) {
  // generate JWT here and send to client:
  const signOptions = {
    issuer: 'VirtuallyVested',
    subject: 'Users',
    audience: 'VirtuallyVested Website',
    expiresIn: '12h',
    algorithm: 'HS256'
  };
  const privateKEY = process.env.PRIVATE;
  // console.log('privateKey:', privateKEY);
  const token = jwt.sign({ username }, privateKEY, signOptions);
  console.log(token);
  return token;
}*/