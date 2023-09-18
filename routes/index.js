var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res) {
  const files = fs.readdirSync('public/garbage');
  res.render('index.ejs', {
    files: files,
    filedata: null,
    filename: null,
  });
});

//create a file for a garbage forder
router.post('/create', function (req, res) {
  fs.writeFileSync(`public/garbage/${req.body.filename}`, "");
  res.redirect(`/edit/${req.body.filename}`);
});

// delete a file for a garbage forder
router.get('/delete/:filename', function (req, res) {
  fs.unlinkSync(`public/garbage/${req.params.filename}`);
  res.redirect("/");
});

//update filedata
router.get('/edit/:filename', (req, res) => {
  const files = fs.readdirSync('public/garbage');
  const filedata = fs.readFileSync(`public/garbage/${req.params.filename}`, 'utf-8');
  res.render('index', {
    files: files,
    filedata: filedata,
    filename: req.params.filename,
  });

})


//save filedate feature
router.post('/save/:filename', (req, res) => {
  fs.writeFileSync(`public/garbage/${req.params.filename}`, req.body.filedata);
  res.redirect(`/edit/${req.params.filename}`);
})


module.exports = router;
