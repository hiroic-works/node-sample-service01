const express = require('express');
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');
const fs = require('fs');

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
  User.find().exec((error, users) => {
    if (error) {
      resjson({ message: err.message });
    } else {
      res.render('index', {
        title: 'Home',
        users,
      });
    }
  });
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

router.get('/edit/:id', (req, res) => {
  let id = req.params.id;
  User.findById(id).exec((error, user) => {
    if (error) {
      res.redirect('/');
    } else {
      if (!user) {
        res.redirect('/');
      } else {
        res.render('edit-users', {
          title: 'Edit user',
          user,
        });
      }
    }
  });
});
router.post('/update/:id', upload, (req, res) => {
  let id = req.params.id;
  let newImage = '';
  if (req.file) {
    newImage = req.file.filename;
    try {
      fs.unlinkSync(`./uploads/${req.body.old_image}`);
    } catch (err) {
      console.log(err);
    }
  } else {
    newImage = req.body.old_image;
  }
  User.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: newImage,
    },
    (err, result) => {
      if (err) {
        res.json({ message: err.message, type: 'denger' });
      } else {
        req.session.message = {
          type: 'success',
          message: 'User updated.',
        };
        res.redirect('/');
      }
    }
  );
});

router.get('/delete/:id', (req, res) => {
  let id = req.params.id;
  User.findByIdAndRemove(id, (error, user) => {
    if (user.image != '') {
      try {
        fs.unlinkSync(`./uploads/${user.image}`);
      } catch (err) {
        console.log(err);
      }
    }
    if (error) {
      res.json({ message: err.message, type: 'denger' });
    } else {
      req.session.message = {
        type: 'success',
        message: 'User deleted.',
      };
      res.redirect('/');
    }
  });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

module.exports = router;
