const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models')
const User = db.users
const fs = require('fs');


// 1. Sign up

exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const newUser = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash
      }
      // Creating User/Profile
      User.create(newUser)
        .then(() => res.status(200).json({ message: 'Profile created' }))
        .catch(() => res.status(400).json({ message: 'The user already exists' }))
    })
    .catch(error => res.status(500).json({ error }));
};


// 2. Sign in/log in

exports.login = (req, res) => {
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
            idUser: user.id,
            token: jwt.sign(
              { idUser: user.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        });
    })
    .catch(error => res.status(500).json({ error }));
};



//3. Get all users

exports.getAllUsers = (req, res) => {
  // Les mots de passe utilisateurs ne sont pas enregistrés dans la réponse
  User.scope('noPassword').findAll({})
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json({ error }))
};

// 4. Get one user

exports.getOneUser = (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json({ error }))
};


// 5. Update a user
exports.updateUser = (req, res) => {
  User.findOne({ where: { id: req.body.idUser } })
    .then(user => {
      if (req.body.oldPassword && req.body.newPassword) {
        bcrypt.compare(req.body.oldPassword, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Le mot de passe saisi ne correspond pas au mot de passe actuel' })
            } else {
              bcrypt.hash(req.body.newPassword, 10)
                .then(newHash => {
                  User.update(
                    { password: newHash },
                    { where: { id: req.body.idUser } }
                  );
                  res.status(201).json({ message: 'Mot de passe changé' })
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
        res.status(201).json({ message: 'The last name has been changed' })
      };
      if (req.body.name && req.body.name != user.name) {
        User.update(
          { name: req.body.name },
          { where: { id: req.body.idUser } }
        );
        res.status(201).json({ message: 'The first name has been changed' })
      };
      if (req.body.description && req.body.description != user.description) {
        User.update(
          { description: req.body.description },
          { where: { id: req.body.idUser } }
        );
      };
    })
    .catch(error => res.status(500).json({ error }));
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

