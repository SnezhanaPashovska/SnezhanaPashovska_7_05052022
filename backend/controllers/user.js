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
        password: hash
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
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      console.log(user)
      if (!user) {
        return res.status(401).json({ error: 'The user does not exist' });
      }
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
  //The user's password is not registered
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
exports.updateUser = (req, res) => {
  User.findOne({ where: { id: req.body.idUser } })
    .then(user => {
      if (req.body.oldPassword && req.body.newPassword) {
        bcrypt.compare(req.body.oldPassword, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: "The password is incorrect" })
            } else {
              bcrypt.hash(req.body.newPassword, 10)
                .then(newHash => {
                  User.update(
                    { password: newHash },
                    { where: { id: req.body.idUser } }
                  );
                  res.status(201).json({ message: "Password changed" })
                })
                .catch(error => res.status(500).json({ error }))
            }
          })
          .catch(error => res.status(500).json({ error }))
      }
      if (req.body.lastname && req.body.lastname != user.lastname) {
        User.update(
          { lastname: req.body.lastname },
          { where: { id: req.body.idUser } }
        );
        res.status(201).json({ message: 'The firstname has been changed' })
      };
      if (req.body.firstname && req.body.firstname != user.firstname) {
        User.update(
          { firstname: req.body.firstname },
          { where: { id: req.body.idUser } }
        );
        res.status(201).json({ message: 'The lastname has been changed' })
      };
      if (req.body.description && req.body.description != user.description) {
        User.update(
          { description: req.body.description },
          { where: { id: req.body.idUser } }
        );
      };
    })
    .catch(error => res.status(400).json({ error }));
};


// 6. Delete a user

exports.deleteUser = (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => {
      const filename = user.image.split('/images/')[1];
      if (filename != "image_profil_default.jpg") {
        fs.unlink(`images/${filename}`, (err) => {
          if (err) {
            console.log("Erreur: " + err);
          };
        });
      };
      User.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Deleted!" }))
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }))
};

// 7. Update an image

exports.updateImage = (req, res) => {
  User.findOne({ where: { id: req.body.idUser } })
    .then(user => {
      if (req.file) {
        const filename = user.image.split('/images/')[1];
        if (filename != "image_profil_default.jpg") {
          fs.unlink(`images/${filename}`, (err) => {
            if (err) throw err;
          });
        }
        const newImage = {
          image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        };
        User.update(
          newImage, { where: { id: req.body.idUser } }
        )
          .then(() => res.status(201).json({ message: 'Image modifiée' }))
          .catch(error => res.status(500).json({ error }));
      };
    })
    .catch(error => res.status(500).json({ error }));
}

