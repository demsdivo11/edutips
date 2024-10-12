import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

// Path ke file .env
dotenv.config({ path: '../.env' }); 

const app = express();
const port = process.env.PORT || 5000;

// Konfigurasi CORS dengan preflight request
app.use(cors({
  origin: 'http://localhost:5173',  // Ganti dengan origin frontend kamu
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true, // Izinkan kredensial (cookie, header autentikasi)
}));

app.options('/api/content', cors()); // Handle preflight request untuk request POST

app.use(express.json()); // Middleware untuk memproses body request JSON

// Debugging: Cetak variabel environment


// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Debugging: Tes koneksi database
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Successfully connected to database!");
    connection.release(); 
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
})();

// Routes
app.get('/api/content', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM content');
    res.json(rows); 
  } catch (error) {
    console.error("Error fetching content:", error); // Logging error yang lebih spesifik
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/content', async (req, res) => {
  console.log("Request body:", req.body); // Logging data request
  const { title, type, subject, content } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO content (title, type, subject, content) VALUES (?, ?, ?, ?)',
      [title, type, subject, content]
    );
    res.status(201).json({ id: result.insertId, title, type, subject, content });
  } catch (error) {
    console.error("Error adding content:", error); // Logging error yang lebih spesifik
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});