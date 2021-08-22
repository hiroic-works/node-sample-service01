/**
 * imports
 */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * database
 */
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected database'));

/**
 * middlewares
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: 'my-secret-key',
    saveUninitialized: true,
    resave: false,
  })
);
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use(express.static('uploads'));

/**
 * template engine
 */
app.set('view engine', 'ejs');

/**
 * routing
 */
app.use('', require('./routes/routes'));

/**
 * server start
 */
app.listen(PORT, () => console.log(`Server start. http://localhost:${PORT}`));
