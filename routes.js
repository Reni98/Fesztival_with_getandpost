const express = require('express');
const con = require('./db');
// const fs = require('fs');


const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));



  router.get('/post', (req, res) => {
    res.render('hozzaad');
});

  
  router.post('/upload', (req, res) => {
  
    con.query('INSERT INTO fesztival (nev, bdate, tel,email,napokszama,osszeg) VALUES (?, ?, ?, ?,?,?)', [req.body.nev, req.body.bdate,req.body.tel,req.body.email,req.body.napokszama,req.body.osszeg], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Hiba történt az adatok mentésekor.');
      } else {
        console.log("Sikeresen hozzáadva az adatbázishoz.");
        res.redirect('/post');
      }
    });
  });

  router.get('/fetch', (req, res) => {
    con.query("SELECT id, nev, bdate, tel, email, napokszama, osszeg FROM fesztival", (err, result, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send('Hiba történt az adatok lekérdezésekor.');
      } else {
       
        res.render('adatok', { autok: result }); // Táblázat megjelenítése az EJS fájlon keresztül
      }
    });
  });
 module.exports = router;