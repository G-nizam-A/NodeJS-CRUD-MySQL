require('dotenv').config();

const express = require('express');
const app = express();
const mysql = require('mysql2');
// const path = require('path')  

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }

    console.log('Connected to the database!');

});

app.get('/index', function (req, res) {
    res.send('index')
  });
// // Select all data
app.get('/', (req, res) => {
    pool.query('SELECT * FROM post', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

const port = process.env.PORT | 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


