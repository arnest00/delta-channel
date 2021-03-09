require('dotenv').config();

const express = require('express');

const app = express();

// ====== Set up .env variables
const PORT = process.env.PORT || 5000;

// ====== Routes
app.get('/', (req, res) => {
  res.send('Good to go!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});