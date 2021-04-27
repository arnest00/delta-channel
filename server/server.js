require('dotenv').config();

const express = require('express'), 
      mongoose = require('mongoose'), 
      cors = require('cors'), 
      helmet = require('helmet'), 
      path = require('path');

const apiRoutes = require('./routes/api');

const app = express();

// ====== Middleware
app.use(cors());
app.use(helmet());

// ====== Set up .env variables
const DB = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// ====== Serve static files from client
app.use(express.static(path.join(__dirname, 'client/build')));

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
app.use('/api', apiRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});