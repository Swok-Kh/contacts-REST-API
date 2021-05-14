const multer = require('multer')
const path = require('path')
const { httpCodes } = require('./constants')

require('dotenv').config()
const { TMP_FOLDER } = process.env

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), TMP_FOLDER))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 150000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true)
      return
    }

    const err = new Error('No image file loaded!')
    err.code = httpCodes.BAD_REQUEST
    cb(err)
  }
})

module.exports = upload
