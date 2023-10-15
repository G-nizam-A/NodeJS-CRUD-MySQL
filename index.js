// server.js
const express = require('express');
const app = express();


app.get('/', function (req, res) {
    res.send('index')
  });

const port = process.env.PORT | 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


