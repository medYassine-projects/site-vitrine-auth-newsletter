const express = require('express')
const router = express.Router()
require('dotenv').config()
const userController = require('../controller/userController')
// Register
router.post('/register', userController.register)

// Login
router.post('/login', userController.login)
module.exports = router