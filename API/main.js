const { Client } = require('pg');
const pgClient = new Client({
    host: 'localhost',
    port: 4321,
    user: 'api',
    password: 'pass'
});
pgClient.connect();

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
