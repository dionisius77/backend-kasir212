const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.disable('x-powered-by');

const conn = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12380265',
  password: 'P4Dw38irKz',
  database: 'sql12380265'
});

conn.connect((error) => {
  if (error) throw error;
  console.log('Mysql Connected...');
});

app.listen(3001, () => {
  console.log('Server started on port 3001...');
});