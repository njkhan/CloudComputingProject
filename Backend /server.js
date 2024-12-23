const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt'); // For password hashing

// Initialize the app
const app = express();

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',          // MySQL username
    password: 'root',          // MySQL password
    database: 'healthcareDB', // database name
    port: 8889,
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock' // MAMP socket
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});
// Handle form submission from '/register'
app.post('/register', (req, res) => {
    const { username, email, password, phone } = req.body;

    const query = 'INSERT INTO users (username, email, password, phone) VALUES (?, ?, ?, ?)';
    db.query(query, [username, email, password, phone], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error registering user.');
        }
        res.send('Registration successful!');
    });
});

// Handle login form submission
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Fetch user details from the database
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error logging in');
        }

        if (results.length > 0 && results[0].password === password) {
            res.send('Login successful!');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

// Serve static files from project directory
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
