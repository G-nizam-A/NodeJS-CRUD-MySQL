// // server.js
// const express = require('express');
// const mysql = require('mysql2');
// const app = express();
// const path = require('path')  //other method

// const pool = mysql.createPool({
//     host: 'localhost', 
//     user: 'root',
//     password: 'root',
//     database: 'post'
// });

// app.get('/', function (req, res) {
//     res.send('index')
//   });

// app.use(express.json());
// app.use(express.static('public'));

// app.get('/', function (req, res) {
//     res.render('index')
//   });

// app.get('/', (req, res) => {
//     // Send your HTML file
//     res.sendFile(__dirname + '/index.html');  //directly calling the html file
// });

// app.get('/example', (req, res) => {
//     // Send your HTML file
//     res.sendFile(path.join(__dirname,'/index.html'));  //using path  calling the html file
// });


// // Insert data
// app.post('/posts/add', (req, res) => {
//     const { content } = req.body;
//     pool.query('INSERT INTO post (content) VALUES (?)', [content], (err, results) => {
//         if (err) {
//             console.log(err);
//             res.status(500).json({ error: 'Internal Server Errqor' });
//             return;
//         }
//         res.json({ message: 'Data inserted successfully' });
//     });
// });

// // Select all data
// app.get('/posts', (req, res) => {
//     pool.query('SELECT * FROM post', (err, results) => {
//         if (err) {
//             console.log(err);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         res.json(results);
//     });
// });

// // Select a single data entry by ID
// app.get('/posts/:id', (req, res) => {
//     const id = req.params.id;
//     pool.query('SELECT * FROM post WHERE id = ?', id, (err, results) => {
//         if (err) {
//             console.log(err);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         // console.log('All data:', results);
//         // res.json(results);
//         res.json(results[0]); 
//     });
// });


// // Update data by ID
// app.put('/posts/update/:id/:cont', (req, res) => {
//     const id = req.params.id;
//     const  content  = req.params.cont;

//     pool.query('UPDATE post SET content = ? WHERE id = ?', [content, id], (err, results) => {
//         if (err) {
//             console.log(err);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         res.json({ message: 'Data updated successfully' });
//     });
// });

// // Delete data by ID
// app.delete('/posts/delete/:id', (req, res) => {
//     const id = req.params.id;
//     pool.query('DELETE FROM post WHERE id = ?', id, (err, results) => {
//         if (err) {
//             console.log(err);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         res.json({ message: 'Data deleted successfully' });
//     });
// });
// // Select a single data entry by ID
// app.delete('/posts/del/:id', (req, res) => {
//     const id = req.params.id;
//     pool.query('DELETE FROM post WHERE id = ?', id, (err, results) => {
//         if (err) {
//             console.log(err);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         res.json({ message: 'Data deleted successfully' });
//     });
// });

// const port = process.env.port | 3000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


// // // Function to show data
// // function showData(callback) {
// //     pool.getConnection((err, connection) => {
// //         if (err) {
// //             console.log(err);
// //             return;
// //         }

// //         // connection.query('SELECT * FROM post', (err, results) => {
// //         //     connection.release();
// //         //     if (err) {
// //         //         console.log(err);
// //         //         return;
// //         //     }
// //         //     console.log('All data:', results);
// //         // });
        
// //         const id = 1;
// //         connection.query('SELECT * FROM post where id = ?',id,(err, results) => {
// //             connection.release();
// //             if (err) {
// //                 console.log(err);
// //                 return;
// //             }
// //             console.log('All data:', results);
// //             callback(results);
// //         });
// //     });
// // }


// // // Function to insert data
// // function insertData() {
// //     pool.getConnection((err, connection) => {
// //         if (err) {
// //             console.log(err);
// //             return;
// //         }

// //         const dataToInsert = {
// //             // id: 2,      
// //             name: 'John Doe',
// //             phone: 1234567890,
// //             email: 'john@example.com'
// //         };

// //         connection.query('INSERT INTO post SET  ?', dataToInsert, (err, results) => {
// //             connection.release();
// //             if (err) {
// //                 console.log(err);
// //                 return;
// //             }
// //             console.log('Data inserted:', results);
// //         });
// //     });
// // }

// // // Function to update data
// // function updateData() {
// //     pool.getConnection((err, connection) => {
// //         if (err) {
// //             console.log(err);
// //             return;
// //         }

// //         const dataToUpdate = {
// //             content: 'nizam',
// //         };
// //         const recordId = 5; // specify the record you want to update

// //         connection.query('UPDATE post SET ? WHERE id = ?', [dataToUpdate, recordId], (err, results) => {
// //             connection.release();
// //             if (err) {
// //                 console.log(err);
// //                 return;
// //             }
// //             console.log('Data updated:', results);
// //         });

        
// //     });
// // }

// // // Function to delete data
// // function deleteData() {
// //     pool.getConnection((err, connection) => {
// //         if (err) {
// //             console.log(err);
// //             return;
// //         }

// //         const recordId = 6; // specify the record you want to delete

// //         connection.query('DELETE FROM post WHERE id = ?', recordId, (err, results) => {
// //             connection.release();
// //             if (err) {
// //                 console.log(err);
// //                 return;
// //             }
// //             console.log('Data deleted:', results);
// //         });
// //     });
// // }

// // // Uncomment the function you want to use
// // // export { showData };
// // // insertData();
// // // updateData();
// // // deleteData();
// // // export { pool };