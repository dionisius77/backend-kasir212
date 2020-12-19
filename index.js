const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.disable('x-powered-by');

const conn = mysql.createConnection({
  host: 'remotemysql.com',
  user: '73LOW96awC',
  password: 'Mjtb9KuSYI',
  database: '73LOW96awC'
});

conn.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('Mysql Connected...');
  }
});

app.route('/user').post((req, res) => {
  var sql = 'SELECT * FROM user';
  conn.query(sql, (err, result) => {
    if (err) {
      res.status(405).json({ "error": err.message });
    } else {
      res.status(200).json({ "invocationResult": result });
    }
  });
});

app.route('/login').post((req, res) => {
  var data = req.body;
  var sql = `SELECT * FROM user WHERE NIK = ${data.NIK} AND password = ${data.password}`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(result.length);
      res.status(405).json({ "error": err.message });
    } else {
      if (result.length > 0) {
        res.status(200).json({
          login: true,
          NIK: result[0].NIK,
          nama: result[0].nama,
          jabatan: result[0].jabatan
        });
      } else {
        res.status(200).json({
          login: false
        });
      }
    }
  });
});

app.route('/penjualan').post((req, res) => {
  var sql = 'SELECT * FROM penjualan';
  conn.query(sql, (err, result) => {
    if (err) {
      res.status(405).json({ "error": err.message });
    } else {
      res.status(200).json({ "invocationResult": result });
    }
  });
});

app.route('/stock').post((req, res) => {
  var sql = 'SELECT * FROM stock';
  conn.query(sql, (err, result) => {
    if (err) {
      res.status(405).json({ "error": err.message });
    } else {
      res.status(200).json({ "invocationResult": result });
    }
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
    qty,
    transaksi_date
  )
  VALUES(
      ${data.kode_penjualan},
      ${data.kode_barang},
      ${data.total_per_barang},
      ${data.harga_per_barang},
      ${data.total_harga},
      ${data.qty},
      '${data.transaksi_date}'
  )
  `;
  conn.query(sql, (err, result) => {
    if (err) {
      res.status(405).json({ "error": err.message });
    } else {
      res.status(201).json({ "invocationResult": result });
    }
  });
});

app.route('/changePenjualan').post((req, res) => {
  let data = req.body;
  let sql = `
  UPDATE penjualan
  SET total_per_barang=${data.total_per_barang},
  harga_per_barang=${data.harga_per_barang},
  total_harga=${data.total_harga},
  qty =${data.qty}
  WHERE kode_barang=${data.kode_barang}
  `;
  conn.query(sql, (err, result) => {
    if (err) {
      res.status(405).json({ "error": err.message });
    } else {
      res.status(201).json({ "invocationResult": result });
    }
  });
})

app.route('/deletePenjualan').post((req, res) => {
  let data = req.body;
  let sql = `
  DELETE FROM penjualan
  WHERE kode_barang=${data.kode_barang}
  `;
  conn.query(sql, (err, result) => {
    if (err) {
      res.status(405).json({ "error": err.message });
    } else {
      res.status(201).json({ "udah bisa itu asu": result });
    }
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
    if (err) {
      res.status(405).json({ "error": err.message });
    } else {
      res.status(201).json({ "invocationResult": result });
    }
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
    if (err) {
      res.status(405).json({ "error": err.message });
    } else {
      res.status(201).json({ "invocationResult": result });
    }
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
    if (err) {
      res.status(405).json({ "error": err.message });
    } else {
      res.status(201).json({ "invocationResult": result });
    }
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
    if (err) {
      res.status(405).json({ "error": err.message });
    } else {
      res.status(201).json({ "invocationResult": result });
    }
  });
})

app.route('/deleteUser').post((req, res) => {
  let data = req.body;
  let sql = `
  DELETE FROM user
  WHERE NIK=${data.NIK}
  `;
  conn.query(sql, (err, result) => {
    if (err) {
      res.status(405).json({ "error": err.message });
    } else {
      ;
      res.status(201).json({ "invocationResult": result });
    }
  });
})

app.route('/deleteStock').post((req, res) => {
  let data = req.body;
  let sql = `
  DELETE FROM stock
  WHERE kode_barang=${data.kode_barang}
  `;
  conn.query(sql, (err, result) => {
    if (err) {
      res.status(405).json({ "error": err.message });
    } else {
      res.status(201).json({ "invocationResult": result });
    }
  });
})

app.listen(3003, () => {
  console.log('Server started on port 3003...');
});