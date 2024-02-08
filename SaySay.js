const express = require('express');
const multer = require('multer');
const mysql = require('mysql');

const app = express();
const upload = multer({ dest: 'uploads/' });

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'reactdb',
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected');
});

// API endpoint for image upload
app.post('/upload', upload.single('image'), (req, res) => {
  const { filename, path } = req.file; // Multer saves file information

  // Save image information to MySQL database
  const imageUrl = `http://yourdomain.com/${path}`;
  const sql = 'INSERT INTO form (filename, path) VALUES (?, ?)';
  db.query(sql, [filename, imageUrl], (err, result) => {
    if (err) throw err;
    console.log('Image uploaded to MySQL');
    res.status(200).json({ message: 'Image uploaded successfully' });
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
