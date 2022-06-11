const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const User = require('../models/User');


// 1. Sign up
exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        isAdmin: false
      }
      // Creating User/Profile
      User.create(newUser)
        .then(() => res.status(200).json({ message: 'Profile created' }))
        .catch(() => res.status(400).json({ message: 'Error' }))
    })
    .catch(error => res.status(500).json({ error }));
};

// 2. Sign in/log in
exports.login = (req, res, next) => {
  //check that the email entered by the user corresponds to an existing user in the database
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      console.log(user)
      if (!user) {
        return res.status(401).json({ error: 'The user does not exist' });
      }
      //compare the password entered by the user with the hash saved in the database
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'The password is incorrect' });
          }
          res.status(200).json({
            idUser: user.idUser,
            token: jwt.sign(
              { idUser: user.idUser },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        });
    })
    .catch(error => res.status(500).json({ error }));
};
//3. Get all users
exports.getAllUsers = (req, res, next) => {
  User.scope().findAll({})
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error }))
};

// 4. Get one user
exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { idUser: req.params.id } })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error }))
}

// 5. Update a user
exports.updateUser = (req, res, next) => {
  const userObject = req.file ? {
    ...req.body, photoUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  } : { ...req.body };

  User.findOne({ where: { idUser: req.params.id } })
    .then((user) => {
      if (
        user.photoUrl = "" &&
        req.file
      ) {
        const oldFilename = user.photoUrl.split("/images/")[1];
        fs.unlink(`images/${oldFilename}`, (error) => {
          console.log(error);
        });
      }
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
  // Update the database
  User.update(
    { ...userObject, idUser: req.params.id },
    { where: { idUser: req.params.id } }
  ).then((user) =>
    // If the update is successful
    User.findOne({ where: { idUser: req.params.id } })
      .then((user) => {
        // Get the updated profile
        res.status(200).json({ message: "The profile has been updated !", user });
      })
      .catch((error) => res.status(410).json(error))
  );
};

// 6. Delete a user
exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { idUser: req.params.id } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found !" });
      }
      const filename = user.photoUrl.split("/images/")[1];
      if (user.photoUrl = "") {
        // deleting the image
        fs.unlink(`images/${filename}`, (error) => {
          if (error) {
            console.log(error);
          }
        });
      }
      // Removing the user from the database
      User.destroy({ where: { idUser: req.params.id } })
        .then((user) =>
          res.status(200).json({ message: "The profile has been deleted !" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};


