const express = require('express');
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');

/**
 * image upload
 */
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

let upload = multer({
  storage,
}).single('image');

/**
 * routing
 */
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

router.get('/add', (req, res) => {
  res.render('add-users', { title: 'Add Users' });
});
router.post('/add', upload, (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: req.file.filename,
  });
  user.save((error) => {
    if (error) {
      res.json({ message: err.message, type: 'denger' });
    } else {
      req.session.message = {
        type: 'success',
        message: 'User added.',
      };
    }
    res.redirect('/');
  });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

module.exports = router;
