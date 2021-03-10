require('dotenv').config();

const express = require('express'),
      mongoose = require('mongoose');

const app = express();

// ====== Set up .env variables
const DB = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// ====== Connect to MongoDB
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to database!'))
  .catch(err => console.log(err));

// ====== Routes
app.get('/', (req, res) => {
  res.send('Good to go!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});