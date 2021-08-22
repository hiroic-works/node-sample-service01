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
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected database'));

app.get('/', (req, res) => {
  res.send('Hello');
});

/**
 * server start
 */
app.listen(PORT, () => console.log(`Server start. http://localhost:${PORT}`));
