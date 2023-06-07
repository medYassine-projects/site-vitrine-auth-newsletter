const Blog = require('../models/blog')
const express = require('express')
const router = express.Router()
require('dotenv').config()
const blogController = require('../controller/blogController')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    },
  })
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      const err = new Error('Only .jpg .jpeg .png images are supported!');
        err.name = 'ExtensionError';
        return cb(err);
    }
  }
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 2048 * 2048 * 2,
    },
    fileFilter: fileFilter,
  })

router.post('/create', upload.array('backgroundImage'),blogController.create)
router.get('/get', blogController.get)
router.delete('/:id',blogController.delete)
module.exports = router