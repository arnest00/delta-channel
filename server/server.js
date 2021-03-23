require('dotenv').config();

const express = require('express'),
      mongoose = require('mongoose');

const apiRoutes = require('./routes/api');

const app = express();

// ====== Set up .env variables
const DB = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// ====== Connect to MongoDB
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => console.log('Connected to database!'))
  .catch(err => console.log(err));

// ====== Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====== Routes
app.get('/', (req, res) => {
  res.send('This is the root route!');
});
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});