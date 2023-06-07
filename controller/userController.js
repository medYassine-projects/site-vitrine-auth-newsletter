const User = require('../models/user')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


async function hashPassword(password) {
    return bcrypt.hash(password, 10)
  }
  
  async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }
  
  exports.register = async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body
      const hashedPassword = await hashPassword(password)
      const newUser = new User({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      })
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        }
      )
      newUser.accessToken = accessToken
      const user =await newUser.save()
      res.json({
        data: user,
        accessToken,
      })
    } catch (error) {
      console.log(error)
      res.send('Error' + error)
    }}

  
  exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) return next(new Error('Email does not exist'))
      const validPassword = await validatePassword(password, user.password)
      if (!validPassword) return next(res.status(500).json({message:'password is incorrect'}))
      const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '2d',
      })
      await User.findByIdAndUpdate(user._id, { accessToken })
      res.status(200).json({
        data: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          id: user.id,
        },
        accessToken,
      })
    } catch (error) {
      res.send('Error' + error)
    }
  }
  