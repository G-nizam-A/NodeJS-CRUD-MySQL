// server.js
require('dotenv').config()
const express = require('express');
const mysql = require('mysql2');
const app = express();
// const path = require('path')  //other method

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});


app.use(express.json());
app.use(express.static('public'));

// app.get('/', function (req, res) {
//     res.render('index')
//   });

app.get('/', (req, res) => {
    // Send your HTML file
    res.sendFile(__dirname + '/index.html');  //directly calling the html file
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contact-form.html'); 
});

// app.get('/table', (req, res) => {
//     res.sendFile(__dirname + '/contact-form.html'); 
// });

// app.get('/example', (req, res) => {
//     // Send your HTML file
//     res.sendFile(path.join(__dirname,'/index.html'));  //using path  calling the html file
// });


// Insert data
app.post('/contact/add', (req, res) => {
    const { name,phone } = req.body;
    pool.query('INSERT INTO Contact (name, phone) VALUES (?, ?)', [name, phone], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Errqor' });
            return; 
        }
        res.json({ message: 'Data inserted successfully' });
    });
});

// Select all data
app.get('/contact', (req, res) => {
    pool.query('SELECT * FROM Contact', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

// Select a single data entry by ID
app.get('/contact/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM Contact WHERE id = ?', id, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // console.log('All data:', results);
        // res.json(results);
        res.json(results[0]); 
    });
});


// Update data by ID
// app.put('/posts/update/:id/:cont', (req, res) => {
//     const id = req.params.id;
//     const  name  = req.params.name;
//     const  phone  = req.params.phone;

//     pool.query('UPDATE Contact SET name = ? and phone = ? WHERE id = ?', [name, phone, id], (err, results) => {
//         if (err) {
//             console.log(err);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         res.json({ message: 'Data updated successfully' });
//     });
// });
app.put('/contact/update/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const phone = req.body.phone; 

    pool.query('UPDATE Contact SET name = ?, phone = ? WHERE id = ?', [name, phone, id], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Data updated successfully' });
    });
});
// Delete data by ID
app.delete('/contact/delete/:id', (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM Contact WHERE id = ?', id, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Data deleted successfully' });
    });
});




let PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Server is running on port',PORT);
});
