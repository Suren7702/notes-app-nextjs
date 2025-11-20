require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// --- ROOT ROUTE (API STATUS PAGE) ---
// Replaced the simple JSON message with the Professional HTML Page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>NotesApp API Status</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background-color: #f3f4f6;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .card {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          text-align: center;
          max-width: 400px;
          width: 90%;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          background: #dcfce7;
          color: #166534;
          padding: 8px 16px;
          border-radius: 99px;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 24px;
        }
        .dot {
          width: 8px;
          height: 8px;
          background-color: #22c55e;
          border-radius: 50%;
          margin-right: 8px;
          animation: pulse 2s infinite;
        }
        h1 { margin: 0 0 12px 0; color: #1f2937; font-size: 24px; }
        p { color: #6b7280; line-height: 1.6; margin-bottom: 32px; }
        .link {
          color: #4f46e5;
          text-decoration: none;
          font-weight: 500;
        }
        .link:hover { text-decoration: underline; }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="status-badge">
          <span class="dot"></span>
          System Online
        </div>
        <h1>NotesApp API</h1>
        <p>
          The backend server is running successfully.<br>
          Ready to accept requests from the frontend.
        </p>
        <a href="https://notes-app-alpha-black.vercel.app/login" class="link">→ Go to Frontend App</a>
      </div>
    </body>
    </html>
  `);
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
  try {
    await connectDB();
    app.listen(process.env.PORT || 4000, () => console.log('Server started'));
  } catch (err) {
    console.error("Failed to connect to DB", err);
  }
};
start();