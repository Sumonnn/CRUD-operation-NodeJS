var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res) {
  const files = fs.readdirSync('public/garbage');
  res.render('index.ejs', { files: files });
});

//create a file for a garbage forder
router.post('/create', function (req, res) {
  fs.writeFileSync(`public/garbage/${req.body.filename}`, "file created");
  res.redirect('/');
});

// delete a file for a garbage forder
router.get('/delete/:filename', function (req, res) {
  fs.unlinkSync(`public/garbage/${req.params.filename}`);
  res.redirect("/");
});


module.exports = router;
