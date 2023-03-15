const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://sunggu:sungguminasa@foods.rhcj8rq.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error', err);
});

module.exports = mongoose.connection;
