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

app.route('/user').post((req, res) => {
  var sql = 'SELECT * FROM user';
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({ "invocationResult": result });
  });
});

app.route('/login').post((req, res) => {
  var sql = 'SELECT * FROM "user" WHERE NIK = 207006056 AND password = 2147483647';
  conn.query(sql, (err, result) => {
    if (result.lenght > 0) {
      res.status(200).json({
        login: true,
        NIK: 207006056,
        nama: "Al fajri",
        jabatan: "hansip"
      });
    } else {
      res.status(200).json({
        login: false
      });
    }
    });
});

app.route('/penjualan').post((req, res) => {
  var sql = 'SELECT * FROM penjualan';
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({ "invocationResult": result });
  });
});

app.route('/stock').post((req, res) => {
  var sql = 'SELECT * FROM stock';
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({ "invocationResult": result });
  });
});

app.route('/inputPenjualan').post((req, res) => {
  var data = req.body;
  var sql = `
  INSERT INTO
  penjualan(
    kode_penjualan,
    kode_barang,
    total_per_barang,
    harga_per_barang,
    total_harga,
    transaksi_date
  )
  VALUES(
      '${data.kode_penjualan}',
      '${data.kode_barang}',
      '${data.total_per_barang}',
      '${data.harga_per_barang}',
      '${data.total_harga}',
      '${data.transaksi_date}'
  )
  `;
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).json({ "invocationResult": result });
  });
});

app.route('/deletePenjualan').post((req, res) => {
  let data = req.body;
  let sql = `
  DELETE FROM penjualan
  WHERE kode_barang=${data.kode_barang}
  `;
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).json({ "udah bisa itu asu": result });
  });
})

app.route('/inputStock').post((req, res) => {
  var data = req.body;
  var sql = `
  INSERT INTO
  stock(
      kode_barang,
      nama_barang,
      harga,
      qty,
      transaksi_date,
      expired_date
  )
  VALUES(
      '${data.kode_barang}',
      '${data.nama_barang}',
      '${data.harga}',
      '${data.qty}',
      '${data.transaksi_date}',
      '${data.expired_date}'
  )
  `;
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).json({ "invocationResult": result });
  });
});

app.route('/inputUser').post((req, res) => {
  var data = req.body;
  var sql = `
  INSERT INTO
  user(
      NIK,
      nama,
      jenis_kelamin,
      agama,
      jabatan,
      password
  )
  VALUES(
      '${data.NIK}',
      '${data.nama}',
      '${data.jenis_kelamin}',
      '${data.agama}',
      '${data.jabatan}',
      '${data.password}'
  )
  `;
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).json({ "invocationResult": result });
  });
});

app.route('/changeStock').post((req, res) => {
  let data = req.body;
  let sql = `
  UPDATE stock 
  SET nama_barang='${data.nama_barang}',
  harga =${data.harga},
  qty =${data.qty}
  WHERE kode_barang=${data.kode_barang}
  `;
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).json({ "invocationResult": result });
  });
})

app.route('/changeUser').post((req, res) => {
  let data = req.body;
  let sql = `
  UPDATE user 
  SET password=${data.password},
  jabatan = '${data.jabatan}'
  WHERE NIK=${data.NIK}
  `;
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).json({ "invocationResult": result });
  });
})

app.route('/deleteUser').post((req, res) => {
  let data = req.body;
  let sql = `
  DELETE FROM user
  WHERE NIK=${data.NIK}
  `;
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).json({ "invocationResult": result });
  });
})

app.route('/deleteStock').post((req, res) => {
  let data = req.body;
  let sql = `
  DELETE FROM stock
  WHERE kode_barang=${data.kode_barang}
  `;
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).json({ "invocationResult": result });
  });
})

app.listen(3003, () => {
  console.log('Server started on port 3003...');
});