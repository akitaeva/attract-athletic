const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.apiKey,
  api_secret: process.env.apiSecret
});

var theStorage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'media-folder', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // 
  }
});

const uploadCloud = multer({ storage: theStorage })

module.exports = uploadCloud;