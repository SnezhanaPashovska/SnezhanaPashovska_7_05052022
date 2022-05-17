const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Your account has been created!' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Invalid user!' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Incorrect password !' });
          }
          res.status(200).json({
            idUser: user._id,
            token: jwt.sign(
              { idUser: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.deleteUser = (req, res) => {
  User.findOne({ where: { id: req.auth.idUser } })
    .then((user) => {
      user.destroy();
      console.log("User deleted !!!")
      res.status(200).json({
        message: 'Ok!'
      })
    })
    .catch(() => {
      console.log('Error: User not found !!!')
      res.status(404).json({
        error: new Error('Not found').message
      })
    })
}
exports.getUser = (req, res) => {
  const idUser = req.auth.idUser;
  User.findOne({ where: { id: idUser } })
    .then((user) => {
      console.log('User found');
      res.status(200).json({
        user
      })
    })
    .catch(() => {
      console.log('Error: User not found !!!')
      res.status(404).json({
        error: new Error('Not found').message
      });
    });
}
