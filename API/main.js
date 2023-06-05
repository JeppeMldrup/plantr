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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/newplant', (req, res) => {
    let data = req.body;
    console.log(data);
    res.json(req.body);
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
