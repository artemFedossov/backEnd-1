const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, filem, cb) {
        cb(null, `${__dirname}/public/uploads`)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({
    storage
})

module.exports = {uploader}