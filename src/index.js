const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Connection error', err);
});
