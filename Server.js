const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser
const cors = require('cors');
const db = require('./Db'); // Import the configured database connection from db.js
const app = express();
const PORT = 3001;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use cors middleware to enable CORS
app.use(cors());

// Example API endpoint to perform a database operation
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
const result = await db.query('INSERT INTO form (username, password) VALUES (?, ?)', [username, password]);
    res.status(200).json({ message: 'User aded successflly', data: result.rows});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/upload', upload.single('image'), (req, res) => {
  const { filename, path ,username} = req.file; // Multer saves file information
  
  // Save image information to MySQL database
  const imageUrl = `${path}`;
  const sql = 'INSERT INTO form (filename, path,username) VALUES (?, ?,?)';
  db.query(sql, [filename, imageUrl,username], (err, result) => {
    if (err) throw err;
    console.log('Image uploaded to MySQL');
    res.status(200).json({ message: 'Image uploaded successfully' });
  });
});

// ... Other routes and server configurations

app.listen(PORT, () => {
  console.log(`Server rdnning on port ${PORT}`);
});
