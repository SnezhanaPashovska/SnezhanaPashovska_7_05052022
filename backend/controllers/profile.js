const Profile = require('../models/Profile');
const fs = require('fs');
const sequelize = require('sequelize');


var crudProfile = {
  getAllProfiles: getAllProfiles,
  createProfile: createProfile,
  getOneProfile: getOneProfile,
  deleteProfile: deleteProfile,
  modifyProfile: modifyProfile
}

function getAllProfiles() {
  return Profile.getAllProfiles();
}

function createProfile(profile) {
  var newProfile = new Profile(profile);
  return newProfile.save();
}

function getOneProfile(id) {
  return Profile.getOneProfile(id);
}

function deleteProfile(id) {
  return Profile.destroy({ where: { id: id } });
}

function modifyProfile(profile, id) {
  var modifyProfile = {
    name: profile.name,
    lastname: profile.lastname,
    image: profile.image,
  };
  return Profile.update(modifyProfile, { where: { id: id } });
}

var profileController = {
  addProfile: addProfile,
  findProfiles: findProfiles,
  findProfileById: findProfileById,
  updateProfile: updateProfile,
  deleteById: deleteById
}

function addProfile(req, res) {
  let profile = req.body;
  crudProfile.create(profile).
    then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function findProfileById(req, res) {
  crudProfile.findById(req.params.id).
    then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteById(req, res) {
  crudProfile.deleteById(req.params.id).
    then((data) => {
      res.status(200).json({
        message: "Profile deleted successfully",
        profile: data
      })
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateProfile(req, res) {
  crudProfile.updateProfile(req.body, req.params.id).
    then((data) => {
      res.status(200).json({
        message: "Profile updated successfully",
        profile: data
      })
    })
    .catch((error) => {
      console.log(error);
    });
}
function findProfiles(req, res) {
  crudProfile.findAll().
    then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
}


module.exports = crudProfile;
module.exports = profileController;


