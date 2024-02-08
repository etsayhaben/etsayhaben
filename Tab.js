// db.js - Database setup and table creation
const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser
const cors = require('cors');
const db = require('./Db'); 
const mysql = require('mysql');

// Database connection configuration
const connection = mysql.createPool({
  host: 'your_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});


// Create Users table query
const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    FirstName VARCHAR(50),
    LastName VARCHAR(50)
    -- Add other user details as needed
  )
`;

// Create Properties table query
const createPropertiesTableQuery = `
  CREATE TABLE IF NOT EXISTS Properties (
    PropertyID INT PRIMARY KEY AUTO_INCREMENT,
    SellerID INT,
    Location VARCHAR(100),
    Price DECIMAL(10, 2),
    ImageURL VARCHAR(255),
    FOREIGN KEY (SellerID) REFERENCES Users(UserID)
    -- Add other property details as needed
  )
`;

// Execute table creation queries
connection.query(createUsersTableQuery, (err, results) => {
  if (err) {
    console.error('Error creating Users table:', err);
    return;
  }
  console.log('Users table created');
});

connection.query(createPropertiesTableQuery, (err, results) => {
  if (err) {
    console.error('Error creating Properties table:', err);
    return;
  }
  console.log('Properties table created');
});

// Close the database connection
