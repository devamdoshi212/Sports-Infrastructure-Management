const express = require('express')
const UserController = require('../Controller/UserController')
const multer = require("multer");

const route = express.Router()
const photoStorage = multer.diskStorage({
	destination: "./public/athletes",
	filename: (req, file, cb) => {
		console.log(file.originalname);
		cb(null, file.originalname);
	},
  });
  
  const uploadPhoto = multer({
	storage: photoStorage,
	limits: { fileSize: 15000000 },
  });
route.post('/signup',UserController.signup)
route.post("/uploadPhoto",uploadPhoto.single("photo"), UserController.uploadPhoto)
route.post('/login',UserController.login)

module.exports = route