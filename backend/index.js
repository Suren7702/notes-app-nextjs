require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// Friendly root route (add this)
app.get('/', (req, res) => {
  res.json({ message: 'API running. Visit /api/auth, /api/user, /api/notes' });
});

// Mount API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/notes', require('./routes/notes'));

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

const start = async () => {
  await connectDB();
  app.listen(process.env.PORT || 4000, () => console.log('Server started'));
};
start();
