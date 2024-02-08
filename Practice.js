const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser
const cors = require('cors');
const db = require('./Db'); // Import the configured database connection from db.js
const app = express();
const PORT = 8001;

// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use cors middleware to enable CORS
app.use(cors());

// Example API endpoint to perform a database operation
app.get('/users', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Assuming 'db' is an instance of your database connection
    const result = await db.query('select * from form WHERE username=?',username) // Modify the SQL query as needed
            
    res.status(200).json({ message: 'Data retrieved successfully', data: result[0]});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ... Other routes and server configurations

app.listen(PORT, () => {
  console.log(`Server rdnning on port ${PORT}`);
});
