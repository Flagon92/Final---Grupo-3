// ruta: api/uploads

const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');

const fs = require('fs');

// controllers
const { fileUpload } = require('../controllers/uploadController');

const storage = multer.diskStorage({

    destination: function (req, file, cb ) {

      cb(null, './uploads')
    },
    filename: function (req, file, cb) {

      cb(null, file.originalname);
    }
    
})

const uploadMiddleware = (req,res,next) => {

  const upload = multer({ storage: storage }).single('foto');

  upload(req, res, function (err) {

    if (err instanceof multer.MulterError) {

        // A Multer error occurred when uploading.
        return res.status(500).json({
            ok: false,
            msg: 'Multer error',
        })
        
    } else if (err) {

        // An unknown error occurred when uploading.
        return res.status(500).json({
            ok: false,
            msg: 'Server error',
        });
    }

    next()

  })
}

// file upload
router.post('/', uploadMiddleware, fileUpload); 

// get image
router.get('/image/:foto', (req, res) => {
  const foto = req.params.foto;
  const filepath = path.join(__dirname, '../uploads', foto);
  const pathNoImage = path.join( __dirname, `../uploads/placeholder-image.jpg` );

  const fileToSend = fs.existsSync(filepath) ? filepath : pathNoImage;
  res.sendFile(fileToSend);

});

module.exports = router;